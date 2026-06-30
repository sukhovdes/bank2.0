import { IcChevron } from './icons.jsx'

const VARIANTS = [
  { v: 'new', tag: 'New', title: 'Первая авторизация в ДБО' },
  { v: 'search', tag: 'SearchOpened', title: 'Поиск раскрыт в шапке' },
  { v: 'default', tag: 'Default', title: 'По дефолту иконка справа' },
]

export default function Dispatcher() {
  return (
    <div className="disp">
      <div className="disp-inner">
        <img className="disp-logo" src="/icons/logo.svg" alt="ozon банк" />
        <h1 className="disp-title">Версии прототипа</h1>
        <p className="disp-sub muted">Выберите сценарий для демо</p>

        <div className="disp-list">
          {VARIANTS.map((x) => (
            <a key={x.v} className="disp-link" href={`?v=${x.v}`}>
              <span className="disp-link-top">
                <span className="disp-link-title">{x.title}</span>
                <span className="disp-tag">{x.tag}</span>
              </span>
              <IcChevron width={28} height={28} className="disp-arrow" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
