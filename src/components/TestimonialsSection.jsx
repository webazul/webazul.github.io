import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './TestimonialsSection.css'
import { FaPlay, FaPause, FaExpand, FaCheck } from 'react-icons/fa'

function TestimonialsSection() {
  const { t } = useTranslation()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
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

    const section = document.getElementById('testimonials')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isPlaying && isVisible) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [isPlaying, isVisible])

  const testimonials = [
    {
      id: 1,
      name: t('testimonials.clients.client1.name'),
      company: t('testimonials.clients.client1.company'),
      role: t('testimonials.clients.client1.role'),
      text: t('testimonials.clients.client1.text'),
      verified: t('testimonials.clients.client1.verified')
    },
    {
      id: 2,
      name: t('testimonials.clients.client2.name'),
      company: t('testimonials.clients.client2.company'),
      role: t('testimonials.clients.client2.role'),
      text: t('testimonials.clients.client2.text'),
      verified: t('testimonials.clients.client2.verified')
    },
    {
      id: 3,
      name: t('testimonials.clients.client3.name'),
      company: t('testimonials.clients.client3.company'),
      role: t('testimonials.clients.client3.role'),
      text: t('testimonials.clients.client3.text'),
      verified: t('testimonials.clients.client3.verified')
    },
    {
      id: 4,
      name: t('testimonials.clients.client4.name'),
      company: t('testimonials.clients.client4.company'),
      role: t('testimonials.clients.client4.role'),
      text: t('testimonials.clients.client4.text'),
      verified: t('testimonials.clients.client4.verified')
    }
  ]

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const selectTestimonial = (index) => {
    setCurrentTestimonial(index)
    setIsPlaying(false)
  }

  const current = testimonials[currentTestimonial]

  return (
    <section id="testimonials" className={`testimonials-section ${isVisible ? 'visible' : ''}`}>
      <div className="testimonials-container">
        <div className="testimonials-header">
          <div className="testimonials-badge">
            <span>{t('testimonials.badge')}</span>
          </div>
          <h2 className="testimonials-title">
            {t('testimonials.title')}
            <span className="title-highlight"> {t('testimonials.titleHighlight')}</span>
          </h2>
          {/* <p className="testimonials-subtitle">
            {t('testimonials.subtitle')}
          </p> */}
        </div>


        <div className="video-testimonial">
          <div className="video-player">
            <div className="video-screen">
              <div className="testimonial-content">
                <div className="client-info">
                  <div className="client-avatar">
                    {current.name.charAt(0)}
                  </div>
                  <div className="client-details">
                    <h3 className="client-name">{current.name}</h3>
                    <p className="client-role">{current.role}, {current.company}</p>
                    {current.verified && (
                      <div className="verified-badge">
                        <FaCheck /> {t('testimonials.labels.verified')}
                      </div>
                    )}
                  </div>
                </div>

                <div className="testimonial-text">
                  "{current.text}"
                </div>
              </div>
            </div>

            <div className="video-controls">
              <button className="control-btn play-pause" onClick={handlePlayPause}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>

              <div className="timeline">
                <div className="timeline-label">{t('testimonials.videoInterface.timeline')}</div>
                <div className="timeline-bar">
                  <div
                    className="timeline-progress"
                    style={{ width: `${((currentTestimonial + 1) / testimonials.length) * 100}%` }}
                  />
                </div>
                <div className="timeline-time">
                  {String(currentTestimonial + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                </div>
              </div>

              <div className="video-options">
                <span className="quality-badge">{t('testimonials.videoInterface.quality')}</span>
                <button className="control-btn fullscreen">
                  <FaExpand />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection