'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Eye, Server, Key, ArrowLeft, Shield } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "react-i18next"

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('common.back')}
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('about.title')}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('about.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <Lock className="w-8 h-8 mb-2 text-orange-600 dark:text-orange-400" />
                <CardTitle>{t('landing.features.encryption.title')}</CardTitle>
                <CardDescription>{t('landing.features.encryption.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('about.sections.howItWorks.content')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Key className="w-8 h-8 mb-2 text-orange-600 dark:text-orange-400" />
                <CardTitle>{t('landing.features.zeroKnowledge.title')}</CardTitle>
                <CardDescription>{t('landing.features.zeroKnowledge.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('about.sections.security.content')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Server className="w-8 h-8 mb-2 text-orange-600 dark:text-orange-400" />
                <CardTitle>{t('landing.features.ephemeral.title')}</CardTitle>
                <CardDescription>{t('landing.features.ephemeral.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('about.sections.privacy.content')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Eye className="w-8 h-8 mb-2 text-orange-600 dark:text-orange-400" />
                <CardTitle>{t('landing.features.ephemeral.title')}</CardTitle>
                <CardDescription>{t('landing.features.ephemeral.description')}</CardDescription>
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
                {t('security.technicalDetails.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">{t('security.technicalDetails.aesGcm.title')}</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('security.technicalDetails.aesGcm.description')}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t('security.technicalDetails.webCrypto.title')}</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('security.technicalDetails.webCrypto.description')}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t('security.technicalDetails.zeroAccess.title')}</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('security.technicalDetails.zeroAccess.description')}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t('security.technicalDetails.autoTtl.title')}</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('security.technicalDetails.autoTtl.description')}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{t('security.flowDiagram.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 text-white rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#D2461E' }}>
                      1
                    </div>
                    <div className="flex-1">
                      <strong>{t('security.flowDiagram.step1.title')}</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{t('security.flowDiagram.step1.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 text-white rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#D2461E' }}>
                      2
                    </div>
                    <div className="flex-1">
                      <strong>{t('security.flowDiagram.step2.title')}</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{t('security.flowDiagram.step2.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 text-white rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#D2461E' }}>
                      3
                    </div>
                    <div className="flex-1">
                      <strong>{t('security.flowDiagram.step3.title')}</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{t('security.flowDiagram.step3.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 text-white rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#D2461E' }}>
                      4
                    </div>
                    <div className="flex-1">
                      <strong>{t('security.flowDiagram.step4.title')}</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{t('security.flowDiagram.step4.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 text-white rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#D2461E' }}>
                      5
                    </div>
                    <div className="flex-1">
                      <strong>{t('security.flowDiagram.step5.title')}</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{t('security.flowDiagram.step5.description')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('security.bestPractices.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">{t('security.bestPractices.useHttps.title')}</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('security.bestPractices.useHttps.description')}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t('security.bestPractices.shortExpiration.title')}</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('security.bestPractices.shortExpiration.description')}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t('security.bestPractices.singleUse.title')}</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('security.bestPractices.singleUse.description')}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t('security.bestPractices.shareComplete.title')}</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('security.bestPractices.shareComplete.description')}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <Link href="/create">
              <Button size="lg" style={{ backgroundColor: '#D2461E' }} className="hover:opacity-90 text-white">
                {t('navigation.shareSecurely')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
