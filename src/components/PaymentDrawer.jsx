import { Drawer } from 'vaul'

export default function PaymentDrawer({ open, onOpenChange, amount, recipient, account, date, fee }) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="drawer-overlay" />
        <Drawer.Content className="drawer-content">
          <div className="drawer-handle" />

          <div className="pay-success">
            <div className="pay-check">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="m5 12.5 4.5 4.5L19 7.5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <Drawer.Title className="pay-title">Платёж отправлен</Drawer.Title>
            <div className="pay-amount">−{amount}<span className="sum-dim"> ₽</span></div>
            <Drawer.Description className="pay-desc muted">Деньги поступят получателю в течение нескольких минут</Drawer.Description>

            <div className="pay-rows">
              <div className="pay-row"><span className="muted">Получатель</span><span>{recipient}</span></div>
              <div className="pay-row"><span className="muted">Счёт списания</span><span>Счёт для бизнеса ·· {account}</span></div>
              <div className="pay-row"><span className="muted">Комиссия</span><span>{fee}</span></div>
              <div className="pay-row"><span className="muted">Дата и время</span><span>{date}</span></div>
              <div className="pay-row"><span className="muted">Статус</span><span className="pay-status">Исполнен</span></div>
            </div>

            <div className="pay-actions">
              <button className="btn-primary" onClick={() => onOpenChange(false)}>Готово</button>
              <button className="btn-secondary">Скачать квитанцию</button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
