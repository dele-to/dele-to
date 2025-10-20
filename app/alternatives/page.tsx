"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Flame, ArrowLeft, Shield, Lock, Zap, Code, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "react-i18next"


export default function AlternativesPage() {
  const { t } = useTranslation()
  
  const getAlternatives = () => [
    {
      name: t('alternatives.tools.deleto.name'),
      description: t('alternatives.tools.deleto.description'),
      icon: Flame,
      color: "#D2461E",
      features: t('alternatives.tools.deleto.features', { returnObjects: true }) as string[],
      pricing: t('alternatives.tools.deleto.pricing'),
      security: t('alternatives.tools.deleto.security'),
      usability: t('alternatives.tools.deleto.usability'),
      openSource: true,
      selfHosted: true,
      pros: t('alternatives.tools.deleto.pros', { returnObjects: true }) as string[],
      cons: t('alternatives.tools.deleto.cons', { returnObjects: true }) as string[],
      bestFor: t('alternatives.tools.deleto.bestFor')
    },
    {
      name: t('alternatives.tools.yopass.name'),
      description: t('alternatives.tools.yopass.description'),
      icon: Shield,
      color: "#2563eb",
      features: t('alternatives.tools.yopass.features', { returnObjects: true }) as string[],
      pricing: t('alternatives.tools.yopass.pricing'),
      security: t('alternatives.tools.yopass.security'),
      usability: t('alternatives.tools.yopass.usability'),
      openSource: true,
      selfHosted: true,
      pros: t('alternatives.tools.yopass.pros', { returnObjects: true }) as string[],
      cons: t('alternatives.tools.yopass.cons', { returnObjects: true }) as string[],
      bestFor: t('alternatives.tools.yopass.bestFor')
    },
    {
      name: t('alternatives.tools.passwordpusher.name'),
      description: t('alternatives.tools.passwordpusher.description'),
      icon: Lock,
      color: "#7c3aed",
      features: t('alternatives.tools.passwordpusher.features', { returnObjects: true }) as string[],
      pricing: t('alternatives.tools.passwordpusher.pricing'),
      security: t('alternatives.tools.passwordpusher.security'),
      usability: t('alternatives.tools.passwordpusher.usability'),
      openSource: true,
      selfHosted: true,
      pros: t('alternatives.tools.passwordpusher.pros', { returnObjects: true }) as string[],
      cons: t('alternatives.tools.passwordpusher.cons', { returnObjects: true }) as string[],
      bestFor: t('alternatives.tools.passwordpusher.bestFor')
    },
    {
      name: t('alternatives.tools.privatebin.name'),
      description: t('alternatives.tools.privatebin.description'),
      icon: Code,
      color: "#6b7280",
      features: t('alternatives.tools.privatebin.features', { returnObjects: true }) as string[],
      pricing: t('alternatives.tools.privatebin.pricing'),
      security: t('alternatives.tools.privatebin.security'),
      usability: t('alternatives.tools.privatebin.usability'),
      openSource: true,
      selfHosted: true,
      pros: t('alternatives.tools.privatebin.pros', { returnObjects: true }) as string[],
      cons: t('alternatives.tools.privatebin.cons', { returnObjects: true }) as string[],
      bestFor: t('alternatives.tools.privatebin.bestFor')
    },
    {
      name: t('alternatives.tools.onetimesecret.name'),
      description: t('alternatives.tools.onetimesecret.description'),
      icon: AlertTriangle,
      color: "#3b82f6",
      features: t('alternatives.tools.onetimesecret.features', { returnObjects: true }) as string[],
      pricing: t('alternatives.tools.onetimesecret.pricing'),
      security: t('alternatives.tools.onetimesecret.security'),
      usability: t('alternatives.tools.onetimesecret.usability'),
      openSource: true,
      selfHosted: true,
      pros: t('alternatives.tools.onetimesecret.pros', { returnObjects: true }) as string[],
      cons: t('alternatives.tools.onetimesecret.cons', { returnObjects: true }) as string[],
      bestFor: t('alternatives.tools.onetimesecret.bestFor')
    }
  ]

  const getComparisonMatrix = () => [
    { feature: t('alternatives.features.multiRecipient'), deleto: true, yopass: false, passwordpusher: false, privatebin: false, onetimesecret: false },
    { feature: t('alternatives.features.zeroKnowledge'), deleto: true, yopass: true, passwordpusher: false, privatebin: true, onetimesecret: false },
    { feature: t('alternatives.features.clientSideEncryption'), deleto: true, yopass: true, passwordpusher: false, privatebin: true, onetimesecret: false },
    { feature: t('alternatives.features.passwordProtection'), deleto: true, yopass: false, passwordpusher: false, privatebin: true, onetimesecret: true },
    { feature: t('alternatives.features.fileSharing'), deleto: "coming-soon", yopass: true, passwordpusher: true, privatebin: true, onetimesecret: false },
    { feature: t('alternatives.features.apiAccess'), deleto: false, yopass: false, passwordpusher: true, privatebin: false, onetimesecret: true },
    { feature: t('alternatives.features.selfHosted'), deleto: true, yopass: true, passwordpusher: true, privatebin: true, onetimesecret: true },
    { feature: t('alternatives.features.openSource'), deleto: true, yopass: true, passwordpusher: true, privatebin: true, onetimesecret: true },
    { feature: t('alternatives.features.mobileOptimized'), deleto: true, yopass: false, passwordpusher: false, privatebin: false, onetimesecret: false },
    { feature: t('alternatives.features.syntaxHighlighting'), deleto: false, yopass: false, passwordpusher: false, privatebin: true, onetimesecret: false },
  ]

  const alternatives = getAlternatives()
  const comparisonMatrix = getComparisonMatrix()
  
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('alternatives.backToHome')}
            </Button>
          </Link>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('alternatives.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('alternatives.subtitle')}
            </p>
          </div>

          {/* Top 3 Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {alternatives.slice(0, 3).map((alt, index) => {
              const IconComponent = alt.icon
              return (
                <Card key={index} className="relative h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full flex-shrink-0" style={{ backgroundColor: alt.color }}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-lg">{alt.name}</CardTitle>
                          {alt.name === "DELE.TO" && (
                            <Badge style={{ backgroundColor: '#D2461E' }} className="text-white text-xs">
                              {t('alternatives.recommended')}
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-sm">{alt.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {alt.features.slice(0, 3).map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium">{t('alternatives.security')}:</span>
                          <span className={`text-xs font-medium ${
                            alt.security === t('alternatives.ratings.excellent') ? 'text-green-600' :
                            alt.security === t('alternatives.ratings.good') ? 'text-blue-600' : 'text-yellow-600'
                          }`}>
                            {alt.security}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium">{t('alternatives.usability')}:</span>
                          <span className={`text-xs font-medium ${
                            alt.usability === t('alternatives.ratings.excellent') ? 'text-green-600' : 'text-blue-600'
                          }`}>
                            {alt.usability}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium">{t('alternatives.price')}:</span>
                          <span className="text-xs text-gray-600 dark:text-gray-400">{alt.pricing}</span>
                        </div>
                      </div>

                      <div className="text-xs text-gray-600 dark:text-gray-400 border-t pt-2">
                        <strong>{t('alternatives.bestFor')}:</strong> {alt.bestFor}
                      </div>

                      {alt.name === t('alternatives.tools.deleto.name') && (
                        <Link href="/create">
                          <Button size="sm" style={{ backgroundColor: '#D2461E' }} className="w-full text-white hover:opacity-90">
                            {t('alternatives.tryNow')}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Additional Alternatives */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              {t('alternatives.additionalAlternatives')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {alternatives.slice(3).map((alt, index) => {
                const IconComponent = alt.icon
                return (
                  <Card key={index + 3} className="relative h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full flex-shrink-0" style={{ backgroundColor: alt.color }}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle className="text-lg">{alt.name}</CardTitle>
                          </div>
                          <CardDescription className="text-sm">{alt.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {alt.features.slice(0, 3).map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-medium">{t('alternatives.security')}:</span>
                            <span className={`text-xs font-medium ${
                              alt.security === 'Excellent' ? 'text-green-600' :
                              alt.security === 'Good' ? 'text-blue-600' : 'text-yellow-600'
                            }`}>
                              {alt.security}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-medium">{t('alternatives.usability')}:</span>
                            <span className={`text-xs font-medium ${
                              alt.usability === 'Excellent' ? 'text-green-600' : 'text-blue-600'
                            }`}>
                              {alt.usability}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-medium">{t('alternatives.price')}:</span>
                            <span className="text-xs text-gray-600 dark:text-gray-400">{alt.pricing}</span>
                          </div>
                        </div>

                        <div className="text-xs text-gray-600 dark:text-gray-400 border-t pt-2">
                          <strong>Best for:</strong> {alt.bestFor}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Detailed Comparison Matrix */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>{t('alternatives.featureComparison')}</CardTitle>
              <CardDescription>
                {t('alternatives.featureComparisonDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">{t('alternatives.feature')}</th>
                      <th className="text-center py-3 px-2 font-medium">{t('alternatives.tools.deleto.name')}</th>
                      <th className="text-center py-3 px-2 font-medium">{t('alternatives.tools.yopass.name')}</th>
                      <th className="text-center py-3 px-2 font-medium">{t('alternatives.tools.passwordpusher.name')}</th>
                      <th className="text-center py-3 px-2 font-medium">{t('alternatives.tools.privatebin.name')}</th>
                      <th className="text-center py-3 px-2 font-medium">{t('alternatives.tools.onetimesecret.name')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonMatrix.map((row, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="py-2 px-2 font-medium">{row.feature}</td>
                        <td className="py-2 px-2 text-center">
                          {row.deleto === true ? (
                            <Check className="w-4 h-4 text-green-600 mx-auto" />
                          ) : row.deleto === false ? (
                            <X className="w-4 h-4 text-red-500 mx-auto" />
                          ) : row.deleto === "coming-soon" ? (
                            <span className="text-xs text-amber-600 font-medium">{t('alternatives.soon')}</span>
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
                        <td className="py-2 px-2 text-center">
                          {row.privatebin === true ? (
                            <Check className="w-4 h-4 text-green-600 mx-auto" />
                          ) : row.privatebin === false ? (
                            <X className="w-4 h-4 text-red-500 mx-auto" />
                          ) : row.privatebin === "coming-soon" ? (
                            <span className="text-xs text-amber-600 font-medium">{t('alternatives.soon')}</span>
                          ) : (
                            <X className="w-4 h-4 text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="py-2 px-2 text-center">
                          {row.onetimesecret === true ? (
                            <Check className="w-4 h-4 text-green-600 mx-auto" />
                          ) : row.onetimesecret === false ? (
                            <X className="w-4 h-4 text-red-500 mx-auto" />
                          ) : row.onetimesecret === "coming-soon" ? (
                            <span className="text-xs text-amber-600 font-medium">{t('alternatives.soon')}</span>
                          ) : (
                            <X className="w-4 h-4 text-red-500 mx-auto" />
                          )}
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
                <CardTitle className="text-green-600">{t('alternatives.useCases.businesses.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">{t('alternatives.useCases.businesses.bestChoice')}</p>
                    <p className="text-sm text-gray-600">{t('alternatives.useCases.businesses.bestChoiceDesc')}</p>
                  </div>
                  <div>
                    <p className="font-medium">{t('alternatives.useCases.businesses.alternative')}</p>
                    <p className="text-sm text-gray-600">{t('alternatives.useCases.businesses.alternativeDesc')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">{t('alternatives.useCases.developers.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">{t('alternatives.useCases.developers.bestChoice')}</p>
                    <p className="text-sm text-gray-600">{t('alternatives.useCases.developers.bestChoiceDesc')}</p>
                  </div>
                  <div>
                    <p className="font-medium">{t('alternatives.useCases.developers.alternative')}</p>
                    <p className="text-sm text-gray-600">{t('alternatives.useCases.developers.alternativeDesc')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-purple-600">{t('alternatives.useCases.personal.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">{t('alternatives.useCases.personal.bestChoice')}</p>
                    <p className="text-sm text-gray-600">
                      {t('alternatives.useCases.personal.bestChoiceDesc')}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">{t('alternatives.useCases.personal.alternative')}</p>
                    <p className="text-sm text-gray-600">{t('alternatives.useCases.personal.alternativeDesc')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Comparison */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>{t('alternatives.securityComparison.title')}</CardTitle>
              <CardDescription>
                {t('alternatives.securityComparison.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4 text-green-600">{t('alternatives.securityComparison.zeroKnowledge')}</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-1 rounded-full" style={{ backgroundColor: '#D2461E' }}>
                        <Flame className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{t('alternatives.tools.deleto.name')}</p>
                        <p className="text-sm text-gray-600">{t('alternatives.securityComparison.descriptions.deletoEncryption')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-1 bg-blue-600 rounded-full">
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{t('alternatives.tools.yopass.name')}</p>
                        <p className="text-sm text-gray-600">{t('alternatives.securityComparison.descriptions.yopassEncryption')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-1 bg-gray-600 rounded-full">
                        <Code className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{t('alternatives.tools.privatebin.name')}</p>
                        <p className="text-sm text-gray-600">{t('alternatives.securityComparison.descriptions.privatebinEncryption')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-yellow-600">{t('alternatives.securityComparison.serverSide')}</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-1 bg-purple-600 rounded-full">
                        <Lock className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{t('alternatives.tools.passwordpusher.name')}</p>
                        <p className="text-sm text-gray-600">{t('alternatives.securityComparison.descriptions.passwordpusherEncryption')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-1 bg-blue-600 rounded-full">
                        <AlertTriangle className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{t('alternatives.tools.onetimesecret.name')}</p>
                        <p className="text-sm text-gray-600">{t('alternatives.securityComparison.descriptions.onetimesecretEncryption')}</p>
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
              <CardTitle>{t('alternatives.whyChoose.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="p-3 rounded-full mx-auto mb-3 w-fit" style={{ backgroundColor: '#D2461E' }}>
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">{t('alternatives.whyChoose.maxSecurity')}</h4>
                  <p className="text-sm text-gray-600">
                    {t('alternatives.whyChoose.maxSecurityDesc')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="p-3 rounded-full mx-auto mb-3 w-fit" style={{ backgroundColor: '#D2461E' }}>
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">{t('alternatives.whyChoose.modernExperience')}</h4>
                  <p className="text-sm text-gray-600">
                    {t('alternatives.whyChoose.modernExperienceDesc')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="p-3 rounded-full mx-auto mb-3 w-fit" style={{ backgroundColor: '#D2461E' }}>
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">{t('alternatives.whyChoose.extraProtection')}</h4>
                  <p className="text-sm text-gray-600">
                    {t('alternatives.whyChoose.extraProtectionDesc')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <Link href="/create">
              <Button size="lg" style={{ backgroundColor: '#D2461E' }} className="text-white hover:opacity-90">
                {t('alternatives.tryButton')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}