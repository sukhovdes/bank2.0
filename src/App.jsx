import { useState } from 'react'
import Dock from './Dock.jsx'
import Home from './pages/Home.jsx'
import Payments from './pages/Payments.jsx'
import Services from './pages/Services.jsx'
import Product from './pages/Product.jsx'
import { PRODUCT_ICONS } from './productIcons.js'

const INITIAL_PRODUCTS = [
  { id: 'p-salary', label: 'Зарплатный проект', img: '/products/p1.png' },
  { id: 'p-docs', label: 'Документооборот', img: '/products/p2.png' },
  { id: 'p-delay', label: 'Отсрочка', img: '/products/p3.png' },
]

const CATALOG = [
  { label: 'Бухгалтерия', emoji: '📊', img: PRODUCT_ICONS.accounting },
  { label: 'Страхование', emoji: '🛡️', img: PRODUCT_ICONS.insurance },
  { label: 'Инвестиции', emoji: '📈', img: PRODUCT_ICONS.invest },
]

export default function App() {
  const [view, setView] = useState('home')
  const [products, setProducts] = useState(INITIAL_PRODUCTS)

  const openProduct = (tile) => {
    const id = 'p-' + tile.label
    setProducts((prev) =>
      prev.find((p) => p.id === id)
        ? prev
        : [...prev, { id, label: tile.label, img: tile.img }]
    )
    setView(id)
  }

  const addProduct = () => {
    const remaining = CATALOG.find((c) => !products.find((p) => p.id === 'p-' + c.label))
    if (remaining) openProduct(remaining)
    else setView('services')
  }

  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
    setView((v) => (v === id ? 'home' : v))
  }

  const product = products.find((p) => p.id === view)

  let content
  if (view === 'home') content = <Home onNavigate={setView} />
  else if (view === 'payments') content = <Payments />
  else if (view === 'services') content = <Services onOpenProduct={openProduct} />
  else if (product) content = <Product product={product} />
  else content = <Payments />

  return (
    <div className="app">
      <header className="topbar">
        <img className="logo" src="/icons/logo.svg" alt="ozon банк" />
        <div className="topbar-right">
          <button className="icon-btn bell"><img src="/icons/bell.svg" alt="Уведомления" width={24} height={24} /></button>
          <div className="profile">
            <div className="profile-name">ИП Коновалов И.Л.</div>
            <div className="profile-inn">ИНН 341215944685</div>
          </div>
          <img className="avatar" src="/icons/avatar@3x.png" alt="" />
        </div>
      </header>

      <main className="content">{content}</main>

      <Dock
        active={view}
        onNavigate={setView}
        products={products}
        onAddProduct={addProduct}
        onRemoveProduct={removeProduct}
      />
    </div>
  )
}
