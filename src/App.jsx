import { useState } from 'react'
import Dock from './Dock.jsx'
import Home from './pages/Home.jsx'
import Payments from './pages/Payments.jsx'
import Services from './pages/Services.jsx'
import Product from './pages/Product.jsx'
import Welcome from './Welcome.jsx'
import AiSearch from './components/AiSearch.jsx'
import { IcChevronDown } from './icons.jsx'

const INITIAL_PRODUCTS = [
  { id: 'p-salary', label: 'Зарплатный проект', img: '/products/salary.png' },
  { id: 'p-accounting', label: 'Бухгалтерия', img: '/products/accounting.png' },
  { id: 'p-delay', label: 'Отсрочка', img: '/products/delay.png' },
]

const CATALOG = [
  { label: 'Бизнес-карта', img: '/products/businesscard.png' },
  { label: 'Кредит на любые цели', img: '/products/credit.png' },
  { label: 'Деньги на закупки', img: '/products/purchases.png' },
  { label: 'Банковские гарантии', img: '/products/guarantees.png' },
  { label: 'Аналитика селлера', img: '/products/analytics.png' },
]

export default function App() {
  const [entered, setEntered] = useState(false)
  const [view, setView] = useState('home')
  const [products, setProducts] = useState(INITIAL_PRODUCTS)
  const [banner, setBanner] = useState(false)

  if (!entered) return <Welcome onEnter={() => setEntered(true)} />

  const openProduct = (tile) => {
    const id = 'p-' + tile.label
    setProducts((prev) =>
      prev.find((p) => p.id === id)
        ? prev
        : [...prev, { id, label: tile.label, img: tile.img }]
    )
    setView(id)
  }

  const addProduct = () => setView('services')

  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
    setView((v) => (v === id ? 'home' : v))
  }

  const product = products.find((p) => p.id === view)

  let content
  if (view === 'home') content = <Home onNavigate={setView} onShowBanner={() => setBanner(true)} onOpenProduct={openProduct} />
  else if (view === 'payments') content = <Payments />
  else if (view === 'services') content = <Services onOpenProduct={openProduct} />
  else if (product) content = <Product product={product} />
  else content = <Payments />

  return (
    <div className="app">
      {banner && (
        <div className="top-banner" role="button" tabIndex={0}>
          <div className="top-banner-text">
            <div className="tb-title">Ограничения на счете</div>
            <div className="tb-sub">Нажмите, чтобы узнать детали</div>
          </div>
          <button className="tb-close" onClick={() => setBanner(false)} aria-label="Закрыть">
            <img src="/icons/cross.svg" alt="" width={18} height={18} />
          </button>
        </div>
      )}
      <header className="topbar">
        <button className="logo-btn" onClick={() => setView('home')} aria-label="На главную">
          <img className="logo" src="/icons/logo.svg" alt="ozon банк" />
        </button>
        <AiSearch />
        <div className="topbar-right">
          <button className="hdr-icon-btn bell" aria-label="Уведомления"><img src="/icons/bell.svg" alt="" /></button>
          <button className="hdr-icon-btn" aria-label="Настройки"><img className="hdr-gear" src="/icons/gear.svg" alt="" width={20} height={20} /></button>
          <button className="profile-chip">
            <img className="avatar" src="/icons/avatar@3x.png" alt="" />
            <span className="profile">
              <span className="profile-name">ИП Левитан И.И.</span>
              <span className="profile-inn">ИНН 501603001313</span>
            </span>
            <IcChevronDown width={20} height={20} className="profile-chevron" />
          </button>
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
