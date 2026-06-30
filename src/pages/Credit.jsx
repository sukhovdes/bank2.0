import { useState } from 'react'
import { IcChevron, IcCheck } from '../icons.jsx'

const SUM_STOPS = [10000, 1000000, 10000000, 300000000]
const SUM_MARKS = ['10 тыс', '1 млн', '10 млн', '300 млн']
const TERM_STOPS = [3, 6, 9, 12, 18]
const APPROVED = 1000000

const fmt = (n) => Math.round(n).toLocaleString('ru-RU') + ' ₽'

// Сумма интерполируется логарифмически между метками — позиция 1 = ровно 1 млн
const posToSum = (pos) => {
  const i = Math.min(Math.floor(pos), SUM_STOPS.length - 2)
  const f = pos - i
  const v = SUM_STOPS[i] * Math.pow(SUM_STOPS[i + 1] / SUM_STOPS[i], f)
  return Math.round(v / 10000) * 10000
}

const monthsWord = (n) => {
  const t = n % 100
  if (t > 4 && t < 20) return 'месяцев'
  return ['месяцев', 'месяц', 'месяца', 'месяца', 'месяца', 'месяцев'][Math.min(n % 10, 5)]
}

// Предварительный расчёт платежа — калибровка под макет (1 млн / 18 мес → 55 850 ₽)
const calcMonthly = (sum, term) => Math.round((sum * (1 / term + 0.00029)) / 10) * 10

function Slider({ value, max, pct, marks, onChange }) {
  return (
    <div className="credit-slider">
      <input
        type="range" className="credit-range"
        min={0} max={max} step={max > 4 ? 0.01 : 1} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ background: `linear-gradient(90deg, var(--blue) ${pct}%, rgba(204,214,228,.6) ${pct}%)` }}
      />
      <div className="credit-scale">
        {marks.map((m) => <span key={m}>{m}</span>)}
      </div>
    </div>
  )
}

export default function Credit({ onBack }) {
  const [sumPos, setSumPos] = useState(1)
  const [termIdx, setTermIdx] = useState(4)

  const sum = posToSum(sumPos)
  const term = TERM_STOPS[termIdx]
  const monthly = calcMonthly(sum, term)

  return (
    <div className="page page-credit">
      <div className="credit-top">
        <button className="credit-back" onClick={onBack} aria-label="Назад">
          <IcChevron width={24} height={24} style={{ transform: 'rotate(180deg)' }} />
        </button>
        <div className="credit-progress"><span style={{ width: '8%' }} /></div>
      </div>

      <div className="credit-titles">
        <h1>Заявка на кредит</h1>
        <p className="credit-num">№ 70618188-13115153 от 12 января 2026</p>
      </div>

      <div className="credit-col">
        <div className="credit-card">
          <div className="credit-calc">
            <div className="credit-left">
              <div className="credit-field">
                <div className="credit-approved">
                  <span className="credit-approved-label">Предварительно одобрено</span>
                  <span className="credit-badge"><IcCheck width={16} height={16} />{fmt(APPROVED)}</span>
                </div>
                <div className="credit-input">
                  <span className="credit-input-label">Желаемая сумма</span>
                  <span className="credit-input-value">{fmt(sum)}</span>
                </div>
                <Slider value={sumPos} max={3} pct={(sumPos / 3) * 100} marks={SUM_MARKS} onChange={setSumPos} />
              </div>

              <div className="credit-field">
                <div className="credit-input">
                  <span className="credit-input-label">Срок</span>
                  <span className="credit-input-value">{term} {monthsWord(term)}</span>
                </div>
                <Slider value={termIdx} max={4} pct={(termIdx / 4) * 100} marks={TERM_STOPS} onChange={setTermIdx} />
              </div>
            </div>

            <div className="credit-result">
              <div className="cr-blocks">
                <div className="cr-block cr-payment">
                  <span>Ежемесячный платёж</span>
                  <b>{fmt(monthly)}</b>
                </div>
                <div className="cr-block cr-rate">
                  <span>Ставка</span>
                  <b>от 1,3% в месяц</b>
                </div>
              </div>
              <span className="cr-note">Это предварительный расчёт</span>
            </div>
          </div>
        </div>

        <button className="credit-submit">Продолжить</button>
      </div>
    </div>
  )
}
