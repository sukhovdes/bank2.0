import { useRef, useState } from 'react'

const SECTIONS = [
  { id: 'home', label: 'Главная', icon: '/icons/home.svg' },
  { id: 'payments', label: 'Платежи', icon: '/icons/rubles.svg' },
  { id: 'services', label: 'Сервисы', icon: '/icons/catalog.svg' },
]

export default function Dock({ active, onNavigate, products, onAddProduct }) {
  const [tooltip, setTooltip] = useState(null) // {x, label}
  const [revealed, setRevealed] = useState(false)

  // На главной док в полный размер; в разделах/продуктах — уменьшается, на hover растёт обратно.
  const compact = active !== 'home' && !revealed

  const show = (el, label) => {
    if (!el) return
    const r = el.getBoundingClientRect()
    setTooltip({ x: r.left + r.width / 2, label })
  }
  const hide = () => setTooltip(null)

  return (
    <div
      className={`dock-wrap${compact ? ' is-compact' : ''}`}
      onMouseEnter={() => setRevealed(true)}
      onMouseLeave={() => { setRevealed(false); hide() }}
    >
      {/* Зона захвата у нижнего края — чтобы выехал даже когда спрятан */}
      <div className="dock-hotzone" />

      <div className="dock">
        {SECTIONS.map(({ id, label, icon }) => (
          <DockItem key={id} section active={active === id}
            label={label} onClick={() => onNavigate(id)} onShow={show} onHide={hide}>
            <span className="dock-section">
              <img className="dock-section-ic" src={icon} alt="" width={22} height={22} />
              <span className="dock-section-label">{label}</span>
            </span>
          </DockItem>
        ))}

        <span className="dock-divider" />

        {products.map((p) => (
          <DockItem key={p.id} active={active === p.id}
            label={p.label} onClick={() => onNavigate(p.id)} onShow={show} onHide={hide}>
            <img className="dock-product-img" src={p.img} alt={p.label} draggable={false} />
            {active === p.id && <span className="dock-dot" />}
          </DockItem>
        ))}

        <DockItem label="Добавить продукт" onClick={onAddProduct} onShow={show} onHide={hide}>
          <span className="dock-add">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </span>
        </DockItem>
      </div>

      {tooltip && !compact && <div className="dock-tooltip" style={{ left: tooltip.x }}>{tooltip.label}</div>}
    </div>
  )
}

function DockItem({ children, section, active, label, onClick, onShow, onHide }) {
  const ref = useRef(null)
  return (
    <button
      ref={ref}
      className={`dock-item${section ? ' is-section' : ''}${active ? ' is-active' : ''}`}
      onClick={onClick}
      onMouseEnter={() => { if (!section) onShow(ref.current, label) }}
      onMouseLeave={onHide}
    >
      {children}
    </button>
  )
}
