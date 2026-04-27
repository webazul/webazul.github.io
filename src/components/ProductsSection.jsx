import { useTranslation } from 'react-i18next'
import { FaDumbbell, FaUserAlt, FaCalendarCheck, FaFileAlt, FaFileInvoice, FaArrowRight, FaTable, FaGlobe } from 'react-icons/fa'
import './ProductsSection.css'

const productIcons = {
  webgym: null, // uses image
  webgympersonal: null, // uses image
  webagenda: null, // uses image
  webpaper: null, // uses image
  webcontas: FaFileInvoice,
  datun: FaTable,
}

const productImages = {
  webgym: '/webgym.png',
  webgympersonal: '/webgym.png',
  webpaper: '/webpaper.png',
  webagenda: '/webagenda.png',
}

const productColors = {
  webgym: '#6366f1',
  webgympersonal: '#0d9488',
  webagenda: '#8b5cf6',
  webpaper: '#3b82f6',
  webcontas: '#f59e0b',
  datun: '#059669',
}

const globalProducts = new Set(['webpaper', 'datun'])

const productRegions = {
  webgym: ['🇵🇹 Portugal'],
  webgympersonal: ['🇵🇹 Portugal'],
  webagenda: ['🇪🇺 Europa'],
  webcontas: ['🇵🇹 Portugal'],
}

const productKeys = ['webgym', 'webagenda', 'datun', 'webpaper', 'webgympersonal', 'webcontas']

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
            const isComingSoon = url === '#'
            const isGlobal = globalProducts.has(key)
            const regions = productRegions[key]

            return (
              <a
                key={key}
                href={hasUrl ? url : undefined}
                target={hasUrl ? '_blank' : undefined}
                rel={hasUrl ? 'noopener noreferrer' : undefined}
                className={`product-card ${isComingSoon ? 'product-card--disabled' : ''}`}
              >
                <div className="product-card-header">
                  {productImages[key] ? (
                    <div className="product-icon" style={{ padding: 0, overflow: 'hidden' }}>
                      <img src={productImages[key]} alt={key} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
                    </div>
                  ) : (
                    <div className="product-icon" style={{ background: `${color}12`, color }}>
                      <Icon />
                    </div>
                  )}
                  <div className="product-header-badges">
                    {isGlobal && (
                      <span className="product-global"><FaGlobe /> Global</span>
                    )}
                    {regions && regions.map((region, i) => (
                      <span key={i} className="product-global">{region}</span>
                    ))}
                    {hasUrl ? (
                      <FaArrowRight className="product-arrow" style={{ color }} />
                    ) : isComingSoon ? (
                      <span className="product-soon">{t('products.comingSoon')}</span>
                    ) : null}
                  </div>
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
