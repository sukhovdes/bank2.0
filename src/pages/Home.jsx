import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { IcChevron, IcChevronDown, IcEmpty } from '../icons.jsx'
import CardModal from '../components/CardModal.jsx'
import QuickSettings from '../components/QuickSettings.jsx'
import { BusinessAccountCard, DeferralCard, PromoCard } from '../components/HomeCards.jsx'

const QUICK = [
  { id: 'pay', icon: '/icons/plus.svg', label: 'Новый платёж', on: true },
  { id: 'topup', icon: '/icons/rubles.svg', label: 'Пополнить счёт', on: true },
  { id: 'between', icon: '/icons/exchange.svg', label: 'Между счетами', on: true },
  { id: 'invoice', icon: '/icons/document_add.svg', label: 'Выставить счёт', on: true },
  { id: 'reqs', icon: '/icons/document.svg', label: 'Реквизиты', on: true },
  { id: 'salary', icon: '/icons/rubles.svg', label: 'Выплатить зарплату', on: false },
  { id: 'cert', icon: '/icons/document.svg', label: 'Заказать справку', on: false },
]

const TASKS = [
  { icon: '/icons/tax.svg', title: 'Сдать декларацию за 2024 в налоговую', sub: 'До 24 апреля' },
  { icon: '/icons/document.svg', title: 'Подписать счёт', sub: 'До 01 февраля', badge: 3 },
  { icon: '/icons/document.svg', title: 'Оплатить 930 000 ₽ по кредитному договору №123345', sub: 'До 05 февраля' },
]

const HISTORY = [
  { icon: '/icons/rubles.svg', title: 'Пополнение счёта', sub: 'Сегодня · 14:32', amount: '+150 000 ₽', positive: true },
  { icon: '/icons/exchange.svg', title: 'ООО «Ромашка» · оплата по счёту', sub: 'Сегодня · 11:08', amount: '−84 200 ₽' },
  { icon: '/icons/document.svg', title: 'Налог УСН за I квартал', sub: 'Вчера · 18:45', amount: '−42 000 ₽' },
  { icon: '/icons/plus.svg', title: 'Зарплата · 12 сотрудников', sub: '08 февраля', amount: '−640 000 ₽' },
]

const ADD_ITEMS = [
  { label: 'Накопительный счёт', img: '/products/delay.png', desc: 'До 16% на остаток, снятие в любой момент' },
  { label: 'Кредит на любые цели', img: '/products/credit.png', desc: 'До 30 млн ₽ на развитие бизнеса' },
  { label: 'Бизнес-карта', img: '/products/businesscard.png', desc: 'Кешбэк и расходы под контролем' },
  { label: 'Деньги на закупки', img: '/products/purchases.png', desc: 'Финансирование товара для Ozon' },
]

// Онбординг-слайдер: что новому клиенту сделать для настройки счёта
const SETUP = [
  { id: 'login', img: '/products/setup_login.png', title: 'Настройте быстрый вход', desc: 'Вход по коду или Face ID' },
  { id: 'employee', img: '/products/setup_employee.png', title: 'Добавьте сотрудника', desc: 'Дайте команде доступ к счёту' },
  { id: 'topup', img: '/products/setup_topup.png', title: 'Пополните счёт', desc: 'Начните пользоваться счётом' },
  // Дубли первых двух иллюстраций как заглушки, пока нет своих ассетов
  { id: 'card', img: '/products/setup_login.png', title: 'Выпустите бизнес-карту', desc: 'Для расходов компании с кешбэком' },
  { id: 'docs', img: '/products/setup_employee.png', title: 'Загрузите документы', desc: 'Реквизиты и уставные документы' },
]

const CARD_SPRING = { duration: 0.32, ease: [0.22, 1, 0.36, 1] }

export default function Home({ onNavigate, onShowBanner, onOpenProduct, onOpenCredit, newClient }) {
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
  const [setupOpen, setSetupOpen] = useState(true)

  return (
    <div className="page page-home">
      <div className="quick-row">
        {quick.filter((q) => q.on).map(({ id, icon, label }) => (
          <button key={id} className="quick-btn" onClick={() => onNavigate('payments')}>
            <img className="quick-ic" src={icon} alt="" width={24} height={24} />
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
            <BusinessAccountCard onBody={() => onShowBanner?.()} onIcon={() => setCardOpen(true)} empty={newClient} />
          </motion.div>

          {!newClient && (
            <motion.div layout transition={CARD_SPRING}>
              <DeferralCard />
            </motion.div>
          )}

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
          {newClient && (
            <div className="card setup no-hover">
              <button className="setup-head" onClick={() => setSetupOpen((o) => !o)}>
                <h3>Настройте всё для работы</h3>
                <span className="setup-count muted">0 из {SETUP.length}</span>
                <IcChevronDown width={20} height={20} className={`setup-toggle muted${setupOpen ? ' is-open' : ''}`} />
              </button>
              {setupOpen && (
                <div className="setup-slider-wrap">
                  <div className="setup-slider">
                    {SETUP.map(({ id, img, title, desc }) => (
                      <button key={id} className="setup-card" onClick={() => onNavigate('payments')}>
                        <span className="setup-text">
                          <span className="setup-title">{title}</span>
                          <span className="setup-desc muted">{desc}</span>
                        </span>
                        <span className="setup-art"><img src={img} alt="" /></span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {!newClient && (
            <div className="card credit" onClick={onOpenCredit}>
              <div className="credit-head">
                <span>Заявка на кредит · 9266</span>
                <IcChevron width={20} height={20} className="muted" />
              </div>
              <div className="progress">
                <span className="progress-fill" style={{ width: `${progressW}%` }} />
              </div>
            </div>
          )}

          {!newClient && (
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
          )}

          {newClient && (
            <div className="card limits no-hover">
              <h3>Лимиты на июнь</h3>
              <p className="limits-sub muted">Счётчик лимитов обновится 1 июля</p>
              <div className="limits-grid">
                <div className="limit-box">
                  <div className="limit-box-title">Переводы физлицам и снятие наличных</div>
                  <div className="limit-box-value">С комиссией 0%</div>
                  <div className="limit-bar"><span style={{ width: '100%' }} /></div>
                  <div className="limit-foot">
                    <span>Осталось 150 000 ₽</span>
                    <span className="muted">из 150 000 ₽</span>
                  </div>
                </div>
                <div className="limit-box">
                  <div className="limit-box-title">Стоимость перевода</div>
                  <div className="limit-box-value">0 ₽</div>
                  <div className="limit-bar"><span style={{ width: '100%' }} /></div>
                  <div className="limit-foot">
                    <span>Осталось 5 бесплатных</span>
                    <span className="muted">из 5 переводов</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="card history no-hover">
            <h3>История</h3>
            {newClient ? (
              <div className="empty-state">
                <IcEmpty width={48} height={48} className="empty-ic" />
                <p className="empty-text">Здесь появятся ваши платежи и поступления</p>
              </div>
            ) : (
              HISTORY.map((h, i) => (
                <button className="task-row" key={i}>
                  <span className="task-ic"><img src={h.icon} alt="" width={24} height={24} /></span>
                  <div className="task-body">
                    <div className="task-title">{h.title}</div>
                    <div className="task-sub muted">{h.sub}</div>
                  </div>
                  <span className={`hist-amount${h.positive ? ' is-positive' : ''}`}>{h.amount}</span>
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      <CardModal open={cardOpen} onClose={() => setCardOpen(false)} />
      {settingsOpen && <QuickSettings items={quick} setItems={setQuick} onClose={() => setSettingsOpen(false)} />}
    </div>
  )
}
