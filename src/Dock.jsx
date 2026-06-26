import { useRef, useState } from 'react'

const mask = (url) => ({ WebkitMaskImage: `url(${url})`, maskImage: `url(${url})` })

const SECTIONS = [
  { id: 'home', label: 'Главная', icon: '/icons/home.svg' },
  { id: 'payments', label: 'Платежи', icon: '/icons/rubles_toolbar.svg' },
  { id: 'services', label: 'Сервисы', icon: '/icons/catalog.svg' },
]

// Быстрые пункты для «Платежей» (показываются по ховеру шеврона)
const PAY_ITEMS = [
  { label: 'Отправить по реквизитам', icon: '/icons/document.svg' },
  { label: 'Между счетами', icon: '/icons/exchange.svg' },
  { label: 'Выставить счёт', icon: '/icons/document_add.svg' },
]

export default function Dock({ active, onNavigate, products, onAddProduct, onRemoveProduct }) {
  const [revealed, setRevealed] = useState(false)
  const [dragId, setDragId] = useState(null)
  const [payMenu, setPayMenu] = useState(false)
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
        {SECTIONS.map(({ id, label, icon }) =>
          id === 'payments' ? (
            <div key={id} className="dock-item-wrap" onMouseLeave={() => setPayMenu(false)}>
              <DockItem section active={active === id} onClick={() => onNavigate(id)}>
                <span className="dock-section">
                  <span className="dock-section-ic mask-icon" style={mask(icon)} />
                  <span className="dock-section-label">{label}</span>
                </span>
              </DockItem>
              <span className="dock-caret-anchor">
              <button
                className={`dock-caret-btn${payMenu ? ' is-open' : ''}`}
                onMouseEnter={() => setPayMenu(true)}
                onClick={() => setPayMenu((v) => !v)}
                aria-label="Быстрые платежи"
              >
                <span className="dock-caret mask-icon" style={mask('/icons/chevron_down.svg')} />
              </button>
              {payMenu && (
                <div className="dock-pop-wrap">
                  <div className="dock-pop">
                    {PAY_ITEMS.map((it) => (
                      <button
                        key={it.label}
                        className="dock-pop-item"
                        onClick={() => { onNavigate('payments'); setPayMenu(false) }}
                      >
                        <span className="dock-pop-ic mask-icon" style={mask(it.icon)} />
                        <span>{it.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              </span>
            </div>
          ) : (
            <DockItem key={id} section active={active === id} onClick={() => onNavigate(id)}>
              <span className="dock-section">
                <span className="dock-section-ic mask-icon" style={mask(icon)} />
                <span className="dock-section-label">{label}</span>
              </span>
            </DockItem>
          )
        )}

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
