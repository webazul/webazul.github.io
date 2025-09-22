# WebAzul Creative Studio - Project Documentation

## 📋 Project Overview
Modern and professional landing page for WebAzul Creative Studio, a Portuguese web development agency specializing in innovative digital solutions. The site features glassmorphism design, network visualizations, and smooth animations.

## 🛠 Tech Stack
- **Framework**: React 19.1.0 + Vite 6.3.5
- **Language**: JavaScript (JSX)
- **Styling**: CSS Modules + Custom CSS
- **Internationalization**: i18next + react-i18next
- **Icons**: React Icons
- **Build Tool**: Vite
- **Deployment**: GitHub Actions → GitHub Pages

## 📁 Project Structure
```
webazul.pt/
├── public/
│   ├── assets/                 # Static assets and images
│   └── favicon.ico            # WebAzul favicon
├── src/
│   ├── components/            # React components
│   │   ├── HeroSection.jsx    # Hero with network visualization
│   │   ├── ServicesSection.jsx # Services with glassmorphism
│   │   ├── ProcessSection.jsx  # Process with hub visualization
│   │   ├── PortfolioSection.jsx # Portfolio with filtering
│   │   ├── TestimonialsSection.jsx # Video-style testimonials
│   │   ├── AboutSection.jsx   # Company information
│   │   ├── ContactSection.jsx # Contact form
│   │   ├── Footer.jsx         # Footer with links
│   │   ├── WhatsAppWidget.jsx # WhatsApp integration
│   │   └── CookieConsent.jsx  # GDPR compliance
│   ├── i18n/
│   │   ├── i18n.js           # i18next configuration
│   │   └── locales/          # Translation files
│   │       └── pt.json       # Portuguese (default)
│   ├── App.jsx               # Main component
│   ├── App.css               # Global styles
│   └── main.jsx              # Entry point
├── package.json              # Dependencies & scripts
├── vite.config.js           # Vite configuration
└── .gitignore               # Git ignore rules
```

## 🎯 Key Features
- **Network Visualizations**: Interactive network elements in hero and process sections
- **Glassmorphism Design**: Modern glass-effect cards and components
- **Portfolio Filtering**: Advanced filtering system for project showcase
- **Video-style Testimonials**: Testimonial interface resembling video player
- **Responsive Design**: Mobile-first approach for all devices
- **Smooth Animations**: CSS animations and hover effects
- **Performance Optimized**: Fast loading and optimized assets

## 🚀 Commands
```bash
# Development
npm run dev         # Start development server (http://localhost:5173)

# Build & Preview
npm run build       # Build for production (output: dist/)
npm run preview     # Preview production build

# Linting (if configured)
npm run lint        # Run ESLint
npm run typecheck   # Run TypeScript checks
```

## 🎨 Design System
### Brand Colors
- **Primary Black**: #000000
- **WebAzul Blue**: #2563eb
- **White**: #ffffff
- **Gray Tones**: Various shades for depth

### Visual Identity
- **Logo**: "web" (black) + "azul" (blue) + "CREATIVE STUDIO"
- **Style**: Modern, technological, glassmorphism
- **Typography**: Clean sans-serif with clear hierarchy

## 📱 Components Overview
### HeroSection
- Logo recreation with network elements
- Statistics display (100+ Projects, 50+ Clients, 99% Satisfaction)
- Floating animated elements (🎨⚡🚀)
- Network visualization with connected circles
- Primary CTAs: "Começar Projeto" and "Ver Portfolio"

### ServicesSection
- Dark background with animated gradients
- 4 main services: Web Development, Social Media, Hosting, SEO
- Glassmorphism cards with hover effects
- "Popular" badges for featured services
- Custom service CTA

### ProcessSection
- Central hub with "webazul" logo
- 4 process steps positioned around hub: Research, Development, Launch, Maintenance
- Horizontal timeline with animated markers
- Visual connections between steps
- Project metrics and duration display

### PortfolioSection
- Featured projects showcase
- Advanced filtering system by category
- Normal grid and Masonry layouts
- Projects with technology tags, views, and years
- Hover effects with "Ver Site" and "Preview" buttons
- 8+ mockup projects across various categories

### TestimonialsSection
- Video testimonial interface design
- Auto-advancing carousel with manual controls
- Statistics: 50+ clients, 98% satisfaction, 120+ projects, 15 awards
- Clickable testimonial cards
- Verification system with "Verificado" badges
- Project metrics (duration, results)

## 🌐 Internationalization
- **Default Language**: Portuguese (pt)
- **Fallback**: Portuguese
- **Framework**: i18next with react-i18next
- **Future**: Prepared for multi-language expansion

## 📊 Performance & SEO
- Vite for fast builds and HMR
- Optimized assets and images
- SEO-friendly structure
- Fast loading times
- Mobile optimization

## 🔧 Development Setup
### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Local Development
```bash
git clone <repository-url>
cd webazul.pt
npm install
npm run dev
```

## 📞 Contact Information
- **Website**: webazul.pt
- **Email**: info@webazul.pt
- **Services**: Web Development, Social Media, Hosting, SEO
- **Specialty**: Digital transformation and innovative web solutions