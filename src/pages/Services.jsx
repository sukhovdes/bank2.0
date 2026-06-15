const TILES = [
  { img: '/products/salary.png', label: 'Зарплатный проект', desc: 'Выплаты сотрудникам и реестры в пару кликов' },
  { img: '/products/accounting.png', label: 'Бухгалтерия', desc: 'Отчётность, налоги и первичка на автомате' },
  { img: '/products/delay.png', label: 'Отсрочка', desc: 'Платите поставщикам позже без кассовых разрывов' },
  { img: '/products/businesscard.png', label: 'Бизнес-карта', desc: 'Карта для расходов компании с кешбэком' },
  { img: '/products/credit.png', label: 'Кредит на любые цели', desc: 'Деньги на развитие бизнеса по выгодной ставке' },
  { img: '/products/purchases.png', label: 'Деньги на закупки', desc: 'Финансирование товара для продаж на Ozon' },
  { img: '/products/guarantees.png', label: 'Банковские гарантии', desc: 'Гарантии для торгов и госконтрактов онлайн' },
  { img: '/products/analytics.png', label: 'Аналитика селлера', desc: 'Продажи, остатки и прибыль в одном окне' },
  { img: '/products/places.png', label: 'Места рядом', desc: 'Точки приёма и обслуживания рядом с вами' },
  { img: '/products/statements.png', label: 'Справки и выписки', desc: 'Документы по счёту за минуту, с подписью' },
]

export default function Services({ onOpenProduct }) {
  return (
    <div className="page">
      <h1>Сервисы</h1>
      <div className="tiles">
        {TILES.map((t) => (
          <button key={t.label} className="tile" onClick={() => onOpenProduct(t)}>
            <img className="tile-img" src={t.img} alt="" width={64} height={64} />
            <span className="tile-text">
              <span className="tile-title">{t.label}</span>
              <span className="tile-desc muted">{t.desc}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
