import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { IcChevron } from '../icons.jsx'
import CardModal from '../components/CardModal.jsx'
import QuickSettings from '../components/QuickSettings.jsx'
import { BusinessAccountCard, DeferralCard, PromoCard } from '../components/HomeCards.jsx'

const QUICK = [
  { id: 'pay', icon: '/icons/circle_plus.svg', label: 'Новый платёж', on: true },
  { id: 'topup', icon: '/icons/rubles.svg', label: 'Пополнить счёт', on: true },
  { id: 'between', icon: '/icons/exchange.svg', label: 'Между счетами', on: true },
  { id: 'invoice', icon: '/icons/document_add.svg', label: 'Выставить счёт', on: true },
  { id: 'reqs', icon: '/icons/document.svg', label: 'Реквизиты', on: true },
  { id: 'salary', icon: '/icons/rubles.svg', label: 'Выплатить зарплату', on: false },
  { id: 'cert', icon: '/icons/document.svg', label: 'Заказать справку', on: false },
]

const TASKS = [
  { icon: '/icons/tax.svg', title: 'Сдать декларацию за 2024 в налоговую', sub: 'До 24 апреля' },
  { icon: '/icons/document_task.svg', title: 'Подписать счёт', sub: 'До 01 февраля', badge: 3 },
  { icon: '/icons/document_task.svg', title: 'Оплатить 930 000 ₽ по кредитному договору №123345', sub: 'До 05 февраля' },
]

const HISTORY = [
  { icon: '/icons/rubles.svg', title: 'Пополнение счёта', sub: 'Сегодня · 14:32', amount: '+150 000 ₽', positive: true },
  { icon: '/icons/exchange.svg', title: 'ООО «Ромашка» · оплата по счёту', sub: 'Сегодня · 11:08', amount: '−84 200 ₽' },
  { icon: '/icons/document.svg', title: 'Налог УСН за I квартал', sub: 'Вчера · 18:45', amount: '−42 000 ₽' },
  { icon: '/icons/circle_plus.svg', title: 'Зарплата · 12 сотрудников', sub: '08 февраля', amount: '−640 000 ₽' },
]

const ADD_ITEMS = [
  { label: 'Накопительный счёт', img: '/products/delay.png', desc: 'До 16% на остаток, снятие в любой момент' },
  { label: 'Кредит на любые цели', img: '/products/credit.png', desc: 'До 30 млн ₽ на развитие бизнеса' },
  { label: 'Бизнес-карта', img: '/products/businesscard.png', desc: 'Кешбэк и расходы под контролем' },
  { label: 'Деньги на закупки', img: '/products/purchases.png', desc: 'Финансирование товара для Ozon' },
]

const CARD_SPRING = { duration: 0.32, ease: [0.22, 1, 0.36, 1] }

export default function Home({ onNavigate, onShowBanner, onOpenProduct }) {
  // Прогресс-бар заявки заполняется анимацией при каждом открытии Главной
  const [progressW, setProgressW] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setProgressW(78), 60)
    return () => clearTimeout(t)
  }, [])
  const [cardOpen, setCardOpen] = useState(false)
  const [promoOpen, setPromoOpen] = useState(true)
  const [addOpen, setAddOpen] = useState(false)
  const [quick, setQuick] = useState(QUICK)
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <div className="page page-home">
      <div className="quick-row">
        {quick.filter((q) => q.on).map(({ id, icon, label }) => (
          <button key={id} className="quick-btn" onClick={() => onNavigate('payments')}>
            <img className="quick-ic" src={icon} alt="" width={15} height={15} />
            <span>{label}</span>
          </button>
        ))}
        <button className="quick-settings-btn" onClick={() => setSettingsOpen(true)} aria-label="Настроить быстрые действия">
          <span className="gear-blue" />
        </button>
      </div>

      <div className="home-grid">
        <div className="col col-products">
          <motion.div layout transition={CARD_SPRING}>
            <BusinessAccountCard onBody={() => onShowBanner?.()} onIcon={() => setCardOpen(true)} />
          </motion.div>

          <motion.div layout transition={CARD_SPRING}>
            <DeferralCard />
          </motion.div>

          <AnimatePresence initial={false}>
            {promoOpen && (
              <motion.div
                key="promo" layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={CARD_SPRING}
                style={{ overflow: 'hidden' }}
              >
                <PromoCard onClose={() => setPromoOpen(false)} />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div layout transition={CARD_SPRING} className="add-product-wrap">
            {addOpen && (
              <>
                <div className="popover-catch" onClick={() => setAddOpen(false)} />
                <div className="add-popover">
                  {ADD_ITEMS.map((it) => (
                    <button
                      key={it.label} className="add-popover-item"
                      onClick={() => { onOpenProduct?.(it); setAddOpen(false) }}
                    >
                      <img src={it.img} alt="" width={40} height={40} />
                      <span className="add-popover-text">
                        <span className="api-title">{it.label}</span>
                        <span className="api-desc muted">{it.desc}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
            <button className={`new-product-btn${addOpen ? ' is-open' : ''}`} onClick={() => setAddOpen((o) => !o)}>
              <span className="np-plus">+</span> Добавить счёт или кредит
            </button>
          </motion.div>
        </div>

        <div className="col">
          <div className="card credit" onClick={() => onNavigate('credit')}>
            <div className="credit-head">
              <span>Заявка на кредит · 9266</span>
              <IcChevron width={20} height={20} className="muted" />
            </div>
            <div className="progress">
              <span className="progress-fill" style={{ width: `${progressW}%` }} />
            </div>
          </div>

          <div className="card tasks no-hover">
            <div className="tasks-head">
              <h3>Задачи</h3>
              <div className="segment">
                <button className="seg-active">Текущие</button>
                <button>Будущие</button>
              </div>
            </div>
            {TASKS.map((t, i) => (
              <button className="task-row" key={i}>
                <span className="task-ic"><img src={t.icon} alt="" width={24} height={24} /></span>
                <div className="task-body">
                  <div className="task-title">{t.title}</div>
                  <div className="task-sub muted">{t.sub}</div>
                </div>
                {t.badge && <span className="task-badge">{t.badge}</span>}
                <IcChevron width={18} height={18} className="muted" />
              </button>
            ))}
          </div>

          <div className="card history no-hover">
            <h3>История</h3>
            {HISTORY.map((h, i) => (
              <button className="task-row" key={i}>
                <span className="task-ic"><img src={h.icon} alt="" width={24} height={24} /></span>
                <div className="task-body">
                  <div className="task-title">{h.title}</div>
                  <div className="task-sub muted">{h.sub}</div>
                </div>
                <span className={`hist-amount${h.positive ? ' is-positive' : ''}`}>{h.amount}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <CardModal open={cardOpen} onClose={() => setCardOpen(false)} />
      {settingsOpen && <QuickSettings items={quick} setItems={setQuick} onClose={() => setSettingsOpen(false)} />}
    </div>
  )
}
