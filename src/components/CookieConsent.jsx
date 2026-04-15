import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './CookieConsent.css'

function CookieConsent() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    try {
      const hasConsent = localStorage.getItem('cookieConsent')
      if (!hasConsent) {
        const timer = setTimeout(() => setIsVisible(true), 1500)
        return () => clearTimeout(timer)
      }
    } catch {
      setIsVisible(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="cookie-banner">
      <p className="cookie-text">{t('cookies.text')}</p>
      <button className="cookie-accept" onClick={accept}>
        {t('cookies.accept')}
      </button>
    </div>
  )
}

export default CookieConsent
