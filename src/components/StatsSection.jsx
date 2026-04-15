import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FaUsers, FaBuilding, FaFileAlt } from 'react-icons/fa'
import './StatsSection.css'

function AnimatedNumber({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const start = performance.now()
          const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration, hasAnimated])

  return (
    <span ref={ref} className="stat-number">
      {count.toLocaleString('pt-PT')}{suffix}
    </span>
  )
}

const stats = [
  { key: 'users', target: 500, suffix: '+', icon: FaUsers, color: '#6366f1' },
  { key: 'businesses', target: 50, suffix: '+', icon: FaBuilding, color: '#2563eb' },
  { key: 'documents', target: 10000, suffix: '+', icon: FaFileAlt, color: '#059669' },
]

function StatsSection() {
  const { t } = useTranslation()

  return (
    <section className="stats-section">
      <div className="stats-container">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.key} className="stat-card">
              <div className="stat-icon" style={{ background: `${stat.color}10`, color: stat.color }}>
                <Icon />
              </div>
              <div className="stat-content">
                <AnimatedNumber target={stat.target} suffix={stat.suffix} />
                <span className="stat-label">{t(`stats.${stat.key}`)}</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default StatsSection
