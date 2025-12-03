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
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Copy, Shield, ArrowLeft, Key, RefreshCw, AlertTriangle, Link2, QrCode, Plus, Trash2, Users, User, X, Tag, ChevronDown, Settings, Crown } from "lucide-react"
import Link from "next/link"
import { createSecureShare } from "../actions/share"
import { SecureCrypto } from "../../lib/crypto"
import { SecurityTips } from "@/components/security-tips"
import { InlineTip } from "@/components/inline-tip"
import { PasswordInput } from "@/components/password-input"
import { QrCodeModal } from "@/components/qr-code-modal"
import { Header } from "@/components/header"

interface Recipient {
  id: string
  name: string
  expirationTime: string
  maxViews: number
  requirePassword: boolean
  password: string
}

interface GeneratedLink {
  recipientId: string
  recipientName: string
  shareId: string
  shareLink: string
  expirationTime: string
  maxViews: number
  requirePassword: boolean
}

export default function CreatePage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    linkType: "standard", // "standard" or "shorter"
    multiRecipient: false,
  })
  
  // Single recipient settings (when multiRecipient is false)
  const [singleRecipientSettings, setSingleRecipientSettings] = useState({
    expirationTime: "1h",
    maxViews: 1,
    requirePassword: false,
    password: "",
  })
  
  // Multi-recipient state
  const [recipients, setRecipients] = useState<Recipient[]>([])
  const [newRecipientName, setNewRecipientName] = useState("")
  
  const [generatedLinks, setGeneratedLinks] = useState<GeneratedLink[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null)
  const [isQrModalOpen, setIsQrModalOpen] = useState(false)
  const [qrModalLink, setQrModalLink] = useState("")
  const [qrModalTitle, setQrModalTitle] = useState("")
  const [isClient, setIsClient] = useState(false)
  const [error, setError] = useState("")
  const [tags, setTags] = useState(["NEW"])
  const [isAdvancedSettingsOpen, setIsAdvancedSettingsOpen] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const addRecipient = () => {
    if (!newRecipientName.trim()) return
    if (recipients.length >= 3) return
    
    const newRecipient: Recipient = {
      id: crypto.randomUUID(),
      name: newRecipientName.trim(),
      expirationTime: "1h",
      maxViews: 1,
      requirePassword: false,
      password: "",
    }
    
    setRecipients([...recipients, newRecipient])
    setNewRecipientName("")
  }

  const removeRecipient = (id: string) => {
    setRecipients(recipients.filter(r => r.id !== id))
  }

  const updateRecipient = (id: string, updates: Partial<Recipient>) => {
    setRecipients(recipients.map(r => r.id === id ? { ...r, ...updates } : r))
  }

  const generateSecurePassword = (recipientId?: string) => {
    if (!isClient) return
    const password = SecureCrypto.generateSecurePassword()
    
    if (recipientId) {
      updateRecipient(recipientId, { password })
    } else {
      setSingleRecipientSettings({ ...singleRecipientSettings, password })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isClient) return

    // Validate form data
    if (!formData.content.trim()) {
      setError("Please enter some content to share")
      return
    }

    if (formData.multiRecipient && recipients.length === 0) {
      setError("Please add at least one recipient for multi-recipient sharing")
      return
    }

    // Validate passwords for recipients that require them
    const recipientsToProcess = formData.multiRecipient ? recipients : [{
      id: 'single',
      name: 'there',
      ...singleRecipientSettings
    }]

    for (const recipient of recipientsToProcess) {
      if (recipient.requirePassword && !recipient.password.trim()) {
        setError(`Please enter a password for ${recipient.name} or disable password protection`)
        return
      }
    }

    setIsLoading(true)
    setError("")

    try {
      // Generate encryption key client-side (same key for all recipients)
      const encryptionKey = await SecureCrypto.generateKey()
      const keyString = await SecureCrypto.exportKey(encryptionKey)

      // Encrypt content client-side (once for all recipients)
      const { encrypted, iv } = await SecureCrypto.encrypt(formData.content, encryptionKey)

      const links: GeneratedLink[] = []

      // Create separate shares for each recipient
      for (const recipient of recipientsToProcess) {
        const result = await createSecureShare({
          title: formData.title,
          encryptedContent: encrypted,
          iv: iv,
          expirationTime: recipient.expirationTime,
          maxViews: recipient.maxViews,
          requirePassword: recipient.requirePassword,
          password: recipient.password,
          linkType: formData.linkType,
        })

        if (result.success && result.id) {
          const shareId = result.id
          
          // Immediate verification
          setTimeout(async () => {
            try {
              const { testShareExists } = await import("../actions/share")
              await testShareExists(shareId)
            } catch (error) {
              console.error("Share verification failed:", error)
            }
          }, 1000)

          // Include encryption key in URL fragment (same key for all)
          const shareUrl = `${window.location.origin}/view/${shareId}#${keyString}`
          
          links.push({
            recipientId: recipient.id,
            recipientName: recipient.name,
            shareId,
            shareLink: shareUrl,
            expirationTime: recipient.expirationTime,
            maxViews: recipient.maxViews,
            requirePassword: recipient.requirePassword,
          })
        } else {
          setError(result.error || `Failed to create secure share for ${recipient.name}`)
          return
        }
      }

      setGeneratedLinks(links)
    } catch (error) {
      console.error("Failed to create secure share:", error)
      setError("Failed to create secure share. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async (link: string, linkId: string) => {
    await navigator.clipboard.writeText(link)
    setCopiedLinkId(linkId)
    setTimeout(() => setCopiedLinkId(null), 2000)
  }

  const openQrModal = (link: string, title: string) => {
    setQrModalLink(link)
    setQrModalTitle(title)
    setIsQrModalOpen(true)
  }

  const addTag = (tag: string) => {
    if (tags.length >= 3) return
    setTags([...tags, tag])
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  if (generatedLinks.length > 0) {
    return (
      <div className="min-h-screen p-4">
        <Header />
        <div className="container mx-auto max-w-4xl py-16">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl">
                {formData.multiRecipient ? `${generatedLinks.length} Secure Links Created!` : 'Secure Link Created!'}
              </CardTitle>
              <CardDescription>
                Your secret has been encrypted client-side and is ready to share with {formData.multiRecipient ? 'multiple recipients' : 'your recipient'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.multiRecipient ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Recipient Links
                  </h3>
                  {generatedLinks.map((link) => (
                    <Card key={link.recipientId} className="border-l-4 border-l-blue-500">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {link.recipientName}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          Expires: {link.expirationTime} • Max views: {link.maxViews}
                          {link.requirePassword && ' • Password protected'}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-2">
                        <div className="flex gap-2">
                          <Input 
                            value={link.shareLink} 
                            readOnly 
                            className="font-mono text-xs" 
                          />
                          <Button 
                            onClick={() => copyToClipboard(link.shareLink, link.recipientId)} 
                            variant="outline"
                            size="sm"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button 
                            onClick={() => openQrModal(link.shareLink, `${formData.title} - ${link.recipientName}`)} 
                            variant="outline"
                            size="sm"
                          >
                            <QrCode className="w-4 h-4" />
                          </Button>
                        </div>
                        {copiedLinkId === link.recipientId && (
                          <p className="text-sm text-green-600 mt-1">Copied to clipboard!</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="share-link">Secure Share Link</Label>
                    <div className="flex gap-2 mt-2">
                      <Input 
                        id="share-link" 
                        value={generatedLinks[0].shareLink} 
                        readOnly 
                        className="font-mono text-sm" 
                      />
                      <Button onClick={() => copyToClipboard(generatedLinks[0].shareLink, generatedLinks[0].recipientId)} variant="outline">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button onClick={() => openQrModal(generatedLinks[0].shareLink, formData.title)} variant="outline">
                        <QrCode className="w-4 h-4" />
                      </Button>
                    </div>
                    {copiedLinkId === generatedLinks[0].recipientId && (
                      <p className="text-sm text-green-600 mt-1">Copied to clipboard!</p>
                    )}
                  </div>
                </div>
              )}

              <Alert>
                <Key className="w-4 h-4" />
                <AlertDescription>
                  <strong>Security Notice:</strong> The decryption key is included in the URL fragment (#) and never
                  sent to our servers. Only share each complete link with its intended recipient.
                </AlertDescription>
              </Alert>

              <Alert>
                <Shield className="w-4 h-4" />
                <AlertDescription>
                  <strong>Important:</strong> Each link will expire based on its individual settings. Your data is encrypted with
                  AES-256 and can only be decrypted by someone with the complete link.
                </AlertDescription>
              </Alert>

              <div className="flex gap-3 mt-6">
                <Button
                  type="button"
                  variant="default"
                  onClick={() => {
                    setGeneratedLinks([])
                    setFormData({
                      title: "",
                      content: "",
                      linkType: "standard",
                      multiRecipient: false,
                    })
                    setSingleRecipientSettings({
                      expirationTime: "1h",
                      maxViews: 1,
                      requirePassword: false,
                      password: "",
                    })
                    setRecipients([])
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  Create Another
                </Button>
                <Link href="/" className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          <QrCodeModal
            isOpen={isQrModalOpen}
            onClose={() => setIsQrModalOpen(false)}
            url={qrModalLink}
            title={qrModalTitle}
          />
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
      <Header />
      <div className="container mx-auto max-w-2xl py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
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

              <div className="space-y-3 p-4 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <Label htmlFor="content" className="text-base font-medium">Secret Content *</Label>
                <Textarea
                  id="content"
                  placeholder="Enter your password, API key, or sensitive information here..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows={4}
                />
                <p className="text-xs text-gray-500 mt-1">
                  This content will be encrypted with AES-256 in your browser before transmission.
                </p>
                <InlineTip className="mt-2">
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    <strong>Pro tip:</strong> For login credentials, consider sharing the username, password, and server details in separate links for enhanced security isolation.
                  </span>
                </InlineTip>
              </div>

              {/* Expiration and Views - Always Visible */}
              {!formData.multiRecipient && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiration">Expiration Time</Label>
                    <Select
                      value={singleRecipientSettings.expirationTime}
                      onValueChange={(value) => setSingleRecipientSettings({ ...singleRecipientSettings, expirationTime: value })}
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
                      value={singleRecipientSettings.maxViews.toString()}
                      onValueChange={(value) => setSingleRecipientSettings({ ...singleRecipientSettings, maxViews: parseInt(value) })}
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
              )}

              {/* Advanced Settings */}
              <Collapsible className="space-y-4" open={isAdvancedSettingsOpen} onOpenChange={setIsAdvancedSettingsOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full flex items-center gap-2 justify-between p-4 h-auto">
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      <div className="text-left">
                        <span>Advanced Settings</span>
                        <p className="text-xs text-gray-500 mt-1 hidden md:block">Multi-recipient, access controls & more</p>
                        <p className="text-xs text-gray-500 mt-1 md:hidden">Multi-recipient and access controls</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isAdvancedSettingsOpen ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-6 pt-4">

              {/* Multi-Recipient Toggle */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="multiRecipient">Multi-Recipient Sharing</Label>
                      <Badge variant="outline" className="text-xs px-2 py-1">
                        NEW
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">Encrypt once, generate multiple links for different recipients (max 3)</p>
                  </div>
                  <Switch
                    id="multiRecipient"
                    checked={formData.multiRecipient}
                    onCheckedChange={(checked) => setFormData({ ...formData, multiRecipient: checked })}
                  />
                </div>

                {formData.multiRecipient && (
                  <Alert>
                    <Users className="w-4 h-4" />
                    <AlertDescription>
                      <strong>Multi-Recipient Mode:</strong> Your content will be encrypted once, but each recipient will get their own unique link with individual expiration and access settings.
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Recipient Management */}
              {formData.multiRecipient && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">Recipients</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        placeholder="Recipient name (e.g., John, Marketing Team)"
                        value={newRecipientName}
                        onChange={(e) => setNewRecipientName(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRecipient())}
                      />
                      <Button type="button" onClick={addRecipient} variant="outline">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {recipients.length > 0 && (
                    <div className="space-y-3">
                      {recipients.map((recipient) => (
                        <Card key={recipient.id} className="border-l-4 border-l-blue-500">
                          <CardContent className="pt-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium flex items-center gap-2">
                                <User className="w-4 h-4" />
                                {recipient.name}
                              </h4>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeRecipient(recipient.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            
                            
                            <div className="grid grid-cols-2 gap-3 mb-3">
                              <div>
                                <Label className="text-sm">Expiration</Label>
                                <Select
                                  value={recipient.expirationTime}
                                  onValueChange={(value) => updateRecipient(recipient.id, { expirationTime: value })}
                                >
                                  <SelectTrigger className="h-8">
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
                                <Label className="text-sm">Max Views</Label>
                                <Select
                                  value={recipient.maxViews.toString()}
                                  onValueChange={(value) => updateRecipient(recipient.id, { maxViews: parseInt(value) })}
                                >
                                  <SelectTrigger className="h-8">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="1">1 view</SelectItem>
                                    <SelectItem value="3">3 views</SelectItem>
                                    <SelectItem value="5">5 views</SelectItem>
                                    <SelectItem value="10">10 views</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mb-2">
                              <Label className="text-sm">Require Password</Label>
                              <Switch
                                checked={recipient.requirePassword}
                                onCheckedChange={(checked) => updateRecipient(recipient.id, { requirePassword: checked })}
                              />
                            </div>

                            {recipient.requirePassword && (
                              <div className="flex gap-2">
                                <PasswordInput
                                  placeholder="Password for this recipient"
                                  value={recipient.password}
                                  onChange={(e) => updateRecipient(recipient.id, { password: e.target.value })}
                                  className="flex-1 h-8"
                                />
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => generateSecurePassword(recipient.id)}
                                >
                                  <RefreshCw className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Single Recipient Settings */}
              {!formData.multiRecipient && (
                <>
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


                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="requirePassword">Require Password</Label>
                        <p className="text-sm text-gray-600">Add an extra layer of security</p>
                      </div>
                      <Switch
                        id="requirePassword"
                        checked={singleRecipientSettings.requirePassword}
                        onCheckedChange={(checked) => setSingleRecipientSettings({ ...singleRecipientSettings, requirePassword: checked })}
                      />
                    </div>

                    {singleRecipientSettings.requirePassword && (
                      <div>
                        <Label htmlFor="password">Access Password</Label>
                        <div className="flex gap-2 mt-1">
                          <PasswordInput
                            id="password"
                            placeholder="Enter a password to protect this secret"
                            value={singleRecipientSettings.password}
                            onChange={(e) => setSingleRecipientSettings({ ...singleRecipientSettings, password: e.target.value })}
                            required={singleRecipientSettings.requirePassword}
                            className="flex-1"
                          />
                          <Button type="button" variant="outline" onClick={() => generateSecurePassword()}>
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Click the refresh button to generate a secure random password. Use the eye icon to view the password.
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Link Type for Multi-Recipient */}
              {formData.multiRecipient && (
                <div>
                  <Label className="text-base font-medium">Link Type</Label>
                  <RadioGroup
                    value={formData.linkType}
                    onValueChange={(value) => setFormData({ ...formData, linkType: value })}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard-multi" />
                      <Label htmlFor="standard-multi" className="flex items-center gap-2 cursor-pointer">
                        <Link2 className="w-4 h-4" />
                        Standard links (more secure)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="shorter" id="shorter-multi" />
                      <Label htmlFor="shorter-multi" className="flex items-center gap-2 cursor-pointer">
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
              )}

                </CollapsibleContent>
              </Collapsible>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={isLoading}>
                {isLoading ? "Creating Secure Links..." : formData.multiRecipient ? "Create Secure Links" : "Create Secure Link"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
