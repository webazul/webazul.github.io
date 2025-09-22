import './App.css'
import './i18n/i18n'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import ProcessSection from './components/ProcessSection'
// import PortfolioSection from './components/PortfolioSection'
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
      <ProcessSection />
      {/* <PortfolioSection /> */}
      <TestimonialsSection />
      <ContactForm />
      <Footer />
      <WhatsAppWidget />
      <CookieConsent />
    </div>
  )
}

export default App