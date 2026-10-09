import { useEffect, useRef, useState } from 'react';
import { assets } from './data/assets';
import { products } from './data/products';
import './styles/landing.css';
import { OrderForm, type OrderSelection } from './components/OrderForm';
import { OrderDialog } from './components/OrderDialog';
import { HeroImage, ProductImage, MossImage } from './components/ResponsiveImage';
import { SvgIcon } from './components/SvgIcon';

const features = [
  'Семейная мастерская «Сувенир из Крыма» уже более 9 лет радует своими работами покупателей из разных уголков нашей страны.',
  'Мох для наших сувениров собран в горах Южного берега Крыма. Поэтому каждое живое дерево хранит в себе тепло солнечных лучей, свежесть морского бриза и нашу любовь.',
  'Каждый сувенир уникален и неповторим, потому что создан полностью из природных материалов. Этот полезный и оригинальный подарок украсит собой любой интерьер.',
  'Кроме красоты, наши изделия из цетрарии обладают полезными свойствами. Мох, находясь у вас дома, выделяет йод и микроэлементы в воздух, очищает его от пыли и вредных микроорганизмов.',
];
const care = ['Опрыскивать 1 раз в неделю, но не реже раза в 6 месяцев', 'Использовать чистую воду', 'Не допускать попадания прямых солнечных лучей'];
const reviews = [
  { name: 'Алексей, Москва', initial: 'А', avatar: import.meta.env.BASE_URL + 'assets/figma/ellipse3.svg', stars: 5, text: 'Все быстро отправили, упаковано хорошо. Дерево супер, на подарок в самый раз, очень необычно.' },
  { name: 'Лена, Ростов-на-Дону', initial: 'Л', avatar: import.meta.env.BASE_URL + 'assets/figma/ellipse4.svg', stars: 4, text: 'Получила свое дерево! Спасибо за такую красоту. Теперь будет радовать наш дом.' },
];
const navigation = [['#works', 'Наши работы'], ['#delivery', 'Доставка'], ['#contacts', 'Контакты']] as const;

