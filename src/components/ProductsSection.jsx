import { useTranslation } from 'react-i18next'
import { FaDumbbell, FaUserAlt, FaCalendarCheck, FaCamera, FaFileInvoice, FaArrowRight, FaTable } from 'react-icons/fa'
import './ProductsSection.css'

const productIcons = {
  webgym: FaDumbbell,
  webgympersonal: FaUserAlt,
  webagenda: FaCalendarCheck,
  webscan: FaCamera,
  webcontas: FaFileInvoice,
  datun: FaTable,
}

const productColors = {
  webgym: '#6366f1',
  webgympersonal: '#0d9488',
  webagenda: '#8b5cf6',
  webscan: '#3b82f6',
  webcontas: '#f59e0b',
  datun: '#059669',
}

const productKeys = ['webgym', 'webgympersonal', 'webagenda', 'webscan', 'webcontas', 'datun']

function ProductsSection() {
  const { t } = useTranslation()

  return (
    <section id="produtos" className="products-section">
      <div className="products-container">
        <h2 className="products-title">{t('products.title')}</h2>

        <div className="products-grid">
          {productKeys.map((key) => {
            const Icon = productIcons[key]
            const color = productColors[key]
            const url = t(`products.items.${key}.url`)
            const hasUrl = url && url !== '#'

            return (
              <a
                key={key}
                href={hasUrl ? url : undefined}
                target={hasUrl ? '_blank' : undefined}
                rel={hasUrl ? 'noopener noreferrer' : undefined}
                className={`product-card ${!hasUrl ? 'product-card--disabled' : ''}`}
              >
                <div className="product-card-header">
                  <div className="product-icon" style={{ background: `${color}12`, color }}>
                    <Icon />
                  </div>
                  {hasUrl ? (
                    <FaArrowRight className="product-arrow" style={{ color }} />
                  ) : (
                    <span className="product-soon">{t('products.comingSoon')}</span>
                  )}
                </div>
                <h3 className="product-name">{t(`products.items.${key}.name`)}</h3>
                <p className="product-description">{t(`products.items.${key}.description`)}</p>
                <div className="product-tags">
                  {t(`products.items.${key}.tags`, { returnObjects: true }).map((tag, i) => (
                    <span key={i} className="product-tag">{tag}</span>
                  ))}
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProductsSection
