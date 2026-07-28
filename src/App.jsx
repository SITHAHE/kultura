import { useCallback, useEffect, useRef, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Lenis from 'lenis'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import { Philosophy, Statement, Materials, Process, Workshop } from './components/Sections.jsx'
import Projects from './components/Projects.jsx'
import Contacts from './components/Contacts.jsx'
import { Preloader, ScrollProgress, WarpOverlay } from './components/Extras.jsx'

export default function App() {
  const lenisRef = useRef(null)
  const [warping, setWarping] = useState(false)

  useEffect(() => {
    // Инерционный (momentum) скролл на весь сайт
    const lenis = new Lenis({
      duration: 1.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
    })
    lenisRef.current = lenis

    let raf
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Плавные переходы по якорям меню с учётом высоты шапки
    const onAnchor = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (id.length < 2) return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -80, duration: 1.3 })
    }
    document.addEventListener('click', onAnchor)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onAnchor)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // «Прыжок» к секции через короткую заставку — вместо долгой прокрутки насквозь
  const handleWarp = useCallback(
    (selector) => {
      const el = document.querySelector(selector)
      if (!el || warping) return
      setWarping(true)
      window.setTimeout(() => {
        lenisRef.current?.scrollTo(el, { offset: -80, immediate: true, force: true })
        window.setTimeout(() => setWarping(false), 460)
      }, 640)
    },
    [warping],
  )

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-void">
        <Preloader />
        <WarpOverlay active={warping} />
        <ScrollProgress />
        <Header />
        <main>
          <Hero onWarp={handleWarp} />
          <Philosophy />
          <Statement />
          <Materials />
          <Projects />
          <Process />
          <Workshop />
          <Contacts />
        </main>
      </div>
    </MotionConfig>
  )
}
