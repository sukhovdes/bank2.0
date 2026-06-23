import { useRef, useState } from 'react'

export default function QuickSettings({ items, setItems, onClose }) {
  const dragIdx = useRef(null)
  const [overIdx, setOverIdx] = useState(null)

  const reorder = (to) => {
    const from = dragIdx.current
    if (from == null || from === to) return
    setItems((prev) => {
      const next = [...prev]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })
    dragIdx.current = to
  }

  const toggle = (id) => setItems((prev) => prev.map((it) => (it.id === id ? { ...it, on: !it.on } : it)))

  return (
    <div className="qs-overlay" onClick={onClose}>
      <div className="qs-modal" onClick={(e) => e.stopPropagation()}>
        <div className="qs-head">
          <h3>Быстрые действия</h3>
          <button className="qs-close" onClick={onClose} aria-label="Закрыть">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="m7 7 10 10M17 7 7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
        <p className="muted qs-sub">Включите нужные и перетащите, чтобы изменить порядок</p>

        <div className="qs-list">
          {items.map((it, i) => (
            <div
              key={it.id}
              className={`qs-row${overIdx === i ? ' is-over' : ''}`}
              draggable
              onDragStart={() => { dragIdx.current = i }}
              onDragEnter={() => setOverIdx(i)}
              onDragOver={(e) => { e.preventDefault(); reorder(i) }}
              onDragEnd={() => { dragIdx.current = null; setOverIdx(null) }}
            >
              <span className="qs-grip" aria-hidden>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="5" cy="4" r="1.4"/><circle cx="11" cy="4" r="1.4"/><circle cx="5" cy="8" r="1.4"/><circle cx="11" cy="8" r="1.4"/><circle cx="5" cy="12" r="1.4"/><circle cx="11" cy="12" r="1.4"/></svg>
              </span>
              <img src={it.icon} alt="" width={22} height={22} />
              <span className="qs-label">{it.label}</span>
              <button
                className={`switch${it.on ? ' on' : ''}`}
                onClick={() => toggle(it.id)}
                aria-label={it.on ? 'Выключить' : 'Включить'}
              >
                <span />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
