import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './ContactForm.css'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { trackFormSubmit, trackSectionView, trackContactClick, trackError } from '../utils/analytics'

function ContactForm() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          trackSectionView('Contact Form')
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('contacto')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://form.webazul.pt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': 'token-webazul-0e781asv'
        },
        body: JSON.stringify({
          nome: formData.name,
          email: formData.email,
          telefone: formData.phone || '',
          mensagem: formData.message
        })
      })

      if (response.ok) {
        setSubmitMessage(t('contact.form.success'))
        trackFormSubmit('Contact Form', {
          has_phone: !!formData.phone,
          message_length: formData.message.length,
        })
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setSubmitMessage(t('contact.form.error'))
        trackError('form_submission_error', `HTTP ${response.status}`)
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
      setSubmitMessage(t('contact.form.error'))
      trackError('form_submission_error', error.message)
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitMessage(''), 5000)
    }
  }

  return (
    <section id="contacto" className={`contact-section ${isVisible ? 'visible' : ''}`}>
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">{t('contact.title')}</h2>
          <p className="contact-subtitle">{t('contact.subtitle')}</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-items">
              <div className="info-item">
                <div className="info-icon"><FaEnvelope /></div>
                <div className="info-text">
                  <span className="info-label">Email</span>
                  <a
                    href="mailto:contacto@webazul.pt"
                    className="info-value"
                    onClick={() => trackContactClick('email', 'contacto@webazul.pt')}
                  >
                    {t('footer.email')}
                  </a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon"><FaPhone /></div>
                <div className="info-text">
                  <span className="info-label">{t('contact.phoneLabel')}</span>
                  <a
                    href="tel:+351910084099"
                    className="info-value"
                    onClick={() => trackContactClick('phone', '+351910084099')}
                  >
                    {t('footer.phone')}
                  </a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon"><FaMapMarkerAlt /></div>
                <div className="info-text">
                  <span className="info-label">{t('contact.addressLabel')}</span>
                  <span className="info-value">{t('footer.address')}</span>
                </div>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {submitMessage && (
              <div className={`submit-message ${submitMessage === t('contact.form.success') ? 'success' : 'error'}`}>
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

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
