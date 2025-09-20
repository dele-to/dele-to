import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Flame, ArrowLeft, Shield, Lock } from "lucide-react"
import Link from "next/link"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DELE.TO - Alternative to PasswordPusher',
  description: 'DELE.TO offers true zero-knowledge security as an alternative to PasswordPusher. Client-side encryption, password protection, and modern UI.',
  openGraph: {
    title: 'DELE.TO - Alternative to PasswordPusher',
    description: 'True zero-knowledge alternative to PasswordPusher with client-side encryption and superior privacy protection.',
    images: ['/SEO.png'],
  },
}

const comparisonData = [
  {
    feature: "Client-Side Encryption",
    deleto: true,
    passwordpusher: false,
    details: "DELE.TO encrypts in browser, PasswordPusher encrypts on server"
  },
  {
    feature: "Zero-Knowledge Architecture",
    deleto: true,
    passwordpusher: false,
    details: "DELE.TO never sees your data, PasswordPusher processes it server-side"
  },
  {
    feature: "Custom Expiration Times",
    deleto: true,
    passwordpusher: true,
    details: "Both offer flexible expiration settings"
  },
  {
    feature: "View Count Limits",
    deleto: true,
    passwordpusher: true,
    details: "Burn-after-reading functionality in both"
  },
  {
    feature: "Password Protection",
    deleto: true,
    passwordpusher: true,
    details: "DELE.TO adds optional password layer"
  },
  {
    feature: "Modern UI/UX",
    deleto: true,
    passwordpusher: false,
    details: "DELE.TO has more modern, polished interface"
  },
  {
    feature: "Mobile Responsive",
    deleto: true,
    passwordpusher: "partial",
    details: "DELE.TO fully optimized for mobile"
  },
  {
    feature: "File Sharing",
    deleto: "coming-soon",
    passwordpusher: true,
    details: "PasswordPusher supports file uploads, DELE.TO coming soon"
  },
  {
    feature: "URL Sharing",
    deleto: "coming-soon",
    passwordpusher: true,
    details: "PasswordPusher can share URLs securely, DELE.TO coming soon"
  },
  {
    feature: "Self-Hosted Option",
    deleto: true,
    passwordpusher: true,
    details: "PasswordPusher available now, DELE.TO coming soon"
  },
  {
    feature: "Open Source",
    deleto: true,
    passwordpusher: true,
    details: "Both are open source projects"
  },
  {
    feature: "Multi-Recipient Sharing",
    deleto: true,
    passwordpusher: false,
    details: "DELE.TO supports sharing to multiple recipients"
  },
  {
    feature: "API Access",
    deleto: false,
    passwordpusher: true,
    details: "PasswordPusher offers REST API"
  }
]

