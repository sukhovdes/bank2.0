import { useEffect, useState } from 'react'

const HINTS = [
  'Найти платёж за прошлый месяц',
  'Сколько я заплатил налогов?',
  'Выставить счёт на 84 200 ₽',
  'Выписка по счёту за июнь',
  'Какой остаток на счёте?',
]

const SUGGESTIONS = [
  { icon: '🔎', title: 'Найди операцию', desc: '«переводы ООО Ромашка за май»' },
  { icon: '📊', title: 'Спроси про финансы', desc: '«сколько налогов в этом квартале»' },
  { icon: '🧾', title: 'Создай документ', desc: '«выстави счёт на 84 200 ₽»' },
  { icon: '📈', title: 'Аналитика бизнеса', desc: '«как изменилась прибыль за месяц»' },
]

const Spark = ({ size = 20 }) => (
  <img className="ai-spark" src="/icons/sparkles.svg" alt="" width={size} height={size} />
)

export default function AiSearch() {
  const [open, setOpen] = useState(false)
  const [hint, setHint] = useState(0)

  useEffect(() => {
    if (open) return
    const t = setInterval(() => setHint((h) => (h + 1) % HINTS.length), 2600)
    return () => clearInterval(t)
  }, [open])

  return (
    <>
      <button className="hdr-search" onClick={() => setOpen(true)}>
        <Spark />
        <span className="hdr-search-ph" key={hint}>{HINTS[hint]}</span>
      </button>

      {open && (
        <div className="ai-overlay" onClick={() => setOpen(false)}>
          <div className="ai-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ai-input">
              <Spark size={22} />
              <input autoFocus placeholder="Спросите ИИ или найдите что угодно" />
              <span className="ai-kbd">Esc</span>
            </div>

            <div className="ai-section-title">Подсказки ИИ</div>
            <div className="ai-list">
              {SUGGESTIONS.map((s) => (
                <button key={s.title} className="ai-item">
                  <span className="ai-item-ic">{s.icon}</span>
                  <span className="ai-item-text">
                    <span className="ai-item-title">{s.title}</span>
                    <span className="ai-item-desc muted">{s.desc}</span>
                  </span>
                  <span className="ai-badge">AI</span>
                </button>
              ))}
            </div>

            <div className="ai-foot muted">Ozon ИИ понимает запросы на обычном языке</div>
          </div>
        </div>
      )}
    </>
  )
}
