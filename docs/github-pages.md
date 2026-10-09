# GitHub Pages

Проект настроен для https://frontender-shkodit.github.io/living-tree/.

1. В репозитории откройте Settings → Pages и выберите Source → GitHub Actions.
2. Отправьте изменения в ветку `master`. Workflow `.github/workflows/deploy.yml` установит зависимости, соберёт и опубликует `dist`.
3. Дождитесь успешного выполнения во вкладке Actions. Повторный запуск доступен через Run workflow.

Для локальной проверки выполните `npm run build`, затем `npm run preview -- --port 4175`. Откройте http://127.0.0.1:4175/living-tree/. Проверка ресурсов в установленном Chrome: `node scripts/check-pages.mjs`.

Префикс задаётся в `vite.config.ts`; пути в React используют `import.meta.env.BASE_URL`. CSS обрабатывает Vite. Пререндеринг использует тот же конфиг, чтобы HTML совпадал с клиентским приложением.

GitHub Pages размещает статические файлы. Для приёма заказов через `/api/orders` нужен отдельный сервис и изменение адреса отправки формы.
