"use client"

import { useEffect } from "react"
import { sdk } from '@farcaster/miniapp-sdk'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Key } from "lucide-react"
import Link from "next/link"

export default function MiniAppViewPage({ params }: { params: { id: string } }) {
  useEffect(() => {
    const initializeMiniApp = async () => {
      try {
        await sdk.actions.ready()
      } catch (error) {
        console.error("Failed to initialize MiniApp SDK:", error)
      }
    }

    initializeMiniApp()
  }, [])

  return (
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
            <CardTitle>View Secure Share</CardTitle>
            <CardDescription>
              Access encrypted content with client-side AES-256 decryption
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Alert>
                <Key className="w-4 h-4" />
                <AlertDescription>
                  <strong>MiniApp Mode:</strong> Content is decrypted client-side in your browser. 
                  The server never has access to your encryption keys or plaintext data.
                </AlertDescription>
              </Alert>
              
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Share ID: <code className="bg-gray-100 px-2 py-1 rounded">{params.id}</code>
                </p>
                <p className="text-gray-600">
                  This is a simplified version for the Farcaster MiniApp. 
                  Visit the full site for complete functionality.
                </p>
                <Link href={`/view/${params.id}`} target="_blank" rel="noopener noreferrer">
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
  )
}