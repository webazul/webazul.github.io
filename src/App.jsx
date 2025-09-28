import './App.css'
import './i18n/i18n'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import SystemsSection from './components/SystemsSection'
import LandingPagesSection from './components/LandingPagesSection'
import SocialMediaSection from './components/SocialMediaSection'
import ProcessSection from './components/ProcessSection'
import TestimonialsSection from './components/TestimonialsSection'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import WhatsAppWidget from './components/WhatsAppWidget'
import CookieConsent from './components/CookieConsent'

function App() {
  return (
    <div className="App">
      <HeroSection />
      <ServicesSection />
      <SystemsSection />
      <LandingPagesSection />
      <SocialMediaSection />
      <ProcessSection />
      <TestimonialsSection />
      <ContactForm />
      <Footer />
      <WhatsAppWidget />
      <CookieConsent />
    </div>
  )
}

export default App