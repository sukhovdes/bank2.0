import { useRef, useState } from 'react'

export default function QuickSettings({ items, setItems, onClose }) {
  const [draft, setDraft] = useState(items)
  const dragIdx = useRef(null)
  const [overIdx, setOverIdx] = useState(null)

  const reorder = (to) => {
    const from = dragIdx.current
    if (from == null || from === to) return
    setDraft((prev) => {
      const next = [...prev]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })
    dragIdx.current = to
  }

  const toggle = (id) => setDraft((prev) => prev.map((it) => (it.id === id ? { ...it, on: !it.on } : it)))

  const apply = () => { setItems(draft); onClose() }

  return (
    <div className="qs-overlay" onClick={onClose}>
      <div className="qs-modal" onClick={(e) => e.stopPropagation()}>
        <div className="qs-head">
          <h3>Настройка быстрых действий</h3>
          <button className="qs-close" onClick={onClose} aria-label="Закрыть">
            <img src="/icons/cross.svg" alt="" width={20} height={20} />
          </button>
        </div>

        <div className="qs-list">
          {draft.map((it, i) => (
            <div
              key={it.id}
              className={`qs-row${overIdx === i ? ' is-over' : ''}${it.on ? '' : ' is-off'}`}
              draggable
              onDragStart={() => { dragIdx.current = i }}
              onDragEnter={() => setOverIdx(i)}
              onDragOver={(e) => { e.preventDefault(); reorder(i) }}
              onDragEnd={() => { dragIdx.current = null; setOverIdx(null) }}
            >
              <span className="qs-grip" aria-hidden>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="5" cy="4" r="1.4"/><circle cx="11" cy="4" r="1.4"/><circle cx="5" cy="8" r="1.4"/><circle cx="11" cy="8" r="1.4"/><circle cx="5" cy="12" r="1.4"/><circle cx="11" cy="12" r="1.4"/></svg>
              </span>
              <img src={it.icon} alt="" width={18} height={18} />
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

        <div className="qs-actions">
          <button className="qs-btn qs-cancel" onClick={onClose}>Отменить</button>
          <button className="qs-btn qs-apply" onClick={apply}>Применить</button>
        </div>
      </div>
    </div>
  )
}
