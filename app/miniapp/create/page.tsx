"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Key } from "lucide-react"
import Link from "next/link"
import { FarcasterReady } from "@/components/farcaster-ready"

export default function MiniAppCreatePage() {

  return (
    <>
      <FarcasterReady />
      <div className="min-h-screen p-4">
      <div className="container mx-auto max-w-2xl py-8">
        <div className="mb-6">
          <Link href="/miniapp">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to MiniApp Home
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Secure Share</CardTitle>
            <CardDescription>
              Encrypt and share sensitive information with client-side AES-256 encryption
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Alert>
                <Key className="w-4 h-4" />
                <AlertDescription>
                  <strong>MiniApp Mode:</strong> Your data is encrypted client-side with AES-256. 
                  The encryption key is embedded in the share URL and never sent to our servers.
                </AlertDescription>
              </Alert>
              
              <div className="text-center">
                <p className="text-gray-600">
                  This is a simplified version for the Farcaster MiniApp. 
                  Visit the full site for advanced features.
                </p>
                <Link href="/create" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="mt-2">
                    Open Full Version
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  )
}