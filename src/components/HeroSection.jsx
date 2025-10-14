import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './HeroSection.css'
import Particles from './Particles'
import { trackCTAClick, trackSectionView } from '../utils/analytics'

function HeroSection() {
  const { t } = useTranslation()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    // Track section view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackSectionView('Hero')
        }
      },
      { threshold: 0.5 }
    )

    const section = document.getElementById('inicio')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleCTAClick = (ctaName, sectionId) => {
    trackCTAClick(ctaName, 'Hero Section')
    scrollToSection(sectionId)
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
              onClick={() => handleCTAClick('Começar Projeto', 'contact')}
            >
              {t('hero.cta.primary')}
            </button>
            {/* <button
              className="cta-secondary"
              onClick={() => handleCTAClick('Ver Portfolio', 'portfolio')}
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