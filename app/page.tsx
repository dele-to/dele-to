import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Lock, Eye, ArrowRight, Sparkles, Shield, Clock, Database, Zap, Github } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <Link href="https://github.com/ardd/dele-to-deployed" target="_blank" rel="noopener noreferrer">
            <span className="inline-flex items-center rounded-full bg-red-100 dark:bg-red-900/30 px-3 py-1 text-xs font-medium text-red-800 dark:text-red-300 ring-1 ring-inset ring-red-200 dark:ring-red-800 mb-6 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors">
              <Sparkles className="h-3 w-3 mr-1" /> Open source & zero-knowledge
            </span>
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Share secrets
            <br />
            that <span className="text-red-600 dark:text-red-500 animate-disappear">disappear</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto hidden md:block">
            Stop sharing passwords in Slack. DELE.TO encrypts everything in your browser.
            <br />Your secrets self-destruct after reading. No traces, no logs, no worries.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mb-12">
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-lg rounded-lg transition-all duration-300 transform hover:scale-90w-auto">
              <Link href="/create">
                Create a secret <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-6 py-3 text-lg rounded-lg transition-all duration-300 transform hover:scale-90w-auto">
              <Link href="/about">
                Learn more
              </Link>
            </Button>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8 text-muted-foreground text-sm">
            <span className="flex items-center">
              <Lock className="h-4 w-4 mr-2" /> AES-256 encrypted
            </span>
            <span className="flex items-center">
              <Eye className="h-4 w-4 mr-2" /> Zero-knowledge
            </span>
          </div>
        </div>

        {/* Security without compromise section */}
        <div className="w-full max-w-6xl mx-auto mt-24 px-4 sm:px-6 lg:px-8 pb-16">
          {/* <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Security without compromise</h2>
          </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 overflow-x-hidden">
          <Card className="bg-card border-border transition-all duration-300 hover:shadow-lg hover:scale-90hover:border-2 hover:border-red-500 dark:hover:border-red-400">
            <CardHeader>
              <Shield className="w-8 h-8 mb-2 text-white" />
              <CardTitle className="text-lg">Military-grade encryption</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground">
                Your data is encrypted with AES-256-GCM right in your browser. We never see the plaintext.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-card border-border transition-all duration-300 hover:shadow-lg hover:scale-90hover:border-2 hover:border-red-500 dark:hover:border-red-400">
            <CardHeader>
              <Clock className="w-8 h-8 mb-2 text-white" />
              <CardTitle className="text-lg">Self-destructing messages</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground">
                Set custom expiration times or view limits. Once read, it's gone forever.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-card border-border transition-all duration-300 hover:shadow-lg hover:scale-90hover:border-2 hover:border-red-500 dark:hover:border-red-400">
            <CardHeader>
              <Eye className="w-8 h-8 mb-2 text-white" />
              <CardTitle className="text-lg">Zero-knowledge architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground">
                Encryption keys live in the URL fragment—they never touch our servers.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-card border-border transition-all duration-300 hover:shadow-lg hover:scale-90hover:border-2 hover:border-red-500 dark:hover:border-red-400">
            <CardHeader>
              <Database className="w-8 h-8 mb-2 text-white" />
              <CardTitle className="text-lg">No data retention</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground">
                We don't log IPs, don't track users, and can't read your secrets even if we tried.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-card border-border transition-all duration-300 hover:shadow-lg hover:scale-90hover:border-2 hover:border-red-500 dark:hover:border-red-400">
            <CardHeader>
              <Zap className="w-8 h-8 mb-2 text-white" />
              <CardTitle className="text-lg">Instant sharing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground">
                No signup required for basic use. Create and share in seconds.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-card border-border transition-all duration-300 hover:shadow-lg hover:scale-90hover:border-2 hover:border-red-500 dark:hover:border-red-400">
            <CardHeader>
              <Github className="w-8 h-8 mb-2 text-white" />
              <CardTitle className="text-lg">Open source</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground">
                Fully auditable code on GitHub. Trust is earned through transparency.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </div>
  )
}
