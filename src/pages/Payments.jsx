import { useState } from 'react'

const MENU = ['Перевести деньги', 'Выставление счетов', 'Справки и выписки', 'Лимиты и тарифы']

export default function Payments() {
  const [active, setActive] = useState(0)
  return (
    <div className="page page-split">
      <aside className="side-menu">
        {MENU.map((m, i) => (
          <button
            key={m}
            className={`side-item${i === active ? ' is-active' : ''}`}
            onClick={() => setActive(i)}
          >
            {m}
          </button>
        ))}
      </aside>
      <div className="split-content">
        <h1>{MENU[active]}</h1>
        <div className="island">
          <div className="muted island-placeholder">
            Здесь форма раздела «{MENU[active]}». В прототипе — заглушка-«остров».
          </div>
        </div>
      </div>
    </div>
  )
}
