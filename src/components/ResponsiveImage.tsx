import type { ImgHTMLAttributes } from 'react';
import { assets } from '../data/assets';
const root = import.meta.env.BASE_URL + 'assets/optimized/';
function sources(src: string, widths: number[], format: string) {
  const base = src.split('/').pop()!.replace('.png', '');
  return widths.map(width => `${root}${base}-${width}.${format} ${width}w`).join(', ');
}
export function ProductImage({ src, alt }: { src: string; alt: string }) {
  return <picture className="product-image"><source type="image/avif" srcSet={sources(src, [250, 500], 'avif')} sizes="(min-width: 1440px) 250px, (min-width: 1000px) 25vw, (min-width: 768px) 33vw, (min-width: 480px) 50vw, 250px" /><source type="image/webp" srcSet={sources(src, [250, 500], 'webp')} sizes="(min-width: 1440px) 250px, (min-width: 1000px) 25vw, (min-width: 768px) 33vw, (min-width: 480px) 50vw, 250px" /><img src={src} alt={alt} loading="lazy" width={500} height={494} /></picture>;
}
export function HeroImage() {
  const variants = [
    { media: '(width < 480px)', src: assets.hero.mobile360, widths: [360, 720] },
    { media: '(width < 768px)', src: assets.hero.mobile480, widths: [480, 960] },
    { media: '(width < 1000px)', src: assets.hero.tablet, widths: [768, 1536] },
    { media: '(width < 1440px)', src: assets.hero.compact, widths: [1000, 2000] },
    { media: undefined, src: assets.hero.desktop, widths: [1920, 3840] },
  ];
  return <picture className="hero-art">{variants.flatMap(item => [...['avif', 'webp'].map(format => <source key={`${item.src}-${format}`} media={item.media} type={`image/${format}`} srcSet={sources(item.src, item.widths, format)} sizes="100vw" />), <source key={`${item.src}-png`} media={item.media} type="image/png" srcSet={item.src} />])}<img src={assets.hero.desktop} alt="" fetchPriority="high" width={1920} height={600} /></picture>;
}
export function MossImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <picture className="moss-decoration"><source type="image/avif" srcSet={sources(assets.moss, [426, 852], 'avif')} sizes="426px" /><source type="image/webp" srcSet={sources(assets.moss, [426, 852], 'webp')} sizes="426px" /><img {...props} src={assets.moss} width={426} height={840} alt="" loading="lazy" /></picture>;
}
