import { useId } from 'react';

const sources = import.meta.glob<string>([
  '/public/assets/figma/*.svg',
  '!/public/assets/figma/logo*.svg',
  '!/public/assets/figma/catalog-*.svg',
  '!/public/assets/figma/vector.svg',
], { query: '?raw', import: 'default', eager: true });

function escapeAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

const animatedOutlineIcons = new Set([
  'icon9.svg', 'icon10.svg', 'icon11.svg', 'icon12.svg',
  'icon-spray.svg', 'icon-watering.svg', 'icon-not-sun.svg',
]);

/** Trusted local Figma SVGs; retain original geometry and scope IDs per instance. */
export function SvgIcon({ src, label }: { src: string; label?: string }) {
  const instance = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const source = sources['/public' + src];
  if (!source) throw new Error(`Unknown local SVG icon: ${src}`);
  let markup = source;
  if (animatedOutlineIcons.has(src.split('/').pop() ?? '')) {
    markup = markup.replace('<path ', '<path class="icon-outline" ');
  }
  const ids = [...source.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  for (const id of new Set(ids)) {
    const scoped = `${instance}-${id}`;
    markup = markup.replaceAll(`id="${id}"`, `id="${scoped}"`)
      .replaceAll(`url(#${id})`, `url(#${scoped})`)
      .replaceAll(`href="#${id}"`, `href="#${scoped}"`);
  }
  const accessibility = label ? `role="img" aria-label="${escapeAttribute(label)}"` : 'aria-hidden="true"';
  markup = markup.replace('<svg ', `<svg focusable="false" ${accessibility} `);
  return <span className="svg-icon" dangerouslySetInnerHTML={{ __html: markup }} />;
}
