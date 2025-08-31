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

## Run Locally (Node)
- Install deps: `npm install`
- Start server: `npm start` → http://localhost:3000

## Deploy (Render — Node Web Service)
This repo includes a `render.yaml` blueprint configured for a Node web service using Express.

Option A — From Dashboard (Web Service)
- Create New → Web Service → Connect repo
- Runtime: `Node` (auto-detected)
- Build Command: `npm install`
- Start Command: `npm start`
- Click Create Web Service

Option B — Use render.yaml (Blueprint)
- Create New → Blueprint → Select repo
- Render will detect `render.yaml` with:
  - `env: node`
  - `startCommand: npm start`
- Click Apply; Render provisions and deploys automatically on pushes to the default branch.

## Development Notes
- Single‑file app kept simple on purpose; no build step required.
- For a larger setup, split CSS/JS and add a bundler (e.g., Vite) and tests (Playwright/Cypress).

## How This App Can Be Improved
- See IMPROVEMENTS.md for a curated roadmap:
  - https://github.com/Thatkidtk/task-flow/blob/main/IMPROVEMENTS.md

---

Made with ❤️ to keep teams aligned and work flowing.
