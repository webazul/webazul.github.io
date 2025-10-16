import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './AutoAzulPage.css'
import { FaCar, FaCheck, FaArrowLeft, FaPlay, FaChartLine, FaCogs, FaMobile, FaShieldAlt, FaUsers, FaCalendar } from 'react-icons/fa'
import Footer from '../components/Footer'
import WhatsAppWidget from '../components/WhatsAppWidget'
import Particles from '../components/Particles'
import SEO from '../components/SEO'

function AutoAzulPage() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    setIsVisible(true)
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
          empresa: formData.company || '',
          mensagem: `[AutoAzul] ${formData.message}`
        })
      })

      if (response.ok) {
        setSubmitMessage('Mensagem enviada com sucesso! Entraremos em contacto em breve.')
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: ''
        })
      } else {
        setSubmitMessage('Erro ao enviar mensagem. Por favor, tente novamente.')
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
      setSubmitMessage('Erro ao enviar mensagem. Por favor, tente novamente.')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => {
        setSubmitMessage('')
      }, 5000)
    }
  }

  const features = [
    {
      icon: FaCar,
      title: 'Gestão de Stock',
      description: 'Controle completo do inventário de veículos com fotos, fichas técnicas e histórico'
    },
    {
      icon: FaMobile,
      title: 'Website Responsivo',
      description: 'Website personalizado e otimizado para conversão em todos os dispositivos'
    },
    {
      icon: FaUsers,
      title: 'CRM Integrado',
      description: 'Gestão de leads, clientes e follow-ups automáticos'
    },
    {
      icon: FaChartLine,
      title: 'Relatórios de Vendas',
      description: 'Dashboard com métricas de performance e análise de vendas'
    },
    {
      icon: FaCalendar,
      title: 'Test Drives',
      description: 'Sistema de marcação online com notificações automáticas'
    },
    {
      icon: FaShieldAlt,
      title: 'Segurança e Backup',
      description: 'Dados protegidos com backup automático diário'
    }
  ]

  const benefits = [
    'Gestão completa de stock de veículos',
    'Landing page responsiva personalizada',
    'CRM integrado para gestão de clientes',
    'Relatórios de vendas e performance',
    'Sistema de agendamento de test drives',
    'Integração com redes sociais',
    'Sistema de financiamento integrado',
    'Galeria de fotos ilimitada',
    'Otimização SEO incluída',
    'Suporte técnico dedicado'
  ]

  const pricingPlans = [
    {
      name: 'Professional',
      price: '349€',
      period: '/mês',
      features: [
        'Até 200 veículos',
        'Landing page premium',
        'CRM avançado',
        'Relatórios semanais',
        'Agendamento test drives',
        'Integração social media',
        'Suporte prioritário'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: [
        'Veículos ilimitados',
        'Landing page premium+',
        'CRM completo',
        'Relatórios em tempo real',
        'Todas as integrações',
        'Multi-localização',
        'Suporte 24/7',
        'Personalização total'
      ],
      popular: false
    }
  ]

  return (
    <div className={`autoazul-page ${isVisible ? 'visible' : ''}`}>
      <SEO
        title="AutoAzul - Sistema de Gestão para Automóveis | WebAzul"
        description="Sistema completo para gestão de concessionárias e stands automóveis. CRM integrado, gestão de stock, landing page personalizada, relatórios de vendas e agendamento de test drives. Transforme seu stand automóvel!"
        keywords="AutoAzul, sistema gestão automóveis, software stand automóveis, CRM automóveis, gestão stock veículos, concessionária software, stand automóvel Portugal, software concessionária, sistema vendas carros, gestão leads automóveis, landing page stand, test drives online, relatórios vendas automóveis"
        url="https://webazul.pt/auto"
        image="https://webazul.pt/webazul-white.png"
        type="website"
      />
      {/* Hero Section */}
      <section className="autoazul-hero">
        <div className="hero-background">
          <Particles
            particleColors={['#2563eb', '#3b82f6', '#1e40af']}
            particleCount={100}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
        </div>

        <div className="hero-container">
          <Link to="/" className="back-button">
            <FaArrowLeft />
            <span>Voltar</span>
          </Link>

          <div className="hero-content">
            <div className="hero-badge">
              <FaCar />
              <span>Automóvel</span>
            </div>

            <h1 className="hero-title">
              Auto<span className="title-highlight">Azul</span>
            </h1>

            <p className="hero-description">
              Sistema completo para gestão de concessionárias e stands automóveis com landing page personalizada.
            </p>

            <div className="hero-actions">
              <button
                className="demo-btn"
                onClick={() => window.open('https://auto.webazul.pt/', '_blank')}
              >
                <FaPlay />
                Ver Demo
              </button>
              <button
                className="contact-btn"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Começar Agora
              </button>
            </div>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">50+</div>
              <div className="stat-label">Stands Ativos</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">10K+</div>
              <div className="stat-label">Veículos Geridos</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">99%</div>
              <div className="stat-label">Satisfação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="section-header">
            <h2 className="section-title">
              Funcionalidades <span className="title-highlight">Principais</span>
            </h2>
            <p className="section-subtitle">
              Tudo o que precisa para gerir o seu stand automóvel de forma profissional
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    <IconComponent />
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="benefits-container">
          <div className="section-header">
            <h2 className="section-title">
              O que está <span className="title-highlight">incluído</span>
            </h2>
            <p className="section-subtitle">
              Todas as ferramentas e recursos para o sucesso do seu negócio
            </p>
          </div>

          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-item">
                <FaCheck className="check-icon" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="pricing-container">
          <div className="section-header">
            <h2 className="section-title">
              Planos e <span className="title-highlight">Preços</span>
            </h2>
            <p className="section-subtitle">
              Escolha o plano ideal para o seu negócio
            </p>
          </div>

          <div className="pricing-grid">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && (
                  <div className="popular-badge">
                    <span>Mais Popular</span>
                  </div>
                )}

                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-price">
                  <span className="price">{plan.price}</span>
                  <span className="period">{plan.period}</span>
                </div>

                <ul className="plan-features">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>
                      <FaCheck />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="plan-btn"
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Começar Agora
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="contact-form-section">
        <div className="form-container">
          <div className="section-header">
            <h2 className="section-title">
              Começar com <span className="title-highlight">AutoAzul</span>
            </h2>
            <p className="section-subtitle">
              Preencha o formulário e entraremos em contacto em breve
            </p>
          </div>

          <form className="autoazul-form" onSubmit={handleSubmit}>
            {submitMessage && (
              <div className={`submit-message ${submitMessage.includes('sucesso') ? 'success' : 'error'}`}>
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
                placeholder="Conte-nos sobre o seu stand e necessidades..."
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
      </section>

      <Footer />
      <WhatsAppWidget />
    </div>
  )
}

export default AutoAzulPage
