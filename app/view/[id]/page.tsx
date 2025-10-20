"use client"

import type React from "react"

import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, Eye, Shield, AlertTriangle, Clock, Key } from "lucide-react"
import Link from "next/link"
import { getSecureShare, getShareMetadata, testShareExists } from "../../actions/share"
import { SecureCrypto } from "../../../lib/crypto"
import { AccessTips } from "@/components/access-tips"
import { PasswordInput } from "@/components/password-input"
import { useTranslation } from "react-i18next"

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
  const { t } = useTranslation();
  const [shareId, setShareId] = useState<string>("")
  const [share, setShare] = useState<SecureShare | null>(null)
  const [metadata, setMetadata] = useState<ShareMetadata | null>(null)
  const [decryptedContent, setDecryptedContent] = useState<string>("")
  const [password, setPassword] = useState("")
  const [showContent, setShowContent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [encryptionKey, setEncryptionKey] = useState<CryptoKey | null>(null)
  const [keyLoaded, setKeyLoaded] = useState(false)

  useEffect(() => {
    const initializePage = async () => {
      setIsClient(true)

      const id = params.id
      setShareId(id)

      if (id) {
        loadMetadata(id)
        if (!keyLoaded) {
          loadEncryptionKey()
        }
      }


    }

    initializePage()
  }, [params.id])

  const loadMetadata = async (id: string) => {
    try {
      // First, let's test if the share exists at all
      const existsResult = await testShareExists(id)

      const result = await getShareMetadata(id)

      if (result.success && result.data) {
        setMetadata(result.data as ShareMetadata)
      } else {
        // If metadata fails, try to get the full share data as a fallback
        const shareResult = await getSecureShare(id)

        if (shareResult.success && shareResult.data) {
          // Convert share data to metadata format
          const shareData = shareResult.data as any
          setMetadata({
            id: shareData.id,
            title: shareData.title,
            expiresAt: shareData.expiresAt,
            maxViews: shareData.maxViews,
            currentViews: shareData.currentViews,
            requirePassword: shareData.requirePassword,
          })
        } else {
          setError(result.error || "Failed to load share metadata")
        }
      }
    } catch (error) {
      setError("Failed to load share metadata")
    }
  }

  const loadEncryptionKey = async () => {
    if (typeof window !== "undefined" && !keyLoaded) {
      const fullUrl = window.location.href
      const hashPart = window.location.hash
      let keyFromUrl = hashPart.substring(1) // Remove #

      // If no key in hash, try to extract from URL manually (in case fragment was lost)
      if (!keyFromUrl && fullUrl.includes("#")) {
        const urlParts = fullUrl.split("#")
        if (urlParts.length > 1) {
          keyFromUrl = urlParts[1]
        }
      }

      if (keyFromUrl) {
        try {
          const key = await SecureCrypto.importKey(keyFromUrl)
          setEncryptionKey(key)
          setKeyLoaded(true)

          // *** VULNERABILITY FIX ***
          // After storing the key, remove it from the URL to prevent it from being
          // included in the Next.js router state and sent to the server.
          // Use setTimeout to ensure this happens after hydration is complete
          setTimeout(() => {
            const urlWithoutHash = window.location.pathname + window.location.search
            window.history.replaceState({}, document.title, urlWithoutHash)
          }, 100)
          
        } catch (error) {
          setError(t('view.errors.invalidEncryptionKey'))
        }
      } else {
        setError(t('view.errors.noEncryptionKeyDescription'))
      }
    }
  }

  const handleAccess = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!encryptionKey) {
      setError(t('view.errors.encryptionKeyNotAvailable'))
      return
    }

    if (!shareId) {
      setError(t('view.shareIdNotAvailable'))
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const result = await getSecureShare(shareId, password)

      if (result.success && result.data) {
        const shareData = result.data as SecureShare
        setShare(shareData)

        // Decrypt content client-side
        try {
          const decrypted = await SecureCrypto.decrypt(shareData.encryptedContent, encryptionKey, shareData.iv)

          setDecryptedContent(decrypted)
          setShowContent(true)
        } catch (decryptError) {
          setError(t('view.errors.failedToDecrypt'))
        }
      } else {
        setError(result.error || t('view.errors.failedToAccessShare'))
      }
    } catch (error) {
      setError(t('view.errors.unexpectedError'))
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    if (decryptedContent) {
      await navigator.clipboard.writeText(decryptedContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatTimeRemaining = (expiresAt: string) => {
    const now = new Date()
    const expires = new Date(expiresAt)
    const diff = expires.getTime() - now.getTime()

    if (diff <= 0) return t('view.timeRemaining.expired')

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 0) {
      return t('view.timeRemaining.hoursMinutes', { hours, minutes })
    }
    return t('view.timeRemaining.minutes', { minutes })
  }

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>{t('view.loadingDecryption')}</p>
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
              <CardTitle className="text-center">{share.title || t('view.secureContent')}</CardTitle>
              <CardDescription className="text-center">
                {t('view.contentDecryptedSuccessfully')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-orange-600 dark:text-orange-400 font-medium">{formatTimeRemaining(share.expiresAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-blue-500" />
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    {share.maxViews === 1 ? t('view.burnAfterReading') : `${share.currentViews}/${share.maxViews} ${t('view.views')}`}
                  </span>
                </div>
              </div>

              <div>
                <Label>{t('view.decryptedContent')}</Label>
                <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                  <div className="flex justify-between items-start gap-4">
                    <pre className="whitespace-pre-wrap font-mono text-sm flex-1 break-all text-gray-900 dark:text-gray-100">{decryptedContent}</pre>
                    <Button onClick={copyToClipboard} variant="outline" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  {copied && <p className="text-sm text-green-600 mt-2">{t('common.copiedToClipboard')}</p>}
                </div>
              </div>

              <Alert>
                <Key className="w-4 h-4" />
                <AlertDescription>
                  <strong>{t('view.securityNoticeTitle')}</strong> {t('view.securityNoticeContent')}
                </AlertDescription>
              </Alert>

              <Alert>
                <AlertTriangle className="w-4 h-4" />
                <AlertDescription>
                  <strong>{t('view.importantNoticeTitle')}</strong> {t('view.importantNoticeContent')}
                </AlertDescription>
              </Alert>

              <div className="text-center">
                <Link href="/create">
                  <Button>{t('view.createYourOwn')}</Button>
                </Link>
              </div>
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
              <div className="p-3 bg-blue-100 rounded-full">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <CardTitle>{t('view.accessSecureContent')}</CardTitle>
            <CardDescription>
              {metadata?.title && `${t('view.accessing')}: ${metadata.title}`}
              <br />
              {t('view.shareId')}: {shareId}
              <br />
              {t('view.clientSideDecryption')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AccessTips />
            
            {metadata && (
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span className="text-orange-600 dark:text-orange-400 font-medium">{formatTimeRemaining(metadata.expiresAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-blue-500" />
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      {metadata.maxViews === 1 ? t('view.burnAfterReading') : `${metadata.currentViews}/${metadata.maxViews} ${t('view.views')}`}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleAccess} className="space-y-4">
              {metadata?.requirePassword && (
                <div>
                  <Label htmlFor="password">{t('view.accessPassword')}</Label>
                  <PasswordInput
                    id="password"
                    placeholder={t('view.enterRequiredPassword')}
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
                    {t('view.errors.noEncryptionKey')}
                    <br />
                    <br />
                    {t('view.errors.expectedUrlFormat')}
                  </AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="w-4 h-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading || !encryptionKey}>
                {isLoading ? t('view.decrypting') : t('view.accessContent')}
              </Button>
            </form>

            <Alert className="mt-4">
              <Key className="w-4 h-4" />
              <AlertDescription>
                {t('view.zeroKnowledgeNotice')}
              </AlertDescription>
            </Alert>

            <div className="mt-6 text-center">
              <Link href="/create">
                <Button variant="outline">{t('view.createYourOwn')}</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
