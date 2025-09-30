import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './SocialMediaSection.css'
import { FaInstagram, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

function SocialMediaSection() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

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
      client: '@post_1',
      image: 'https://via.placeholder.com/1080x1350/f59e0b/ffffff?text=Post+1',
      instagramUrl: 'https://www.instagram.com/p/DPM0i5CkZxH/?igsh=MXVzMmNza3h5ajZrNA%3D%3D',
      embedCode: 'DPM0i5CkZxH',
      useEmbed: true
    },
    {
      id: 2,
      client: '@victor_sleepwear',
      image: 'https://via.placeholder.com/1080x1350/2563eb/ffffff?text=@victor_sleepwear',
      instagramUrl: 'https://www.instagram.com/p/DPEam-6DQLp/?igsh=YTRuN3kxeXoxem9n',
      embedCode: 'DPEam-6DQLp',
      useEmbed: true
    },
    {
      id: 3,
      client: '@post_3',
      image: 'https://via.placeholder.com/1080x1350/10b981/ffffff?text=Post+3',
      instagramUrl: 'https://www.instagram.com/p/DPE4F3qDJSN/?igsh=bDYwMjllNTVtOWg5',
      embedCode: 'DPE4F3qDJSN',
      useEmbed: true
    }
  ]

  const itemsPerView = 3
  const totalSlides = Math.ceil(socialProjects.length / itemsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const getVisibleProjects = () => {
    const start = currentIndex * itemsPerView
    const end = start + itemsPerView
    return socialProjects.slice(start, end)
  }

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

        <div className="social-carousel-container">
          <button className="social-carousel-btn prev" onClick={prevSlide} aria-label="Anterior">
            <FaChevronLeft />
          </button>

          <div className="social-projects-grid">
            {getVisibleProjects().map((project, index) => {
              return (
                <div
                  key={project.id}
                  className={`social-project-card ${project.useEmbed ? 'embed-card' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="project-image">
                    {project.useEmbed && project.embedCode ? (
                      <iframe
                        src={`https://www.instagram.com/p/${project.embedCode}/embed`}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        allowTransparency="true"
                        style={{ border: 'none', overflow: 'hidden' }}
                      />
                    ) : (
                      <>
                        <img src={project.image} alt={`${project.client} Social Media`} />
                        <div className="image-overlay">
                          <button
                            className="view-project-btn"
                            onClick={() => window.open(project.instagramUrl || '#', '_blank')}
                          >
                            <FaInstagram />
                            {t('socialMedia.buttons.viewPost')}
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {!project.useEmbed && (
                    <div className="project-content">
                      <div className="project-header">
                        <h3 className="project-client">{project.client}</h3>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <button className="social-carousel-btn next" onClick={nextSlide} aria-label="Próximo">
            <FaChevronRight />
          </button>
        </div>

        <div className="social-carousel-indicators">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default SocialMediaSection