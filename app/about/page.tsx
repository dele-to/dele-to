import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Eye, Server, Key, ArrowLeft, Shield } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
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

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Zero-Knowledge Security Architecture</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Understanding the advanced security and encryption behind DELE.TO
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <Lock className="w-8 h-8 mb-2 text-orange-600 dark:text-orange-400" />
                <CardTitle>Client-Side AES-256-GCM</CardTitle>
                <CardDescription>Military-grade encryption happens entirely in your browser</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  We use the Web Crypto API to generate AES-256-GCM encryption keys and encrypt your data locally. The
                  encryption key never leaves your device and is embedded in the URL fragment.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Key className="w-8 h-8 mb-2 text-orange-600 dark:text-orange-400" />
                <CardTitle>URL Fragment Key Storage</CardTitle>
                <CardDescription>Encryption keys are never sent to our servers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  The decryption key is stored in the URL fragment (after #) which is never transmitted to servers. This
                  ensures true zero-knowledge architecture where we cannot access your data.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Server className="w-8 h-8 mb-2 text-orange-600 dark:text-orange-400" />
                <CardTitle>Redis Storage with TTL</CardTitle>
                <CardDescription>Encrypted data stored in Redis with automatic expiration</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Only encrypted data is stored in Upstash Redis with automatic TTL expiration. No encryption keys,
                  metadata, or plaintext data is ever stored on our servers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Eye className="w-8 h-8 mb-2 text-orange-600 dark:text-orange-400" />
                <CardTitle>View-Based Auto-Destruction</CardTitle>
                <CardDescription>Automatic deletion after maximum views reached</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Set view limits from 1-10. Once the maximum number of views is reached, the encrypted data is
                  immediately deleted from Redis with no recovery possible.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Technical Security Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">AES-256-GCM Encryption</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  We use AES-256-GCM (Galois/Counter Mode) which provides both encryption and authentication. Each
                  encryption uses a unique 96-bit initialization vector (IV) for maximum security.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Web Crypto API</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  All cryptographic operations use the browser's native Web Crypto API, which provides
                  hardware-accelerated, secure random number generation and encryption.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Zero Server-Side Key Access</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Encryption keys are generated client-side and embedded in URL fragments. Since fragments are never
                  sent to servers, we have zero access to decryption keys.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Automatic TTL Expiration</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Redis automatically expires and deletes encrypted data based on TTL. No manual cleanup or maintenance
                  required.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Security Flow Diagram</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 text-white rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#D2461E' }}>
                      1
                    </div>
                    <div className="flex-1">
                      <strong>Client generates AES-256 key</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Web Crypto API generates cryptographically secure key</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 text-white rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#D2461E' }}>
                      2
                    </div>
                    <div className="flex-1">
                      <strong>Data encrypted client-side</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-300">AES-256-GCM encryption with unique IV</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 text-white rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#D2461E' }}>
                      3
                    </div>
                    <div className="flex-1">
                      <strong>Encrypted data sent to Redis</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Only ciphertext and IV stored, never the key</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 text-white rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#D2461E' }}>
                      4
                    </div>
                    <div className="flex-1">
                      <strong>Key embedded in URL fragment</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Fragment (#) never sent to server</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 text-white rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#D2461E' }}>
                      5
                    </div>
                    <div className="flex-1">
                      <strong>Client-side decryption</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Recipient's browser decrypts using key from URL</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Use HTTPS Always</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Always share links over HTTPS to prevent man-in-the-middle attacks on the encrypted data.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Short Expiration Times</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Use the shortest reasonable expiration time to minimize the window of exposure.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Single-Use Links</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Set max views to 1 for maximum security, especially for highly sensitive credentials.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Share Complete URLs</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Ensure the complete URL including the fragment (#) is shared - without it, decryption is impossible.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <Link href="/create">
              <Button size="lg" style={{ backgroundColor: '#D2461E' }} className="hover:opacity-90 text-white">
                Start Sharing Securely
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
