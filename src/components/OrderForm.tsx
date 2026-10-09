import { useEffect, useId, useRef, useState, type FormEvent } from 'react';

export interface OrderSelection { id: string; title: string }
interface Props { selected?: OrderSelection; onSuccess: () => void }

function normalizePhone(value: string) {
  if (!/^[+\d\s()-]+$/.test(value)) return null;
  let digits = value.replace(/\D/g, '');
  if (digits.length === 10) digits = '7' + digits;
  if (digits.length === 11 && digits[0] === '8') digits = '7' + digits.slice(1);
  return digits.length === 11 && digits[0] === '7' ? '+' + digits : null;
}

export function OrderForm({ selected, onSuccess }: Props) {
  const id = useId();
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(false);
  const submitting = useRef(false);
  const controller = useRef<AbortController | null>(null);
  useEffect(() => () => controller.current?.abort(), []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const phone = normalizePhone(String(data.get('phone') || ''));
    const nextErrors = {
      name: name.length < 2 ? 'Введите имя: не менее двух символов.' : undefined,
      phone: !phone ? 'Введите российский номер телефона: 10 цифр или 11 цифр с 7/8.' : undefined,
    };
    setErrors(nextErrors);
    setMessage('');
    if (nextErrors.name || nextErrors.phone) {
      (form.elements.namedItem(nextErrors.name ? 'name' : 'phone') as HTMLInputElement).focus();
      return;
    }
    submitting.current = true;
    setPending(true);
    controller.current = new AbortController();
    const timeout = window.setTimeout(() => controller.current?.abort(), 15000);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: controller.current.signal,
        body: JSON.stringify({ name, phone, comment: String(data.get('comment') || '').trim(), product: selected ?? null }),
      });
      if (response.status === 404) throw new Error('Онлайн-отправка пока не подключена. Позвоните по номеру +7 989 522-67-79.');
      if (!response.ok) throw new Error('Не удалось отправить заказ. Попробуйте ещё раз или позвоните нам.');
      let result: unknown;
      try { result = await response.json(); }
      catch { throw new Error('Приём заказа не подтверждён. Попробуйте ещё раз или позвоните нам.'); }
      if (!result || typeof result !== 'object' || !('accepted' in result) || result.accepted !== true) {
        throw new Error('Приём заказа не подтверждён. Попробуйте ещё раз или позвоните нам.');
      }
      form.reset();
      onSuccess();
    } catch (error) {
      setMessage(error instanceof TypeError ? 'Нет соединения с сервером. Проверьте интернет и попробуйте ещё раз.' : error instanceof Error && error.name === 'AbortError' ? 'Сервер не ответил вовремя. Попробуйте ещё раз.' : error instanceof Error ? error.message : 'Не удалось отправить заказ. Попробуйте ещё раз.');
    } finally {
      window.clearTimeout(timeout);
      submitting.current = false;
      setPending(false);
    }
  }
  return <form className="order-form" noValidate onSubmit={submit} aria-busy={pending}>
    {selected && <p className="selected-product">Вы выбрали: {selected.title}</p>}
    <div className="form-fields">
      <label><span className="field-label">Имя <span aria-hidden="true">*</span></span><input name="name" placeholder="Имя*" autoComplete="name" required maxLength={100} readOnly={pending} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${id}-name-error` : undefined} onChange={() => setErrors(value => ({ ...value, name: undefined }))} />{errors.name && <span id={`${id}-name-error`} className="field-error">{errors.name}</span>}</label>
      <label><span className="field-label">Телефон <span aria-hidden="true">*</span></span><input name="phone" type="tel" inputMode="tel" placeholder="Телефон*" autoComplete="tel" required maxLength={30} readOnly={pending} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${id}-phone-error` : undefined} onChange={() => setErrors(value => ({ ...value, phone: undefined }))} />{errors.phone && <span id={`${id}-phone-error`} className="field-error">{errors.phone}</span>}</label>
      <label><span className="field-label">Комментарий</span><input name="comment" placeholder="Комментарий" maxLength={2000} readOnly={pending} /></label>
    </div>
    <button className="button" type="submit" disabled={pending}>{pending ? 'Отправляем…' : 'Заказать дерево'}</button>
    {message && <p className="form-message" role="alert">{message}</p>}
  </form>;
}

