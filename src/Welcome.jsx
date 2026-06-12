import { BlurReveal } from './components/BlurReveal.jsx'

export default function Welcome({ onEnter }) {
  return (
    <div className="welcome">
      <svg className="welcome-heart" viewBox="0 0 24 24" width="64" height="64" aria-hidden="true">
        <path d="M12 21s-7.5-4.7-10-9.3C.3 8.4 1.7 5 5 5c2 0 3.3 1.1 4 2.2C9.7 6.1 11 5 13 5c3.3 0 4.7 3.4 3 6.7C18.5 16.3 12 21 12 21Z" fill="#005bff"/>
      </svg>

      <BlurReveal
        as="h1"
        className="welcome-title"
        speedReveal={1.1}
        speedSegment={0.6}
        onAnimationComplete={() => setTimeout(onEnter, 200)}
      >
        Привет, это Ozon Банк для бизнеса
      </BlurReveal>
    </div>
  )
}
