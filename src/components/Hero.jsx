import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Magnetic } from './Extras.jsx'

const asset = (p) => `${import.meta.env.BASE_URL}assets/${p}`

const line = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.3, delay: 0.5 + i * 0.15, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Hero({ onWarp }) {
  const ref = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  // на мобильных отключаем параллакс и ken-burns — иначе фон «плывёт» под адресной строкой
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section id="top" ref={ref} className="relative h-[100svh] w-full overflow-hidden grain">
      <motion.div style={isMobile ? undefined : { y, scale }} className="absolute inset-0">
        <img
          src={asset('hero.jpg')}
          alt="Интерьер с мебелью KULTURA"
          className={`h-full w-full object-cover ${isMobile ? '' : 'ken'}`}
        />
      </motion.div>

      {/* кинематографичные затемнения */}
      <div className="absolute inset-0 bg-gradient-to-b from-void/45 via-void/15 to-void md:from-void/75 md:via-void/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-void/30 via-transparent to-transparent md:from-void/50" />
      <div
        className="absolute inset-0 hidden md:block"
        style={{ background: 'radial-gradient(ellipse 60% 55% at 50% 46%, rgba(11,13,20,0.55), transparent 70%)' }}
      />
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            'radial-gradient(ellipse 92% 42% at 50% 50%, rgba(11,13,20,0.6), rgba(11,13,20,0.28) 55%, transparent 75%)',
        }}
      />

      <motion.div
        style={{ opacity: fade }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 pt-14 text-center md:pt-[7.5vh]"
      >
        <motion.span
          custom={0}
          variants={line}
          initial="hidden"
          animate="show"
          className="mb-8 whitespace-nowrap text-[11px] uppercase tracking-brand text-bone/90"
          style={{ textShadow: '0 2px 26px rgba(0,0,0,0.95)' }}
        >
          Мебель · Санкт-Петербург
        </motion.span>

        <h1 className="flex flex-col items-center text-balance font-[100] leading-[0.98] text-bone">
          <span className="sr-only">KULTURA — искусство внимания к деталям</span>
          <motion.img
            custom={1}
            variants={line}
            initial="hidden"
            animate="show"
            src={asset('logo-wordmark.png')}
            alt="KULTURA"
            aria-hidden="true"
            draggable="false"
            className="w-[82vw] max-w-[880px] md:w-[58vw]"
          />
          <motion.span
            custom={2}
            variants={line}
            initial="hidden"
            animate="show"
            aria-hidden="true"
            className="mt-6 block text-[4.6vw] font-[300] tracking-wide2 text-bone md:text-[1.7vw]"
            style={{ textShadow: '0 2px 26px rgba(0,0,0,0.95)' }}
          >
            искусство внимания к деталям
          </motion.span>
        </h1>

        <motion.div custom={3} variants={line} initial="hidden" animate="show" className="mt-14">
          <Magnetic strength={0.4}>
            <button
              type="button"
              onClick={() => onWarp?.('#projects')}
              className="group inline-flex cursor-pointer items-center gap-3 text-[13px] uppercase tracking-wide2 text-bone"
            >
              Смотреть проекты
              <span className="relative h-px w-10 bg-bone/60 transition-all duration-500 group-hover:w-16 group-hover:bg-ember" />
            </button>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  )
}
