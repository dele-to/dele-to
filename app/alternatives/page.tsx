import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Flame, ArrowLeft, Shield, Lock, Zap } from "lucide-react"
import Link from "next/link"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DELE.TO - Alternative to Yopass, PasswordPusher & More',
  description: 'DELE.TO is the modern alternative to Yopass and PasswordPusher. Zero-knowledge encryption, password protection, and superior UX.',
  openGraph: {
    title: 'DELE.TO - Alternative to Popular Password Sharing Tools',
    description: 'Modern alternative to Yopass, PasswordPusher, and other password sharing tools with zero-knowledge security.',
    images: ['/SEO.png'],
  },
}

const alternatives = [
  {
    name: "DELE.TO",
    description: "Modern zero-knowledge password sharing with client-side encryption",
    icon: Flame,
    color: "#D2461E",
    features: ["Zero-knowledge", "Client-side encryption", "Password protection", "Modern UI", "Mobile-first"],
    pricing: "Free",
    security: "Excellent",
    usability: "Excellent",
    openSource: "coming-soon",
    selfHosted: "coming-soon",
    pros: ["True zero-knowledge architecture", "Modern, intuitive interface", "Optional password protection", "Mobile optimized"],
    cons: ["File sharing coming soon", "Open source coming soon"],
    bestFor: "Teams prioritizing privacy and user experience"
  },
  {
    name: "Yopass",
    description: "Established secure sharing with file support",
    icon: Shield,
    color: "#2563eb",
    features: ["Client-side encryption", "File sharing", "Open source", "Self-hosted", "Established"],
    pricing: "Free",
    security: "Excellent",
    usability: "Good",
    openSource: true,
    selfHosted: true,
    pros: ["File sharing support", "Proven track record", "Active development", "Multiple deployment options"],
    cons: ["Basic UI", "No password protection", "Limited mobile optimization"],
    bestFor: "Users needing file sharing with passwords"
  },
  {
    name: "PasswordPusher",
    description: "Feature-rich sharing with API access",
    icon: Lock,
    color: "#7c3aed",
    features: ["Server-side encryption", "File sharing", "API access", "URL sharing", "Extensive features"],
    pricing: "Free / Paid",
    security: "Good",
    usability: "Good",
    openSource: true,
    selfHosted: true,
    pros: ["Rich feature set", "API access", "File and URL sharing", "Good documentation"],
    cons: ["Server-side encryption", "Not zero-knowledge", "Complex interface"],
    bestFor: "Organizations needing API integration and file sharing"
  },


]

const comparisonMatrix = [
  { feature: "Zero-Knowledge", deleto: true, yopass: true, passwordpusher: false },
  { feature: "Client-Side Encryption", deleto: true, yopass: true, passwordpusher: false },
  { feature: "Password Protection", deleto: true, yopass: false, passwordpusher: false },
  { feature: "File Sharing", deleto: "coming-soon", yopass: true, passwordpusher: true },
  { feature: "API Access", deleto: false, yopass: false, passwordpusher: true },
  { feature: "Self-Hosted", deleto: "coming-soon", yopass: true, passwordpusher: true },
  { feature: "Open Source", deleto: "coming-soon", yopass: true, passwordpusher: true },
  { feature: "Mobile Optimized", deleto: true, yopass: false, passwordpusher: false }
]

