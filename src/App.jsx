import './App.css'
import './i18n/i18n'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import PortfolioSection from './components/PortfolioSection'
import SystemsSection from './components/SystemsSection'
import LandingPagesSection from './components/LandingPagesSection'
import SocialMediaSection from './components/SocialMediaSection'
import TeamSection from './components/TeamSection'
import ProcessSection from './components/ProcessSection'
// import TestimonialsSection from './components/TestimonialsSection'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import WhatsAppWidget from './components/WhatsAppWidget'
import CookieConsent from './components/CookieConsent'
import ScrollDepthTracker from './components/ScrollDepthTracker'
import SEO from './components/SEO'

function HomePage() {
  return (
    <>
      <SEO
        title="WebAzul - Desenvolvimento Web e Marketing Digital"
        description="Agência digital portuguesa especializada em desenvolvimento web, landing pages e gestão de redes sociais. Transformamos ideias em experiências digitais de sucesso."
        keywords="desenvolvimento web Portugal, agência digital portuguesa, landing pages, websites profissionais, gestão redes sociais, marketing digital Portugal, web design, criação de sites, WebAzul"
        url="https://webazul.pt/"
        image="https://webazul.pt/webazul-white.png"
        type="website"
      />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <LandingPagesSection />
      <SocialMediaSection />
      {/* <SystemsSection /> */}
      <ProcessSection />
      <TeamSection />
      {/* <TestimonialsSection /> */}
      <ContactForm />
      <Footer />
      {/* <WhatsAppWidget /> */}
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
        </Routes>
      </div>
    </Router>
  )
}

export default App