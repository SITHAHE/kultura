import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Monogram, Wordmark } from '../ui.jsx'

const links = [
  { href: '#philosophy', label: 'Философия' },
  { href: '#materials', label: 'Материалы' },
  { href: '#projects', label: 'Проекты' },
  { href: '#process', label: 'Процесс' },
  { href: '#contacts', label: 'Контакты' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
          scrolled ? 'glass border-white/10' : 'border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-[74px] max-w-[1280px] items-center gap-6 px-6 md:px-10">
          <a href="#top" className="flex flex-none items-center gap-2">
            <Monogram className="h-7" />
            <Wordmark className="h-[17px]" />
          </a>

          <nav className="hidden flex-1 items-center justify-center gap-8 md:flex lg:gap-10">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-[12.5px] uppercase tracking-wide2 text-mist transition-colors duration-300 hover:text-bone"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-ember transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </a>
            ))}
          </nav>

          <a
            href={`tel:${'+79119270210'}`}
            className="hidden flex-none whitespace-nowrap text-[13px] tracking-wide2 text-bone md:block"
          >
            +7 911 927-02-10
          </a>

          <button
            onClick={() => setOpen(true)}
            className="flex h-9 w-9 items-center justify-center md:hidden"
            aria-label="Меню"
          >
            <div className="space-y-[6px]">
              <span className="block h-px w-6 bg-bone" />
              <span className="block h-px w-6 bg-bone" />
            </div>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] flex flex-col bg-void/98 px-8 py-7 md:hidden"
          >
            <div className="flex items-center justify-between">
              <Wordmark className="h-[15px]" />
              <button onClick={() => setOpen(false)} aria-label="Закрыть" className="text-2xl font-thin text-bone">
                ✕
              </button>
            </div>
            <nav className="mt-16 flex flex-col gap-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="text-3xl font-[200] tracking-wide2 text-bone"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto space-y-1 text-mist">
              <a href="tel:+79119270210" className="block text-lg text-bone">+7 911 927-02-10</a>
              <p className="text-sm">Санкт-Петербург, Уральская ул., 4в</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
