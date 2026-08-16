import { Languages } from 'lucide-react'
import { useTranslation } from '../i18n/i18n.jsx'

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useTranslation()
  return (
    <label className="flex items-center gap-2 text-sm font-medium" title={t('Language')}>
      <Languages size={17} />
      <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-transparent border-0 focus:ring-0 cursor-pointer">
        <option value="en">{t('English')}</option>
        <option value="te">{t('Telugu')}</option>
      </select>
    </label>
  )
}
