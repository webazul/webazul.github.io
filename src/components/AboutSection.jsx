import { useTranslation } from 'react-i18next'
import './AboutSection.css'
import { RiScissorsLine, RiShirtLine, RiStarLine } from 'react-icons/ri'

function AboutSection() {
  const { t } = useTranslation()
  return (
    <section id="sobre" className="about">
      <div className="about-container">
        <div className="about-image">
          <img
            src="/sonhos-em-linha-2.png"
            alt="Atelier Sonhos em Linha - Sobre nós"
            className="about-img"
          />
        </div>
        <div className="about-content">
          <div className="about-badge">
            <span>{t('about.badge')}</span>
          </div>
          <h2 className="about-title">
            {t('about.title')}
            <span className="highlight"> {t('about.titleHighlight')}</span>
          </h2>
          <p className="about-text">
            {t('about.description')}
          </p>
          <div className="about-features">
            <div className="feature">
              <div className="feature-icon">
                <RiScissorsLine />
              </div>
              <div className="feature-content">
                <h4>{t('about.feature1Title')}</h4>
                <p>{t('about.feature1Text')}</p>
              </div>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <RiShirtLine />
              </div>
              <div className="feature-content">
                <h4>{t('about.feature2Title')}</h4>
                <p>{t('about.feature2Text')}</p>
              </div>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <RiStarLine />
              </div>
              <div className="feature-content">
                <h4>{t('about.feature3Title')}</h4>
                <p>{t('about.feature3Text')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection