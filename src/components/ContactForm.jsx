import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './ContactForm.css'
import { FaRocket, FaClock, FaUsers, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

function ContactForm() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    timeline: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('contact')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envio do formulário
    setTimeout(() => {
      setSubmitMessage('Mensagem enviada com sucesso! Entraremos em contacto em breve.')
      setIsSubmitting(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        timeline: '',
        message: ''
      })

      setTimeout(() => {
        setSubmitMessage('')
      }, 5000)
    }, 2000)
  }

  return (
    <section id="contact" className={`contact-section ${isVisible ? 'visible' : ''}`}>
      <div className="contact-container">
        <div className="contact-header">
          <div className="contact-badge">
            <span>{t('contact.badge')}</span>
          </div>
          <h2 className="contact-title">
            {t('contact.title')}
            <span className="title-highlight"> {t('contact.titleHighlight')}</span>
          </h2>
          <p className="contact-subtitle">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3 className="info-title">{t('contact.info.title')}</h3>

            <div className="info-items">
              <div className="info-item">
                <div className="info-icon">
                  <FaEnvelope />
                </div>
                <div className="info-text">
                  <span className="info-label">Email</span>
                  <span className="info-value">{t('contact.info.email')}</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaPhone />
                </div>
                <div className="info-text">
                  <span className="info-label">{t('contact.info.phoneLabel')}</span>
                  <span className="info-value">{t('contact.info.phone')}</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="info-text">
                  <span className="info-label">{t('contact.info.locationLabel')}</span>
                  <span className="info-value">{t('contact.info.address')}</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaClock />
                </div>
                <div className="info-text">
                  <span className="info-label">{t('contact.info.hoursLabel')}</span>
                  <span className="info-value">{t('contact.info.hours')}</span>
                </div>
              </div>
            </div>

            <div className="contact-features">
              <div className="feature-item">
                <FaRocket className="feature-icon" />
                <span>{t('contact.features.fastResponse')}</span>
              </div>
              <div className="feature-item">
                <FaUsers className="feature-icon" />
                <span>{t('contact.features.freeConsultation')}</span>
              </div>
              <div className="feature-item">
                <FaClock className="feature-icon" />
                <span>{t('contact.features.meetDeadlines')}</span>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {submitMessage && (
              <div className="submit-message success">
                {submitMessage}
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">{t('contact.form.name')}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={t('contact.form.namePlaceholder')}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">{t('contact.form.email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t('contact.form.emailPlaceholder')}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">{t('contact.form.phone')}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('contact.form.phonePlaceholder')}
                />
              </div>
              <div className="form-group">
                <label htmlFor="company">{t('contact.form.company')}</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder={t('contact.form.companyPlaceholder')}
                />
              </div>
            </div>


            <div className="form-group">
              <label htmlFor="message">{t('contact.form.message')}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                required
                placeholder={t('contact.form.messagePlaceholder')}
              ></textarea>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactForm