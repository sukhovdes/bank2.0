import { useState } from 'react'
import PaymentDrawer from '../components/PaymentDrawer.jsx'

const MENU = ['Платежи и переводы', 'Выставление счетов', 'Справки и выписки', 'Лимиты и тарифы']
const TABS = ['Юрлицу', 'Физлицу', 'В бюджет']
const VAT = ['Без НДС', 'НДС 0%', 'НДС 5%', 'НДС 7%', 'НДС 10%', 'НДС 20%']

function InfoIcon() {
  return (
    <span className="info-ic" aria-hidden>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#00307814"/><path d="M8 7v4M8 5h.01" stroke="#001a3466" strokeWidth="1.5" strokeLinecap="round"/></svg>
    </span>
  )
}

function Chevron() {
  return <svg className="field-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="m6 9 6 6 6-6" stroke="#001a3466" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

function nowStr() {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function TransferForm() {
  const [tab, setTab] = useState(0)
  const [vat, setVat] = useState(0)
  const [purpose, setPurpose] = useState('')
  const [amount, setAmount] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [filled, setFilled] = useState(false)

  const displayAmount = amount.trim() || '84 200'

  // Мок-данные контрагента — по клику на «Получатель» (для презентации)
  const fillMock = () => {
    setFilled(true)
    if (!amount.trim()) setAmount('84 200')
    if (!purpose.trim()) setPurpose('Оплата по счёту № 142 от 10.06.2026, в т.ч. НДС')
  }
  const val = (v, placeholder) => filled
    ? <span className="field-value">{v}</span>
    : <span className="field-placeholder">{placeholder}</span>

  return (
    <div className="island form-island">
      <div className="form-tabs">
        {TABS.map((t, i) => (
          <button key={t} className={`form-tab${i === tab ? ' is-active' : ''}`} onClick={() => setTab(i)}>{t}</button>
        ))}
      </div>

      <section className="form-section">
        <h3>Кому</h3>
        <button className="field field-select" onClick={fillMock}>
          {val('ООО «Ромашка»', 'Получатель')}
          <Chevron />
        </button>
        <div className="field-row">
          <button className="field field-select" onClick={fillMock}>
            {val('ПАО Сбербанк · 044525225', 'Название банка или БИК')}
            <Chevron />
          </button>
          <div className="field">
            {val('40702810400000123456', 'Расчётный счёт')}
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
            <input className="field-input" placeholder="Сумма платежа" value={amount} onChange={(e) => setAmount(e.target.value)} />
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
        <button className="btn-primary" onClick={() => setDrawerOpen(true)}>Подписать и отправить</button>
        <button className="btn-secondary">Сохранить на подпись</button>
      </div>

      <PaymentDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        amount={displayAmount}
        recipient="ООО «Ромашка»"
        account="1234"
        date={nowStr()}
        fee="0 ₽"
      />
    </div>
  )
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
            <div className="muted island-placeholder">Здесь будет раздел «{MENU[active]}». В прототипе — заглушка.</div>
          </div>
        )}
      </div>
    </div>
  )
}
