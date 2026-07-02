import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion'
import { Reveal, SectionLabel, RevealHeading } from '../ui.jsx'
import { projects } from '../data.js'

const SHADOW = { textShadow: '0 1px 24px rgba(0,0,0,0.55)' }

export default function Projects() {
  const [active, setActive] = useState(null)
  const [current, setCurrent] = useState(0)
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440)
  const wrapRef = useRef(null)
  const n = projects.length

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] })

  // Линейное непрерывное движение + пружина для инерции (лента «догоняет» скролл).
  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -(n - 1) * vw])
  const x = useSpring(xRaw, { stiffness: 55, damping: 22, mass: 0.9 })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setCurrent(Math.min(n - 1, Math.round(v * (n - 1))))
  })

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  return (
    <section id="projects" className="bg-void">
      {/* интро-экран — визуально отделяет проекты от материалов */}
      <div className="border-t hairline">
        <div className="mx-auto flex min-h-[62vh] max-w-[1280px] flex-col justify-center px-6 py-28 md:px-10 md:py-36">
          <Reveal>
            <SectionLabel>Проекты</SectionLabel>
          </Reveal>
          <RevealHeading
            lines={['Избранные работы']}
            delay={0.05}
            className="mt-6 text-[11vw] font-[200] leading-[1.02] tracking-tight text-bone md:text-[5vw]"
          />
          <div className="mt-8">
            <Reveal delay={0.1}>
              <p className="max-w-md text-[16px] font-[300] leading-relaxed text-mist">
                Интерьеры, где мебель KULTURA становится частью архитектуры.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* горизонтальный pinned-слайдер */}
      <div ref={wrapRef} className="relative" style={{ height: `${(n - 1) * 118 + 100}vh` }}>
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-void">
          <motion.div style={{ x }} className="flex h-full">
            {projects.map((p, i) => (
              <ProjectPanel key={p.id} project={p} index={i} width={vw} onOpen={() => setActive(p)} />
            ))}
          </motion.div>

          <div className="pointer-events-none absolute right-6 top-7 z-20 md:right-10 md:top-9">
            <span className="text-[12px] tracking-brand text-bone/80" style={SHADOW}>
              <span className="text-ember">{String(current + 1).padStart(2, '0')}</span>
              <span className="mx-2 text-bone/40">/</span>
              {String(n).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {active && <CaseOverlay project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}

/* Чистая полноэкранная панель — акцент на фото */
function ProjectPanel({ project, index, width, onOpen }) {
  return (
    <article className="relative h-full shrink-0 overflow-hidden" style={{ width }}>
      <button
        onClick={onOpen}
        className="group absolute inset-0 block cursor-pointer"
        aria-label={`Открыть проект: ${project.title}`}
      >
        <img
          src={project.cover}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-[2200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
        {/* только лёгкие краевые виньетки, без затемнения снизу */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-void/35 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-44 bg-gradient-to-r from-void/25 to-transparent" />
      </button>

      {/* вертикальное имя слева */}
      <div
        className="pointer-events-none absolute left-4 top-1/2 select-none text-[12px] uppercase tracking-brand text-bone/85 md:left-8 md:text-[13px]"
        style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)', ...SHADOW }}
      >
        {project.label}
      </div>

      {/* мета справа — только тип */}
      <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 text-right md:block md:right-10">
        <div className="text-[11px] uppercase tracking-wide2 text-ember" style={SHADOW}>
          {project.type}
        </div>
      </div>

      {/* низ: компактная подпись */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-14 md:px-10 md:pb-16">
        <div className="mx-auto max-w-[1280px]">
          <h3 className="text-[6vw] font-[200] leading-tight tracking-tight text-bone md:text-[1.9vw]" style={SHADOW}>
            {project.title}
          </h3>
          <button
            onClick={onOpen}
            className="group/btn mt-4 inline-flex items-center gap-3 text-[12px] uppercase tracking-wide2 text-bone/90"
            style={SHADOW}
          >
            Смотреть проект
            <span className="relative h-px w-9 bg-bone/50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:w-14 group-hover/btn:bg-ember" />
          </button>
        </div>
      </div>
    </article>
  )
}

/* Оверлей кейса с галереей + полноэкранный просмотр фото */
function CaseOverlay({ project, onClose }) {
  const [zoom, setZoom] = useState(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && zoom && setZoom(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoom])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      data-lenis-prevent
      className="fixed inset-0 z-[70] overflow-y-auto bg-void"
    >
      <div className="glass sticky top-0 z-10 flex items-center justify-between border-b hairline px-6 py-4 md:px-10">
        <div>
          <span className="text-[11px] uppercase tracking-wide2 text-ember">
            {project.type} · {project.city}
          </span>
          <h3 className="text-[19px] font-[200] tracking-wide2 text-bone">{project.title}</h3>
        </div>
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-[12px] uppercase tracking-wide2 text-mist transition-colors hover:text-bone"
        >
          Закрыть <span className="text-xl leading-none">✕</span>
        </button>
      </div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-[1180px] px-6 py-14 md:px-10"
      >
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <h2 className="text-balance text-[9vw] font-[200] leading-[1.05] tracking-tight text-bone md:text-[3.4vw]">
              {project.title}
            </h2>
          </div>
          <div className="md:col-span-4 md:pt-2">
            <p className="text-[16px] font-[300] leading-relaxed text-mist">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border hairline px-4 py-1.5 text-[12px] tracking-wide2 text-mist"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-12 text-[12px] uppercase tracking-wide2 text-dim">
          Нажмите на фото, чтобы открыть во весь экран
        </p>
        <div className="mt-5 columns-1 gap-5 md:columns-2 [&>*]:mb-5">
          {project.gallery.map((src, i) => (
            <motion.button
              key={src}
              type="button"
              onClick={() => setZoom(src)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="group block w-full cursor-zoom-in overflow-hidden rounded-xl border hairline"
            >
              <img
                src={src}
                alt={`${project.title} — фрагмент ${i + 1}`}
                loading="lazy"
                className="w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            </motion.button>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <button
            onClick={onClose}
            className="group inline-flex items-center gap-3 text-[13px] uppercase tracking-wide2 text-bone"
          >
            <span className="h-px w-10 bg-bone/60 transition-all duration-500 group-hover:w-16 group-hover:bg-ember" />
            Вернуться к проектам
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setZoom(null)}
            className="fixed inset-0 z-[80] flex cursor-zoom-out items-center justify-center bg-void/95 p-4 md:p-10"
          >
            <motion.img
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              src={zoom}
              alt={project.title}
              className="max-h-full max-w-full rounded-lg object-contain"
            />
            <button
              onClick={() => setZoom(null)}
              className="absolute right-6 top-6 text-[12px] uppercase tracking-wide2 text-bone/80 transition-colors hover:text-bone"
            >
              Закрыть ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