export default function PasswordPusherComparison() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              DELE.TO - Alternative to PasswordPusher
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comparing client-side vs server-side encryption approaches. Both are popular,
              but they handle your data very differently.
            </p>
          </div>

          {/* Security Alert */}
          <Card className="mb-8 border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900">
                <Shield className="w-5 h-5" />
                Key Security Difference
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-800">
                <strong>DELE.TO</strong> encrypts your data in your browser before sending it anywhere (zero-knowledge).
                <strong> PasswordPusher</strong> receives your plaintext data and encrypts it on their servers.
                This is a fundamental architectural difference that affects your privacy.
              </p>
            </CardContent>
          </Card>

          {/* Quick Overview */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-full" style={{ backgroundColor: '#D2461E' }}>
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>DELE.TO</CardTitle>
                    <CardDescription>Zero-knowledge, client-side encryption</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge style={{ backgroundColor: '#D2461E' }} className="text-white">Zero-Knowledge</Badge>
                    <Badge variant="outline">Client-Side</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Your data is encrypted in your browser using AES-256-GCM before it ever leaves your device.
                    The server never sees your plaintext data or encryption keys.
                  </p>
                  <div className="pt-2">
                    <Link href="/create">
                      <Button style={{ backgroundColor: '#D2461E' }} className="text-white hover:opacity-90">
                        Try DELE.TO
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Lock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle>PasswordPusher</CardTitle>
                    <CardDescription>Feature-rich, server-side encryption</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-purple-600">Feature Rich</Badge>
                    <Badge variant="outline">API Access</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    A mature solution with extensive features including file sharing, URL sharing, and API access.
                    Encrypts data on the server after receiving it.
                  </p>
                  <div className="pt-2">
                    <Button variant="outline" asChild>
                      <a href="https://pwpush.com" target="_blank" rel="noopener noreferrer">
                        Visit PasswordPusher
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Comparison Table */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Feature Comparison</CardTitle>
              <CardDescription>
                Side-by-side comparison of key features and capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Feature</th>
                      <th className="text-center py-3 px-4 font-medium">DELE.TO</th>
                      <th className="text-center py-3 px-4 font-medium">PasswordPusher</th>
                      <th className="text-left py-3 px-4 font-medium">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="py-3 px-4 font-medium">{item.feature}</td>
                        <td className="py-3 px-4 text-center">
                          {item.deleto === true ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : item.deleto === false ? (
                            <X className="w-5 h-5 text-red-500 mx-auto" />
                          ) : item.deleto === "coming-soon" ? (
                            <span className="text-sm text-amber-600 font-medium">Soon</span>
                          ) : (
                            <span className="text-sm text-yellow-600">{item.deleto}</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {item.passwordpusher === true ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : item.passwordpusher === false ? (
                            <X className="w-5 h-5 text-red-500 mx-auto" />
                          ) : (
                            <span className="text-sm text-yellow-600">{item.passwordpusher}</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{item.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Security Deep Dive */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Security Architecture Comparison</CardTitle>
              <CardDescription>
                Understanding the fundamental security differences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg" style={{ color: '#D2461E' }}>DELE.TO: Zero-Knowledge</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-bold" style={{ backgroundColor: '#D2461E' }}>1</div>
                      <div>
                        <p className="font-medium">Browser generates AES-256 key</p>
                        <p className="text-sm text-gray-600">Cryptographically secure key generation</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-bold" style={{ backgroundColor: '#D2461E' }}>2</div>
                      <div>
                        <p className="font-medium">Data encrypted client-side</p>
                        <p className="text-sm text-gray-600">Your data never leaves your device unencrypted</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-bold" style={{ backgroundColor: '#D2461E' }}>3</div>
                      <div>
                        <p className="font-medium">Key stays in URL fragment</p>
                        <p className="text-sm text-gray-600">Server never receives the encryption key</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg text-purple-600">PasswordPusher: Server-Side</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-600 rounded-full text-white text-xs flex items-center justify-center font-bold">1</div>
                      <div>
                        <p className="font-medium">Data sent to server</p>
                        <p className="text-sm text-gray-600">Plaintext data transmitted over HTTPS</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-600 rounded-full text-white text-xs flex items-center justify-center font-bold">2</div>
                      <div>
                        <p className="font-medium">Server encrypts data</p>
                        <p className="text-sm text-gray-600">Encryption happens on PasswordPusher's servers</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-600 rounded-full text-white text-xs flex items-center justify-center font-bold">3</div>
                      <div>
                        <p className="font-medium">Encrypted data stored</p>
                        <p className="text-sm text-gray-600">Server has temporary access to plaintext</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Use Cases */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle style={{ color: '#D2461E' }}>Choose DELE.TO if you:</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Need maximum privacy (zero-knowledge)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Want client-side encryption</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Prefer modern, mobile-friendly UI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Need optional password protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Share text-based secrets (file sharing coming soon)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-purple-600">Choose PasswordPusher if you:</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Need file and URL sharing capabilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Want API access for automation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Trust server-side encryption</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Need extensive feature set</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Have existing integrations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Final Recommendation */}
          <Card>
            <CardHeader>
              <CardTitle>Our Recommendation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  The choice between DELE.TO and PasswordPusher comes down to your security requirements and feature needs:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: '#FDF2F2', borderColor: '#D2461E', borderWidth: '1px' }}>
                    <h4 className="font-semibold mb-2" style={{ color: '#8B1A00' }}>For Maximum Security</h4>
                    <p className="text-sm" style={{ color: '#B91C1C' }}>
                      Choose DELE.TO if privacy is your top priority. Zero-knowledge architecture with file sharing coming soon.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-semibold mb-2 text-purple-900">For Rich Features</h4>
                    <p className="text-sm text-purple-800">
                      Choose PasswordPusher if you need file sharing, API access, or don't mind server-side encryption.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <Link href="/create">
              <Button size="lg" style={{ backgroundColor: '#D2461E' }} className="text-white hover:opacity-90">
                Experience Zero-Knowledge Security
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}