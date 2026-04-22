import './App.css'
import './i18n/i18n'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HeroSection from './components/HeroSection'
import StatsSection from './components/StatsSection'
import ProductsSection from './components/ProductsSection'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'
import SEO from './components/SEO'

function HomePage() {
  return (
    <>
      <SEO
        title="WebAzul — Software Group"
        description="Grupo de software português. Produtos SaaS que simplificam a gestão de negócios: WebGym, WebAgenda, WebPaper, WebContas."
        keywords="software Portugal, SaaS, gestão ginásios, agendamentos online, digitalização documentos, contabilidade, WebAzul"
        url="https://webazul.pt/"
        image="https://webazul.pt/webazul-white.png"
        type="website"
      />
      <HeroSection />
      <ProductsSection />
      <StatsSection />
      <ContactForm />
      <Footer />
      <CookieConsent />
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
