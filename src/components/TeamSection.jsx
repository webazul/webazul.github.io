import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './TeamSection.css'

function TeamSection() {
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

    const section = document.getElementById('team')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const team = [
    {
      id: 1,
      name: t('team.members.tech.name'),
      role: t('team.members.tech.role'),
      image: '/team/jhony.jpg'
    },
    {
      id: 2,
      name: t('team.members.marketing.name'),
      role: t('team.members.marketing.role'),
      image: '/team/leticia.jpg'
    },
    {
      id: 3,
      name: t('team.members.growth.name'),
      role: t('team.members.growth.role'),
      image: '/team/daniel.jpg'
    },
    {
      id: 4,
      name: t('team.members.design.name'),
      role: t('team.members.design.role'),
      image: '/team/ingrid.jpg'
    }
  ]

  return (
    <section id="team" className={`team-section ${isVisible ? 'visible' : ''}`}>
      <div className="team-container">
        <div className="team-header">
          <span className="team-badge">{t('team.badge')}</span>
          <h2 className="team-title">
            {t('team.title')} <span className="highlight">{t('team.titleHighlight')}</span>
          </h2>
          <p className="team-subtitle">{t('team.subtitle')}</p>
        </div>

        <div className="team-grid">
          {team.map((member, index) => (
            <div
              key={member.id}
              className="team-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="team-card-image">
                {member.image ? (
                  <img src={member.image} alt={member.name} />
                ) : (
                  <div className="team-card-placeholder">
                    <span>{member.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                )}
              </div>

              <div className="team-card-content">
                <h3 className="team-card-name">{member.name}</h3>
                <span className="team-card-role">{member.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamSection
