# Сайт — механизированная штукатурка (Челябинск)

Лендинг на **React + Vite + Tailwind CSS**.

## Локальный запуск

```bash
npm install
npm run dev
```

Откройте http://localhost:5173

## Сборка

```bash
npm run build
npm run preview
```

## Деплой на GitHub Pages

1. Создайте репозиторий на GitHub с именем `site_stroika`.
2. Загрузите код:

```bash
git init
git add .
git commit -m "Initial commit: landing page"
git branch -M main
git remote add origin https://github.com/ВАШ_ЛОГИН/site_stroika.git
git push -u origin main
```

3. На GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. После успешного workflow сайт будет доступен по адресу:

`https://ВАШ_ЛОГИН.github.io/site_stroika/`

Контент и контакты редактируются в `src/data/content.ts`.
