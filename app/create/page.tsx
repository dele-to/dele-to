"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, Shield, ArrowLeft, Key, RefreshCw, AlertTriangle, Link2 } from "lucide-react"
import Link from "next/link"
import { createSecureShare } from "../actions/share"
import { SecureCrypto } from "../../lib/crypto"
import { SecurityTips } from "@/components/security-tips"
import { InlineTip } from "@/components/inline-tip"
import { PasswordInput } from "@/components/password-input"

export default function CreatePage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    expirationTime: "1h",
    maxViews: 1,
    requirePassword: false,
    password: "",
    linkType: "standard", // "standard" or "shorter"
  })
  const [shareLink, setShareLink] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isClient) return

    // Validate form data
    if (!formData.content.trim()) {
      setError("Please enter some content to share")
      return
    }

    if (formData.requirePassword && !formData.password.trim()) {
      setError("Please enter a password or disable password protection")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Generate encryption key client-side
      const encryptionKey = await SecureCrypto.generateKey()
      const keyString = await SecureCrypto.exportKey(encryptionKey)

      // Encrypt content client-side
      const { encrypted, iv } = await SecureCrypto.encrypt(formData.content, encryptionKey)

      // Send only encrypted data to server
      const result = await createSecureShare({
        title: formData.title,
        encryptedContent: encrypted,
        iv: iv,
        expirationTime: formData.expirationTime,
        maxViews: formData.maxViews,
        requirePassword: formData.requirePassword,
        password: formData.password,
        linkType: formData.linkType,
      })

      if (result.success && result.id) {
        const shareId = result.id

        // Immediate verification - wait a moment then test if it exists
        setTimeout(async () => {
          try {
            const { testShareExists } = await import("../actions/share")
            await testShareExists(shareId)
          } catch (error) {
            console.error("Share verification failed:", error)
          }
        }, 1000)

        // Include encryption key in URL fragment (never sent to server)
        const shareUrl = `${window.location.origin}/view/${shareId}#${keyString}`
        setShareLink(shareUrl)
      } else {
        setError(result.error || "Failed to create secure share")
      }
    } catch (error) {
      console.error("Failed to create secure share:", error)
      setError("Failed to create secure share. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shareLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const generateSecurePassword = () => {
    if (!isClient) return
    const password = SecureCrypto.generateSecurePassword()
    setFormData({ ...formData, password })
  }

  if (shareLink) {
    return (
      <div className="min-h-screen p-4">
        <div className="container mx-auto max-w-2xl py-16">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl">Secure Link Created!</CardTitle>
              <CardDescription>Your secret has been encrypted client-side and is ready to share</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="share-link">Secure Share Link</Label>
                <div className="flex gap-2 mt-2">
                  <Input id="share-link" value={shareLink} readOnly className="font-mono text-sm" />
                  <Button onClick={copyToClipboard} variant="outline">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                {copied && <p className="text-sm text-green-600 mt-1">Copied to clipboard!</p>}
              </div>

              <Alert>
                <Key className="w-4 h-4" />
                <AlertDescription>
                  <strong>Security Notice:</strong> The decryption key is included in the URL fragment (#) and never
                  sent to our servers. Only share this complete link with your intended recipient.
                </AlertDescription>
              </Alert>

              <Alert>
                <Shield className="w-4 h-4" />
                <AlertDescription>
                  <strong>Important:</strong> This link will expire based on your settings. Your data is encrypted with
                  AES-256 and can only be decrypted by someone with this complete link.
                </AlertDescription>
              </Alert>

              <div className="flex gap-4">
                <Button
                  onClick={() => {
                    setShareLink("")
                    setFormData({
                      title: "",
                      content: "",
                      expirationTime: "1h",
                      maxViews: 1,
                      requirePassword: false,
                      password: "",
                      linkType: "standard",
                    })
                  }}
                  className="flex-1"
                >
                  Create Another
                </Button>
                <Link href="/" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 mx-auto mb-4"></div>
          <p>Loading secure encryption...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto max-w-2xl py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <SecurityTips />
        
        <Card>
          <CardHeader>
            <CardTitle>Create Secure Share</CardTitle>
            <CardDescription>
              Encrypt and share sensitive information with client-side AES-256 encryption
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="w-4 h-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div>
                <Label htmlFor="title">Title (Optional)</Label>
                <Input
                  id="title"
                  placeholder="e.g., Database Password, API Key"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="content">Secret Content *</Label>
                <Textarea
                  id="content"
                  placeholder="Enter your password, API key, or sensitive information here..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows={4}
                />
                <p className="text-sm text-gray-600 mt-1">
                  This content will be encrypted with AES-256 in your browser before transmission.
                </p>
                <InlineTip className="mt-3">
                  <strong>Pro tip:</strong> For login credentials, consider sharing the username, password, and server details in separate links for enhanced security isolation.
                </InlineTip>
              </div>

              <div>
                <Label className="text-base font-medium">Link Type</Label>
                <RadioGroup
                  value={formData.linkType}
                  onValueChange={(value) => setFormData({ ...formData, linkType: value })}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex items-center gap-2 cursor-pointer">
                      <Link2 className="w-4 h-4" />
                      Standard links (more secure)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="shorter" id="shorter" />
                    <Label htmlFor="shorter" className="flex items-center gap-2 cursor-pointer">
                      <Link2 className="w-4 h-4" />
                      Shorter links (easier to share)
                    </Label>
                  </div>
                </RadioGroup>
                <p className="text-sm text-gray-600 mt-1">
                  {formData.linkType === "standard" 
                    ? "Standard links use longer, more secure identifiers for maximum security."
                    : "Shorter links are easier to share but use shorter identifiers (still cryptographically secure)."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiration">Expiration Time</Label>
                  <Select
                    value={formData.expirationTime}
                    onValueChange={(value) => setFormData({ ...formData, expirationTime: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15m">15 minutes</SelectItem>
                      <SelectItem value="1h">1 hour</SelectItem>
                      <SelectItem value="24h">24 hours</SelectItem>
                      <SelectItem value="7d">7 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="maxViews">Max Views</Label>
                  <Select
                    value={formData.maxViews.toString()}
                    onValueChange={(value) => setFormData({ ...formData, maxViews: Number.parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 view (burn after reading)</SelectItem>
                      <SelectItem value="3">3 views</SelectItem>
                      <SelectItem value="5">5 views</SelectItem>
                      <SelectItem value="10">10 views</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <InlineTip className="mt-4">
                <strong>Security strategy:</strong> Use shorter expiration times (15 minutes) for passwords and longer periods for less sensitive information like usernames or server names.
              </InlineTip>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="requirePassword">Require Password</Label>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                  <Switch
                    id="requirePassword"
                    checked={formData.requirePassword}
                    onCheckedChange={(checked) => setFormData({ ...formData, requirePassword: checked })}
                  />
                </div>

                {formData.requirePassword && (
                  <div>
                    <Label htmlFor="password">Access Password</Label>
                    <div className="flex gap-2 mt-1">
                      <PasswordInput
                        id="password"
                        placeholder="Enter a password to protect this secret"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required={formData.requirePassword}
                        className="flex-1"
                      />
                      <Button type="button" variant="outline" onClick={generateSecurePassword}>
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Click the refresh button to generate a secure random password. Use the eye icon to view the password.
                    </p>
                  </div>
                )}
              </div>

              <Alert>
                <Key className="w-4 h-4" />
                <AlertDescription>
                  <strong>Zero-Knowledge Encryption:</strong> Your data is encrypted in your browser using AES-256. The
                  encryption key never leaves your device and is embedded in the share URL.
                </AlertDescription>
              </Alert>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating Secure Link..." : "Create Secure Link"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
