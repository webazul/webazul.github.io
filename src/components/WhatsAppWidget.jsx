import { useTranslation } from 'react-i18next'
import './WhatsAppWidget.css'
import { RiWhatsappLine } from 'react-icons/ri'
import { trackContactClick } from '../utils/analytics'

function WhatsAppWidget() {
  const { t } = useTranslation()

  const whatsappNumber = "+351910084099"
  const defaultMessage = t('whatsapp.defaultMessage')

  const openWhatsApp = () => {
    // Track WhatsApp click
    trackContactClick('whatsapp', whatsappNumber)

    const message = encodeURIComponent(defaultMessage)
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\s/g, '')}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }


  return (
    <div className="whatsapp-widget">
      <button
        className="whatsapp-float-button"
        onClick={openWhatsApp}
        aria-label={t('whatsapp.contactLabel')}
      >
        <RiWhatsappLine className="whatsapp-svg" />
      </button>
    </div>
  )
}

export default WhatsAppWidget