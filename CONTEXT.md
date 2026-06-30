# Контекст проекта — Прототип Ozon Банк для бизнеса

> Хендофф-файл для продолжения в новом окне контекста. Обновлять по ходу.

## Что это
Кликабельный прототип кабинета Ozon Банка для бизнеса. Главная гипотеза — нижний тулбар-док в стиле macOS. Для презентации/демо.

## Стек и запуск
- React 18 + Vite 5, обычный CSS (НЕ Tailwind). Доп: `motion`, `vaul`.
- Запуск: `npm run dev` → http://localhost:5173. Сборка: `npm run build` → `dist/`.

## ⛔️ Правило №1: иконки только из Figma
- Все иконки из Figma → `public/icons/`. Не рисовать инлайновые SVG. Нет в макете — спросить пользователя.
- Перекраска готового ассета через CSS-маску допустима.

## Git и деплой (ВАЖНО)
- Ветка `main` — рабочая. `backup/with-shadows` — версия с тенями для отката.
- Remote по **SSH** (`git@github.com:sukhovdes/bank2.0.git`), ключ `~/.ssh/id_ed25519` добавлен в GitHub — `git push` без запросов.
- **Деплой = `git push origin main`**: Vercel подключён к репо и собирает автоматически. Прод: **https://bank2-0-one.vercel.app/**.
- Если после пуша прод не обновился за пару минут — вебхук проглотил пуш, лечится новым пушем (хоть пустым коммитом). Кнопка Redeploy в Vercel пересобирает ТОТ ЖЕ коммит, новый не подтягивает.
- Коммитим пачками по слову «сохрани»/«запушим». Подпись: `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.

## Figma
- fileKey: `ZRNYwdJic4yxtpdy2QXNQh`. Токены: шрифт Onest, синий `#005BFF`, текст `#001A34`, фон `#F2F5F9`, зелёный `#10c44c`, secondary `#001a3499`, muted `#001a3466`, bgActionSecondary (синий 8%) `#0096ff14`.

## Система иконок (ключевое)
- Единый набор 24×24 из Figma в `public/icons/`. `src/icons.jsx` — фабрика `mask(url)`: каждый `Ic*` рендерит `<span class="mask-icon">` с `-webkit-mask/mask` и `background: currentColor`. Цвет наследуется (muted/синий/белый/активный док) как у обычного currentColor.
- `.mask-icon` в styles.css — базовый класс маски. Так же красятся иконки дока, шорткатов и т.п.
- При экспортах из Figma чистить: убирать `preserveAspectRatio="none"` и ставить `fill-opacity="1"` (иначе маска полупрозрачная).
- Маппинг прошлых имён: `circle_plus→plus`, `document_task→document (doc)`, `sparkles→search`, `chevron_left` (битый) → используем `chevron_right` повёрнутый на 180°.

## Структура кода
- `src/App.jsx` — оболочка: шапка (`.topbar` full-width + `.topbar-inner` max-width 1340 центрирован, выровнен с контентом), баннер, `<main>`, `<Dock>`. Состояния: entered, view, products (из localStorage), banner, scrolled, productOrigin. `VARIANT` из URL (см. version2). `openProduct` дедуплит по label; `connectProduct` ставит `connected:true`; products пишутся в localStorage (`oz-products`).
- `src/Welcome.jsx` + `BlurReveal.jsx` — приветствие, автопереход.
- `src/Dock.jsx` — тёмное стекло, разделы Главная/Платежи/Сервисы (mask-иконки: неактив белый 50%, актив синий на белой пилюле), продукты (drag вверх = удалить), «+» → Сервисы. У «Платежей» отдельный сегмент-шеврон `.dock-caret-btn` с подсветкой; по ховеру тёмный поповер `.dock-pop` (Отправить по реквизитам / Между счетами / Выставить счёт), поднимается из-под шеврона (anchor).
- `src/pages/Home.jsx` — Главная: быстрые действия (24px иконки, шестерёнка → QuickSettings), карточки, задачи, история (иконки 24px).
- `src/components/HomeCards.jsx` — BusinessAccountCard, DeferralCard (стартово «Лимит устарел» → по «Обновить лимит» показывает «Доступно: 200 000 ₽»), PromoCard.
- `src/components/QuickSettings.jsx` — модалка «Настройка быстрых действий»: draft-состояние, серые неактивные, кнопки Отменить/Применить.
- `src/components/AiSearch.jsx` — поиск по центру шапки (вариант v1). Иконка — `search.svg`.
- `src/components/SearchV2.jsx` — вариант v2: иконка-лупа в правой части шапки + полноэкранный оверлей (блюр, заголовок-инпут + «Очистить», шорткаты, карточка истории/«ничего не найдено», ширина `.sv2-inner` 60%).
- `src/pages/Product.jsx` — экран продукта: если `!connected` — анкета «Подключите …» с кнопкой-спиннером (1.2с) → `onConnect`; если connected — воркспейс: левое меню (общее, переключает разделы), заголовок + CTA, empty-state. Кнопка «назад» → `productOrigin`. CONFIG по названию продукта (центральная часть отличается).
- `src/pages/Payments.jsx`, `Services.jsx`, `components/CardModal.jsx`, `PaymentDrawer.jsx` — без больших изменений.
- `src/styles.css` — все стили. `vercel.json` — SPA-rewrite для роутинга.

