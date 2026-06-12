import { useRef, useState } from 'react'

const SECTIONS = [
  { id: 'home', label: 'Главная', icon: '/icons/home.svg' },
  { id: 'payments', label: 'Платежи', icon: '/icons/rubles_toolbar.svg' },
  { id: 'services', label: 'Сервисы', icon: '/icons/catalog.svg' },
]

export default function Dock({ active, onNavigate, products, onAddProduct, onRemoveProduct }) {
  const [revealed, setRevealed] = useState(false)
  const [dragId, setDragId] = useState(null)
  const dockRef = useRef(null)

  // На главной док в полный размер; в разделах/продуктах — уменьшается, на hover растёт обратно.
  const compact = active !== 'home' && !revealed

  return (
    <div
      className={`dock-wrap${compact ? ' is-compact' : ''}`}
      onMouseEnter={() => setRevealed(true)}
      onMouseLeave={() => setRevealed(false)}
    >
      {/* Зона захвата у нижнего края — чтобы выехал даже когда спрятан */}
      <div className="dock-hotzone" />

      <div className="dock" ref={dockRef}>
        {SECTIONS.map(({ id, label, icon }) => (
          <DockItem key={id} section active={active === id} onClick={() => onNavigate(id)}>
            <span className="dock-section">
              <img className="dock-section-ic" src={icon} alt="" />
              <span className="dock-section-label">{label}</span>
            </span>
          </DockItem>
        ))}

        <span className="dock-divider" />

        {products.map((p) => (
          <DockItem key={p.id} active={active === p.id} tip={p.label} onClick={() => onNavigate(p.id)}>
            <img
              className={`dock-product-img${dragId === p.id ? ' is-dragging' : ''}`}
              src={p.img} alt={p.label} draggable
              onDragStart={(e) => { setDragId(p.id); e.dataTransfer.effectAllowed = 'move' }}
              onDragEnd={(e) => {
                const r = dockRef.current?.getBoundingClientRect()
                // Утащил иконку прочь от дока (вверх) — удаляем, как в macOS
                if (r && e.clientY < r.top - 50) onRemoveProduct?.(p.id)
                setDragId(null)
              }}
            />
            {active === p.id && <span className="dock-dot" />}
          </DockItem>
        ))}

        <DockItem tip="Добавить продукт" onClick={onAddProduct}>
          <span className="dock-add">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </span>
        </DockItem>
      </div>
    </div>
  )
}

function DockItem({ children, section, active, tip, onClick }) {
  return (
    <button
      className={`dock-item${section ? ' is-section' : ''}${active ? ' is-active' : ''}`}
      onClick={onClick}
    >
      {children}
      {tip && <span className="item-tip">{tip}</span>}
    </button>
  )
}
