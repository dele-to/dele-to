"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { PasswordInput } from "@/components/password-input"
import {
  Bitcoin,
  Check,
  Code2,
  Copy,
  CreditCard,
  Eye,
  EyeOff,
  FileText,
  KeyRound,
  Landmark,
  StickyNote,
  Terminal,
  Wifi,
} from "lucide-react"

export type TemplateId =
  | "plain"
  | "login"
  | "credit_card"
  | "api_key"
  | "ssh_key"
  | "wifi"
  | "bank"
  | "crypto_wallet"
  | "secure_note"

interface TemplateField {
  key: string
  label: string
  placeholder?: string
  type?: "text" | "password" | "textarea" | "select"
  options?: string[]
  mono?: boolean
  maxLength?: number
  inputMode?: "text" | "numeric" | "tel" | "email" | "url"
  validate?: (value: string) => string | null
  format?: (value: string) => string
}

interface TemplateDef {
  id: TemplateId
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  fields: TemplateField[]
}

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "")
  const parts: string[] = []
  for (let index = 0; index < digits.length; index += 4) parts.push(digits.slice(index, index + 4))
  return parts.join(" ").slice(0, 19)
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "")
  if (!digits) return ""
  if (digits.length === 1) return parseInt(digits, 10) > 1 ? `0${digits}/` : digits
  if (digits.length === 2) return parseInt(digits, 10) > 12 ? `0${digits[0]}/` : `${digits}/`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`
}

function validateExpiry(value: string): string | null {
  if (!value) return null
  const match = value.match(/^(\d{2})\/(\d{2})$/)
  if (!match) return "Format: MM/YY"
  const month = parseInt(match[1], 10)
  return month < 1 || month > 12 ? "Invalid month (01-12)" : null
}

function validateCVV(value: string): string | null {
  return value && !/^\d{3,4}$/.test(value) ? "3 or 4 digits" : null
}

function validateURL(value: string): string | null {
  if (!value) return null
  try {
    new URL(value)
    return null
  } catch {
    return "Invalid URL"
  }
}

export const TEMPLATES: TemplateDef[] = [
  {
    id: "plain",
    label: "Plain Text",
    description: "Free-form secret content",
    icon: FileText,
    fields: [],
  },
  {
    id: "login",
    label: "Login / Password",
    description: "Service, username, and password",
    icon: KeyRound,
    fields: [
      { key: "service", label: "Service / Website", placeholder: "e.g., GitHub, Gmail" },
      { key: "url", label: "URL", placeholder: "https://example.com", inputMode: "url", validate: validateURL },
      { key: "username", label: "Username / Email", placeholder: "you@example.com", inputMode: "email" },
      { key: "password", label: "Password", type: "password" },
      { key: "mfa", label: "2FA Backup Code (optional)", placeholder: "123456", inputMode: "numeric", maxLength: 8 },
      { key: "notes", label: "Notes (optional)", type: "textarea" },
    ],
  },
  {
    id: "credit_card",
    label: "Credit Card",
    description: "Card details",
    icon: CreditCard,
    fields: [
      { key: "cardholder", label: "Cardholder Name", placeholder: "John Doe" },
      { key: "number", label: "Card Number", placeholder: "4242 4242 4242 4242", mono: true, inputMode: "numeric", maxLength: 19, format: formatCardNumber },
      { key: "expiry", label: "Expiry (MM/YY)", placeholder: "12/29", inputMode: "numeric", maxLength: 5, format: formatExpiry, validate: validateExpiry },
      { key: "cvv", label: "CVV / CVC", type: "password", placeholder: "123", inputMode: "numeric", maxLength: 4, validate: validateCVV },
      { key: "zip", label: "Billing ZIP (optional)", placeholder: "10001", inputMode: "numeric", maxLength: 10 },
      { key: "notes", label: "Notes (optional)", type: "textarea" },
    ],
  },
  {
    id: "api_key",
    label: "API Key",
    description: "Service credential with optional secret",
    icon: Code2,
    fields: [
      { key: "service", label: "Service", placeholder: "e.g., Stripe, OpenAI" },
      { key: "environment", label: "Environment", type: "select", options: ["production", "staging", "development", "test"] },
      { key: "key", label: "API Key / Token", type: "password", mono: true },
      { key: "secret", label: "API Secret (optional)", type: "password", mono: true },
      { key: "notes", label: "Notes (optional)", type: "textarea" },
    ],
  },
  {
    id: "ssh_key",
    label: "SSH Key",
    description: "Private key with optional passphrase",
    icon: Terminal,
    fields: [
      { key: "host", label: "Host (optional)", placeholder: "git@github.com or 10.0.0.1" },
      { key: "username", label: "Username (optional)", placeholder: "ubuntu" },
      { key: "keyType", label: "Key Type", type: "select", options: ["ed25519", "rsa", "ecdsa", "dsa"] },
      { key: "privateKey", label: "Private Key", type: "textarea", placeholder: "-----BEGIN OPENSSH PRIVATE KEY-----\n...\n-----END OPENSSH PRIVATE KEY-----", mono: true },
      { key: "passphrase", label: "Passphrase (optional)", type: "password" },
    ],
  },
  {
    id: "wifi",
    label: "Wi-Fi",
    description: "Network credentials",
    icon: Wifi,
    fields: [
      { key: "ssid", label: "Network Name (SSID)", placeholder: "MyHomeWiFi" },
      { key: "password", label: "Password", type: "password" },
      { key: "security", label: "Security", type: "select", options: ["WPA3", "WPA2", "WPA", "WEP", "Open"] },
      { key: "notes", label: "Notes (optional)", type: "textarea" },
    ],
  },
  {
    id: "bank",
    label: "Bank Account",
    description: "Account and routing details",
    icon: Landmark,
    fields: [
      { key: "bank", label: "Bank Name", placeholder: "e.g., Chase, Revolut" },
      { key: "holder", label: "Account Holder", placeholder: "John Doe" },
      { key: "account", label: "Account Number / IBAN", mono: true },
      { key: "routing", label: "Routing / SWIFT / BIC", mono: true },
      { key: "notes", label: "Notes (optional)", type: "textarea" },
    ],
  },
  {
    id: "crypto_wallet",
    label: "Crypto Wallet",
    description: "Seed phrase or private key",
    icon: Bitcoin,
    fields: [
      { key: "network", label: "Network", type: "select", options: ["Bitcoin", "Ethereum", "Solana", "Polygon", "Other"] },
      { key: "address", label: "Wallet Address (optional)", mono: true },
      { key: "seedPhrase", label: "Seed Phrase (12 / 24 words)", type: "textarea", placeholder: "word1 word2 word3 ...", mono: true },
      { key: "privateKey", label: "Private Key (optional)", type: "password", mono: true },
      { key: "notes", label: "Notes (optional)", type: "textarea" },
    ],
  },
  {
    id: "secure_note",
    label: "Secure Note",
    description: "Titled note",
    icon: StickyNote,
    fields: [
      { key: "noteTitle", label: "Note Title", placeholder: "e.g., Safe combination" },
      { key: "body", label: "Content", type: "textarea" },
    ],
  },
]

function prettyLabel(field: TemplateField): string {
  return field.label.replace(/\s*\(optional\)\s*$/i, "").trim()
}

export function serializeTemplate(templateId: TemplateId, values: Record<string, string>): string {
  const template = TEMPLATES.find((item) => item.id === templateId)
  if (!template || template.id === "plain") return values._plain || ""

  const lines: string[] = []
  for (const field of template.fields) {
    const value = (values[field.key] || "").trim()
    if (!value) continue
    if (field.type === "textarea" || value.includes("\n")) {
      lines.push(`${prettyLabel(field)}:`, value, "")
    } else {
      lines.push(`${prettyLabel(field)}: ${value}`)
    }
  }
  return lines.length ? [`[${template.label}]`, ...lines].join("\n").trim() : ""
}

interface SecretTemplatesProps {
  templateId: TemplateId
  onTemplateChange: (id: TemplateId) => void
  content: string
  onContentChange: (content: string) => void
}

export function SecretTemplates({ templateId, onTemplateChange, content, onContentChange }: SecretTemplatesProps) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const template = TEMPLATES.find((item) => item.id === templateId) || TEMPLATES[0]

  useEffect(() => {
    if (template.id === "plain" && (values._plain || "") !== content) {
      setValues((current) => ({ ...current, _plain: content }))
    }
  }, [content, template.id, values._plain])

  const updateField = (key: string, value: string, field?: TemplateField) => {
    const formatted = field?.format ? field.format(value) : value
    const next = { ...values, [key]: formatted }
    setValues(next)

    if (field?.validate) {
      const error = field.validate(formatted)
      setErrors((current) => {
        const updated = { ...current }
        if (error) updated[key] = error
        else delete updated[key]
        return updated
      })
    }

    onContentChange(template.id === "plain" ? formatted : serializeTemplate(template.id, next))
  }

  const switchTemplate = (id: TemplateId) => {
    onTemplateChange(id)
    setErrors({})
    onContentChange(id === "plain" ? values._plain || "" : serializeTemplate(id, values))
  }

  const Icon = template.icon

  return (
    <div className="space-y-3 p-4 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Label className="text-base font-medium">Secret Content *</Label>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs px-2 py-1">NEW</Badge>
          <div className="min-w-[200px]">
            <Select value={templateId} onValueChange={(value) => switchTemplate(value as TemplateId)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {TEMPLATES.map((item) => {
                  const TemplateIcon = item.icon
                  return (
                    <SelectItem key={item.id} value={item.id}>
                      <div className="flex items-center gap-2">
                        <TemplateIcon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 flex items-center gap-1">
        <Icon className="w-3.5 h-3.5" /> {template.description}
      </p>

      {template.id === "plain" ? (
        <Textarea
          id="content"
          placeholder="Enter your password, API key, or sensitive information here..."
          value={content}
          onChange={(event) => updateField("_plain", event.target.value)}
          required
          rows={8}
          autoFocus
        />
      ) : (
        <div className="space-y-3">
          {template.fields.map((field) => {
            const value = values[field.key] || ""
            const error = errors[field.key]
            return (
              <div key={field.key}>
                <Label htmlFor={`tpl-${field.key}`} className="text-sm">{field.label}</Label>
                {field.type === "textarea" ? (
                  <Textarea
                    id={`tpl-${field.key}`}
                    value={value}
                    placeholder={field.placeholder}
                    onChange={(event) => updateField(field.key, event.target.value, field)}
                    maxLength={field.maxLength}
                    inputMode={field.inputMode}
                    rows={field.key === "privateKey" || field.key === "seedPhrase" ? 5 : 3}
                    className={field.mono ? "font-mono text-xs" : undefined}
                  />
                ) : field.type === "select" ? (
                  <Select value={value} onValueChange={(selected) => updateField(field.key, selected, field)}>
                    <SelectTrigger id={`tpl-${field.key}`}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent>
                      {(field.options || []).map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                    </SelectContent>
                  </Select>
                ) : field.type === "password" ? (
                  <>
                    <PasswordInput
                      id={`tpl-${field.key}`}
                      value={value}
                      placeholder={field.placeholder}
                      onChange={(event) => updateField(field.key, event.target.value, field)}
                      className={field.mono ? "font-mono" : undefined}
                      maxLength={field.maxLength}
                      inputMode={field.inputMode}
                    />
                    {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
                  </>
                ) : (
                  <>
                    <Input
                      id={`tpl-${field.key}`}
                      value={value}
                      placeholder={field.placeholder}
                      onChange={(event) => updateField(field.key, event.target.value, field)}
                      maxLength={field.maxLength}
                      inputMode={field.inputMode}
                      className={field.mono ? "font-mono" : undefined}
                    />
                    {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
                  </>
                )}
              </div>
            )
          })}
          <p className="text-xs text-gray-500">Fields are combined into a single encrypted payload. Empty optional fields are omitted.</p>
        </div>
      )}
    </div>
  )
}

const SENSITIVE_FIELD_KEYS = new Set(["password", "cvv", "key", "secret", "privateKey", "passphrase", "seedPhrase", "mfa"])

export interface ParsedTemplate {
  template: TemplateDef
  values: Record<string, string>
}

export function parseTemplate(content: string): ParsedTemplate | null {
  if (!content) return null
  const trimmed = content.trimStart()
  const firstLine = trimmed.match(/^\[([^\]\n]+)\]\s*\n?/)
  if (!firstLine) return null

  const template = TEMPLATES.find((item) => item.label === firstLine[1].trim() && item.id !== "plain")
  if (!template) return null

  const lines = trimmed.slice(firstLine[0].length).split("\n")
  const fields = new Map(template.fields.map((field) => [prettyLabel(field).toLowerCase(), field]))
  const values: Record<string, string> = {}
  let index = 0

  while (index < lines.length) {
    const match = lines[index].match(/^([^:]+):\s*(.*)$/)
    if (!match) {
      index++
      continue
    }

    const field = fields.get(match[1].trim().toLowerCase())
    if (!field) {
      index++
      continue
    }

    if (match[2]) {
      values[field.key] = match[2]
      index++
      continue
    }

    const buffer: string[] = []
    index++
    while (index < lines.length) {
      const next = lines[index]
      if (!next.trim()) {
        index++
        break
      }
      const nextMatch = next.match(/^([^:]+):\s*(.*)$/)
      if (nextMatch && fields.has(nextMatch[1].trim().toLowerCase())) break
      buffer.push(next)
      index++
    }
    values[field.key] = buffer.join("\n").replace(/\s+$/, "")
  }

  return { template, values }
}

function maskValue(value: string): string {
  if (value.length <= 4) return "•".repeat(value.length)
  return "•".repeat(Math.max(8, value.length - 4)) + value.slice(-4)
}

function FieldRow({ field, value }: { field: TemplateField; value: string }) {
  const sensitive = SENSITIVE_FIELD_KEYS.has(field.key) || field.type === "password"
  const [revealed, setRevealed] = useState(!sensitive)
  const [copied, setCopied] = useState(false)
  const multiline = field.type === "textarea" || value.includes("\n")
  const displayValue = revealed ? value : maskValue(value.split("\n")[0])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="group flex items-start gap-3 px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
      <div className="flex-shrink-0 w-28 pt-0.5">
        <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{prettyLabel(field)}</span>
      </div>
      <div className="flex-1 min-w-0">
        {multiline && revealed ? (
          <pre className={`whitespace-pre-wrap break-all text-sm ${field.mono ? "font-mono text-xs" : ""} text-gray-900 dark:text-gray-100 leading-relaxed`}>{value}</pre>
        ) : (
          <div className={`break-all text-sm ${field.mono || (sensitive && !multiline) ? "font-mono" : ""} text-gray-900 dark:text-gray-100 leading-relaxed`}>
            {displayValue || <span className="text-gray-400">—</span>}
          </div>
        )}
      </div>
      <div className="flex-shrink-0 flex items-center gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
        {sensitive && (
          <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setRevealed((current) => !current)} aria-label={revealed ? "Hide" : "Reveal"}>
            {revealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </Button>
        )}
        <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={copy} aria-label="Copy">
          {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
        </Button>
      </div>
    </div>
  )
}

export function DecryptedTemplateView({ content }: { content: string }) {
  const [copiedAll, setCopiedAll] = useState(false)
  const parsed = parseTemplate(content)

  if (!parsed) return <PlainDecryptedView content={content} />

  const { template, values } = parsed
  const Icon = template.icon
  const presentFields = template.fields.filter((field) => (values[field.key] || "").length > 0)

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedAll(true)
      setTimeout(() => setCopiedAll(false), 1500)
    } catch {
      setCopiedAll(false)
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center gap-2 min-w-0">
          <Icon className="w-4 h-4 text-gray-500 flex-shrink-0" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">{template.label}</span>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 flex-shrink-0">Template</Badge>
        </div>
        <Button type="button" variant="ghost" size="sm" className="h-7 gap-1.5 text-xs" onClick={copyAll}>
          {copiedAll ? <><Check className="w-3.5 h-3.5 text-green-600" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy all</>}
        </Button>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {presentFields.map((field) => <FieldRow key={field.key} field={field} value={values[field.key]} />)}
      </div>
    </div>
  )
}

function PlainDecryptedView({ content }: { content: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center gap-2 min-w-0">
          <FileText className="w-4 h-4 text-gray-500 flex-shrink-0" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">Plain Text</span>
        </div>
        <Button type="button" variant="ghost" size="sm" className="h-7 gap-1.5 text-xs" onClick={copy}>
          {copied ? <><Check className="w-3.5 h-3.5 text-green-600" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
        </Button>
      </div>
      <pre className="whitespace-pre-wrap break-all font-mono text-sm text-gray-900 dark:text-gray-100 p-4 leading-relaxed">{content}</pre>
    </div>
  )
}
