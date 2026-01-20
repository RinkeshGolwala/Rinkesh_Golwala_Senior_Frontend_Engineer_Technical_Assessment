'use client'

import { useLanguage, useLanguageOptions } from '../lib/i18n/LanguageContext'
import { useTranslation } from 'react-i18next'
import { Button, Skeleton } from '@doctor-booking/necktie-ui'

interface LanguageSwitcherProps {
  className?: string
}

export default function LanguageSwitcher({
  className = '',
}: LanguageSwitcherProps) {
  const { language, setLanguage, isChanging } = useLanguage()
  const { t } = useTranslation('common')
  const languageOptions = useLanguageOptions()

  return (
    <Button
      variant="flat"
      className={className}
      onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
      disabled={isChanging}
      loading={isChanging}
      aria-label={t('language.switch', 'Switch language')}
      title={t('language.switch', 'Switch language')}
      startIcon={
        <span style={{ fontSize: '1.1em', lineHeight: 1 }}>
          {language === 'en' ? '🇨🇳' : '🇺🇸'}
        </span>
      }
    >
      {language === 'en' ? t('language.chineseShort') : t('language.englishShort')}
    </Button>
  )
}