const root = import.meta.env.BASE_URL + 'assets/figma/';

export const assets = {
  hero: {
    desktop: root + 'hero-1920.png',
    compact: root + 'vector2.png',
    tablet: root + 'tablet768-vector1.png',
    mobile480: root + 'mobile480-vector1.png',
    mobile360: root + 'mobile360-vector1.png',
  },
  logo: { header: import.meta.env.BASE_URL + 'assets/optimized/logo1.svg', footer: import.meta.env.BASE_URL + 'assets/optimized/logo.svg' },
  moss: root + 'photo.png',
  catalog: {
    desktop: root + 'catalog-1920.svg', compact: root + 'vector.svg',
    tablet: root + 'catalog-848.svg', mobile480: root + 'catalog-847.svg',
    mobile360: root + 'catalog-846.svg',
  },
  about: [root + 'icon9.svg', root + 'icon12.svg', root + 'icon11.svg', root + 'icon10.svg'],
  care: [root + 'icon-spray.svg', root + 'icon-watering.svg', root + 'icon-not-sun.svg'],
  social: {
    header: { instagram: root + 'inst.svg', vk: root + 'vk.svg', telegram: root + 'telegram.svg' },
    footer: { instagram: root + 'inst1.svg', vk: root + 'vk1.svg', telegram: root + 'telegram1.svg' },
  },
  rating: { full: root + 'type-primary.svg', empty: root + 'type-secondary.svg' },
  badges: { sale: root + 'sticker.svg', hit: root + 'sticker1.svg' },
  icons: {
    phone: root + 'vector3.svg', close: root + 'ui-cross.svg',
    menu: root + 'ui-menuburger.svg', success: root + 'ui-iconcheck.svg',
    next: root + 'angle-right.svg', previous: root + 'ui-angleleft.svg',
  },
} as const;

