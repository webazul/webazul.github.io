import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './HeroSection.css'

function HeroSection() {
  const { t } = useTranslation()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="inicio" className={`hero-section ${isLoaded ? 'loaded' : ''}`}>
      <div className="hero-background">
        <div className="network-visualization">
          <div className="network-node network-node-1"></div>
          <div className="network-node network-node-2"></div>
          <div className="network-node network-node-3"></div>
          <div className="network-node network-node-4"></div>
          <div className="network-connection connection-1"></div>
          <div className="network-connection connection-2"></div>
          <div className="network-connection connection-3"></div>
          <div className="network-connection connection-4"></div>
        </div>

      </div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-brand">
            <img src="./webazul-white.png" alt="WebAzul Creative Studio" className="brand-logo-image" />
          </div>

          <div className="hero-text">
            <h2 className="hero-subtitle">{t('hero.subtitle')}</h2>
            <p className="hero-description">{t('hero.description')}</p>
          </div>


          <div className="hero-cta">
            <button
              className="cta-primary"
              onClick={() => scrollToSection('contact')}
            >
              {t('hero.cta.primary')}
            </button>
            {/* <button
              className="cta-secondary"
              onClick={() => scrollToSection('portfolio')}
            >
              {t('hero.cta.secondary')}
            </button> */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection