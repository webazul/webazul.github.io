import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './ServicesSection.css'
import { FaCode, FaShare, FaServer, FaSearch, FaArrowRight } from 'react-icons/fa'

function ServicesSection() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('services')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const services = [
    {
      title: t('services.systems.title'),
      description: t('services.systems.description'),
      features: t('services.systems.features'),
      icon: FaCode,
      badge: t('services.systems.badge'),
      popular: true,
      link: '#systems'
    },
    {
      title: t('services.landing.title'),
      description: t('services.landing.description'),
      features: t('services.landing.features'),
      icon: FaServer,
      popular: false,
      link: '#landing-pages'
    },
    {
      title: t('services.socialMedia.title'),
      description: t('services.socialMedia.description'),
      features: t('services.socialMedia.features'),
      icon: FaShare,
      popular: false,
      link: '#social-media'
    }
  ]

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToSection = (sectionId) => {
    // Remove o # do início se existir
    const cleanId = sectionId.replace('#', '')
    document.getElementById(cleanId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="services" className={`services-section ${isVisible ? 'visible' : ''}`}>
      <div className="services-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="services-container">
        <div className="services-header">
          <div className="services-badge">
            <span>{t('services.badge')}</span>
          </div>
          <h2 className="services-title">
            {t('services.title')}
            <span className="title-highlight"> {t('services.titleHighlight')}</span>
          </h2>
        </div>

        <div className="services-grid">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div
                key={index}
                className={`service-card ${service.popular ? 'popular' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => scrollToSection(service.link)}
              >
                {service.popular && (
                  <div className="popular-badge">
                    <span>{service.badge}</span>
                  </div>
                )}

                <div className="service-icon">
                  <IconComponent />
                </div>

                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>

                  <ul className="service-features">
                    {Array.isArray(service.features) && service.features.map((feature, idx) => (
                      <li key={idx}>
                        <span className="checkmark">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection