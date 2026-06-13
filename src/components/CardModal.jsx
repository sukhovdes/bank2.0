import { useEffect } from 'react'
import { TiltCard } from './TiltCard.jsx'

const ACTIONS = [
  { id: 'add', label: 'Пополнить', icon: <path d="M12 6v12M6 12h12" stroke="#fff" strokeWidth="2" strokeLinecap="round"/> },
  { id: 'send', label: 'Перевести', icon: <path d="M12 19V6M6 12l6-6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
  { id: 'lock', label: 'Блокировать', icon: <><rect x="5" y="11" width="14" height="9" rx="2" fill="#fff"/><path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="#fff" strokeWidth="2"/></> },
]

const SETTINGS = ['Установить PIN-код', 'Лимиты по карте', 'Тариф']

export default function CardModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Закрыть">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="m7 7 10 10M17 7 7 17" stroke="#001a3466" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>

        <div className="card-pill">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 15 15 9M10 6l1-1a4 4 0 0 1 6 6l-1 1M14 18l-1 1a4 4 0 0 1-6-6l1-1" stroke="#001a34" strokeWidth="1.6" strokeLinecap="round"/></svg>
          Счёт для бизнеса 1 115,21 ₽
        </div>

        <TiltCard className="vcard" tiltLimit={12} scale={1.04}>
          <div className="vcard-top">
            <img className="vcard-logo-img" src="/icons/card_logo.svg" alt="ozon банк для бизнеса" />
            <img className="vcard-heart-img" src="/icons/card_heart.svg" alt="" />
          </div>
          <div className="vcard-type">
            <img className="vcard-cloud-img" src="/icons/card_cloud.svg" alt="" />
            Виртуальная карта
          </div>
          <div className="vcard-bottom">
            <span className="vcard-num">·· 7427</span>
            <MirLogo />
          </div>
        </TiltCard>

        <div className="vcard-owner">Сухов Максим</div>

        <div className="card-actions">
          {ACTIONS.map((a) => (
            <button key={a.id} className="card-action">
              <span className="card-action-ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none">{a.icon}</svg></span>
              <span>{a.label}</span>
            </button>
          ))}
        </div>

        <div className="card-section-head">
          <h3>Реквизиты карты</h3>
          <button className="show-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="#005bff" strokeWidth="2"/><circle cx="12" cy="12" r="2.5" stroke="#005bff" strokeWidth="2"/></svg>
            Показать
          </button>
        </div>

        <div className="req-box">
          <div className="req-field req-full">•••• •••• •••• 7427</div>
          <div className="req-row">
            <div className="req-field">··/··</div>
            <div className="req-field">···</div>
          </div>
          <button className="req-name">
            <span className="req-q">?</span>
            <span>Если нужно указать имя</span>
            <Chevron />
          </button>
        </div>

        <h3 className="card-settings-title">Настройки карты</h3>
        <div className="card-settings">
          {SETTINGS.map((s) => (
            <button key={s} className="settings-row"><span>{s}</span><Chevron /></button>
          ))}
        </div>
      </div>
    </div>
  )
}

function Chevron() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="m9 6 6 6-6 6" stroke="#001a3466" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

function MirLogo() {
  return <img className="vcard-mir" src="/icons/mir.svg" alt="МИР" />
}
