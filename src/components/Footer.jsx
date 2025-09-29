import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './Footer.css'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram, FaFacebook, FaLinkedin, FaArrowUp, FaRocket, FaGlobe } from 'react-icons/fa'
import LegalModal from './LegalModal'

function Footer() {
  const { t, i18n } = useTranslation()
  const currentYear = new Date().getFullYear()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const openModal = (type) => {
    setModalType(type)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setModalType('')
  }

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <div className="footer-logo">
              <img src="./webazul-white.png" alt="WebAzul Creative Studio" className="footer-logo-image" />
            </div>
            <p className="footer-description">
              {t('footer.description')}
            </p>
            <div className="footer-social">
              <a href="https://www.instagram.com/webazul.pt/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">{t('footer.contactInfo')}</h4>
            <div className="footer-contact">
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>{t('contact.info.address')}</span>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <a href="tel:+351913428377" className="contact-link">{t('contact.info.phone')}</a>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <a href="mailto:info@webazul.pt" className="contact-link">{t('contact.info.email')}</a>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">
              <FaGlobe className="language-icon" />
              Idioma
            </h4>
            <div className="language-selector">
              <select
                value={i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="language-select"
              >
                <option value="pt">🇵🇹 Português</option>
                <option value="en">🇬🇧 English</option>
                <option value="es">🇪🇸 Español</option>
                <option value="fr">🇫🇷 Français</option>
              </select>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-legal">
              <p>&copy; {currentYear} WebAzul Creative Studio. {t('footer.rights')}</p>
              <div className="legal-links">
                <button onClick={() => openModal('privacy')} className="legal-link">
                  {t('footer.privacyPolicy')}
                </button>
                <button onClick={() => openModal('terms')} className="legal-link">
                  {t('footer.termsService')}
                </button>
                <button onClick={() => openModal('cookies')} className="legal-link">
                  {t('footer.cookies')}
                </button>
              </div>
            </div>

            <button
              className="back-to-top"
              onClick={scrollToTop}
              aria-label={t('footer.backToTop')}
            >
              <FaArrowUp />
              <span>{t('footer.backToTop')}</span>
            </button>
          </div>
        </div>
      </div>

      <LegalModal
        isOpen={modalOpen}
        onClose={closeModal}
        type={modalType}
      />
    </footer>
  )
}

export default Footer