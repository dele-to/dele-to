import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Flame, ArrowLeft, Shield, Lock, AlertTriangle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DELE.TO - Alternative to OneTimeSecret',
  description: 'DELE.TO offers true zero-knowledge security as an alternative to OneTimeSecret. Compare client-side vs server-side encryption approaches.',
  openGraph: {
    title: 'DELE.TO - Alternative to OneTimeSecret',
    description: 'True zero-knowledge alternative to OneTimeSecret with client-side encryption and superior privacy protection.',
    images: ['/SEO.png'],
  },
}

const comparisonData = [
  {
    feature: "Client-Side Encryption",
    deleto: true,
    onetimesecret: false,
    details: "DELE.TO encrypts in browser, OneTimeSecret encrypts on server"
  },
  {
    feature: "Zero-Knowledge Architecture",
    deleto: true,
    onetimesecret: false,
    details: "DELE.TO never sees your data, OneTimeSecret processes it server-side"
  },
  {
    feature: "Custom Expiration Times",
    deleto: true,
    onetimesecret: false,
    details: "Requires sign-up to use"
  },
  {
    feature: "View Count Limits",
    deleto: true,
    onetimesecret: false,
    details: "Requires sign-up to use"
  },
  {
    feature: "Password Protection",
    deleto: true,
    onetimesecret: false,
    details: "Requires sign-up to use"
  },
  {
    feature: "Modern UI/UX",
    deleto: true,
    onetimesecret: false,
    details: "DELE.TO has more modern, polished interface"
  },
  {
    feature: "Mobile Responsive",
    deleto: true,
    onetimesecret: "partial",
    details: "DELE.TO fully optimized for mobile"
  },
  {
    feature: "File Sharing",
    deleto: "coming-soon",
    onetimesecret: false,
    details: "Neither currently supports file uploads"
  },
  {
    feature: "API Access",
    deleto: false,
    onetimesecret: true,
    details: "OneTimeSecret offers REST API"
  },
  {
    feature: "Self-Hosted Option",
    deleto: true,
    onetimesecret: true,
    details: "OneTimeSecret available now, DELE.TO coming soon"
  },
  {
    feature: "Open Source",
    deleto: true,
    onetimesecret: true,
    details: "Both are open source projects"
  },
  {
    feature: "Multi-Recipient Sharing",
    deleto: true,
    onetimesecret: false,
    details: "DELE.TO supports sharing to multiple recipients"
  }
]

export default function OneTimeSecretComparison() {
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
              DELE.TO - Alternative to OneTimeSecret
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
                <AlertTriangle className="w-5 h-5" />
                Critical Security Difference
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-800">
                <strong>DELE.TO</strong> encrypts your data in your browser before sending it anywhere (zero-knowledge).
                <strong> OneTimeSecret</strong> receives your plaintext data and encrypts it on their servers.
                This is a fundamental architectural difference that affects your privacy and security.
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
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Lock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>OneTimeSecret</CardTitle>
                    <CardDescription>Established, feature-rich solution</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-600">Enterprise</Badge>
                    <Badge variant="outline">API Access</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    A mature solution with enterprise features including API access, custom domains, 
                    and compliance support. Encrypts data on the server after receiving it.
                  </p>
                  <div className="pt-2">
                    <Button variant="outline" asChild>
                      <a href="https://onetimesecret.com" target="_blank" rel="noopener noreferrer">
                        Visit OneTimeSecret
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
                      <th className="text-center py-3 px-4 font-medium">OneTimeSecret</th>
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
                          {item.onetimesecret === true ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : item.onetimesecret === false ? (
                            <X className="w-5 h-5 text-red-500 mx-auto" />
                          ) : (
                            <span className="text-sm text-yellow-600">{item.onetimesecret}</span>
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
                  <h4 className="font-semibold text-lg text-blue-600">OneTimeSecret: Server-Side</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full text-white text-xs flex items-center justify-center font-bold">1</div>
                      <div>
                        <p className="font-medium">Data sent to server</p>
                        <p className="text-sm text-gray-600">Plaintext data transmitted over HTTPS</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full text-white text-xs flex items-center justify-center font-bold">2</div>
                      <div>
                        <p className="font-medium">Server encrypts with passphrase</p>
                        <p className="text-sm text-gray-600">Encryption happens on OneTimeSecret's servers</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full text-white text-xs flex items-center justify-center font-bold">3</div>
                      <div>
                        <p className="font-medium">Bcrypt hash stored</p>
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
                    <span>Share text-based secrets primarily</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Value built-in security guidance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Choose OneTimeSecret if you:</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Need API access for automation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Want custom domains and branding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Trust server-side encryption</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Need compliance features (SOC2, GDPR)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Have existing enterprise integrations</span>
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
                  The choice between DELE.TO and OneTimeSecret comes down to your security requirements and feature needs:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: '#FDF2F2', borderColor: '#D2461E', borderWidth: '1px' }}>
                    <h4 className="font-semibold mb-2" style={{ color: '#8B1A00' }}>For Maximum Security</h4>
                    <p className="text-sm" style={{ color: '#B91C1C' }}>
                      Choose DELE.TO if privacy is your top priority. Zero-knowledge architecture means your data is never exposed to the server.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold mb-2 text-blue-900">For Enterprise Features</h4>
                    <p className="text-sm text-blue-800">
                      Choose OneTimeSecret if you need API access, custom domains, or don't mind server-side encryption.
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
