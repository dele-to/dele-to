"use client"

import { useEffect, useState } from 'react'
import { FarcasterMiniApp } from '@/lib/farcaster'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react'
import { sdk } from '@farcaster/miniapp-sdk'

export function FarcasterDebug() {
  const [context, setContext] = useState<any>(null)
  const [manifestStatus, setManifestStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [readyCallStatus, setReadyCallStatus] = useState<'idle' | 'calling' | 'success' | 'error'>('idle')
  const [readyCallError, setReadyCallError] = useState<string | null>(null)

  useEffect(() => {
    const checkStatus = async () => {
      // Get Farcaster context
      const ctx = FarcasterMiniApp.getContext()
      setContext(ctx)

      // Check manifest accessibility
      try {
        const response = await fetch('/miniapp-manifest.json')
        if (response.ok) {
          setManifestStatus('success')
        } else {
          setManifestStatus('error')
        }
      } catch {
        setManifestStatus('error')
      }
    }

    checkStatus()
  }, [])

  if (!context) return null

  const checks = [
    {
      name: 'Farcaster Context',
      status: context.isInFarcaster ? 'success' : 'warning',
      description: context.isInFarcaster ? 'Running in Farcaster' : 'Running in browser'
    },
    {
      name: 'SDK Initialized',
      status: context.initialized ? 'success' : 'warning',
      description: context.initialized ? 'SDK ready' : 'SDK not initialized'
    },
    {
      name: 'Manifest File',
      status: manifestStatus === 'success' ? 'success' : manifestStatus === 'error' ? 'error' : 'loading',
      description: manifestStatus === 'success' ? 'Manifest accessible' : manifestStatus === 'error' ? 'Manifest not found' : 'Checking manifest...'
    },
    {
      name: 'User Agent',
      status: context.userAgent.includes('Farcaster') ? 'success' : 'info',
      description: context.userAgent.includes('Farcaster') ? 'Farcaster user agent detected' : 'Standard browser'
    }
  ]

  const getIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'error': return <XCircle className="w-4 h-4 text-red-600" />
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-600" />
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />
    }
  }

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'success': return 'default'
      case 'error': return 'destructive'
      case 'warning': return 'secondary'
      default: return 'outline'
    }
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-sm">Farcaster Integration Status</CardTitle>
        <CardDescription>Debug information for miniapp integration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {checks.map((check) => (
          <div key={check.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getIcon(check.status)}
              <span className="text-sm font-medium">{check.name}</span>
            </div>
            <Badge variant={getBadgeVariant(check.status) as any}>
              {check.description}
            </Badge>
          </div>
        ))}
        
        <div className="mt-4 space-y-3">
          <Button 
            onClick={async () => {
              setReadyCallStatus('calling')
              setReadyCallError(null)
              try {
                await sdk.actions.ready()
                setReadyCallStatus('success')
              } catch (error) {
                console.error('❌ Manual test: sdk.actions.ready() failed:', error)
                setReadyCallError(error instanceof Error ? error.message : 'Unknown error')
                setReadyCallStatus('error')
              }
            }}
            disabled={readyCallStatus === 'calling'}
            variant="outline"
            size="sm"
            className="w-full"
          >
            {readyCallStatus === 'calling' && <RefreshCw className="w-4 h-4 mr-2 animate-spin" />}
            Test sdk.actions.ready() Call
          </Button>
          
          {readyCallStatus !== 'idle' && (
            <div className={`p-2 rounded text-sm ${
              readyCallStatus === 'success' ? 'bg-green-50 text-green-800' :
              readyCallStatus === 'error' ? 'bg-red-50 text-red-800' :
              'bg-blue-50 text-blue-800'
            }`}>
              {readyCallStatus === 'success' && '✅ sdk.actions.ready() called successfully!'}
              {readyCallStatus === 'error' && `❌ Error: ${readyCallError}`}
              {readyCallStatus === 'calling' && '⏳ Calling sdk.actions.ready()...'}
            </div>
          )}
        </div>
        
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 mb-2">Context Details:</p>
          <pre className="text-xs text-gray-800 overflow-x-auto">
            {JSON.stringify(context, null, 2)}
          </pre>
        </div>
      </CardContent>
    </Card>
  )
}