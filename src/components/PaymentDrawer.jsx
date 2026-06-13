import { Drawer } from 'vaul'

export default function PaymentDrawer({ open, onOpenChange, amount, recipient }) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="drawer-overlay" />
        <Drawer.Content className="drawer-content">
          <div className="drawer-handle" />

          <div className="pay-success">
            <div className="pay-check">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <circle className="pay-check-ring" cx="60" cy="60" r="54" stroke="#10c44c" strokeWidth="5" />
                <path className="pay-check-mark" d="M38 62.5 53 77 83 45" stroke="#10c44c" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <Drawer.Title className="pay-title">Платёж отправлен</Drawer.Title>
            <div className="pay-amount">−{amount}<span className="sum-dim"> ₽</span></div>
            <Drawer.Description className="pay-desc muted">Получателю {recipient}</Drawer.Description>
          </div>

          <div className="pay-actions">
            <button className="btn-primary" onClick={() => onOpenChange(false)}>Готово</button>
            <button className="btn-secondary">Скачать квитанцию</button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
