import { useTranslation } from 'react-i18next'
import './WhatsAppWidget.css'
import { RiWhatsappLine } from 'react-icons/ri'

function WhatsAppWidget() {
  const { t } = useTranslation()

  const whatsappNumber = "+351913428377"
  const defaultMessage = t('whatsapp.defaultMessage')

  const openWhatsApp = () => {
    const message = encodeURIComponent(defaultMessage)
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\s/g, '')}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }


  return (
    <div className="whatsapp-widget">
      <button
        className="whatsapp-float-button"
        onClick={openWhatsApp}
        aria-label="Contactar via WhatsApp"
      >
        <RiWhatsappLine className="whatsapp-svg" />
      </button>
    </div>
  )
}

export default WhatsAppWidget