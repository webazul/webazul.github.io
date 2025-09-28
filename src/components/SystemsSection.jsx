import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './SystemsSection.css'
import { FaCar, FaHome, FaCut, FaCheck, FaArrowRight, FaPlay, FaEye } from 'react-icons/fa'

function SystemsSection() {
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

    const section = document.getElementById('systems')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const systems = [
    {
      id: 'autoazul',
      title: t('systems.autoazul.title'),
      description: t('systems.autoazul.description'),
      features: t('systems.autoazul.features', { returnObjects: true }),
      icon: FaCar,
      demoUrl: 'https://autoazul.webazul.pt',
      category: 'Automóvel',
      color: '#dc2626',
      gradient: 'linear-gradient(135deg, #dc2626, #b91c1c)',
      popular: true
    },
    {
      id: 'imobiazul',
      title: t('systems.imobiazul.title'),
      description: t('systems.imobiazul.description'),
      features: t('systems.imobiazul.features', { returnObjects: true }),
      icon: FaHome,
      demoUrl: 'https://imobiazul.webazul.pt',
      category: 'Imobiliário',
      color: '#059669',
      gradient: 'linear-gradient(135deg, #059669, #047857)',
      popular: false
    },
    {
      id: 'belezaazul',
      title: t('systems.belezaazul.title'),
      description: t('systems.belezaazul.description'),
      features: t('systems.belezaazul.features', { returnObjects: true }),
      icon: FaCut,
      demoUrl: '#',
      category: 'Beleza & Bem-estar',
      color: '#7c3aed',
      gradient: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
      popular: false,
      comingSoon: true
    }
  ]

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="systems" className={`systems-section ${isVisible ? 'visible' : ''}`}>
      <div className="systems-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="systems-container">
        <div className="systems-header">
          <div className="systems-badge">
            <span>{t('systems.badge')}</span>
          </div>
          <h2 className="systems-title">
            {t('systems.title')} <span className="title-highlight">{t('systems.titleHighlight')}</span>
          </h2>
        </div>

        <div className="systems-grid">
          {systems.map((system) => {
            const IconComponent = system.icon
            return (
              <div
                key={system.id}
                className={`system-card ${system.popular ? 'popular' : ''} ${system.comingSoon ? 'coming-soon' : ''}`}
                style={{ '--system-color': system.color }}
              >
                {system.popular && (
                  <div className="popular-badge">
                    <span>{t('systems.badges.popular')}</span>
                  </div>
                )}

                {system.comingSoon && (
                  <div className="coming-soon-badge">
                    <span>{t('systems.badges.comingSoon')}</span>
                  </div>
                )}

                <div className="system-header">
                  <div className="system-icon" style={{ background: system.gradient }}>
                    <IconComponent />
                  </div>
                  <div className="system-info">
                    <h3 className="system-title">{system.title}</h3>
                    <span className="system-category">{system.category}</span>
                  </div>
                </div>

                <p className="system-description">{system.description}</p>

                <div className="system-features">
                  {system.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <FaCheck className="feature-icon" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="system-footer">
                  <div className="system-actions">
                    {!system.comingSoon && (
                      <button
                        className="demo-btn"
                        onClick={() => window.open(system.demoUrl, '_blank')}
                      >
                        <FaPlay />
                        {t('systems.buttons.demo')}
                      </button>
                    )}
                    <button
                      className="contact-btn"
                      onClick={scrollToContact}
                      disabled={system.comingSoon}
                    >
                      <FaArrowRight />
                      {system.comingSoon ? t('systems.buttons.notify') : t('systems.buttons.contact')}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SystemsSection