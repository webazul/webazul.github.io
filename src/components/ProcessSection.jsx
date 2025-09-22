import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './ProcessSection.css'
import { FaSearch, FaCode, FaRocket, FaTools, FaArrowRight } from 'react-icons/fa'

function ProcessSection() {
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

    const section = document.getElementById('process')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const steps = [
    {
      key: 'research',
      title: t('process.steps.research.title'),
      description: t('process.steps.research.description'),
      icon: FaSearch
    },
    {
      key: 'development',
      title: t('process.steps.development.title'),
      description: t('process.steps.development.description'),
      icon: FaCode
    },
    {
      key: 'launch',
      title: t('process.steps.launch.title'),
      description: t('process.steps.launch.description'),
      icon: FaRocket
    },
    {
      key: 'maintenance',
      title: t('process.steps.maintenance.title'),
      description: t('process.steps.maintenance.description'),
      icon: FaTools
    }
  ]

  return (
    <section id="process" className={`process-section ${isVisible ? 'visible' : ''}`}>
      <div className="process-container">
        <div className="process-header">
          <div className="process-badge">
            <span>{t('process.badge')}</span>
          </div>
          <h2 className="process-title">
            {t('process.title')}
            <span className="title-highlight"> {t('process.titleHighlight')}</span>
          </h2>
        </div>

        <div className="process-steps">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div
                key={step.key}
                className="process-step"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="step-icon">
                  <IconComponent />
                </div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="step-arrow">
                    <FaArrowRight />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProcessSection