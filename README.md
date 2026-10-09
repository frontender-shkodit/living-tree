# Живое дерево

Основа лендинга: React, TypeScript, Vite и обычный CSS.

## Запуск

Нужен Node.js 22.11+.

```sh
npm install
npm run dev
```

На Windows PowerShell с ограничением выполнения скриптов используйте `npm.cmd` вместо `npm`.

```sh
npm run build
npm run preview
```

`build` проверяет TypeScript и создаёт production-сборку в `dist`.

Production-сборка включает пререндеренный HTML всех секций и гидратацию React. Содержимое доступно поисковым роботам до выполнения JavaScript. После изменения изображений запустите `npm run optimize:assets`: исходники сохраняются в `public/assets/figma`, WebP/AVIF и оптимизированные логотипы — в `public/assets/optimized`.

Проверки SEO и доступности: `node scripts/audit-project.mjs`; проверка статического HTML и гидратации: `node scripts/check-prerender.mjs`. Для production-проверок запустите `npm run preview -- --port 4173`.

## Структура

- `src/styles/tokens.css` — цвета, размеры и отступы макета.
- `src/styles/base.css` — базовые стили и контейнер.
- `public/assets/figma` — исходные материалы Figma.
- `docs/design-audit.md` — разбор дизайна и сценарии.

Все секции лендинга сверстаны. Выбор товара открывает модальную форму, работают мобильное меню, валидация и переключение отзывов кнопкой, клавиатурой и свайпом. Фронтенд подготовлен к POST /api/orders; серверная отправка пока не подключена. Соцсети оставлены заглушками по указанию пользователя. Sunday подключён локально из public/assets/fonts.

Проверка в установленном Chrome: `node scripts/check-layout.mjs` при запущенном dev-сервере. Результаты и скриншоты сохраняются в `docs`.

Проверка сценариев без реальных заявок: `node scripts/check-interactions.mjs`.
