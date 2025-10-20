'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, Clock, Lock, Key, Server } from "lucide-react"
import Link from "next/link"
import { SecurityTips } from "@/components/security-tips-i18n"
import { useTranslation } from "react-i18next"

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-full bg-orange-600">
              <Flame className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">DELE.TO</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-6">From Latin dēlētō — “erase, destroy.”</p>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8" suppressHydrationWarning>
            {t('site.description')}
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/create">
              <Button size="lg" className="hover:opacity-90 text-white bg-red-600" suppressHydrationWarning>
                {t('navigation.shareSecurely')}
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" suppressHydrationWarning>
                {t('navigation.about')}
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
              <CardTitle suppressHydrationWarning>{t('landing.features.encryption.title')}</CardTitle>
              <CardDescription suppressHydrationWarning>
                {t('landing.features.encryption.description')}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="p-2 bg-orange-100 rounded-lg w-fit">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle>{t('landing.features.ephemeral.title')}</CardTitle>
              <CardDescription>
                {t('landing.features.ephemeral.description')}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="p-2 bg-purple-100 rounded-lg w-fit">
                <Key className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>{t('landing.features.zeroKnowledge.title')}</CardTitle>
              <CardDescription>
                {t('landing.features.zeroKnowledge.description')}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-16">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-6 h-6" />
                {t('landing.howItWorks.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 text-white rounded-full flex items-center justify-center text-sm font-bold bg-orange-600">
                  1
                </div>
                <div>
                  <h4 className="font-semibold">{t('landing.howItWorks.step1.title')}</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('landing.howItWorks.step1.description')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 text-white rounded-full flex items-center justify-center text-sm font-bold bg-orange-600">
                  2
                </div>
                <div>
                  <h4 className="font-semibold">{t('landing.howItWorks.step2.title')}</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('landing.howItWorks.step2.description')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 text-white rounded-full flex items-center justify-center text-sm font-bold bg-orange-600">
                  3
                </div>
                <div>
                  <h4 className="font-semibold">{t('landing.howItWorks.step3.title')}</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('landing.howItWorks.step3.description')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 text-white rounded-full flex items-center justify-center text-sm font-bold bg-orange-600">
                  4
                </div>
                <div>
                  <h4 className="font-semibold">{t('landing.howItWorks.step4.title')}</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('landing.howItWorks.step4.description')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <div className="rounded-lg p-6 max-w-2xl mx-auto bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
            <h3 className="text-lg font-semibold mb-2 text-red-900 dark:text-red-200">{t('landing.features.zeroKnowledge.title')}</h3>
            <p className="text-red-800 dark:text-red-300">
              {t('landing.features.zeroKnowledge.description')}
            </p>
          </div>
        </div>


      </div>
    </div>
  )
}
