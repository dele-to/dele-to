'use client';

import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n/config';
import { useSearchParams } from 'next/navigation';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const initializeI18n = async () => {
      if (!i18n.isInitialized) {
        await i18n.init();
      }
      setIsInitialized(true);
    };

    initializeI18n();
  }, []);

  // Don't render translated content until we're on the client side
  if (!isClient || !isInitialized) {
    return <div suppressHydrationWarning>{children}</div>;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
