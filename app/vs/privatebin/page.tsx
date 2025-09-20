import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Flame, ArrowLeft, Shield, Lock, Code } from "lucide-react"
import Link from "next/link"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DELE.TO - Alternative to PrivateBin',
  description: 'DELE.TO offers modern zero-knowledge security as an alternative to PrivateBin. Compare client-side encryption, password protection, and user experience.',
  openGraph: {
    title: 'DELE.TO - Alternative to PrivateBin',
    description: 'Modern alternative to PrivateBin with zero-knowledge encryption, password protection, and superior user experience.',
    images: ['/SEO.png'],
  },
}

const comparisonData = [
  {
    feature: "Client-Side Encryption",
    deleto: true,
    privatebin: true,
    details: "Both use AES-256 encryption in the browser"
  },
  {
    feature: "Zero-Knowledge Architecture",
    deleto: true,
    privatebin: true,
    details: "Neither service can access your data"
  },
  {
    feature: "Custom Expiration Times",
    deleto: true,
    privatebin: true,
    details: "Both offer flexible expiration settings"
  },
  {
    feature: "View Count Limits",
    deleto: true,
    privatebin: true,
    details: "Burn-after-reading functionality in both"
  },
  {
    feature: "Password Protection",
    deleto: true,
    privatebin: true,
    details: "Both offer optional password protection"
  },
  {
    feature: "Modern UI/UX",
    deleto: true,
    privatebin: false,
    details: "DELE.TO has more modern, polished interface"
  },
  {
    feature: "Mobile Responsive",
    deleto: true,
    privatebin: "partial",
    details: "DELE.TO fully optimized for mobile"
  },
  {
    feature: "File Sharing",
    deleto: "coming-soon",
    privatebin: true,
    details: "PrivateBin supports file uploads, DELE.TO coming soon"
  },
  {
    feature: "Syntax Highlighting",
    deleto: false,
    privatebin: true,
    details: "PrivateBin offers code syntax highlighting"
  },
  {
    feature: "Self-Hosted Option",
    deleto: true,
    privatebin: true,
    details: "PrivateBin available now, DELE.TO coming soon"
  },
  {
    feature: "Open Source",
    deleto: true,
    privatebin: true,
    details: "Both are open source projects"
  },
  {
    feature: "Multi-Recipient Sharing",
    deleto: true,
    privatebin: false,
    details: "DELE.TO supports sharing to multiple recipients"
  },
  {
    feature: "Discussion Feature",
    deleto: false,
    privatebin: true,
    details: "PrivateBin allows comments on pastes"
  }
]

export default function PrivateBinComparison() {
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
              DELE.TO - Alternative to PrivateBin
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comparing two zero-knowledge secure sharing solutions. Both offer client-side encryption, 
              but they serve different use cases and audiences.
            </p>
          </div>

          {/* Security Alert */}
          <Card className="mb-8 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-900">
                <Shield className="w-5 h-5" />
                Both Are Zero-Knowledge Secure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-800">
                Both <strong>DELE.TO</strong> and <strong>PrivateBin</strong> use client-side encryption with zero-knowledge architecture.
                Your data is encrypted in your browser before being sent to the server, ensuring maximum privacy.
                The choice comes down to features, user experience, and intended use case.
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
                    <CardDescription>Modern, user-focused secret sharing</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge style={{ backgroundColor: '#D2461E' }} className="text-white">Modern UI</Badge>
                    <Badge variant="outline">Password Protection</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Built with Next.js 14, featuring a polished interface, optional password protection, 
                    and mobile-first design. Perfect for sharing credentials and sensitive text.
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
                  <div className="p-2 bg-gray-100 rounded-full">
                    <Code className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <CardTitle>PrivateBin</CardTitle>
                    <CardDescription>Developer-focused pastebin</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gray-600">Code Sharing</Badge>
                    <Badge variant="outline">Self-Hosted</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    A minimalist, open-source pastebin with syntax highlighting, file sharing, 
                    and discussion features. Great for developers and code sharing.
                  </p>
                  <div className="pt-2">
                    <Button variant="outline" asChild>
                      <a href="https://privatebin.info" target="_blank" rel="noopener noreferrer">
                        Visit PrivateBin
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
                      <th className="text-center py-3 px-4 font-medium">PrivateBin</th>
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
                          {item.privatebin === true ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : item.privatebin === false ? (
                            <X className="w-5 h-5 text-red-500 mx-auto" />
                          ) : (
                            <span className="text-sm text-yellow-600">{item.privatebin}</span>
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
                Both platforms offer excellent zero-knowledge security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg" style={{ color: '#D2461E' }}>DELE.TO: Modern Zero-Knowledge</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-bold" style={{ backgroundColor: '#D2461E' }}>1</div>
                      <div>
                        <p className="font-medium">Browser generates AES-256-GCM key</p>
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
                  <h4 className="font-semibold text-lg text-gray-600">PrivateBin: Proven Zero-Knowledge</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gray-600 rounded-full text-white text-xs flex items-center justify-center font-bold">1</div>
                      <div>
                        <p className="font-medium">AES-256 client-side encryption</p>
                        <p className="text-sm text-gray-600">Established encryption in browser</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gray-600 rounded-full text-white text-xs flex items-center justify-center font-bold">2</div>
                      <div>
                        <p className="font-medium">Zero-knowledge architecture</p>
                        <p className="text-sm text-gray-600">Server cannot access plaintext data</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gray-600 rounded-full text-white text-xs flex items-center justify-center font-bold">3</div>
                      <div>
                        <p className="font-medium">Open-source transparency</p>
                        <p className="text-sm text-gray-600">Code auditable and self-hostable</p>
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
                    <span>Want a modern, polished user interface</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Share passwords and credentials primarily</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Value mobile-first design and UX</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Need built-in security guidance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Prefer hosted solutions over self-hosting</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-gray-600">Choose PrivateBin if you:</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Share code snippets with syntax highlighting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Need file sharing capabilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Want discussion/comment features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Prefer self-hosted solutions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Value open-source transparency</span>
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
                  Both DELE.TO and PrivateBin are excellent zero-knowledge solutions. Your choice depends on your primary use case:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: '#FDF2F2', borderColor: '#D2461E', borderWidth: '1px' }}>
                    <h4 className="font-semibold mb-2" style={{ color: '#8B1A00' }}>For Password Sharing</h4>
                    <p className="text-sm" style={{ color: '#B91C1C' }}>
                      Choose DELE.TO for its modern interface, mobile optimization, and focus on secure credential sharing.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold mb-2 text-gray-900">For Code & File Sharing</h4>
                    <p className="text-sm text-gray-800">
                      Choose PrivateBin if you need syntax highlighting, file sharing.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <Link href="/create">
              <Button size="lg" style={{ backgroundColor: '#D2461E' }} className="text-white hover:opacity-90">
                Try DELE.TO for Secure Sharing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
