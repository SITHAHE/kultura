import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue } from 'framer-motion'

const asset = (p) => `${import.meta.env.BASE_URL}assets/${p}`

/* ——— ПРЕЛОАДЕР: плавное раскрытие настоящего логотипа + занавес вверх ——— */
export function Preloader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      setDone(true)
      document.body.style.overflow = ''
    }, 2400)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
          exit={{ y: '-100%' }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* монограмма — оригинал, «проявляется» мягким раскрытием сверху вниз */}
          <div className="overflow-hidden">
            <motion.img
              src={asset('logo-mark.png')}
              alt=""
              aria-hidden="true"
              draggable="false"
              className="h-16 w-auto md:h-20"
              initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0, y: 8 }}
              animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1, y: 0 }}
              transition={{ duration: 1.15, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* словомарк — оригинал, раскрывается слева направо */}
          <div className="mt-7 overflow-hidden">
            <motion.img
              src={asset('logo-wordmark.png')}
              alt="KULTURA"
              draggable="false"
              className="h-[15px] w-auto md:h-[18px]"
              initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0.4 }}
              animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* тонкая линия-прогресс */}
          <div className="relative mt-9 h-px w-44 overflow-hidden bg-white/12">
            <motion.div
              className="absolute inset-y-0 left-0 bg-ember"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ——— ТОНКИЙ ИНДИКАТОР ПРОГРЕССА СКРОЛЛА ——— */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-ember/80"
    />
  )
}

/* ——— МАГНИТНЫЙ ЭЛЕМЕНТ ——— */
export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
