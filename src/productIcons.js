// App-icon картинки для продуктов: SVG -> data URL.
// Каждая иконка — градиентный «плиточный» арт с белым глифом, как иконка приложения.
const svg = (g1, g2, glyph) => {
  const s = `<svg xmlns='http://www.w3.org/2000/svg' width='88' height='88' viewBox='0 0 88 88'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0' stop-color='${g1}'/>
        <stop offset='1' stop-color='${g2}'/>
      </linearGradient>
    </defs>
    <rect width='88' height='88' rx='22' fill='url(#g)'/>
    <g fill='none' stroke='#fff' stroke-width='5' stroke-linecap='round' stroke-linejoin='round' transform='translate(22 22)'>${glyph}</g>
  </svg>`
  return 'data:image/svg+xml;base64,' + btoa(s)
}

export const PRODUCT_ICONS = {
  salary: svg('#4F8BFF', '#1F5BFF',
    "<circle cx='22' cy='14' r='9'/><path d='M4 42c0-10 8-16 18-16s18 6 18 16'/>"),
  acquiring: svg('#1FBF7A', '#0B8457',
    "<rect x='3' y='9' width='38' height='26' rx='4'/><path d='M3 17h38'/><path d='M10 27h10'/>"),
  cards: svg('#5A6072', '#2C3140',
    "<rect x='3' y='9' width='38' height='26' rx='4'/><path d='M3 17h38'/><path d='M27 27h8'/>"),
  accounting: svg('#9B7BFF', '#6A3DF5',
    "<rect x='6' y='3' width='30' height='38' rx='4'/><path d='M13 13h16M13 22h16M13 31h10'/>"),
  insurance: svg('#FF9A4D', '#E0641A',
    "<path d='M21 3 6 9v12c0 10 7 16 15 19 8-3 15-9 15-19V9L21 3Z'/><path d='M14 21l5 5 9-10'/>"),
  invest: svg('#1FBF7A', '#0B8457',
    "<path d='M5 33 17 21l8 8 13-15'/><path d='M30 14h8v8'/>"),
}
