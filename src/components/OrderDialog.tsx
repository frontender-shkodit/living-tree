import { useEffect, useRef, type ReactNode } from 'react';
import { assets } from '../data/assets';
import { SvgIcon } from './SvgIcon';

export function OrderDialog({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    const name = dialog.querySelector<HTMLInputElement>('input[name="name"]');
    name?.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, []);
  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.querySelector('form')) dialog.querySelector<HTMLButtonElement>('.order-success button')?.focus();
  }, [children]);
  return <dialog ref={ref} className="order-dialog" aria-labelledby="dialog-title" onCancel={event => { event.preventDefault(); onClose(); }} onKeyDown={event => {
    if (event.key !== 'Tab') return;
    const items = [...event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), a[href], textarea:not(:disabled)')];
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }}>
    <button className="dialog-close" type="button" onClick={onClose} aria-label="Закрыть окно заказа"><SvgIcon src={assets.icons.close} /></button>
    {children}
  </dialog>;
}
