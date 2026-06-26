import { useEffect, useState } from 'react'

const mask = (url) => ({ WebkitMaskImage: `url(${url})`, maskImage: `url(${url})` })

const SHORTCUTS = [
  { label: 'Реквизиты основного счёта', icon: '/icons/document.svg' },
  { label: 'Создать разовую', icon: '/icons/document_add.svg' },
  { label: 'Исходящие', icon: '/icons/exchange.svg' },
  { label: 'Тарифы по РКО', icon: '/icons/tax.svg' },
  { label: 'Пользователи', icon: '/icons/pw_employees.svg' },
]

export default function SearchV2() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => { setOpen(false); setQuery('') }

  return (
    <>
      <button className="hdr-icon-btn" aria-label="Поиск" onClick={() => setOpen(true)}>
        <img src="/icons/search.svg" alt="" width={24} height={24} />
      </button>

      {open && (
        <div className="sv2-overlay" onClick={close}>
          <button className="sv2-close" onClick={close} aria-label="Закрыть">
            <img src="/icons/cross.svg" alt="" width={22} height={22} />
          </button>

          <div className="sv2-inner" onClick={(e) => e.stopPropagation()}>
            <div className="sv2-head">
              <input
                className="sv2-query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по разделам и контрагентам"
                autoFocus
              />
              {query && <button className="sv2-clear" onClick={() => setQuery('')}>Очистить</button>}
            </div>

            {!query && (
              <div className="sv2-shortcuts">
                {SHORTCUTS.map((s) => (
                  <button key={s.label} className="sv2-sc">
                    <span className="sv2-sc-ic">
                      <span className="mask-icon sv2-sc-glyph" style={mask(s.icon)} />
                    </span>
                    <span className="sv2-sc-label">{s.label}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="sv2-card">
              <div className="sv2-empty">
                <span className="sv2-magnifier">
                  <span className="mask-icon sv2-magnifier-ic" style={mask('/icons/search.svg')} />
                </span>
                <p className="sv2-empty-text">
                  {query ? 'Нет таких разделов и контрагентов' : 'Здесь будет ваша история поиска'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
