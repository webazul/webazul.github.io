import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './PortfolioSection.css'
import { FaExternalLinkAlt, FaChevronDown } from 'react-icons/fa'

function PortfolioSection() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640)
  const [visibleCount, setVisibleCount] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 640
      setIsMobile(mobile)
      if (!mobile) {
        setVisibleCount(Infinity)
      } else {
        setVisibleCount(3)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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

  // Projetos realizados
  const projects = [
    {
      id: 1,
      title: 'Arcanuns',
      description: 'Plataforma de numerologia pitagórica com análises personalizadas',
      category: 'Corporativo',
      image: '/arcanuns.png',
      url: 'https://arcanuns.com'
    },
    {
      id: 2,
      title: 'Datun.ai',
      description: 'Plataforma de IA para limpeza e padronização de dados',
      category: 'Corporativo',
      image: '/datun.png',
      url: 'https://datun.ai'
    },
    {
      id: 3,
      title: 'DhubStream',
      description: 'Plataforma de streaming e gestão de conteúdos digitais',
      category: 'Corporativo',
      image: '/dhub.png',
      url: 'https://dhub.stream'
    },
    {
      id: 4,
      title: 'Sonhos em Linha',
      description: 'Landing page moderna para moda nupcial e vestidos personalizados',
      category: 'Landing Page',
      image: '/sonhosemlinha.png',
      url: 'https://sonhosemlinha.pt'
    },
    {
      id: 5,
      title: 'Soarense FC',
      description: 'Landing page com painel admin para gestão e cadastro de jogos',
      category: 'Landing Page',
      image: '/soarensefc.png',
      url: 'https://soarensefc.pt'
    }
  ]

  const displayedProjects = isMobile ? projects.slice(0, visibleCount) : projects
  const hasMore = isMobile && visibleCount < projects.length

  const showMore = () => {
    setVisibleCount(prev => prev + 3)
  }

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

        <div className="portfolio-grid">
          {displayedProjects.map((project, index) => (
            <div
              key={project.id}
              className="portfolio-item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="portfolio-image">
                <span className="portfolio-category-badge">
                  {project.category}
                </span>
                <img
                  src={project.image}
                  alt={project.title}
                  className="portfolio-img"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    e.target.parentElement.style.height = '200px'
                  }}
                />
                <div className="portfolio-overlay">
                  <div className="portfolio-actions">
                    <button
                      className="action-btn visit-btn"
                      onClick={() => window.open(project.url, '_blank')}
                    >
                      <FaExternalLinkAlt />
                      {t('portfolio.buttons.visit')}
                    </button>
                  </div>
                </div>
              </div>

              <div className="portfolio-content">
                <h3 className="portfolio-title-item">{project.title}</h3>
                <p className="portfolio-description">{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="portfolio-show-more">
            <button className="show-more-btn" onClick={showMore}>
              {t('portfolio.buttons.showMore')}
              <FaChevronDown />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default PortfolioSection