function SocialLinks({ footer = false }: { footer?: boolean }) {
  const icons = footer ? assets.social.footer : assets.social.header;
  return <div className="social-links" role="group" aria-label="Социальные сети">{Object.entries(icons).map(([name, src]) => <span key={name} title={`${name}: ссылка уточняется`}><SvgIcon src={src} label={name === 'instagram' ? 'Instagram' : name === 'vk' ? 'ВКонтакте' : 'Telegram'} /></span>)}</div>;
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<OrderSelection | undefined>();
  const [dialog, setDialog] = useState<'order' | 'success' | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [twoReviewsVisible, setTwoReviewsVisible] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1000px)');
    const update = () => setTwoReviewsVisible(query.matches);
    update(); query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  const headerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    const desktop = window.matchMedia('(min-width: 1000px)');
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false); };
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); menuButtonRef.current?.focus(); }
    };
    desktop.addEventListener('change', closeOnDesktop);
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      desktop.removeEventListener('change', closeOnDesktop);
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);
  function selectProduct(title: string, id: string) {
    setSelected({ title, id });
    setDialog('order');
    
  }
  return <>
    <a className="skip-link" href="#main" onClick={() => document.getElementById('main')?.focus({ preventScroll: true })}>Перейти к содержимому</a>
    <header className="site-header">
      <div className="container header-inner" ref={headerRef}>
        <a href="#main" aria-label="Сувенир из Крыма — начало страницы"><img src={assets.logo.header} alt="Сувенир из Крыма" /></a>
        <div className="header-social"><SocialLinks /></div>
        <nav className="desktop-nav" aria-label="Основная навигация">{navigation.map(([href, label]) => <a href={href} key={href}>{label}</a>)}</nav>
        <a className="phone-link" href="tel:+79895226779"><SvgIcon src={assets.icons.phone} />79895226779</a>
        <button ref={menuButtonRef} className="menu-toggle" type="button" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menuOpen} aria-controls={menuOpen ? 'mobile-menu' : undefined} onClick={() => setMenuOpen(!menuOpen)}><SvgIcon src={menuOpen ? assets.icons.close : assets.icons.menu} /></button>
        {menuOpen && <nav id="mobile-menu" className="mobile-menu" aria-label="Мобильная навигация" onKeyDown={event => { if (event.key === 'Escape') setMenuOpen(false); }}>{navigation.map(([href, label]) => <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<SocialLinks /></nav>}
      </div>
    </header>
    <main id="main" tabIndex={-1}>
      <section className="hero" aria-labelledby="hero-title">
        <HeroImage />
        <div className="container"><div className="hero-copy"><p className="hero-slogan">Лучший<br />подарок</p><h1 id="hero-title">живое дерево <br />с кроной <br />из цетрарии</h1><button className="button" type="button" onClick={() => { setSelected(undefined); setDialog('order'); }}>Заказать дерево</button></div></div>
      </section>
      <section className="about container" aria-labelledby="about-title"><h2 id="about-title">О нас</h2><div className="features">{features.map((text, index) => <article className="feature" key={text}><SvgIcon src={assets.about[index]} /><p>{text}</p></article>)}</div></section>
      <section className="catalog" id="works" aria-labelledby="works-title">
        <div className="catalog-inner"><h2 id="works-title">Наши работы</h2><div className="product-grid">{products.map(product => <article className="product-card" key={product.id}><div className="product-photo"><ProductImage src={product.image} alt={`Дерево из цетрарии: ${product.title}`} />{product.badge && <span className={`badge badge-${product.badge}`}><SvgIcon src={assets.badges[product.badge]} /><span>{product.badge === 'sale' ? 'Акция' : 'Хит'}</span></span>}</div><div className="product-info"><h3>От {product.title.replace(/^От /, '')}</h3><p className="product-price"><span className={product.oldPrice ? 'sale-price' : ''}>{product.price} ₽</span>{product.oldPrice && <del>{product.oldPrice} ₽</del>}</p><button className="button button-secondary button-small" type="button" aria-label={`Заказать дерево: ${product.title}`} onClick={() => selectProduct(product.title, product.id)}>Заказать</button></div></article>)}<div className="catalog-note"><p>Обратите внимание, что все изделия изготавливаются вручную из природных материалов, поэтому каждое изделие уникально, не имеет точных копий и может отличаться от фотографий.</p><p>При оформлении заказа можно выбрать экземпляр из имеющихся в наличии.</p></div></div></div>
      </section>
      <section className="care container" aria-labelledby="care-title"><h2 id="care-title">Уход</h2><div className="care-grid">{care.map((text, index) => <article className="care-card" key={text}><div className="care-icon"><SvgIcon src={assets.care[index]} /></div><p>{text}</p></article>)}</div></section>
      <section className="reviews" aria-labelledby="reviews-title"><h2 id="reviews-title">Отзывы</h2><div className="reviews-inner"><div className="reviews-window" tabIndex={0} role="region" aria-label="Отзывы: используйте стрелки влево и вправо" onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); setReviewIndex(value => (value + (event.key === 'ArrowRight' ? 1 : reviews.length - 1)) % reviews.length); } }} onTouchStart={event => { const touch = event.touches[0]; touchStart.current = { x: touch.clientX, y: touch.clientY }; }} onTouchEnd={event => { const start = touchStart.current; touchStart.current = null; if (!start) return; const touch = event.changedTouches[0]; const dx = touch.clientX - start.x; const dy = touch.clientY - start.y; if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) setReviewIndex(value => (value + (dx < 0 ? 1 : reviews.length - 1)) % reviews.length); }}><div className="reviews-track">{reviews.map((_, index) => { const review = reviews[(index + reviewIndex) % reviews.length]; return <article className="review-card" key={review.name} aria-hidden={index > 0 && !twoReviewsVisible}><div className="review-heading"><div className="review-avatar"><SvgIcon src={review.avatar} /><span>{review.initial}</span></div><div><div className="rating" role="img" aria-label={`${review.stars} из 5 звёзд`}>{Array.from({ length: 5 }, (_, star) => <SvgIcon key={star} src={star < review.stars ? assets.rating.full : assets.rating.empty} />)}</div><p className="review-author">{review.name}</p></div></div><p>{review.text}</p></article>; })}</div></div><p className="sr-only" role="status" aria-live="polite" aria-atomic="true">Отзыв {reviewIndex + 1} из {reviews.length}: {reviews[reviewIndex].name}</p><button className="review-next" type="button" aria-label="Следующий отзыв" onClick={() => setReviewIndex((reviewIndex + 1) % reviews.length)}><SvgIcon src={assets.icons.next} /></button></div></section>
      <section className="order-delivery"><MossImage /><div className="container"><div className="order-block" id="order"><h2>Для заказа заполните форму</h2><OrderForm selected={selected} onSuccess={() => setDialog('success')} /></div><div className="delivery" id="delivery"><h2>Оплата и Доставка</h2><p>Отправка заказов производится после полной предоплаты на карту банка. Цена на сайте указана без учета доставки. После оплаты отправка заказа в течение 3 рабочих дней.</p><p>Доставка осуществляется «Почтой России», СДЭК.</p><p>Будьте внимательны, остерегайтесь мошенников. Мы связываемся с вами только после того, как вы осуществите заказ, исключительно по номеру, указанному в контактах.</p></div></div></section>
    </main>
    <footer className="site-footer" id="contacts"><div className="container footer-inner"><a href="#main" aria-label="В начало страницы"><img src={assets.logo.footer} alt="Сувенир из Крыма" /></a><SocialLinks footer /><div className="footer-contact"><a className="footer-phone" href="tel:+79895226779">7 989 522 67 79</a><p>Прием заказов с 09.00–20.00<br /><a href="mailto:crimean-souvenir@yandex.ru">crimean-souvenir@yandex.ru</a></p></div></div></footer>
    {dialog && <OrderDialog onClose={() => setDialog(null)}>{dialog === 'order' ? <><h2 id="dialog-title">Для заказа заполните форму</h2><OrderForm selected={selected} onSuccess={() => setDialog('success')} /></> : <div className="order-success"><SvgIcon src={assets.icons.success} /><h2 id="dialog-title">Спасибо за заказ</h2><p>Мы свяжемся с Вами<br />в ближайшее время.</p><button className="button" type="button" onClick={() => setDialog(null)}>Закрыть</button></div>}</OrderDialog>}
  </>;
}


