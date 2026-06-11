import { useState } from 'react'

const MENU = ['Перевести деньги', 'Выставление счетов', 'Справки и выписки', 'Лимиты и тарифы']
const TABS = ['Юрлицу', 'Физлицу', 'В бюджет']
const VAT = ['Без НДС', 'НДС 0%', 'НДС 5%', 'НДС 7%', 'НДС 10%', 'НДС 20%']

function InfoIcon() {
  return (
    <span className="info-ic" aria-hidden>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#00307814"/><path d="M8 7v4M8 5h.01" stroke="#001a3466" strokeWidth="1.5" strokeLinecap="round"/></svg>
    </span>
  )
}

function TransferForm() {
  const [tab, setTab] = useState(0)
  const [vat, setVat] = useState(0)
  const [purpose, setPurpose] = useState('')

  return (
    <div className="island form-island">
      <div className="form-tabs">
        {TABS.map((t, i) => (
          <button key={t} className={`form-tab${i === tab ? ' is-active' : ''}`} onClick={() => setTab(i)}>{t}</button>
        ))}
      </div>

      <section className="form-section">
        <h3>Кому</h3>
        <div className="field field-select">
          <span className="field-placeholder">Получатель</span>
          <Chevron />
        </div>
        <div className="field-row">
          <div className="field field-select">
            <span className="field-placeholder">Название банка или БИК</span>
            <Chevron />
          </div>
          <div className="field">
            <span className="field-placeholder">Расчётный счёт</span>
            <InfoIcon />
          </div>
        </div>
      </section>

      <section className="form-section">
        <h3>Откуда</h3>
        <button className="field account-field">
          <span className="account-ic">
            <img src="/icons/rubles.svg" alt="" width={22} height={22} />
          </span>
          <span className="account-text">
            <span className="muted account-cap">Счёт для бизнеса ·· 1234</span>
            <span className="account-sum">112 763<span className="sum-dim">,90 ₽</span></span>
          </span>
        </button>
      </section>

      <section className="form-section">
        <h3>Сумма и назначение</h3>
        <div className="field-row">
          <div className="field">
            <input className="field-input" placeholder="Сумма платежа" />
          </div>
          <div className="field field-muted">
            <span className="field-stack">
              <span className="field-cap">Комиссия</span>
              <span className="muted">Согласно тарифу</span>
            </span>
            <InfoIcon />
          </div>
        </div>

        <div className="field field-textarea">
          <textarea
            className="field-input"
            placeholder="Назначение платежа"
            maxLength={210}
            rows={2}
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
          <div className="textarea-foot">
            <span className="muted">{purpose.length}/210</span>
            <InfoIcon />
          </div>
        </div>

        <div className="chips">
          {VAT.map((v, i) => (
            <button key={v} className={`chip${i === vat ? ' is-active' : ''}`} onClick={() => setVat(i)}>{v}</button>
          ))}
        </div>
      </section>

      <button className="form-more">
        <h3>Дополнительно</h3>
        <Chevron />
      </button>

      <div className="form-actions">
        <button className="btn-primary">Подписать и отправить</button>
        <button className="btn-secondary">Сохранить на подпись</button>
      </div>
    </div>
  )
}

function Chevron() {
  return <svg className="field-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="m6 9 6 6 6-6" stroke="#001a3466" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

export default function Payments() {
  const [active, setActive] = useState(0)
  return (
    <div className="page page-split">
      <aside className="side-menu">
        {MENU.map((m, i) => (
          <button key={m} className={`side-item${i === active ? ' is-active' : ''}`} onClick={() => setActive(i)}>{m}</button>
        ))}
      </aside>
      <div className="split-content">
        <h1>{MENU[active]}</h1>
        {active === 0 ? (
          <TransferForm />
        ) : (
          <div className="island">
            <div className="muted island-placeholder">Здесь форма раздела «{MENU[active]}». В прототипе — заглушка-«остров».</div>
          </div>
        )}
      </div>
    </div>
  )
}
