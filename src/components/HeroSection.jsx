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

  return (
    <section id="inicio" className={`hero-section ${isLoaded ? 'loaded' : ''}`}>
      <div className="hero-background">
        <Particles
          particleColors={['#2563eb', '#3b82f6', '#1e40af']}
          particleCount={80}
          particleSpread={10}
          speed={0.08}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-brand">
            <img src="./webazul-white.png" alt="WebAzul" className="brand-logo-image" />
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint">
        <div className="scroll-line" />
      </div>
    </section>
  )
}

export default HeroSection