## Разводящая по версиям (по URL) — ВАЖНО
- Голый `/` → **разводящая** `src/Dispatcher.jsx` (крупные ссылки-переходы). Прод-корень теперь открывает её.
- `variant` берётся из `?v=`: `new` | `search` | `default`. Легаси: `?new`→new, `/version2`→default.
  - **New** (`?v=new`) — «Первая авторизация в ДБО»: онбординг новичка (пустые состояния, слайдер настройки, лимиты, подсказка в доке) + поиск-иконка справа.
  - **SearchOpened** (`?v=search`) — строка поиска раскрыта в центре шапки (AiSearch).
  - **Default** (`?v=default`) — поиск свёрнут в иконку-лупу справа (SearchV2).
- В App: `SHOW_DISPATCHER=!variant`, `NEW_CLIENT=variant==='new'`, `SEARCH_EXPANDED=variant==='search'`. Все хуки до условных `return`.
- `vercel.json`: `rewrites` всё → `/index.html` (query сохраняется).

## Состояние «новичок» (NEW_CLIENT, ?v=new)
- Продукты в доке пустые (в App `products=[]`, в localStorage не пишем); подсказка `.dock-hint` у «+» (синий пузырь + пульс), пропадает после первого продукта (`onboarding` проп Dock).
- BusinessAccountCard `empty` (0 ₽, «Карта ещё не выпущена»); DeferralCard/кредит/задачи скрыты; промо остаётся.
- Правая колонка: слайдер настройки → лимиты → история (empty-state как у продуктов: серая mask-иконка `IcEmpty` + текст).
- Слайдер «Настройте всё для работы» (`src/pages/Home.jsx`, массив `SETUP`): карточки в белом контейнере-карточке (как «История»), шеврон сворачивания (`setupOpen`), фейд справа (mask-gradient на `.setup-slider-wrap`). Дизайн карточки: текст слева + 3D-иллюстрация справа за край, рамка `rgba(204,214,228,.6)`. Иллюстрации `public/products/setup_login|employee|topup.png` (из Figma). Сейчас 5 карточек, но иллюстраций своих 3 — «бизнес-карта»/«документы» временно дублируют первые две.
- Блок «Лимиты» — `.card.limits` (две `.limit-box` с прогресс-барами), без иконок.

## Оверлеи (единый стиль = поиск)
- Все оверлеи: фон `rgba(242,245,249,.55)` + `backdrop-filter: blur(18px) saturate(120%)`, `z-index 120`: `.sv2-overlay`, `.ai-overlay`, `.popover-catch` (новый продукт).
- Шапка `.topbar` z-index **60** (выше дока 50) — иначе sticky-контекст шапки запирал оверлеи поиска под доком.
- `.page` анимация только opacity (без translateY) — трансформ создавал containing block и ломал fixed-подложки.

## Экран кредита
- `src/pages/Credit.jsx` (view `credit`) — заявка на кредит из Figma: прогресс-бар, кнопка назад (синий шеврон `.credit-back`), заголовок + №, карточка с двумя слайдерами (сумма/срок) + панель расчёта, кнопка «Продолжить». Иконка-галочка `public/icons/check.svg` из Figma.
- Подключение «Кредит…» из Сервисов/каталога открывает Credit (в `openProduct` ветка по `label.includes('кредит')`), не общую анкету. Назад → `productOrigin`.
- Бэки `.credit-back` и `.pw-back` приведены к одному виду: плашка `--blue-soft` + синий шеврон.

## Дизайн-решения
- Тени убраны (DS без теней). Тень шапки (градиент `.topbar::after`) появляется только при скролле (класс `.scrolled`).
- Иконки шапки (bell/settings/search) — 40% opacity. Ховер белых кнопок шапки контрастнее (`#e3e9f1`). Шеврон профиля 20px, 40%.

## Гочи редактирования (ВАЖНО)
- Путь проекта содержит кириллицу «Прототип». Инструменты Edit/Write иногда промахиваются мимо файла (NFC/NFD-нормализация) — Write один раз ушёл в фантомный путь. **Надёжно: править через Bash** (`perl -0pi -e`, `cat > "$HOME/Прототип/..."`), путь через `~`/`$HOME`.
- При perl-замене с фигурными скобками в содержимом не использовать разделитель `s{}{}` — брать `s#...#...#`.

## Память (персистентная, ~/.claude/.../memory/)
`ozon-bank-prototype` (project), `figma-icons-rule` (feedback), `deploy-workflow` (project: push main → Vercel, SSH).
