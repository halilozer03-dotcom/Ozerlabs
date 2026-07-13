import { LanguageProvider } from './i18n/LanguageContext.jsx'
import Nav from './components/Nav.jsx'
import Banner from './components/Banner.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Process from './components/Process.jsx'
import Projects from './components/Projects.jsx'
import Pricing from './components/Pricing.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <LanguageProvider>
      <Nav />
      <Banner />
      <Hero />
      <About />
      <Services />
      <Process />
      <Projects />
      <Pricing />
      <Contact />
      <Footer />
    </LanguageProvider>
  )
}
