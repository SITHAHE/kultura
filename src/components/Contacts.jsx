import { Reveal, SectionLabel, RevealHeading, Monogram, Wordmark } from '../ui.jsx'
import { contacts } from '../data.js'

export default function Contacts() {
  return (
    <section id="contacts" className="border-t hairline bg-ink">
      <div className="mx-auto max-w-[1280px] px-6 pt-32 md:px-10 md:pt-44">
        <div className="grid gap-16 md:grid-cols-12 md:gap-10">
          {/* левая колонка — приглашение */}
          <div className="md:col-span-5">
            <Reveal>
              <SectionLabel>Контакты</SectionLabel>
            </Reveal>
            <RevealHeading
              lines={['Обсудим ваш', 'проект']}
              delay={0.05}
              className="mt-6 text-[9vw] font-[200] leading-[1.04] tracking-tight text-bone md:text-[3.6vw]"
            />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md text-[16px] font-[300] leading-relaxed text-mist">
                Мы беремся за интерьеры, где важна каждая деталь — от частной резиденции до
                общественного пространства. Расскажите о задаче — остальное возьмём на себя.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-12 space-y-8">
                <div>
                  <span className="text-[11px] uppercase tracking-wide2 text-dim">Телефон</span>
                  <div className="mt-2 space-y-1">
                    {contacts.phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p.replace(/[^\d+]/g, '')}`}
                        className="block text-2xl font-[200] text-bone transition-colors hover:text-ember"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <span className="text-[11px] uppercase tracking-wide2 text-dim">Почта</span>
                    <a
                      href={`mailto:${contacts.email}`}
                      className="mt-2 block text-[17px] font-[300] text-bone transition-colors hover:text-ember"
                    >
                      {contacts.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wide2 text-dim">Часы</span>
                    <p className="mt-2 text-[17px] font-[300] text-bone">{contacts.hours}</p>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-wide2 text-dim">Производство</span>
                  <p className="mt-2 text-[17px] font-[300] text-bone">{contacts.address}</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* правая колонка — карта */}
          <div className="md:col-span-7">
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border hairline md:aspect-auto md:h-full md:min-h-[520px]">
                <iframe
                  title="KULTURA на карте"
                  src="https://yandex.ru/map-widget/v1/?ll=30.243723%2C59.958384&z=16&pt=30.243723,59.958384,pm2rdm&text=%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3%2C%20%D0%A3%D1%80%D0%B0%D0%BB%D1%8C%D1%81%D0%BA%D0%B0%D1%8F%20%D1%83%D0%BB.%2C%204%D0%B2"
                  className="h-full w-full"
                  style={{ filter: 'grayscale(1) invert(0.92) contrast(0.9) hue-rotate(180deg)' }}
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  )
}

function Footer() {
  return (
    <footer className="mx-auto mt-32 max-w-[1280px] px-6 pb-12 md:px-10">
      <div className="border-t hairline pt-12">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <a href="#top" className="flex items-center gap-3">
            <Monogram className="h-11" />
            <Wordmark className="h-[27px]" />
          </a>
          <p className="max-w-xs text-[13px] font-[300] leading-relaxed text-dim">
            Производство мебели и изделий из акрилового камня. Проектирование · производство · монтаж
            по России и Европе.
          </p>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t hairline pt-6 text-[12px] tracking-wide2 text-dim sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} KULTURA · Санкт-Петербург</span>
          <span>Сделано с вниманием к деталям</span>
        </div>
      </div>
    </footer>
  )
}
