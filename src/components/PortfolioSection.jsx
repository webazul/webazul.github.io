import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './PortfolioSection.css'
import { FaExternalLinkAlt, FaEye, FaFilter, FaTh } from 'react-icons/fa'

function PortfolioSection() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('all')
  const [layout, setLayout] = useState('grid')
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

    const section = document.getElementById('portfolio')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const categories = [
    { id: 'all', label: t('portfolio.filters.all') },
    { id: 'websites', label: t('portfolio.filters.websites') },
    { id: 'ecommerce', label: t('portfolio.filters.ecommerce') },
    { id: 'apps', label: t('portfolio.filters.apps') },
    { id: 'branding', label: t('portfolio.filters.branding') }
  ]

  const portfolioItems = [
    {
      id: 1,
      category: 'ecommerce',
      title: t('portfolio.projects.projeto1.title'),
      description: t('portfolio.projects.projeto1.description'),
      tech: t('portfolio.projects.projeto1.tech'),
      year: t('portfolio.projects.projeto1.year'),
      views: t('portfolio.projects.projeto1.views'),
      url: t('portfolio.projects.projeto1.url'),
      image: 'https://via.placeholder.com/400x300/2563eb/ffffff?text=E-commerce+Fashion'
    },
    {
      id: 2,
      category: 'apps',
      title: t('portfolio.projects.projeto2.title'),
      description: t('portfolio.projects.projeto2.description'),
      tech: t('portfolio.projects.projeto2.tech'),
      year: t('portfolio.projects.projeto2.year'),
      views: t('portfolio.projects.projeto2.views'),
      url: t('portfolio.projects.projeto2.url'),
      image: 'https://via.placeholder.com/400x300/10b981/ffffff?text=App+Fitness'
    },
    {
      id: 3,
      category: 'websites',
      title: t('portfolio.projects.projeto3.title'),
      description: t('portfolio.projects.projeto3.description'),
      tech: t('portfolio.projects.projeto3.tech'),
      year: t('portfolio.projects.projeto3.year'),
      views: t('portfolio.projects.projeto3.views'),
      url: t('portfolio.projects.projeto3.url'),
      image: 'https://via.placeholder.com/400x300/6366f1/ffffff?text=Website+Corporativo'
    },
    {
      id: 4,
      category: 'apps',
      title: t('portfolio.projects.projeto4.title'),
      description: t('portfolio.projects.projeto4.description'),
      tech: t('portfolio.projects.projeto4.tech'),
      year: t('portfolio.projects.projeto4.year'),
      views: t('portfolio.projects.projeto4.views'),
      url: t('portfolio.projects.projeto4.url'),
      image: 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=Plataforma+Educativa'
    },
    {
      id: 5,
      category: 'branding',
      title: t('portfolio.projects.projeto5.title'),
      description: t('portfolio.projects.projeto5.description'),
      tech: t('portfolio.projects.projeto5.tech'),
      year: t('portfolio.projects.projeto5.year'),
      views: t('portfolio.projects.projeto5.views'),
      url: t('portfolio.projects.projeto5.url'),
      image: 'https://via.placeholder.com/400x300/ec4899/ffffff?text=Brand+Identity'
    },
    {
      id: 6,
      category: 'ecommerce',
      title: t('portfolio.projects.projeto6.title'),
      description: t('portfolio.projects.projeto6.description'),
      tech: t('portfolio.projects.projeto6.tech'),
      year: t('portfolio.projects.projeto6.year'),
      views: t('portfolio.projects.projeto6.views'),
      url: t('portfolio.projects.projeto6.url'),
      image: 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Marketplace+Local'
    },
    {
      id: 7,
      category: 'websites',
      title: t('portfolio.projects.projeto7.title'),
      description: t('portfolio.projects.projeto7.description'),
      tech: t('portfolio.projects.projeto7.tech'),
      year: t('portfolio.projects.projeto7.year'),
      views: t('portfolio.projects.projeto7.views'),
      url: t('portfolio.projects.projeto7.url'),
      image: 'https://via.placeholder.com/400x300/ef4444/ffffff?text=Portal+Noticias'
    },
    {
      id: 8,
      category: 'apps',
      title: t('portfolio.projects.projeto8.title'),
      description: t('portfolio.projects.projeto8.description'),
      tech: t('portfolio.projects.projeto8.tech'),
      year: t('portfolio.projects.projeto8.year'),
      views: t('portfolio.projects.projeto8.views'),
      url: t('portfolio.projects.projeto8.url'),
      image: 'https://via.placeholder.com/400x300/06b6d4/ffffff?text=SaaS+Analytics'
    }
  ]

  const filteredItems = activeCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory)

  return (
    <section id="portfolio" className={`portfolio-section ${isVisible ? 'visible' : ''}`}>
      <div className="portfolio-container">
        <div className="portfolio-header">
          <div className="portfolio-badge">
            <span>{t('portfolio.badge')}</span>
          </div>
          <h2 className="portfolio-title">
            {t('portfolio.title')}
            <span className="title-highlight"> {t('portfolio.titleHighlight')}</span>
          </h2>
          <p className="portfolio-subtitle">
            {t('portfolio.subtitle')}
          </p>
        </div>

        <div className="portfolio-controls">
          <div className="portfolio-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="layout-controls">
            <button
              className={`layout-btn ${layout === 'grid' ? 'active' : ''}`}
              onClick={() => setLayout('grid')}
              title="Grid Layout"
            >
              <FaTh />
            </button>
            <button
              className={`layout-btn ${layout === 'masonry' ? 'active' : ''}`}
              onClick={() => setLayout('masonry')}
              title="Masonry Layout"
            >
              <FaFilter />
            </button>
          </div>
        </div>

        <div className={`portfolio-grid ${layout}`}>
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="portfolio-item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="portfolio-image">
                <img
                  src={item.image}
                  alt={item.title}
                  className="portfolio-img"
                />
                <div className="portfolio-overlay">
                  <div className="portfolio-actions">
                    <button className="action-btn preview-btn">
                      <FaEye />
                      <span>Preview</span>
                    </button>
                    <button
                      className="action-btn visit-btn"
                      onClick={() => window.open(item.url, '_blank')}
                    >
                      <FaExternalLinkAlt />
                      <span>{t('portfolio.buttons.viewSite')}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="portfolio-content">
                <div className="portfolio-meta">
                  <span className="portfolio-category">{categories.find(cat => cat.id === item.category)?.label}</span>
                  <div className="portfolio-stats">
                    <span className="portfolio-views">
                      <FaEye /> {item.views}
                    </span>
                    <span className="portfolio-year">{item.year}</span>
                  </div>
                </div>

                <h3 className="portfolio-title-item">{item.title}</h3>
                <p className="portfolio-description">{item.description}</p>

                <div className="portfolio-tech">
                  {Array.isArray(item.tech) && item.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="portfolio-empty">
            <p>Nenhum projeto encontrado nesta categoria.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default PortfolioSection