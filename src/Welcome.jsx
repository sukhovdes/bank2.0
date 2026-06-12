import { useState } from 'react'
import { BlurReveal } from './components/BlurReveal.jsx'

export default function Welcome({ onEnter }) {
  const [showCta, setShowCta] = useState(false)

  return (
    <div className="welcome">
      <img className="welcome-logo" src="/icons/logo.svg" alt="ozon банк" />

      <BlurReveal
        as="h1"
        className="welcome-title"
        speedReveal={1.1}
        speedSegment={0.6}
        onAnimationComplete={() => setShowCta(true)}
      >
        Привет, это Ozon Банк для бизнеса
      </BlurReveal>

      <BlurReveal as="p" className="welcome-sub" delay={0.5} speedReveal={1.4}>
        Счета, платежи и сервисы для вашего дела — в одном окне
      </BlurReveal>

      <button className={`welcome-btn${showCta ? ' is-shown' : ''}`} onClick={onEnter}>
        Войти в кабинет
      </button>
    </div>
  )
}
