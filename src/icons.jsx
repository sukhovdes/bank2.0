// Иконки из Figma (public/icons). Цвет — через CSS-маску (background: currentColor),
// поэтому работают muted / синий / белый / активный док — как у обычного currentColor.
const mask = (url) =>
  function Icon({ width = 24, height = 24, className = '', style, ...rest }) {
    return (
      <span
        aria-hidden="true"
        className={`mask-icon${className ? ' ' + className : ''}`}
        style={{
          width,
          height,
          WebkitMaskImage: `url(${url})`,
          maskImage: `url(${url})`,
          ...style,
        }}
        {...rest}
      />
    )
  }

export const IcHome = mask('/icons/home.svg')
export const IcRubles = mask('/icons/rubles.svg')
export const IcGrid = mask('/icons/catalog.svg')
export const IcPlus = mask('/icons/plus.svg')
export const IcGear = mask('/icons/gear.svg')
export const IcChevronDown = mask('/icons/chevron_down.svg')
export const IcExchange = mask('/icons/exchange.svg')
export const IcDocAdd = mask('/icons/document_add.svg')
export const IcDoc = mask('/icons/document.svg')
export const IcBell = mask('/icons/bell.svg')
export const IcChevron = mask('/icons/chevron_right.svg')
export const IcCross = mask('/icons/cross.svg')
export const IcRefresh = mask('/icons/refresh.svg')
export const IcCirclePlus = mask('/icons/plus.svg')
export const IcCard = mask('/icons/card.svg')
export const IcUser = mask('/icons/user.svg')
export const IcEmpty = mask('/icons/empty_articles.svg')
export const IcSettings = mask('/icons/settings.svg')
export const IcCheck = mask('/icons/check.svg')
