const TILES = [
  { emoji: '💼', label: 'Зарплатный проект' },
  { emoji: '📊', label: 'Бухгалтерия' },
  { emoji: '🧾', label: 'Эквайринг' },
  { emoji: '🛡️', label: 'Страхование' },
  { emoji: '📈', label: 'Инвестиции' },
  { emoji: '🤝', label: 'Партнёрам' },
]

export default function Services({ onOpenProduct }) {
  return (
    <div className="page">
      <h1>Сервисы</h1>
      <div className="tiles">
        {TILES.map((t) => (
          <button key={t.label} className="tile" onClick={() => onOpenProduct(t)}>
            <span className="tile-emoji">{t.emoji}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
