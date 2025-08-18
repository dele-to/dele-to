"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, Clock, Lock, Key, Server } from "lucide-react"
import Link from "next/link"
import { SecurityTips } from "@/components/security-tips"
import { FarcasterReady } from "@/components/farcaster-ready"

export default function MiniAppPage() {

    return (
        <>
            <FarcasterReady />
            <div className="min-h-screen">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center mb-16">
                        <div className="flex justify-center mb-6">
                            <div className="p-3 rounded-full" style={{ backgroundColor: '#D2461E' }}>
                                <Flame className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">DELE.TO</h1>
                        <p className="text-sm text-gray-500 italic mb-6">From Latin dēlētō — "erase, destroy."</p>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                            Share sensitive credentials and secrets securely with client-side AES-256 encryption, zero-knowledge
                            architecture, and automatic self-destruction.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link href="/create">
                                <Button size="lg" style={{ backgroundColor: '#D2461E' }} className="hover:opacity-90 text-white">
                                    Share Securely
                                </Button>
                            </Link>
                            <Link href="/about">
                                <Button variant="outline" size="lg">
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto mb-8">
                        <SecurityTips />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <Card>
                            <CardHeader>
                                <div className="p-2 bg-green-100 rounded-lg w-fit">
                                    <Lock className="w-6 h-6 text-green-600" />
                                </div>
                                <CardTitle>Client-Side AES-256</CardTitle>
                                <CardDescription>
                                    Your data is encrypted with AES-256-GCM in your browser before it ever leaves your device
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="p-2 bg-orange-100 rounded-lg w-fit">
                                    <Clock className="w-6 h-6 text-orange-600" />
                                </div>
                                <CardTitle>Auto-Expiration</CardTitle>
                                <CardDescription>
                                    Set custom expiration times or view limits with automatic destruction in Redis
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="p-2 bg-purple-100 rounded-lg w-fit">
                                    <Key className="w-6 h-6 text-purple-600" />
                                </div>
                                <CardTitle>Zero-Knowledge</CardTitle>
                                <CardDescription>
                                    Encryption keys are never sent to our servers - they're embedded in the URL fragment
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>

                    <div className="mt-16">
                        <Card className="max-w-2xl mx-auto">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Server className="w-6 h-6" />
                                    How It Works
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-left space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 text-white rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#D2461E' }}>
                                        1
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Client-Side Encryption</h4>
                                        <p className="text-gray-600">
                                            AES-256 key is generated in your browser and your data is encrypted locally
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 text-white rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#D2461E' }}>
                                        2
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Secure Storage</h4>
                                        <p className="text-gray-600">
                                            Only encrypted data is stored in Redis with automatic expiration - no keys stored
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 text-white rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#D2461E' }}>
                                        3
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Key in URL Fragment</h4>
                                        <p className="text-gray-600">
                                            Decryption key is embedded in URL fragment (#) and never sent to our servers
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 text-white rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#D2461E' }}>
                                        4
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Client-Side Decryption</h4>
                                        <p className="text-gray-600">
                                            Recipient's browser decrypts the data locally - server never sees plaintext
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-16 text-center">
                        <div className="rounded-lg p-6 max-w-2xl mx-auto" style={{ backgroundColor: '#FDF2F2', borderColor: '#D2461E', borderWidth: '1px' }}>
                            <h3 className="text-lg font-semibold mb-2" style={{ color: '#8B1A00' }}>Zero-Knowledge Architecture</h3>
                            <p style={{ color: '#B91C1C' }}>
                                We never have access to your encryption keys or plaintext data. Everything is encrypted/decrypted in your
                                browser using the Web Crypto API.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}