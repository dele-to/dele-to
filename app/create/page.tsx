"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Copy, Check, Shield, ArrowLeft, Key, RefreshCw, AlertTriangle, Link2, QrCode, Plus, Trash2, Users, User, Tag, ChevronDown, Settings, Lock, Info } from "lucide-react"
import Link from "next/link"
import { createSecureShare, deleteSecureShare } from "../actions/share"
import { SecureCrypto } from "../../lib/crypto"
import { securityTips } from "@/components/security-tips"
import { SecretTemplates, type TemplateId } from "@/components/secret-templates"
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
  deleteCapability?: string
  isDeleting?: boolean
  deleted?: boolean
  deleteError?: string
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
  const [isAdvancedSettingsOpen, setIsAdvancedSettingsOpen] = useState(false)
  const [isTitleOpen, setIsTitleOpen] = useState(false)
  const [templateId, setTemplateId] = useState<TemplateId>("plain")
  const [securityTip, setSecurityTip] = useState(securityTips[0])
  const [isSecurityTipOpen, setIsSecurityTipOpen] = useState(false)
  const [isMac, setIsMac] = useState(false)
  const errorRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    setSecurityTip(securityTips[Math.floor(Math.random() * securityTips.length)])
    setIsMac(/Mac|iPod|iPhone|iPad/.test(navigator.platform || navigator.userAgent))
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (error) errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
  }, [error])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        if (!isLoading) formRef.current?.requestSubmit()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isLoading])

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
      const links: GeneratedLink[] = []

      // Create separate shares for each recipient
      for (const recipient of recipientsToProcess) {
        const rootSecret = SecureCrypto.generateRootSecret()
        const { encryptionKey, readCapability } = await SecureCrypto.deriveShareSecrets(rootSecret)
        const { encrypted, iv } = await SecureCrypto.encrypt(formData.content, encryptionKey)
        const result = await createSecureShare({
          title: formData.title,
          encryptedContent: encrypted,
          iv: iv,
          expirationTime: recipient.expirationTime,
          maxViews: recipient.maxViews,
          requirePassword: recipient.requirePassword,
          password: recipient.password,
          linkType: formData.linkType,
          readCapability,
        })

        if (result.success && result.id && result.readCapability) {
          const shareId = result.id
          // Include the root secret in the URL fragment
          const shareUrl = `${window.location.origin}/view/${shareId}#${rootSecret}`
          
          links.push({
            recipientId: recipient.id,
            recipientName: recipient.name,
            shareId,
            shareLink: shareUrl,
            expirationTime: recipient.expirationTime,
            maxViews: recipient.maxViews,
            requirePassword: recipient.requirePassword,
            deleteCapability: result.deleteCapability,
          })
        } else {
          setError(result.error || `Failed to create secure share for ${recipient.name}`)
          return
        }
      }

      setGeneratedLinks(links)

      if (!formData.multiRecipient && links[0]) {
        try {
          await navigator.clipboard.writeText(links[0].shareLink)
          setCopiedLinkId(links[0].recipientId)
          setTimeout(() => setCopiedLinkId(null), 2000)
        } catch {
          setCopiedLinkId(null)
        }
      }
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

  const revokeShare = async (linkIndex: number) => {
    const link = generatedLinks[linkIndex]
    if (!link.deleteCapability || link.isDeleting || link.deleted) return

    setGeneratedLinks((current) => current.map((item, index) =>
      index === linkIndex ? { ...item, isDeleting: true, deleteError: undefined } : item
    ))

    try {
      const result = await deleteSecureShare(link.shareId, link.deleteCapability)
      setGeneratedLinks((current) => current.map((item, index) =>
        index === linkIndex
          ? result.success
            ? { ...item, isDeleting: false, deleted: true, deleteCapability: undefined }
            : { ...item, isDeleting: false, deleteError: result.error || "Failed to delete share" }
          : item
      ))
    } catch (error) {
      setGeneratedLinks((current) => current.map((item, index) =>
        index === linkIndex
          ? { ...item, isDeleting: false, deleteError: error instanceof Error ? error.message : "Failed to delete share" }
          : item
      ))
    }
  }

  const renderRevokeControl = (link: GeneratedLink, linkIndex: number) => {
    if (link.deleted) {
      return (
        <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300">
          <Check className="h-4 w-4" />
          <AlertDescription>This share has been permanently deleted.</AlertDescription>
        </Alert>
      )
    }

    if (!link.deleteCapability) return null

    return (
      <Collapsible className="rounded-md border border-border/70 bg-muted/20">
        <CollapsibleTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-full justify-between text-muted-foreground hover:bg-destructive/5 hover:text-destructive [&[data-state=open]>svg]:rotate-180"
          >
            <span className="flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              Need to revoke this link?
            </span>
            <ChevronDown className="h-4 w-4 transition-transform" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-3 border-t px-3 py-3">
            <p className="text-xs text-muted-foreground">
              Permanently delete the encrypted share now. Anyone with the link will lose access, and this cannot be undone.
            </p>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              disabled={link.isDeleting}
              onClick={() => revokeShare(linkIndex)}
            >
              {link.isDeleting ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-2 h-4 w-4" />
              )}
              {link.isDeleting ? "Deleting..." : "Delete share permanently"}
            </Button>
            {link.deleteError && (
              <Alert variant="destructive" className="py-2">
                <AlertDescription className="text-xs">{link.deleteError}</AlertDescription>
              </Alert>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
  }

  const openQrModal = (link: string, title: string) => {
    setQrModalLink(link)
    setQrModalTitle(title)
    setIsQrModalOpen(true)
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
                    <Card key={link.recipientId} className={link.deleted ? "border-l-4 border-l-green-500 opacity-80" : "border-l-4 border-l-blue-500"}>
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
                            value={link.deleted ? "This share has been deleted" : link.shareLink}
                            readOnly 
                            className="font-mono text-xs" 
                          />
                          <Button 
                            onClick={() => copyToClipboard(link.shareLink, link.recipientId)} 
                            variant="outline"
                            size="sm"
                            disabled={link.deleted}
                          >
                            {copiedLinkId === link.recipientId ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                          <Button 
                            onClick={() => openQrModal(link.shareLink, `${formData.title} - ${link.recipientName}`)} 
                            variant="outline"
                            size="sm"
                            disabled={link.deleted}
                          >
                            <QrCode className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="share-link">Secure Share Link</Label>
                      {copiedLinkId === generatedLinks[0].recipientId && (
                        <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-500">
                          <Check className="w-3 h-3" />
                          Copied to clipboard automatically
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Input 
                        id="share-link" 
                        value={generatedLinks[0].deleted ? "This share has been deleted" : generatedLinks[0].shareLink}
                        readOnly 
                        className="font-mono text-sm" 
                      />
                      <Button
                        onClick={() => copyToClipboard(generatedLinks[0].shareLink, generatedLinks[0].recipientId)}
                        variant="outline"
                        disabled={generatedLinks[0].deleted}
                      >
                        {copiedLinkId === generatedLinks[0].recipientId ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        onClick={() => openQrModal(generatedLinks[0].shareLink, formData.title)}
                        variant="outline"
                        disabled={generatedLinks[0].deleted}
                      >
                        <QrCode className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <Alert>
                <Key className="w-4 h-4" />
                <AlertDescription className="space-y-1">
                  <p>
                    <strong>Security notice:</strong> The root secret is included in the URL fragment (#) and never
                    sent to our servers. Only share each complete link with its intended recipient.
                  </p>
                  <p>
                    Each link expires based on its own settings and can only be decrypted by someone with the complete link.
                  </p>
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                {formData.multiRecipient ? (
                  generatedLinks.map((link, linkIndex) => (
                    <div key={link.recipientId} className="space-y-1">
                      <p className="px-1 text-xs text-muted-foreground">{link.recipientName}</p>
                      {renderRevokeControl(link, linkIndex)}
                    </div>
                  ))
                ) : (
                  renderRevokeControl(generatedLinks[0], 0)
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  type="button"
                  variant="default"
                  onClick={() => {
                    setGeneratedLinks([])
                    setTemplateId("plain")
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
      <Link href="/" className="fixed top-4 left-4 z-50">
        <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
      </Link>
      <div className="container mx-auto max-w-2xl pt-20 pb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
                <Lock className="w-6 h-6 text-red-600 dark:text-red-500" />
              </div>
              <div>
                <CardTitle className="text-2xl">Create Secure Share</CardTitle>
                <CardDescription className="flex items-center gap-1.5">
                  Share sensitive information securely.
                  <Popover open={isSecurityTipOpen} onOpenChange={setIsSecurityTipOpen}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-foreground shrink-0"
                        aria-label="Security tip"
                        onMouseEnter={() => setIsSecurityTipOpen(true)}
                        onMouseLeave={() => setIsSecurityTipOpen(false)}
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="max-w-xs w-auto text-sm"
                      onMouseEnter={() => setIsSecurityTipOpen(true)}
                      onMouseLeave={() => setIsSecurityTipOpen(false)}
                    >
                      <p className="font-medium mb-1">Security Tip: {securityTip.title}</p>
                      <p className="text-muted-foreground">{securityTip.description}</p>
                    </PopoverContent>
                  </Popover>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive" ref={errorRef}>
                  <AlertTriangle className="w-4 h-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <Collapsible open={isTitleOpen} onOpenChange={setIsTitleOpen}>
                <CollapsibleTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="w-full flex items-center justify-between px-0 h-auto text-muted-foreground hover:text-foreground hover:bg-transparent"
                  >
                    <span className="flex items-center gap-1.5 text-sm truncate">
                      <Tag className="w-3.5 h-3.5 shrink-0" />
                      {formData.title || "Add a title (optional)"}
                    </span>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isTitleOpen ? "rotate-180" : ""}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <Label htmlFor="title">Title (Optional)</Label>
                  <Input
                    id="title"
                    autoFocus
                    placeholder="e.g., Database Password, API Key"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </CollapsibleContent>
              </Collapsible>

              <SecretTemplates
                templateId={templateId}
                onTemplateChange={setTemplateId}
                content={formData.content}
                onContentChange={(content) => setFormData((current) => ({ ...current, content }))}
              />

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
                    <p className="text-sm text-gray-600">Encrypt separately and generate unique links for different recipients (max 3)</p>
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
                      <strong>Multi-Recipient Mode:</strong> Your content will be encrypted separately for each recipient, with a unique link and individual expiration and access settings.
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

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white gap-2 relative"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    {formData.multiRecipient ? "Creating Secure Links..." : "Creating Secure Link..."}
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    {formData.multiRecipient ? "Create Secure Links" : "Create Secure Link"}
                    <kbd className="hidden sm:inline-flex items-center gap-0.5 absolute right-3 rounded border border-white/30 bg-white/10 px-1.5 py-0.5 text-[10px] font-medium">
                      {isMac ? "⌘" : "Ctrl"}K
                    </kbd>
                  </>
                )}
              </Button>

              <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <Shield className="w-3.5 h-3.5" />
                End-to-end encrypted. Only recipients can decrypt.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
