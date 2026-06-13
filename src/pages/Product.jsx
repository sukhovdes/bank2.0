const MENU = ['Выплаты', 'Сотрудники']

export default function Product({ product }) {
  return (
    <div className="page page-split">
      <aside className="side-menu">
        {MENU.map((m, i) => (
          <button key={m} className={`side-item${i === 0 ? ' is-active' : ''}`}>{m}</button>
        ))}
      </aside>
      <div className="split-content">
        <h1>{product?.label || 'Продукт'}</h1>
        <div className="island island-tall">
          <div className="anketa">
            {product?.img
              ? <img className="anketa-img" src={product.img} alt="" width={88} height={88} />
              : <span className="tile-emoji">💼</span>}
            <h3>Подключите {product?.label?.toLowerCase() || 'продукт'}</h3>
            <p className="muted">Откройте продукт из дока в один клик — он закрепится иконкой рядом с разделами.</p>
            <button className="primary-btn">Подключить</button>
          </div>
        </div>
      </div>
    </div>
  )
}
