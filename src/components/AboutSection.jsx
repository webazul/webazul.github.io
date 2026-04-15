import { useTranslation } from 'react-i18next'
import { FaCheck, FaMapMarkerAlt, FaHeart } from 'react-icons/fa'
import './AboutSection.css'

const valueIcons = {
  simplicity: FaCheck,
  local: FaMapMarkerAlt,
  quality: FaHeart,
}

const valueKeys = ['simplicity', 'local', 'quality']

function AboutSection() {
  const { t } = useTranslation()

  return (
    <section id="sobre" className="about-section">
      <div className="about-container">
        <div className="about-header">
          <span className="about-badge">{t('about.badge')}</span>
          <h2 className="about-title">
            {t('about.title')} <span className="about-highlight">{t('about.titleHighlight')}</span>
          </h2>
          <p className="about-description">{t('about.description')}</p>
        </div>

        <div className="about-values">
          {valueKeys.map((key) => {
            const Icon = valueIcons[key]
            return (
              <div key={key} className="value-card">
                <div className="value-icon">
                  <Icon />
                </div>
                <h3 className="value-title">{t(`about.values.${key}.title`)}</h3>
                <p className="value-description">{t(`about.values.${key}.description`)}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AboutSection
