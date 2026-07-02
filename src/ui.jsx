import { motion } from 'framer-motion'

/* Мягкое проявление на скролле — «как у apple»: спокойно, без цирка */
export function Reveal({ children, delay = 0, y = 26, className = '', as = 'div' }) {
  const M = motion[as] || motion.div
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </M>
  )
}

/* Reveal заголовка построчно: каждая строка «выезжает» из-под невидимой линии.
   lines — массив строк. className — типографика заголовка. */
export function RevealHeading({ lines, className = '', as = 'h2', delay = 0 }) {
  const Tag = motion[as] || motion.h2
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block will-change-transform"
            variants={{
              hidden: { y: '108%', opacity: 0 },
              show: {
                y: '0%',
                opacity: 1,
                transition: {
                  duration: 1.5,
                  delay: delay + i * 0.16,
                  ease: [0.25, 0.1, 0.25, 1],
                  opacity: { duration: 1.1, delay: delay + i * 0.16, ease: 'linear' },
                },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/* Заголовок секции — тонкая надпись-«лейбл» + большой лёгкий заголовок */
export function SectionLabel({ children }) {
  return (
    <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-brand text-dim">
      <span className="h-px w-8 bg-ember/70" />
      {children}
    </span>
  )
}

const LOGO = (p) => `${import.meta.env.BASE_URL}assets/${p}`

/* Монограмма «К» в рамке — оригинал из айдентики (высоту задаёт className) */
export function Monogram({ className = '' }) {
  return (
    <img
      src={LOGO('logo-mark.png')}
      alt="KULTURA"
      className={`w-auto object-contain ${className}`}
      draggable="false"
    />
  )
}

/* Логотип-словомарк — оригинальные буквы из айдентики (высоту задаёт className) */
export function Wordmark({ className = '' }) {
  return (
    <img
      src={LOGO('logo-wordmark.png')}
      alt="KULTURA"
      className={`w-auto object-contain ${className}`}
      draggable="false"
    />
  )
}
