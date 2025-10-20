'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { languages, Language } from '@/lib/i18n';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Sync URL with localStorage and ensure language is set
  useEffect(() => {
    const urlLang = searchParams?.get('lang');
    
    if (urlLang && ['en', 'es', 'fr', 'sq', 'de'].includes(urlLang)) {
      // URL has language parameter - use it and store it
      if (i18n.language !== urlLang) {
        i18n.changeLanguage(urlLang);
      }
      localStorage.setItem('i18nextLng', urlLang);
    } else {
      // No URL parameter - check if we should redirect based on localStorage
      const storedLang = localStorage.getItem('i18nextLng');
      if (storedLang && ['en', 'es', 'fr', 'sq', 'de'].includes(storedLang) && storedLang !== 'en') {
        // Redirect to include language in URL for consistency
        const currentHash = window.location.hash;
        const params = new URLSearchParams(searchParams?.toString());
        params.set('lang', storedLang);
        const newUrl = `${pathname}?${params.toString()}${currentHash}`;
        router.replace(newUrl);
      }
    }
  }, [searchParams, pathname, router, i18n]);

  const changeLanguage = (lng: Language) => {
    // Update i18n
    i18n.changeLanguage(lng);
    
    // Store in localStorage for persistence
    localStorage.setItem('i18nextLng', lng);
    
    // Preserve the current hash fragment (important for view pages with encryption keys)
    const currentHash = typeof window !== 'undefined' ? window.location.hash : '';
    
    // Update URL with language parameter while preserving hash
    const params = new URLSearchParams(searchParams?.toString());
    params.set('lang', lng);
    const newUrl = `${pathname}?${params.toString()}${currentHash}`;
    
    // Use replace instead of push to avoid adding to history
    router.replace(newUrl);
  };

  const currentLanguage = i18n.language as Language;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onSelect={() => changeLanguage(code as Language)}
          >
            <span className={currentLanguage === code ? 'font-bold' : ''}>
              {name}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
