import './App.css'
import './i18n/i18n'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
// import PortfolioSection from './components/PortfolioSection'
import SystemsSection from './components/SystemsSection'
import LandingPagesSection from './components/LandingPagesSection'
import SocialMediaSection from './components/SocialMediaSection'
import ProcessSection from './components/ProcessSection'
import TestimonialsSection from './components/TestimonialsSection'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import WhatsAppWidget from './components/WhatsAppWidget'
import CookieConsent from './components/CookieConsent'
import ScrollDepthTracker from './components/ScrollDepthTracker'
import AutoAzulPage from './pages/AutoAzulPage'

function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      {/* <PortfolioSection /> */}
      <SystemsSection />
      <LandingPagesSection />
      <SocialMediaSection />
      <ProcessSection />
      <TestimonialsSection />
      <ContactForm />
      <Footer />
      <WhatsAppWidget />
      <CookieConsent />
      <ScrollDepthTracker />
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auto" element={<AutoAzulPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App