export default function AlternativesPage() {
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

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              DELE.TO - Alternative to Popular Password Sharing Tools
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare the top 3 secure password sharing tools. Find the perfect solution
              for your security needs, team size, and technical requirements.
            </p>
          </div>

          {/* Quick Comparison Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {alternatives.map((alt, index) => {
              const IconComponent = alt.icon
              return (
                <Card key={index} className="relative">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-full" style={{ backgroundColor: alt.color }}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {alt.name}
                          {alt.name === "DELE.TO" && (
                            <Badge style={{ backgroundColor: '#D2461E' }} className="text-white text-xs">
                              Recommended
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription>{alt.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-1">
                        {alt.features.slice(0, 3).map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="font-medium">Security:</span>
                          <div className={`text-xs ${alt.security === 'Excellent' ? 'text-green-600' :
                              alt.security === 'Good' ? 'text-blue-600' : 'text-yellow-600'
                            }`}>
                            {alt.security}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium">Usability:</span>
                          <div className={`text-xs ${alt.usability === 'Excellent' ? 'text-green-600' : 'text-blue-600'
                            }`}>
                            {alt.usability}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium">Price:</span>
                          <div className="text-xs text-gray-600">{alt.pricing}</div>
                        </div>
                      </div>

                      <div className="text-xs text-gray-600">
                        <strong>Best for:</strong> {alt.bestFor}
                      </div>

                      {alt.name === "DELE.TO" && (
                        <Link href="/create">
                          <Button size="sm" style={{ backgroundColor: '#D2461E' }} className="w-full text-white hover:opacity-90">
                            Try Now
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Detailed Comparison Matrix */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Feature Comparison Matrix</CardTitle>
              <CardDescription>
                Compare key features across all major secure sharing platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">Feature</th>
                      <th className="text-center py-3 px-2 font-medium">DELE.TO</th>
                      <th className="text-center py-3 px-2 font-medium">Yopass</th>
                      <th className="text-center py-3 px-2 font-medium">PasswordPusher</th>


                    </tr>
                  </thead>
                  <tbody>
                    {comparisonMatrix.map((row, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-2 font-medium">{row.feature}</td>
                        <td className="py-2 px-2 text-center">
                          {row.deleto === true ? (
                            <Check className="w-4 h-4 text-green-600 mx-auto" />
                          ) : row.deleto === false ? (
                            <X className="w-4 h-4 text-red-500 mx-auto" />
                          ) : row.deleto === "coming-soon" ? (
                            <span className="text-xs text-amber-600 font-medium">Soon</span>
                          ) : (
                            <X className="w-4 h-4 text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="py-2 px-2 text-center">
                          {row.yopass ? <Check className="w-4 h-4 text-green-600 mx-auto" /> : <X className="w-4 h-4 text-red-500 mx-auto" />}
                        </td>
                        <td className="py-2 px-2 text-center">
                          {row.passwordpusher ? <Check className="w-4 h-4 text-green-600 mx-auto" /> : <X className="w-4 h-4 text-red-500 mx-auto" />}
                        </td>


                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Use Case Recommendations */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">🏢 For Businesses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Best Choice: DELE.TO</p>
                    <p className="text-sm text-gray-600">Zero-knowledge security with professional UI</p>
                  </div>
                  <div>
                    <p className="font-medium">Alternative: PasswordPusher</p>
                    <p className="text-sm text-gray-600">If you need API access and file sharing</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">👨‍💻 For Developers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Best Choice: PasswordPusher</p>
                    <p className="text-sm text-gray-600">API access and extensive features</p>
                  </div>
                  <div>
                    <p className="font-medium">Alternative: DELE.TO</p>
                    <p className="text-sm text-gray-600">For maximum security and modern tech stack</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-purple-600">👤 For Personal Use</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Best Choice: DELE.TO</p>
                    <p className="text-sm text-gray-600">Perfect balance of security and usability</p>
                  </div>
                  <div>
                    <p className="font-medium">Alternative: Yopass</p>
                    <p className="text-sm text-gray-600">For simple sharing with file support</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Comparison */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Security Model Comparison</CardTitle>
              <CardDescription>
                Understanding how each platform handles your sensitive data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4 text-green-600">Zero-Knowledge (Most Secure)</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-1 rounded-full" style={{ backgroundColor: '#D2461E' }}>
                        <Flame className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">DELE.TO</p>
                        <p className="text-sm text-gray-600">Client-side AES-256-GCM encryption</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-1 bg-blue-600 rounded-full">
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Yopass</p>
                        <p className="text-sm text-gray-600">Client-side AES encryption</p>
                      </div>
                    </div>

                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-yellow-600">Server-Side Encryption</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-1 bg-purple-600 rounded-full">
                        <Lock className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">PasswordPusher</p>
                        <p className="text-sm text-gray-600">Server receives plaintext, then encrypts</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Final Recommendation */}
          <Card>
            <CardHeader>
              <CardTitle>Why Choose DELE.TO?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="p-3 rounded-full mx-auto mb-3 w-fit" style={{ backgroundColor: '#D2461E' }}>
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">Maximum Security</h4>
                  <p className="text-sm text-gray-600">
                    True zero-knowledge architecture with client-side AES-256-GCM encryption
                  </p>
                </div>
                <div className="text-center">
                  <div className="p-3 rounded-full mx-auto mb-3 w-fit" style={{ backgroundColor: '#D2461E' }}>
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">Modern Experience</h4>
                  <p className="text-sm text-gray-600">
                    Built with Next.js 14, featuring a polished, mobile-first interface
                  </p>
                </div>
                <div className="text-center">
                  <div className="p-3 rounded-full mx-auto mb-3 w-fit" style={{ backgroundColor: '#D2461E' }}>
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">Extra Protection</h4>
                  <p className="text-sm text-gray-600">
                    Optional password protection and built-in security guidance
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <Link href="/create">
              <Button size="lg" style={{ backgroundColor: '#D2461E' }} className="text-white hover:opacity-90">
                Try DELE.TO - The Secure Choice
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}