import { lazy, Suspense, useEffect, useState, useCallback } from 'react'
import Lenis from 'lenis'
import './index.css'

// Above-fold — loaded eagerly
import Navbar        from './components/Navbar'
import StaggeredMenu from './components/StaggeredMenu'
import Hero          from './Hero'
import Loader        from './components/Loader'
// Projects needs eager load — ScrollTrigger pins require accurate DOM layout at mount
import Projects     from './Projects'
// Below-fold — code-split, loaded lazily
const Skills        = lazy(() => import('./Skills'))
const WebsiteCreate = lazy(() => import('./WebsiteCreate'))
const DesignCode    = lazy(() => import('./DesignCode'))
const ThreeBox      = lazy(() => import('./ThreeBox'))
const About         = lazy(() => import('./About'))
const Gallery       = lazy(() => import('./Gallery'))
const LetsWork      = lazy(() => import('./LetsWork'))
const Contact       = lazy(() => import('./Contact'))
const Footer        = lazy(() => import('./components/Footer'))

// Minimal fallback — invisible placeholder keeps layout stable
const Blank = () => <div aria-hidden="true" />

const menuItems = [
  { label: 'Home',     ariaLabel: 'Go to home section',     link: '#home' },
  { label: 'Skills',   ariaLabel: 'Go to skills section',   link: '#skills' },
  { label: 'About',    ariaLabel: 'Go to about section',    link: '#about' },
  { label: 'Projects', ariaLabel: 'Go to projects section', link: '#projects' },
  { label: 'Contact',  ariaLabel: 'Get in touch',           link: '#contact' },
]

const socialItems = [
  { label: 'GitHub',   link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' },
  { label: 'Twitter',  link: 'https://twitter.com' },
]

function App() {
  const [loading, setLoading] = useState(true)

  // Stable callback — won't re-create on every render
  const handleLoaderDone = useCallback(() => setLoading(false), [])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)   // properly cancel the loop on unmount
      lenis.destroy()
    }
  }, [])

  return (
    <>
      {loading && <Loader onComplete={handleLoaderDone} />}

      {/* Always-visible navigation */}
      <Navbar />
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        colors={['#35b04b', '#2d9340']}
        accentColor="#35b04b"
        isFixed={true}
      />

      {/* Hero — above fold, eager */}
      <Hero />

      {/* Below-fold lazy — before projects */}
      <Suspense fallback={<Blank />}>
        <Skills />
        <WebsiteCreate />
        <DesignCode />
        <ThreeBox />
        <About />
      </Suspense>

      {/* Projects — eagerly imported, outside Suspense; ScrollTrigger needs stable DOM */}
      <Projects />

      {/* Below-fold lazy — after projects */}
      <Suspense fallback={<Blank />}>
        <Gallery />
        <LetsWork />
        <Contact />
        <Footer />
      </Suspense>
    </>
  )
}

export default App
