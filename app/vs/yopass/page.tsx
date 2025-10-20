"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Flame, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "react-i18next"

export default function YopassComparison() {
  const { t } = useTranslation()

  const getComparisonData = () => [
    {
      feature: t('vs.common.clientSideEncryption'),
      deleto: true,
      yopass: true,
      details: "Both use AES-256 encryption in the browser"
    },
    {
      feature: t('vs.common.zeroKnowledgeArchitecture'),
      deleto: true,
      yopass: true,
      details: "Neither service can access your data"
    },
    {
      feature: t('vs.common.customExpirationTimes'),
      deleto: true,
      yopass: true,
      details: "Both offer flexible expiration settings"
    },
    {
      feature: t('vs.common.viewCountLimits'),
      deleto: true,
      yopass: true,
      details: "Burn-after-reading functionality"
    },
    {
      feature: t('vs.common.passwordProtection'),
      deleto: true,
      yopass: false,
      details: "DELE.TO adds optional password layer"
    },
    {
      feature: t('vs.common.modernUiUx'),
      deleto: true,
      yopass: false,
      details: "DELE.TO has more polished interface"
    },
    {
      feature: t('vs.common.mobileOptimized'),
      deleto: true,
      yopass: "partial",
      details: "DELE.TO fully optimized for mobile"
    },
    {
      feature: t('vs.common.fileSharing'),
      deleto: "coming-soon",
      yopass: true,
      details: "Yopass supports file uploads, DELE.TO coming soon"
    },
    {
      feature: t('vs.common.selfHosted'),
      deleto: true,
      yopass: true,
      details: "Yopass available now, DELE.TO coming soon"
    },
    {
      feature: t('vs.common.openSource'),
      deleto: true,
      yopass: true,
      details: "Both are open source projects"
    },
    {
      feature: t('vs.common.multiRecipientSharing'),
      deleto: true,
      yopass: false,
      details: "DELE.TO supports sharing to multiple recipients"
    }
  ]
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('vs.common.backToAlternatives')}
            </Button>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('vs.yopass.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('vs.yopass.subtitle')}
            </p>
          </div>

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
                    <CardDescription>Modern, user-focused design</CardDescription>
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
                    and mobile-first design. Perfect for teams and individuals who value user experience.
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
                    <div className="w-6 h-6 bg-blue-600 rounded"></div>
                  </div>
                  <div>
                    <CardTitle>Yopass</CardTitle>
                    <CardDescription>Established, feature-rich</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-600">File Sharing</Badge>
                    <Badge variant="outline">Established</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    A mature solution with file sharing capabilities and proven track record. 
                    Great for users who need to share files along with passwords.
                  </p>
                  <div className="pt-2">
                    <Button variant="outline" asChild>
                      <a href="https://yopass.se" target="_blank" rel="noopener noreferrer">
                        Visit Yopass
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
              <CardTitle>{t('vs.common.comparison')}</CardTitle>
              <CardDescription>
                Side-by-side comparison of key features and capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">{t('vs.common.features')}</th>
                      <th className="text-center py-3 px-4 font-medium">DELE.TO</th>
                      <th className="text-center py-3 px-4 font-medium">Yopass</th>
                      <th className="text-left py-3 px-4 font-medium">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getComparisonData().map((item: any, index: number) => (
                      <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="py-3 px-4 font-medium">{item.feature}</td>
                        <td className="py-3 px-4 text-center">
                          {item.deleto === true ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : item.deleto === false ? (
                            <X className="w-5 h-5 text-red-500 mx-auto" />
                          ) : item.deleto === "coming-soon" ? (
                            <span className="text-sm text-amber-600 font-medium">{t('alternatives.soon')}</span>
                          ) : (
                            <span className="text-sm text-yellow-600">{item.deleto}</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {item.yopass === true ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : item.yopass === false ? (
                            <X className="w-5 h-5 text-red-500 mx-auto" />
                          ) : (
                            <span className="text-sm text-yellow-600">{item.yopass}</span>
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

          {/* Use Cases */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle style={{ color: '#D2461E' }}>{t('vs.common.chooseDeletoIf')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{t('vs.common.useCases.modernInterface')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{t('vs.common.useCases.passwordProtectionNeeded')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{t('vs.common.useCases.textCredentials')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{t('vs.common.useCases.mobileFirst')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{t('vs.common.useCases.securityGuidance')}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">{t('vs.common.chooseAlternativeIf', { tool: 'Yopass' })}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{t('vs.common.useCases.fileSharing')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{t('vs.common.useCases.battleTested')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{t('vs.common.useCases.noPasswordProtection')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{t('vs.common.useCases.minimalistInterface')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{t('vs.common.useCases.existingWorkflows')}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Security Comparison */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>{t('vs.common.securityAnalysis.title')}</CardTitle>
              <CardDescription>
                {t('vs.common.securityAnalysis.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3" style={{ color: '#D2461E' }}>{t('vs.common.securityAnalysis.deletoSecurity')}</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• {t('vs.common.securityAnalysis.deletoFeatures.aes256Gcm')}</li>
                    <li>• {t('vs.common.securityAnalysis.deletoFeatures.urlFragments')}</li>
                    <li>• {t('vs.common.securityAnalysis.deletoFeatures.passwordProtection')}</li>
                    <li>• {t('vs.common.securityAnalysis.deletoFeatures.securityTips')}</li>
                    <li>• {t('vs.common.securityAnalysis.deletoFeatures.redisTtl')}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-blue-600">{t('vs.common.securityAnalysis.yopassSecurity')}</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• {t('vs.common.securityAnalysis.yopassFeatures.aes256')}</li>
                    <li>• {t('vs.common.securityAnalysis.yopassFeatures.zeroKnowledge')}</li>
                    <li>• {t('vs.common.securityAnalysis.yopassFeatures.provenTrack')}</li>
                    <li>• {t('vs.common.securityAnalysis.yopassFeatures.fileEncryption')}</li>
                    <li>• {t('vs.common.securityAnalysis.yopassFeatures.multipleBackends')}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Final Recommendation */}
          <Card>
            <CardHeader>
              <CardTitle>{t('vs.common.recommendation.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  {t('vs.common.recommendation.intro')}
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: '#FDF2F2', borderColor: '#D2461E', borderWidth: '1px' }}>
                    <h4 className="font-semibold mb-2" style={{ color: '#8B1A00' }}>{t('vs.common.recommendation.forModernTeams')}</h4>
                    <p className="text-sm" style={{ color: '#B91C1C' }}>
                      {t('vs.common.recommendation.forModernTeamsDesc')}
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold mb-2 text-blue-900">{t('vs.common.recommendation.forFileSharing')}</h4>
                    <p className="text-sm text-blue-800">
                      {t('vs.common.recommendation.forFileSharingDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <Link href="/create">
              <Button size="lg" style={{ backgroundColor: '#D2461E' }} className="text-white hover:opacity-90">
                {t('vs.common.recommendation.tryNow')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}