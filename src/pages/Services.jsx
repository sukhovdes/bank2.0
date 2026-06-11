const TILES = [
  { img: '/products/p1.png', label: 'Зарплатный проект' },
  { img: '/products/p2.png', label: 'Бухгалтерия' },
  { img: '/products/p3.png', label: 'Эквайринг' },
  { img: '/products/p1.png', label: 'Страхование' },
  { img: '/products/p3.png', label: 'Инвестиции' },
  { img: '/products/p2.png', label: 'Партнёрам' },
]

export default function Services({ onOpenProduct }) {
  return (
    <div className="page">
      <h1>Сервисы</h1>
      <div className="tiles">
        {TILES.map((t) => (
          <button key={t.label} className="tile" onClick={() => onOpenProduct(t)}>
            <img className="tile-img" src={t.img} alt="" width={56} height={56} />
            <span>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
