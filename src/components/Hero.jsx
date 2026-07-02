import { useRef } from 'react'
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

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section id="top" ref={ref} className="relative h-[100svh] w-full overflow-hidden grain">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={asset('hero.jpg')}
          alt="Интерьер с мебелью KULTURA"
          className="ken h-full w-full object-cover"
        />
      </motion.div>

      {/* кинематографичные затемнения */}
      <div className="absolute inset-0 bg-gradient-to-b from-void/75 via-void/35 to-void" />
      <div className="absolute inset-0 bg-gradient-to-r from-void/50 via-transparent to-transparent" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 55% at 50% 46%, rgba(11,13,20,0.55), transparent 70%)' }}
      />

      <motion.div
        style={{ opacity: fade }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      >
        <motion.span
          custom={0}
          variants={line}
          initial="hidden"
          animate="show"
          className="mb-8 text-[11px] uppercase tracking-brand text-mist"
        >
          Мебель · Интерьеры · Санкт-Петербург
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
            className="mt-6 block text-[4.6vw] font-[200] tracking-wide2 text-mist md:text-[1.7vw]"
          >
            искусство внимания к деталям
          </motion.span>
        </h1>

        <motion.div custom={3} variants={line} initial="hidden" animate="show" className="mt-14">
          <Magnetic strength={0.4}>
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 text-[13px] uppercase tracking-wide2 text-bone"
            >
              Смотреть проекты
              <span className="relative h-px w-10 bg-bone/60 transition-all duration-500 group-hover:w-16 group-hover:bg-ember" />
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* индикатор скролла */}
      <div className="absolute inset-x-0 bottom-8 flex justify-center">
        <div className="h-11 w-6 rounded-full border border-white/20">
          <span
            className="mx-auto mt-2 block h-2 w-px bg-white/70"
            style={{ animation: 'scrollHint 2s var(--ease-soft) infinite' }}
          />
        </div>
      </div>
    </section>
  )
}
