export default function Product({ product }) {
  return (
    <div className="page page-product">
      <div className="island island-tall product-island">
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
  )
}
