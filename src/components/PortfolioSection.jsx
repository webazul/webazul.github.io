import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './PortfolioSection.css'
import { FaExternalLinkAlt } from 'react-icons/fa'

function PortfolioSection() {
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
      image: '/assets/projects/arcanuns.png',
      url: 'https://arcanuns.com',
      tech: ['React.js', 'Inteligência Artificial', 'Node.js', 'API REST']
    },
    {
      id: 2,
      title: 'Datun.ai',
      description: 'Plataforma SaaS de IA para limpeza e padronização de dados',
      category: 'Corporativo',
      image: '/assets/projects/datunai.png',
      url: 'https://datun.ai',
      tech: ['JavaScript', 'Python', 'Machine Learning', 'CSS3']
    },
    {
      id: 3,
      title: 'Sonhos em Linha',
      description: 'Landing page moderna para moda nupcial e vestidos personalizados',
      category: 'Landing Page',
      image: '/assets/projects/sonhosemlinha.png',
      url: 'https://sonhosemlinha.pt',
      tech: ['JavaScript', 'CSS3', 'HTML5', 'Design Responsivo']
    }
  ]


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

        <div className="portfolio-grid grid">
          {projects.length > 0 ? (
            projects.map((project, index) => (
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
                      e.target.parentElement.style.height = '300px'
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

                  <div className="portfolio-tech">
                    {project.tech.map((tech, idx) => (
                      <span key={idx} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="portfolio-empty">
              <p>Nenhum projeto encontrado nesta categoria.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default PortfolioSection
