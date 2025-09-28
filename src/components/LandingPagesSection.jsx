import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import './LandingPagesSection.css'
import { FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

function LandingPagesSection() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('landing-pages')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const projects = [
    {
      id: 1,
      title: 'TechStart',
      category: 'E-commerce',
      image: './assets/projects/techstart-mockup.jpg',
      url: 'https://techstart.webazul.pt'
    },
    {
      id: 2,
      title: 'Fashion Store',
      category: 'E-commerce',
      image: './assets/projects/fashion-mockup.jpg',
      url: 'https://fashion.webazul.pt'
    },
    {
      id: 3,
      title: 'Consultoria PM',
      category: 'Corporativo',
      image: './assets/projects/consultoria-mockup.jpg',
      url: 'https://consultoriapm.webazul.pt'
    },
    {
      id: 4,
      title: 'Fitness Club',
      category: 'Saúde',
      image: './assets/projects/fitness-mockup.jpg',
      url: 'https://fitnessclub.webazul.pt'
    },
    {
      id: 5,
      title: 'Academia Online',
      category: 'Educação',
      image: './assets/projects/academia-mockup.jpg',
      url: 'https://academia.webazul.pt'
    },
    {
      id: 6,
      title: 'RestaurantePro',
      category: 'Restaurante',
      image: './assets/projects/restaurant-mockup.jpg',
      url: 'https://restaurante.webazul.pt'
    },
    {
      id: 7,
      title: 'Clínica Médica',
      category: 'Saúde',
      image: './assets/projects/clinica-mockup.jpg',
      url: 'https://clinica.webazul.pt'
    },
    {
      id: 8,
      title: 'Advogados & Associados',
      category: 'Jurídico',
      image: './assets/projects/advogados-mockup.jpg',
      url: 'https://advogados.webazul.pt'
    }
  ]

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' })
    }
  }

  return (
    <section id="landing-pages" className={`landing-pages-section ${isVisible ? 'visible' : ''}`}>
      <div className="landing-pages-container">
        <div className="landing-pages-header">
          <div className="landing-pages-badge">
            <span>{t('landingPages.badge')}</span>
          </div>
          <h2 className="landing-pages-title">
            {t('landingPages.title')} <span className="title-highlight">{t('landingPages.titleHighlight')}</span>
          </h2>
          <p className="landing-pages-subtitle">
            {t('landingPages.subtitle')}
          </p>
        </div>

        <div className="carousel-wrapper">
          <button className="carousel-btn carousel-btn-left" onClick={scrollLeft}>
            <FaChevronLeft />
          </button>

          <div className="projects-carousel" ref={scrollContainerRef}>
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <button
                      className="visit-btn"
                      onClick={() => window.open(project.url, '_blank')}
                    >
                      <FaExternalLinkAlt />
                      {t('landingPages.buttons.visit')}
                    </button>
                  </div>
                </div>
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-category">{project.category}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-btn carousel-btn-right" onClick={scrollRight}>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  )
}

export default LandingPagesSection