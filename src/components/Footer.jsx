import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './Footer.css'
import { FaInstagram } from 'react-icons/fa'
import LegalModal from './LegalModal'

const products = [
  { name: 'WebGym', url: 'https://webgym.pt' },
  { name: 'WebGym Personal', url: 'https://webgym.pt/personal' },
  { name: 'WebAgenda', url: 'https://webagenda.pt' },
  { name: 'WebScan', url: '#' },
  { name: 'WebContas', url: 'https://webcontas.pt' },
  { name: 'Datun AI', url: 'https://datun.ai' },
]

function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')

  const openModal = (type) => {
    setModalType(type)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setModalType('')
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="./webazul-white.png" alt="WebAzul" className="footer-logo-image" />
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">{t('footer.products')}</h4>
            <nav className="footer-links">
              {products.map((p) => (
                <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="footer-link">
                  {p.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">{t('footer.contact')}</h4>
            <div className="footer-links">
              <span className="footer-text">{t('footer.address')}</span>
              <a href="mailto:contacto@webazul.pt" className="footer-link">{t('footer.email')}</a>
              <a href="tel:+351910084099" className="footer-link">{t('footer.phone')}</a>
              <span className="footer-text">{t('footer.nif')}</span>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">{t('footer.legal')}</h4>
            <div className="footer-links">
              <button onClick={() => openModal('privacy')} className="footer-link-btn">
                {t('footer.privacyPolicy')}
              </button>
              <button onClick={() => openModal('terms')} className="footer-link-btn">
                {t('footer.termsService')}
              </button>
              <button onClick={() => openModal('cookies')} className="footer-link-btn">
                {t('footer.cookies')}
              </button>
            </div>
            {/* <div className="footer-social">
              <a href="https://www.instagram.com/webazul.pt/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div> */}
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} WebAzul. {t('footer.rights')}</p>
        </div>
      </div>

      <LegalModal isOpen={modalOpen} onClose={closeModal} type={modalType} />
    </footer>
  )
}

export default Footer
