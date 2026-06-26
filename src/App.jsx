import { useState, useEffect } from 'react'
import Dock from './Dock.jsx'
import Home from './pages/Home.jsx'
import Payments from './pages/Payments.jsx'
import Services from './pages/Services.jsx'
import Product from './pages/Product.jsx'
import Welcome from './Welcome.jsx'
import AiSearch from './components/AiSearch.jsx'
import SearchV2 from './components/SearchV2.jsx'

const INITIAL_PRODUCTS = [
  { id: 'p-salary', label: 'Зарплатный проект', img: '/products/salary.png', connected: false },
  { id: 'p-accounting', label: 'Бухгалтерия', img: '/products/accounting.png', connected: false },
  { id: 'p-delay', label: 'Отсрочка', img: '/products/delay.png', connected: false },
]

const CATALOG = [
  { label: 'Бизнес-карта', img: '/products/businesscard.png' },
  { label: 'Кредит на любые цели', img: '/products/credit.png' },
  { label: 'Деньги на закупки', img: '/products/purchases.png' },
  { label: 'Банковские гарантии', img: '/products/guarantees.png' },
  { label: 'Аналитика селлера', img: '/products/analytics.png' },
]

const loadProducts = () => {
  try {
    const raw = localStorage.getItem('oz-products')
    if (raw) return JSON.parse(raw)
  } catch (e) { /* ignore */ }
  return INITIAL_PRODUCTS
}

export default function App() {
  const VARIANT = window.location.pathname.includes('version2') ? 'v2' : 'v1'
  const [entered, setEntered] = useState(false)
  const [view, setView] = useState('home')
  const [products, setProducts] = useState(loadProducts)
  const [banner, setBanner] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [productOrigin, setProductOrigin] = useState("home")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    try { localStorage.setItem('oz-products', JSON.stringify(products)) } catch (e) { /* ignore */ }
  }, [products])

  if (!entered) return <Welcome onEnter={() => setEntered(true)} />

  const openProduct = (tile) => {
    setProductOrigin(view)
    const existing = products.find((p) => p.label === tile.label)
    if (existing) { setView(existing.id); return }
    const id = 'p-' + tile.label
    setProducts((prev) => [...prev, { id, label: tile.label, img: tile.img, connected: false }])
    setView(id)
  }

  const connectProduct = (id) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, connected: true } : p)))

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
  else if (product) content = <Product product={product} onBack={() => setView(productOrigin)} onConnect={() => connectProduct(product.id)} />
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
      <header className={'topbar' + (scrolled ? ' scrolled' : '')}>
        <div className="topbar-inner">
        <button className="logo-btn" onClick={() => setView('home')} aria-label="На главную">
          <img className="logo" src="/icons/logo.svg" alt="ozon банк" />
        </button>
        {VARIANT !== 'v2' && <AiSearch />}
        <div className="topbar-right">
          {VARIANT === "v2" && <SearchV2 />}
          <button className="hdr-icon-btn" aria-label="Уведомления"><img src="/icons/bell24.svg" alt="" width={24} height={24} /></button>
          <button className="hdr-icon-btn" aria-label="Настройки"><img src="/icons/settings.svg" alt="" width={24} height={24} /></button>
          <button className="profile-chip">
            <img className="avatar" src="/icons/avatar@3x.png" alt="" />
            <span className="profile">
              <span className="profile-name">ИП Левитан И.И.</span>
              <span className="profile-inn">ИНН 501603001313</span>
            </span>
            <img className="profile-chevron-img" src="/icons/chevron_down.svg" alt="" />
          </button>
        </div>
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
