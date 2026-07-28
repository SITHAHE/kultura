import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Reveal, SectionLabel, RevealHeading } from '../ui.jsx'
import { projects } from '../data.js'

const SHADOW = { textShadow: '0 1px 24px rgba(0,0,0,0.6)' }

export default function Projects() {
  const [active, setActive] = useState(null)

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active])

  return (
    <section id="projects" className="bg-void">
      {/* интро-экран — визуально отделяет проекты от материалов */}
      <div className="border-t hairline">
        <div className="mx-auto flex min-h-[54svh] max-w-[1280px] flex-col justify-center px-6 py-24 md:px-10 md:py-32">
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
                Интерьеры и пространства, где мебель KULTURA становится частью архитектуры.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* вертикальная лента крупных карточек */}
      <div className="space-y-5 px-4 pb-6 md:space-y-8 md:px-8 md:pb-10">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={i}
            total={projects.length}
            onOpen={() => setActive(p)}
          />
        ))}
      </div>

      <AnimatePresence>
        {active && <CaseOverlay project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}

/* Крупная карточка проекта во всю ширину — акцент на фото */
function ProjectCard({ project, index, total, onOpen }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <article ref={ref}>
      <button
        onClick={onOpen}
        aria-label={`Открыть проект: ${project.title}`}
        className="group relative block h-[88svh] max-h-[900px] min-h-[440px] w-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)] md:h-[94svh]"
      >
        <motion.div style={{ y }} className="absolute inset-0 -top-[6%] h-[112%]">
          <img
            src={project.cover}
            alt={project.title}
            style={{ objectPosition: project.focus || 'center' }}
            className="h-full w-full object-cover transition-transform duration-[2400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        </motion.div>

        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-void/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-void/85 via-void/35 to-transparent" />

        {/* счётчик */}
        <div className="absolute right-5 top-5 z-10 md:right-8 md:top-8">
          <span className="text-[12px] tracking-brand text-bone/80" style={SHADOW}>
            <span className="text-ember">{String(index + 1).padStart(2, '0')}</span>
            <span className="mx-2 text-bone/40">/</span>
            {String(total).padStart(2, '0')}
          </span>
        </div>

        {/* вертикальное имя слева */}
        <div
          className="pointer-events-none absolute left-4 top-1/2 z-10 select-none text-[11px] uppercase tracking-brand text-bone/80 md:left-7 md:text-[12px]"
          style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)', ...SHADOW }}
        >
          {project.label}
        </div>

        {/* низ: подпись */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-10 md:px-12 md:pb-14">
          <div className="mx-auto max-w-[1280px]">
            <h3
              className="text-[9vw] font-[200] leading-tight tracking-[0.04em] text-bone md:text-[3vw]"
              style={SHADOW}
            >
              {project.title}
            </h3>
            <span
              className="mt-3 inline-flex items-center gap-3 text-[12px] uppercase tracking-wide2 text-bone/90 md:mt-4"
              style={SHADOW}
            >
              Смотреть проект
              <span className="h-px w-9 bg-bone/50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-16 group-hover:bg-ember" />
            </span>
          </div>
        </div>
      </button>
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
          {project.designer && (
            <span className="text-[11px] uppercase tracking-wide2 text-ember">
              Дизайн — {project.designer}
            </span>
          )}
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
            <h2 className="text-balance text-[9vw] font-[200] leading-[1.05] tracking-[0.04em] text-bone md:text-[3.4vw]">
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
            {project.designer && (
              <p className="mt-6 text-[13px] font-[300] text-dim">
                Дизайн-проект — {project.designer}
              </p>
            )}
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
