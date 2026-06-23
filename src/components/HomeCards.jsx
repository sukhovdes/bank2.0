import { IcRefresh } from '../icons.jsx'

// Карточка счёта для бизнеса. Клик по телу — баннер, клик по иконке карты — модалка.
export function BusinessAccountCard({ onBody, onIcon }) {
  return (
    <div className="card account card-clickable" onClick={onBody}>
      <span className="muted">Счёт для бизнеса · 1234</span>
      <div className="sum">2 000 120<span className="sum-dim">,60 ₽</span></div>
      <img
        className="card-mir card-mir-clickable"
        src="/icons/card_mir@3x.png" alt="Карта"
        onClick={(e) => { e.stopPropagation(); onIcon() }}
      />
    </div>
  )
}

// Отсрочка
export function DeferralCard() {
  return (
    <div className="card account">
      <span className="muted">Отсрочка на Ozon для бизнеса</span>
      <div className="sum">Доступно: 200 000<span className="sum-dim"> ₽</span></div>
      <button className="link-btn"><IcRefresh width={18} height={18} /><span>Обновить лимит</span></button>
    </div>
  )
}

// Промо «Счёт ежедневных выплат» с закрытием
export function PromoCard({ onClose }) {
  return (
    <div className="card account promo-card">
      <button className="promo-close" onClick={onClose} aria-label="Закрыть">
        <img src="/icons/cross.svg" alt="" width={18} height={18} />
      </button>
      <span className="muted">Счёт ежедневных выплат</span>
      <div className="promo-row">
        <span className="sum">10,85%<span className="promo-year"> годовых</span></span>
        <span className="promo-badge">Ставка повышена</span>
      </div>
    </div>
  )
}
