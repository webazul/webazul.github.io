import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../firebase'
import './BriefingPage.css'

const STEPS = ['business', 'product', 'identity', 'content', 'technical']

function FileUpload({ label, fieldName, briefingId, files, onUpload, onRemove, accept, multiple = true, t }) {
  const inputRef = useRef()
  const [uploading, setUploading] = useState(false)

  const handleFiles = async (e) => {
    const selected = Array.from(e.target.files)
    if (!selected.length) return
    setUploading(true)
    try {
      const uploaded = await Promise.all(
        selected.map(async (file) => {
          const path = `briefings/${briefingId}/${fieldName}/${Date.now()}-${file.name}`
          const storageRef = ref(storage, path)
          await uploadBytes(storageRef, file)
          const url = await getDownloadURL(storageRef)
          return { name: file.name, url, path }
        })
      )
      onUpload(uploaded)
    } catch (err) {
      console.error('Upload error:', err)
      alert(t('briefing.uploadError'))
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div className="briefing-field">
      <label>{label}</label>
      <div
        className={`briefing-dropzone ${uploading ? 'uploading' : ''}`}
        onClick={() => !uploading && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFiles}
          style={{ display: 'none' }}
        />
        {uploading ? (
          <div className="briefing-dropzone-content">
            <div className="briefing-spinner-small" />
            <span>{t('briefing.uploading')}</span>
          </div>
        ) : (
          <div className="briefing-dropzone-content">
            <span className="briefing-dropzone-icon">+</span>
            <span>{t('briefing.dropzoneText')}</span>
          </div>
        )}
      </div>
      {files.length > 0 && (
        <div className="briefing-file-list">
          {files.map((file, i) => (
            <div key={i} className="briefing-file-item">
              {file.url && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.name) ? (
                <img src={file.url} alt={file.name} className="briefing-file-thumb" />
              ) : (
                <div className="briefing-file-icon">📄</div>
              )}
              <span className="briefing-file-name">{file.name}</span>
              <button
                type="button"
                className="briefing-file-remove"
                onClick={(e) => { e.stopPropagation(); onRemove(i) }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function BriefingPage() {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const [briefing, setBriefing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState({
    businessName: '',
    businessDescription: '',
    targetAudience: '',
    currentWebsite: '',
    productName: '',
    productPrice: '',
    productCurrency: 'EUR',
    productDescription: '',
    preferredColors: '',
    referenceUrls: '',
    communicationTone: '',
    hasContent: '',
    hasProfessionalPhotos: '',
    socialMedia: '',
    hasTestimonials: '',
    hasDomain: '',
    domainName: '',
    languages: [],
    deadline: '',
    notes: ''
  })

  const [files, setFiles] = useState({
    logo: [],
    productPhotos: [],
    assets: []
  })

  useEffect(() => {
    async function loadBriefing() {
      try {
        const docRef = doc(db, 'briefings', id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const data = docSnap.data()
          setBriefing(data)
          if (data.status === 'submitted') {
            setSubmitted(true)
          }
          if (data.responses) {
            const { uploadedFiles, ...rest } = data.responses
            setForm(prev => ({ ...prev, ...rest }))
            if (uploadedFiles) {
              setFiles(prev => ({ ...prev, ...uploadedFiles }))
            }
          }
        } else {
          setError('notFound')
        }
      } catch (err) {
        console.error(err)
        setError('loadError')
      } finally {
        setLoading(false)
      }
    }
    loadBriefing()
  }, [id])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setForm(prev => {
        const arr = prev[name] || []
        return {
          ...prev,
          [name]: checked ? [...arr, value] : arr.filter(v => v !== value)
        }
      })
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleFileUpload = (field) => (uploaded) => {
    setFiles(prev => ({ ...prev, [field]: [...prev[field], ...uploaded] }))
  }

  const handleFileRemove = (field) => (index) => {
    setFiles(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }))
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const docRef = doc(db, 'briefings', id)
      await updateDoc(docRef, {
        responses: { ...form, uploadedFiles: files },
        status: 'submitted',
        submittedAt: new Date().toISOString()
      })
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      alert(t('briefing.error'))
    } finally {
      setSubmitting(false)
    }
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0))
  const isLastStep = currentStep === STEPS.length - 1

  const changeLang = (lng) => {
    i18n.changeLanguage(lng)
  }

  if (loading) {
    return (
      <div className="briefing-page">
        <div className="briefing-loading">
          <div className="briefing-spinner" />
          <p>{t('briefing.loading')}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="briefing-page">
        <div className="briefing-error">
          <span className="briefing-error-icon">!</span>
          <h2>{t(`briefing.${error}`)}</h2>
          <p>{t('briefing.errorContact')}</p>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="briefing-page">
        <div className="briefing-success">
          <div className="briefing-success-icon">&#10003;</div>
          <h2>{t('briefing.successTitle')}</h2>
          <p>{t('briefing.successMessage')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="briefing-page">
      <header className="briefing-header">
        <div className="briefing-header-content">
          <a href="/" className="briefing-logo">
            <img src="/webazul-white.png" alt="WebAzul" className="briefing-logo-img" />
          </a>
          <div className="briefing-lang-switcher">
            <button
              className={i18n.language === 'pt' ? 'active' : ''}
              onClick={() => changeLang('pt')}
            >
              PT
            </button>
            <button
              className={i18n.language === 'en' ? 'active' : ''}
              onClick={() => changeLang('en')}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      <main className="briefing-main">
        <div className="briefing-welcome">
          <h1>{t('briefing.title')}</h1>
          <p className="briefing-subtitle">
            {t('briefing.welcome', { name: briefing.clientName })}
          </p>
        </div>

        <div className="briefing-progress">
          {STEPS.map((step, i) => (
            <div
              key={step}
              className={`briefing-progress-step ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'done' : ''}`}
              onClick={() => setCurrentStep(i)}
            >
              <div className="briefing-progress-dot">
                {i < currentStep ? '✓' : i + 1}
              </div>
              <span className="briefing-progress-label">
                {t(`briefing.steps.${step}`)}
              </span>
            </div>
          ))}
        </div>

        <div className="briefing-form-card">
          {currentStep === 0 && (
            <section className="briefing-section">
              <h2>{t('briefing.steps.business')}</h2>
              <p className="briefing-section-desc">{t('briefing.businessDesc')}</p>

              <div className="briefing-field">
                <label>{t('briefing.fields.businessName')} *</label>
                <input
                  type="text"
                  name="businessName"
                  value={form.businessName}
                  onChange={handleChange}
                  placeholder={t('briefing.placeholders.businessName')}
                />
              </div>

              <div className="briefing-field">
                <label>{t('briefing.fields.businessDescription')} *</label>
                <textarea
                  name="businessDescription"
                  value={form.businessDescription}
                  onChange={handleChange}
                  placeholder={t('briefing.placeholders.businessDescription')}
                  rows={4}
                />
              </div>

              <div className="briefing-field">
                <label>{t('briefing.fields.targetAudience')} *</label>
                <textarea
                  name="targetAudience"
                  value={form.targetAudience}
                  onChange={handleChange}
                  placeholder={t('briefing.placeholders.targetAudience')}
                  rows={3}
                />
              </div>

              <div className="briefing-field">
                <label>{t('briefing.fields.currentWebsite')}</label>
                <input
                  type="url"
                  name="currentWebsite"
                  value={form.currentWebsite}
                  onChange={handleChange}
                  placeholder="https://"
                />
              </div>
            </section>
          )}

          {currentStep === 1 && (
            <section className="briefing-section">
              <h2>{t('briefing.steps.product')}</h2>
              <p className="briefing-section-desc">{t('briefing.productDesc')}</p>

              <div className="briefing-field">
                <label>{t('briefing.fields.productName')} *</label>
                <input
                  type="text"
                  name="productName"
                  value={form.productName}
                  onChange={handleChange}
                  placeholder={t('briefing.placeholders.productName')}
                />
              </div>

              <div className="briefing-row">
                <div className="briefing-field">
                  <label>{t('briefing.fields.productPrice')} *</label>
                  <input
                    type="text"
                    name="productPrice"
                    value={form.productPrice}
                    onChange={handleChange}
                    placeholder="49.99"
                  />
                </div>
                <div className="briefing-field">
                  <label>{t('briefing.fields.productCurrency')}</label>
                  <select
                    name="productCurrency"
                    value={form.productCurrency}
                    onChange={handleChange}
                  >
                    <option value="EUR">EUR (€)</option>
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="BRL">BRL (R$)</option>
                  </select>
                </div>
              </div>

              <div className="briefing-field">
                <label>{t('briefing.fields.productDescription')} *</label>
                <textarea
                  name="productDescription"
                  value={form.productDescription}
                  onChange={handleChange}
                  placeholder={t('briefing.placeholders.productDescription')}
                  rows={4}
                />
              </div>

              <FileUpload
                label={t('briefing.fields.productPhotos')}
                fieldName="productPhotos"
                briefingId={id}
                files={files.productPhotos}
                onUpload={handleFileUpload('productPhotos')}
                onRemove={handleFileRemove('productPhotos')}
                accept="image/*"
                t={t}
              />
            </section>
          )}

          {currentStep === 2 && (
            <section className="briefing-section">
              <h2>{t('briefing.steps.identity')}</h2>
              <p className="briefing-section-desc">{t('briefing.identityDesc')}</p>

              <FileUpload
                label={t('briefing.fields.logo')}
                fieldName="logo"
                briefingId={id}
                files={files.logo}
                onUpload={handleFileUpload('logo')}
                onRemove={handleFileRemove('logo')}
                accept="image/*,.svg,.ai,.eps,.pdf"
                multiple={false}
                t={t}
              />

              <div className="briefing-field">
                <label>{t('briefing.fields.preferredColors')}</label>
                <input
                  type="text"
                  name="preferredColors"
                  value={form.preferredColors}
                  onChange={handleChange}
                  placeholder={t('briefing.placeholders.preferredColors')}
                />
              </div>

              <div className="briefing-field">
                <label>{t('briefing.fields.referenceUrls')}</label>
                <textarea
                  name="referenceUrls"
                  value={form.referenceUrls}
                  onChange={handleChange}
                  placeholder={t('briefing.placeholders.referenceUrls')}
                  rows={3}
                />
              </div>

              <div className="briefing-field">
                <label>{t('briefing.fields.communicationTone')}</label>
                <div className="briefing-radio-group">
                  {['formal', 'informal', 'friendly', 'professional'].map(tone => (
                    <label className="briefing-radio" key={tone}>
                      <input type="radio" name="communicationTone" value={tone} checked={form.communicationTone === tone} onChange={handleChange} />
                      <span>{t(`briefing.tones.${tone}`)}</span>
                    </label>
                  ))}
                </div>
              </div>
            </section>
          )}

          {currentStep === 3 && (
            <section className="briefing-section">
              <h2>{t('briefing.steps.content')}</h2>
              <p className="briefing-section-desc">{t('briefing.contentDesc')}</p>

              <div className="briefing-field">
                <label>{t('briefing.fields.hasContent')}</label>
                <div className="briefing-radio-group">
                  <label className="briefing-radio">
                    <input type="radio" name="hasContent" value="yes" checked={form.hasContent === 'yes'} onChange={handleChange} />
                    <span>{t('briefing.contentOptions.ready')}</span>
                  </label>
                  <label className="briefing-radio">
                    <input type="radio" name="hasContent" value="partial" checked={form.hasContent === 'partial'} onChange={handleChange} />
                    <span>{t('briefing.contentOptions.partial')}</span>
                  </label>
                  <label className="briefing-radio">
                    <input type="radio" name="hasContent" value="no" checked={form.hasContent === 'no'} onChange={handleChange} />
                    <span>{t('briefing.contentOptions.needHelp')}</span>
                  </label>
                </div>
              </div>

              <div className="briefing-field">
                <label>{t('briefing.fields.hasProfessionalPhotos')}</label>
                <div className="briefing-radio-group">
                  <label className="briefing-radio">
                    <input type="radio" name="hasProfessionalPhotos" value="yes" checked={form.hasProfessionalPhotos === 'yes'} onChange={handleChange} />
                    <span>{t('briefing.yes')}</span>
                  </label>
                  <label className="briefing-radio">
                    <input type="radio" name="hasProfessionalPhotos" value="no" checked={form.hasProfessionalPhotos === 'no'} onChange={handleChange} />
                    <span>{t('briefing.no')}</span>
                  </label>
                  <label className="briefing-radio">
                    <input type="radio" name="hasProfessionalPhotos" value="stock" checked={form.hasProfessionalPhotos === 'stock'} onChange={handleChange} />
                    <span>{t('briefing.useStock')}</span>
                  </label>
                </div>
              </div>

              <FileUpload
                label={t('briefing.fields.assets')}
                fieldName="assets"
                briefingId={id}
                files={files.assets}
                onUpload={handleFileUpload('assets')}
                onRemove={handleFileRemove('assets')}
                accept="image/*,.pdf,.doc,.docx,.txt,.zip"
                t={t}
              />

              <div className="briefing-field">
                <label>{t('briefing.fields.socialMedia')}</label>
                <textarea
                  name="socialMedia"
                  value={form.socialMedia}
                  onChange={handleChange}
                  placeholder={t('briefing.placeholders.socialMedia')}
                  rows={3}
                />
              </div>

              <div className="briefing-field">
                <label>{t('briefing.fields.hasTestimonials')}</label>
                <div className="briefing-radio-group">
                  <label className="briefing-radio">
                    <input type="radio" name="hasTestimonials" value="yes" checked={form.hasTestimonials === 'yes'} onChange={handleChange} />
                    <span>{t('briefing.yes')}</span>
                  </label>
                  <label className="briefing-radio">
                    <input type="radio" name="hasTestimonials" value="no" checked={form.hasTestimonials === 'no'} onChange={handleChange} />
                    <span>{t('briefing.no')}</span>
                  </label>
                </div>
              </div>
            </section>
          )}

          {currentStep === 4 && (
            <section className="briefing-section">
              <h2>{t('briefing.steps.technical')}</h2>
              <p className="briefing-section-desc">{t('briefing.technicalDesc')}</p>

              <div className="briefing-field">
                <label>{t('briefing.fields.hasDomain')}</label>
                <div className="briefing-radio-group">
                  <label className="briefing-radio">
                    <input type="radio" name="hasDomain" value="yes" checked={form.hasDomain === 'yes'} onChange={handleChange} />
                    <span>{t('briefing.yes')}</span>
                  </label>
                  <label className="briefing-radio">
                    <input type="radio" name="hasDomain" value="no" checked={form.hasDomain === 'no'} onChange={handleChange} />
                    <span>{t('briefing.no')}</span>
                  </label>
                </div>
              </div>

              {form.hasDomain === 'yes' && (
                <div className="briefing-field">
                  <label>{t('briefing.fields.domainName')}</label>
                  <input
                    type="text"
                    name="domainName"
                    value={form.domainName}
                    onChange={handleChange}
                    placeholder="exemplo.pt"
                  />
                </div>
              )}

              <div className="briefing-field">
                <label>{t('briefing.fields.languages')}</label>
                <div className="briefing-checkbox-group">
                  {[
                    { value: 'pt', label: 'Portugues (PT)' },
                    { value: 'en', label: 'English (EN)' },
                    { value: 'es', label: 'Espanol (ES)' },
                    { value: 'fr', label: 'Francais (FR)' },
                  ].map(lang => (
                    <label className="briefing-checkbox" key={lang.value}>
                      <input
                        type="checkbox"
                        name="languages"
                        value={lang.value}
                        checked={(form.languages || []).includes(lang.value)}
                        onChange={handleChange}
                      />
                      <span>{lang.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="briefing-field">
                <label>{t('briefing.fields.deadline')}</label>
                <select name="deadline" value={form.deadline} onChange={handleChange}>
                  <option value="">{t('briefing.deadlineOptions.select')}</option>
                  <option value="asap">{t('briefing.deadlineOptions.asap')}</option>
                  <option value="2weeks">{t('briefing.deadlineOptions.2weeks')}</option>
                  <option value="1month">{t('briefing.deadlineOptions.1month')}</option>
                  <option value="3months">{t('briefing.deadlineOptions.3months')}</option>
                  <option value="flexible">{t('briefing.deadlineOptions.flexible')}</option>
                </select>
              </div>

              <div className="briefing-field">
                <label>{t('briefing.fields.notes')}</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder={t('briefing.placeholders.notes')}
                  rows={4}
                />
              </div>
            </section>
          )}

          <div className="briefing-actions">
            {currentStep > 0 && (
              <button className="briefing-btn-back" onClick={prevStep}>
                {t('briefing.back')}
              </button>
            )}
            {!isLastStep ? (
              <button className="briefing-btn-next" onClick={nextStep}>
                {t('briefing.next')}
              </button>
            ) : (
              <button
                className="briefing-btn-submit"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? t('briefing.submitting') : t('briefing.submit')}
              </button>
            )}
          </div>
        </div>
      </main>

      <footer className="briefing-footer">
        <p>© {new Date().getFullYear()} WebAzul — webazul.pt</p>
      </footer>
    </div>
  )
}

export default BriefingPage
