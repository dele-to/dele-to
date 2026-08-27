"use client"

import type React from "react"

import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Eye, Shield, AlertTriangle, Clock, Key, Lock, RefreshCw, Info, Link2Off } from "lucide-react"
import Link from "next/link"
import { getSecureShare, getShareMetadata } from "../../actions/share"
import { SecureCrypto } from "../../../lib/crypto"
import { accessTips } from "@/components/access-tips"
import { PasswordInput } from "@/components/password-input"
import { DecryptedTemplateView } from "@/components/secret-templates"

interface SecureShare {
  id: string
  title: string
  encryptedContent: string
  iv: string
  expiresAt: string
  maxViews: number
  currentViews: number
  requirePassword: boolean
}

interface ShareMetadata {
  id: string
  title: string
  expiresAt: string
  maxViews: number
  currentViews: number
  requirePassword: boolean
}

export default function ViewPage({ params }: { params: { id: string } }) {
  const [shareId, setShareId] = useState<string>("")
  const [share, setShare] = useState<SecureShare | null>(null)
  const [metadata, setMetadata] = useState<ShareMetadata | null>(null)
  const [decryptedContent, setDecryptedContent] = useState<string>("")
  const [password, setPassword] = useState("")
  const [showContent, setShowContent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isClient, setIsClient] = useState(false)
  const [encryptionKey, setEncryptionKey] = useState<CryptoKey | null>(null)
  const [readCapability, setReadCapability] = useState("")
  const [accessTip, setAccessTip] = useState(accessTips[0])
  const [isAccessTipOpen, setIsAccessTipOpen] = useState(false)

  useEffect(() => {
    setAccessTip(accessTips[Math.floor(Math.random() * accessTips.length)])
  }, [])

  useEffect(() => {
    const initializePage = async () => {
      setIsClient(true)

      const id = params.id
      setShareId(id)

      if (id) {
        const capability = await loadEncryptionKey()
        await loadMetadata(id, capability)
      }


    }

    initializePage()
  }, [params.id])

  const loadMetadata = async (id: string, capability?: string) => {
    try {
      const result = await getShareMetadata(id, capability)

      if (result.success && result.data) {
        setMetadata(result.data as ShareMetadata)
      } else {
        setError(result.error || "Failed to load share metadata")
      }
    } catch (error) {
      setError("Failed to load share metadata")
    }
  }

  const loadEncryptionKey = async (): Promise<string | undefined> => {
    if (typeof window !== "undefined") {
      const fullUrl = window.location.href
      const hashPart = window.location.hash
      let fragment = hashPart.substring(1) // Remove #

      // If no key in hash, try to extract from URL manually (in case fragment was lost)
      if (!fragment && fullUrl.includes("#")) {
        const urlParts = fullUrl.split("#")
        if (urlParts.length > 1) {
          fragment = urlParts[1]
        }
      }

      if (fragment) {
        try {
          let key: CryptoKey
          let capability: string | undefined

          if (/^[A-Za-z0-9_-]{43}$/.test(fragment)) {
            const derived = await SecureCrypto.deriveShareSecrets(fragment)
            key = derived.encryptionKey
            capability = derived.readCapability
          } else if (fragment.startsWith("k=")) {
            const fragmentParams = new URLSearchParams(fragment)
            key = await SecureCrypto.importKey(fragmentParams.get("k") || "")
            capability = fragmentParams.get("r") || undefined
          } else {
            key = await SecureCrypto.importKey(fragment)
          }

          setEncryptionKey(key)
          setReadCapability(capability || "")

          // *** VULNERABILITY FIX ***
          // After storing the key, remove it from the URL to prevent it from being
          // included in the Next.js router state and sent to the server.
          const urlWithoutHash = window.location.pathname + window.location.search
          window.history.replaceState({}, document.title, urlWithoutHash)
          return capability
          
        } catch (error) {
          setError("Invalid or corrupted encryption key in URL")
        }
      } else {
        setError("No encryption key found in URL. Make sure you're using the complete share link.")
      }
    }

    return undefined
  }

  const handleAccess = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!encryptionKey) {
      setError("Encryption key not available")
      return
    }

    if (!shareId) {
      setError("Share ID not available")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const result = await getSecureShare(shareId, password, readCapability || undefined)

      if (result.success && result.data) {
        const shareData = result.data as SecureShare
        setShare(shareData)

        // Decrypt content client-side
        try {
          const decrypted = await SecureCrypto.decrypt(shareData.encryptedContent, encryptionKey, shareData.iv)

          setDecryptedContent(decrypted)
          setShowContent(true)
        } catch (decryptError) {
          setError("Failed to decrypt content. The encryption key may be incorrect or corrupted.")
        }
      } else {
        setError(result.error || "Failed to access secure share")
      }
    } catch (error) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const formatTimeRemaining = (expiresAt: string) => {
    const now = new Date()
    const expires = new Date(expiresAt)
    const diff = expires.getTime() - now.getTime()

    if (diff <= 0) return "Expired"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    if (days > 0) {
      return `${days}d ${hours}h remaining`
    }
    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`
    }
    if (minutes > 0) {
      return `${minutes}m ${seconds}s remaining`
    }
    return `${seconds}s remaining`
  }

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading secure decryption...</p>
        </div>
      </div>
    )
  }

  if (showContent && share) {
    return (
      <div className="min-h-screen p-4">
        <div className="container mx-auto max-w-2xl py-16">
          <Card>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-center">{share.title || "Secure Content"}</CardTitle>
              <CardDescription className="text-center">
                Content decrypted successfully using client-side AES-256 encryption
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                <div className="flex items-center justify-between text-sm divide-x divide-gray-200 dark:divide-gray-700">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span className="text-orange-600 dark:text-orange-400 font-medium">{formatTimeRemaining(share.expiresAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 pl-4">
                    <Eye className="w-4 h-4 text-blue-500" />
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      {share.currentViews}/{share.maxViews} views
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Decrypted Content</Label>
                <div className="mt-2">
                  <DecryptedTemplateView content={decryptedContent} />
                </div>
              </div>

              <Alert>
                <Key className="w-4 h-4" />
                <AlertDescription className="space-y-1">
                  <p>
                    <strong>Security notice:</strong> This content was decrypted locally in your browser. The server
                    never had access to your unencrypted data or the decryption key.
                  </p>
                  <p>
                    This content has been viewed and may be automatically destroyed based on the expiration settings.
                    Save it securely if needed.
                  </p>
                </AlertDescription>
              </Alert>

              <div className="text-center">
                <Link href="/create">
                  <Button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white gap-2">
                    <Lock className="w-4 h-4" />
                    Create Your Own Secure Share
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const shareNotFound = error === "Share not found or has expired"

  if (shareNotFound) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="container mx-auto max-w-md">
          <Card>
            <CardContent className="pt-10 pb-8 text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                  <Link2Off className="w-10 h-10 text-gray-500 dark:text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">Secure Share Not Found</h1>
                <p className="text-sm text-muted-foreground">
                  This share may have already been viewed and destroyed, expired, or the link is incomplete.
                </p>
              </div>
              <Link href="/create" className="block">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Create Your Own Secure Share
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto max-w-md py-16">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-full">
                <Shield className="w-8 h-8 text-red-600 dark:text-red-500" />
              </div>
            </div>
            <CardTitle>Access Secure Content</CardTitle>
            <CardDescription className="flex items-center justify-center gap-1.5">
              <span>
                {metadata?.title && <>Accessing: {metadata.title} &middot; </>}
                Client-side decryption with AES-256
              </span>
              <Popover open={isAccessTipOpen} onOpenChange={setIsAccessTipOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="text-muted-foreground hover:text-foreground shrink-0"
                    aria-label="Access tip"
                    onMouseEnter={() => setIsAccessTipOpen(true)}
                    onMouseLeave={() => setIsAccessTipOpen(false)}
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="max-w-xs w-auto text-sm"
                  onMouseEnter={() => setIsAccessTipOpen(true)}
                  onMouseLeave={() => setIsAccessTipOpen(false)}
                >
                  <p className="font-medium mb-1">Access Tip: {accessTip.title}</p>
                  <p className="text-muted-foreground">{accessTip.description}</p>
                </PopoverContent>
              </Popover>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {metadata && (
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                <div className="flex items-center justify-between text-sm divide-x divide-gray-200 dark:divide-gray-700">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span className="text-orange-600 dark:text-orange-400 font-medium">{formatTimeRemaining(metadata.expiresAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 pl-4">
                    <Eye className="w-4 h-4 text-blue-500" />
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      {metadata.currentViews}/{metadata.maxViews} views
                    </span>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleAccess} className="space-y-4">
              {metadata?.requirePassword && (
                <div>
                  <Label htmlFor="password">Access Password</Label>
                  <PasswordInput
                    id="password"
                    placeholder="Enter the required password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              )}

              {!encryptionKey && (
                <Alert variant="destructive">
                  <AlertTriangle className="w-4 h-4" />
                  <AlertDescription>
                    No encryption key found in URL. Make sure you're using the complete share link including the
                    fragment (#) part.
                    <br />
                    <br />
                    <strong>Expected URL format:</strong>
                    <br />
                    <code className="text-xs">https://dele.to/view/[id]#[root-secret]</code>
                  </AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="w-4 h-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white gap-2"
                disabled={isLoading || !encryptionKey}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Decrypting...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Access Content
                  </>
                )}
              </Button>
            </form>

            <Alert className="mt-4">
              <Key className="w-4 h-4" />
              <AlertDescription>
                <strong>Zero-knowledge:</strong> Decryption happens entirely in your browser. The server never sees your
                encryption key or decrypted content.
              </AlertDescription>
            </Alert>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}
