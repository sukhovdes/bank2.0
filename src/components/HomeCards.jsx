import { useState } from 'react'
import { IcRefresh, IcCross } from '../icons.jsx'

// Карточка счёта для бизнеса. Клик по телу — баннер, клик по иконке карты — модалка.
export function BusinessAccountCard({ onBody, onIcon, empty }) {
  return (
    <div className="card account card-clickable" onClick={onBody}>
      <span className="muted">Счёт для бизнеса · 1234</span>
      <div className="sum">{empty ? <>0<span className="sum-dim">,00 ₽</span></> : <>2 000 120<span className="sum-dim">,60 ₽</span></>}</div>
      {empty ? (
        <span className="account-hint muted">Карта ещё не выпущена</span>
      ) : (
        <img
          className="card-mir card-mir-clickable"
          src="/icons/card_mir@3x.png" alt="Карта"
          onClick={(e) => { e.stopPropagation(); onIcon() }}
        />
      )}
    </div>
  )
}

// Отсрочка
export function DeferralCard() {
  const [updated, setUpdated] = useState(false)
  const [loading, setLoading] = useState(false)
  const update = () => {
    if (loading || updated) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setUpdated(true) }, 1200)
  }
  return (
    <div className="card account">
      <span className="muted">Отсрочка на Ozon для бизнеса</span>
      <div className="sum">{updated ? <>Доступно: 200 000<span className="sum-dim"> ₽</span></> : <span className="sum-dim">Лимит устарел</span>}</div>
      {!updated && (
        <button className="link-btn" onClick={update} disabled={loading}>
          {loading
            ? <><span className="link-spinner" aria-hidden /><span>Обновляем…</span></>
            : <><IcRefresh width={18} height={18} /><span>Обновить лимит</span></>}
        </button>
      )}
    </div>
  )
}

// Промо «Счёт ежедневных выплат» с закрытием
export function PromoCard({ onClose }) {
  return (
    <div className="card account promo-card">
      <button className="promo-close" onClick={onClose} aria-label="Закрыть">
        <IcCross width={18} height={18} />
      </button>
      <span className="muted">Счёт ежедневных выплат</span>
      <div className="promo-row">
        <span className="sum">10,85%<span className="promo-year"> годовых</span></span>
        <span className="promo-badge">Ставка повышена</span>
      </div>
    </div>
  )
}
