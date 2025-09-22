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
      title: t('services.webDev.title'),
      description: t('services.webDev.description'),
      features: t('services.webDev.features'),
      icon: FaCode,
      badge: t('services.webDev.badge'),
      popular: true
    },
    {
      title: t('services.socialMedia.title'),
      description: t('services.socialMedia.description'),
      features: t('services.socialMedia.features'),
      icon: FaShare,
      popular: false
    },
    {
      title: t('services.hosting.title'),
      description: t('services.hosting.description'),
      features: t('services.hosting.features'),
      icon: FaServer,
      popular: false
    },
    /* {
      title: t('services.seo.title'),
      description: t('services.seo.description'),
      features: t('services.seo.features'),
      icon: FaSearch,
      badge: t('services.seo.badge'),
      popular: true
    } */
  ]

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
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

        <div className="services-custom">
          <div className="custom-service-card">
            <h3 className="custom-title">{t('services.customTitle')}</h3>
            <p className="custom-description">{t('services.customDescription')}</p>
            <button className="custom-cta" onClick={scrollToContact}>
              {t('services.customButton')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection