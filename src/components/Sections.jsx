import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Reveal, SectionLabel, RevealHeading } from '../ui.jsx'
import { materials, steps, about } from '../data.js'

const asset = (p) => `${import.meta.env.BASE_URL}assets/${p}`

/* ——— ФИЛОСОФИЯ ——— */
export function Philosophy() {
  return (
    <section id="philosophy" className="relative mx-auto max-w-[1280px] px-6 py-32 md:px-10 md:py-48">
      <Reveal>
        <SectionLabel>Философия</SectionLabel>
      </Reveal>
      <div className="mt-10 grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          <RevealHeading
            lines={['Мы возвращаем уважение', 'к столярному ремеслу.']}
            className="text-[8vw] font-[200] leading-[1.05] tracking-tight text-bone md:text-[3.6vw]"
          />
        </div>
        <div className="md:col-span-5 md:pt-3">
          <Reveal delay={0.15}>
            <p className="text-[17px] font-[300] leading-relaxed text-mist">
              KULTURA — это мастерская, где мебель проектируют инженеры, а собирают руки, помнящие
              традиции большой европейской школы. Мы работаем с акриловым камнем, деревом и
              натуральной фактурой так, чтобы результат жил десятилетиями — и с каждым годом
              становился только дороже взгляду.
            </p>
            <p className="mt-6 text-[17px] font-[300] leading-relaxed text-mist">
              Здесь нет случайных деталей. Есть внимание — к линии, к торцу, к тому, как свет ложится
              на поверхность.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ——— КИНЕМАТОГРАФИЧНЫЙ РАЗВОРОТ ——— */
export function Statement() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1])

  return (
    <section ref={ref} className="relative h-[85svh] w-full overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img src={asset('feature-hitech.jpg')} alt="" className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-void/70" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(11,13,20,0.55), transparent 75%)' }}
      />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <Reveal>
          <p
            className="max-w-4xl text-balance text-center text-[6.5vw] font-[200] leading-[1.15] tracking-tight text-bone md:text-[3vw]"
            style={{ textShadow: '0 2px 40px rgba(0,0,0,0.75)' }}
          >
            «Форма мебели — это застывшая
            <span className="text-ember"> культура</span> тех, кто её создаёт».
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ——— ПОЛНОЭКРАННАЯ ПАНЕЛЬ С ПАРАЛЛАКСОМ (общая) ——— */
function ParallaxMedia({ image, alt, overlay = 'bg-void/45', children, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section ref={ref} className={`relative w-full overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-0 -top-[10%] h-[120%]">
        <img src={image} alt={alt} className="h-full w-full object-cover" />
      </motion.div>
      <div className={`absolute inset-0 ${overlay}`} />
      {children}
    </section>
  )
}

/* ——— МАТЕРИАЛЫ ——— */
export function Materials() {
  return (
    <div id="materials">
      {/* интро */}
      <div className="mx-auto max-w-[1280px] px-6 pt-32 pb-16 md:px-10 md:pt-44 md:pb-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <SectionLabel>Материалы</SectionLabel>
            </Reveal>
            <RevealHeading
              lines={['Три материала', 'и точная фурнитура']}
              delay={0.05}
              className="mt-6 text-[9vw] font-[200] leading-[1.05] tracking-tight text-bone md:text-[3.4vw]"
            />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-[15px] font-[300] leading-relaxed text-mist">
              Мы не прячем фактуру за отделкой. Итальянский шпон, натуральный камень и бесшовный
              акриловый массив — а ход каждой двери и ящика доверен фурнитуре Blum.
            </p>
          </Reveal>
        </div>
      </div>

      {/* полноэкранные панели */}
      {materials.map((m, i) => (
        <ParallaxMedia
          key={m.id}
          image={m.image}
          alt={m.name}
          overlay="bg-gradient-to-t from-void via-void/45 to-void/25"
          className="grain h-[88vh] min-h-[560px]"
        >
          {/* усиленный нижний скрим под текстом */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-void via-void/80 to-transparent" />
          <div className="relative mx-auto flex h-full max-w-[1280px] flex-col justify-end px-6 pb-16 md:px-10 md:pb-24">
            <span
              className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 select-none text-[34vw] font-[100] leading-none text-white/[0.05] md:right-10 md:text-[22vw]"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <Reveal>
              <span className="text-[12px] uppercase tracking-brand text-ember">{m.caption}</span>
            </Reveal>
            <RevealHeading
              lines={[m.name]}
              delay={0.05}
              className="mt-4 text-[13vw] font-[100] leading-[0.95] tracking-tight text-bone md:text-[6vw]"
            />
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-[16px] font-[400] leading-relaxed text-bone/80 md:text-[18px]">
                {m.text}
              </p>
            </Reveal>
          </div>
        </ParallaxMedia>
      ))}
    </div>
  )
}

/* ——— ПРОЦЕСС — вертикальный таймлайн с линией, растущей на скролле ——— */
export function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] })
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="process" ref={ref} className="border-y hairline bg-ink">
      <div className="mx-auto max-w-[1280px] px-6 py-32 md:px-10 md:py-44">
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel>Процесс</SectionLabel>
          </Reveal>
          <RevealHeading
            lines={['От чертежа до последней', 'выверенной линии']}
            delay={0.05}
            className="mt-6 text-[8vw] font-[200] leading-[1.08] tracking-tight text-bone md:text-[3.4vw]"
          />
        </div>

        <div className="relative mt-20 md:mt-28">
          {/* спина таймлайна */}
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-white/12 md:left-[9px]" />
          <motion.div
            style={{ scaleY: fill }}
            className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-ember md:left-[9px]"
          />

          <div className="space-y-16 md:space-y-24">
            {steps.map((s, i) => (
              <ProcessStep
                key={s.n}
                step={s}
                progress={scrollYProgress}
                threshold={i / (steps.length - 1)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProcessStep({ step, progress, threshold }) {
  const color = useTransform(progress, [threshold - 0.1, threshold], ['#39415a', '#f26522'])
  const scale = useTransform(progress, [threshold - 0.1, threshold], [0.7, 1])

  return (
    <div className="relative grid grid-cols-1 gap-x-10 pl-12 md:grid-cols-[auto_1fr] md:pl-20">
      <motion.span
        style={{ backgroundColor: color, scale }}
        className="absolute left-[7px] top-2 h-3.5 w-3.5 -translate-x-1/2 rounded-full ring-[5px] ring-ink md:left-[9px]"
      />
      <span className="text-[13px] font-[300] tracking-brand text-ember md:pt-1">{step.n}</span>
      <div className="mt-3 md:mt-0">
        <h3 className="text-2xl font-[200] text-bone md:text-[28px]">{step.title}</h3>
        <p className="mt-4 max-w-md text-[15px] font-[300] leading-relaxed text-mist">{step.text}</p>
      </div>
    </div>
  )
}

/* Счётчик, анимирующийся при попадании в экран */
function CountUp({ to, from = 0, suffix = '', duration = 1.8 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-18% 0px -18% 0px' })
  const [val, setVal] = useState(from)

  useEffect(() => {
    if (!inView) return
    let raf
    const t0 = performance.now()
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / (duration * 1000))
      const e = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(from + (to - from) * e))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, from, duration])

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  )
}

/* ——— О МАСТЕРСКОЙ ——— */
export function Workshop() {
  return (
    <section id="about" className="mx-auto max-w-[1280px] px-6 py-32 md:px-10 md:py-44">
      <div>
        <Reveal>
          <SectionLabel>О производстве</SectionLabel>
        </Reveal>
        <RevealHeading
          lines={['Производство', 'полного цикла']}
          delay={0.05}
          className="mt-6 text-[10vw] font-[200] leading-[1.02] tracking-tight text-bone md:text-[4.6vw]"
        />
      </div>

      {/* лид + принцип */}
      <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <Reveal>
            <p className="text-[17px] font-[300] leading-relaxed text-mist">{about.lead}</p>
            <p className="mt-6 text-[14px] font-[300] leading-relaxed text-dim">{about.note}</p>
          </Reveal>
        </div>
        <div className="md:col-span-7 md:pl-10">
          <Reveal delay={0.1}>
            <figure className="border-l border-ember/40 pl-8 md:pl-12">
              <blockquote className="text-balance text-[6vw] font-[100] leading-[1.15] tracking-tight text-bone md:text-[2.5vw]">
                «{about.principle}»
              </blockquote>
              <figcaption className="mt-6 text-[13px] uppercase tracking-wide2 text-dim">
                {about.principleNote}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>

      {/* факты со счётчиками */}
      <div className="mt-20 grid gap-px overflow-hidden border-t hairline md:mt-28 md:grid-cols-3">
        {about.facts.map((f, i) => (
          <Reveal key={f.label} delay={i * 0.1}>
            <div className="group relative h-full border-b hairline py-12 md:border-b-0 md:border-l md:pl-10 md:first:border-l-0 md:first:pl-0">
              <div className="text-[13vw] font-[100] leading-none tracking-tight text-bone md:text-[5.4vw]">
                <CountUp to={f.value} from={f.from} suffix={f.suffix} />
              </div>
              <p className="mt-5 max-w-[15rem] text-[14px] font-[300] leading-relaxed text-mist">
                {f.label}
              </p>
              <span className="mt-6 block h-px w-10 bg-ember/70 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-20" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
