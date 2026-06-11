// Набор простых SVG-иконок (24x24, currentColor)
const I = (p) => ({ width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', ...p })

export const IcHome = (p) => (
  <svg {...I(p)}><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-9.5Z" fill="currentColor"/></svg>
)
export const IcRubles = (p) => (
  <svg {...I(p)}><path d="M8 4h5a4 4 0 0 1 0 8H8m0 0v8m0-8H6m2 4h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
)
export const IcGrid = (p) => (
  <svg {...I(p)}><g fill="currentColor"><rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/></g></svg>
)
export const IcPlus = (p) => (
  <svg {...I(p)}><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
)
export const IcCirclePlus = (p) => (
  <svg {...I(p)}><circle cx="12" cy="12" r="9" fill="currentColor"/><path d="M12 8v8M8 12h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
)
export const IcExchange = (p) => (
  <svg {...I(p)}><path d="M7 7h11l-3-3m3 3-3 3M17 17H6l3 3m-3-3 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
)
export const IcDocAdd = (p) => (
  <svg {...I(p)}><path d="M6 3h8l4 4v14H6V3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M12 11v6M9 14h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
)
export const IcDoc = (p) => (
  <svg {...I(p)}><path d="M6 3h8l4 4v14H6V3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
)
export const IcBell = (p) => (
  <svg {...I(p)}><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
)
export const IcChevron = (p) => (
  <svg {...I(p)}><path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
)
export const IcCross = (p) => (
  <svg {...I(p)}><path d="m7 7 10 10M17 7 7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
)
export const IcRefresh = (p) => (
  <svg {...I(p)}><path d="M5 12a7 7 0 0 1 12-5l1 1m1-3v3h-3M19 12a7 7 0 0 1-12 5l-1-1m-1 3v-3h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
)
