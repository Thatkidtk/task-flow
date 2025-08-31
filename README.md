# TaskFlow

A lightweight, installable task manager for teams and families. 100% client‑side, offline‑capable (PWA), and data stored locally in your browser.

## Features
- Groups, members, and per‑member tasks
- Task editing, priorities, due dates, and completion
- Search, filters (status/priority), and sorting
- Overdue detection and dashboard stats
- Activity feed with recent changes
- Import/Export JSON backups
- PWA support (installable, offline)

## Quick Start
- Open `index.html` directly in your browser, or serve the folder:
  - Python: `python -m http.server 8000` → http://localhost:8000/
- Register (local only), create a group, add members and tasks.

## PWA
- Manifest: `manifest.json`
- Service worker: `sw.js`
- Icon: `icon.svg`
- The app registers `sw.js` automatically; first load requires network; subsequent loads work offline.

## Data Storage
- All data is saved to `localStorage` per browser profile.
- Use Export/Import in the header to back up or move your data.

## Deploy (GitHub Pages)
1) Push to GitHub (`main` branch, repo root has `index.html`).
2) In your repo: Settings → Pages → Build and deployment → Source: "Deploy from a branch", Branch: `main` / `/` (root).
3) Your site will be available at:
   - https://Thatkidtk.github.io/task-flow/

## Development Notes
- Single‑file app kept simple on purpose; no build step required.
- For a larger setup, split CSS/JS and add a bundler (e.g., Vite) and tests (Playwright/Cypress).

---

Made with ❤️ to keep teams aligned and work flowing.
