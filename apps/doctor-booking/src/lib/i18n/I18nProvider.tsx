'use client'

import type { i18n as I18nType } from 'i18next'
import { ReactNode, useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import { initI18next } from './config'
import { LanguageProvider } from './LanguageContext'

interface I18nProviderProps {
  children: ReactNode
  locale?: string
}

export function I18nProvider({ children, locale = 'en' }: I18nProviderProps) {
  const [i18n, setI18n] = useState<I18nType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initialize = async () => {
      try {
        const i18nInstance = await initI18next(locale)
        setI18n(i18nInstance)
      } catch (error) {
        console.error('Failed to initialize i18n:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initialize()
  }, [locale])

  // TODO: Add a skeleton ui
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    )
  }

  // TODO: Add an error UI
  if (!i18n) {
    return <div>Error loading translations</div>
  }

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider initialLanguage={locale as 'en' | 'zh'}>
        {children}
      </LanguageProvider>
    </I18nextProvider>
  )
}
