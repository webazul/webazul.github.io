import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './SocialMediaSection.css'
import { FaInstagram, FaUsers, FaChartLine, FaPalette } from 'react-icons/fa'

function SocialMediaSection() {
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

    const section = document.getElementById('social-media')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const socialProjects = [
    {
      id: 1,
      client: 'TechStart',
      image: './assets/social/techstart-social.jpg',
      category: 'Tecnologia'
    },
    {
      id: 2,
      client: 'Fashion Store',
      image: './assets/social/fashion-social.jpg',
      category: 'Moda'
    },
    {
      id: 3,
      client: 'Fitness Club',
      image: './assets/social/fitness-social.jpg',
      category: 'Fitness'
    }
  ]


  return (
    <section id="social-media" className={`social-media-section ${isVisible ? 'visible' : ''}`}>
      <div className="social-media-container">
        <div className="social-media-header">
          <div className="social-media-badge">
            <span>{t('socialMedia.badge')}</span>
          </div>
          <h2 className="social-media-title">
            {t('socialMedia.title')} <span className="title-highlight">{t('socialMedia.titleHighlight')}</span>
          </h2>
          <p className="social-media-subtitle">{t('socialMedia.subtitle')}</p>
        </div>

        <div className="social-projects-grid">
          {socialProjects.map((project, index) => {
            const IconComponent = project.icon
            return (
              <div
                key={project.id}
                className="social-project-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="project-image">
                  <img src={project.image} alt={`${project.client} Social Media`} />
                  <div className="image-overlay">
                    <button
                      className="view-project-btn"
                      onClick={() => window.open('#', '_blank')}
                    >
                      <FaInstagram />
                      {t('socialMedia.buttons.viewPost')}
                    </button>
                  </div>
                </div>

                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-client">{project.client}</h3>
                    <span className="project-category">{project.category}</span>
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

export default SocialMediaSection