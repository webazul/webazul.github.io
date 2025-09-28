import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './HeroSection.css'
import Particles from './Particles'

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
        <Particles
          particleColors={['#2563eb', '#3b82f6', '#1e40af']}
          particleCount={100}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
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