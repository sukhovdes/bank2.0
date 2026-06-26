import { useState } from 'react'

const mask = (url) => ({ WebkitMaskImage: `url(${url})`, maskImage: `url(${url})` })

// Левое меню — общее для всех; центральная часть отличается по продукту и разделу.
const CONFIG = {
  'Зарплатный проект': [
    {
      label: 'Выплаты', icon: '/icons/pw_payouts.svg', cta: 'Создать выплату',
      emptyIcon: '/icons/empty_articles.svg',
      emptyText: 'Выплачивайте зарплату сотрудникам, а мы отобразим её здесь',
    },
    {
      label: 'Сотрудники', icon: '/icons/pw_employees.svg', cta: 'Добавить сотрудника',
      emptyIcon: '/icons/pw_employees.svg',
      emptyText: 'Добавьте сотрудников, чтобы выплачивать им зарплату',
    },
  ],
}

const DEFAULT = [
  {
    label: 'Обзор', icon: '/icons/empty_articles.svg', cta: 'Начать',
    emptyIcon: '/icons/empty_articles.svg',
    emptyText: 'Здесь появится информация по продукту',
  },
  {
    label: 'Документы', icon: '/icons/document.svg', cta: 'Загрузить документ',
    emptyIcon: '/icons/document.svg',
    emptyText: 'Загрузите документы — они будут храниться здесь',
  },
]

export default function Product({ product, onBack, onConnect }) {
  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState(0)
  const menu = CONFIG[product?.label] || DEFAULT
  const section = menu[active]

  const connect = () => {
    setLoading(true)
    setTimeout(() => onConnect && onConnect(), 1200)
  }

  if (!product || !product.connected) {
    return (
      <div className="page page-product">
        <div className="island island-tall product-island">
          <div className="anketa">
            {product?.img
              ? <img className="anketa-img" src={product.img} alt="" width={88} height={88} />
              : <span className="tile-emoji">💼</span>}
            <h3>Подключите {product?.label?.toLowerCase() || 'продукт'}</h3>
            <p className="muted">Откройте продукт из дока в один клик — он закрепится иконкой рядом с разделами.</p>
            <button
              className={`primary-btn${loading ? ' is-loading' : ''}`}
              onClick={connect}
              disabled={loading}
            >
              {loading ? <span className="btn-spinner" aria-label="Загрузка" /> : 'Подключить'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page pw">
      <div className="pw-layout">
        <aside className="pw-side">
          <button className="pw-back" onClick={onBack} aria-label="Назад">
            <span className="mask-icon pw-back-ic" style={mask('/icons/chevron_right.svg')} />
          </button>
          <nav className="pw-nav">
            {menu.map((m, i) => (
              <button
                key={m.label}
                className={`pw-nav-item${i === active ? ' is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="mask-icon pw-nav-ic" style={mask(m.icon)} />
                <span>{m.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <section className="pw-main">
          <div className="pw-head">
            <h1>{product?.label}</h1>
            <button className="primary-btn pw-cta">{section.cta}</button>
          </div>
          <div className="pw-empty">
            <div className="pw-empty-inner">
              <span className="mask-icon pw-empty-ic" style={mask(section.emptyIcon)} />
              <p className="pw-empty-text">{section.emptyText}</p>
              <button className="btn-soft">{section.cta}</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
