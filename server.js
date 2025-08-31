const path = require('path');
const fs = require('fs');
const express = require('express');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Gzip responses
app.use(compression());

// Static files with sensible caching
const root = process.cwd();
app.use(express.static(root, {
  extensions: ['html'],
  fallthrough: true,
  setHeaders: (res, filePath) => {
    const rel = path.relative(root, filePath).replace(/\\/g, '/');
    // Ensure HTML, manifest, and service worker are never aggressively cached
    if (/^(index\.html|404\.html|manifest\.json|sw\.js)$/.test(rel)) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    } else {
      // Long cache for versioned/static assets
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

// Health check
app.get('/health', (_req, res) => res.status(200).send('ok'));

// SPA fallback: serve index.html for non-file routes
app.get('*', (req, res, next) => {
  // If it looks like a file (has a dot after last slash), skip to 404
  const last = req.path.split('/').pop() || '';
  if (last.includes('.')) return next();
  const indexPath = path.join(root, 'index.html');
  if (fs.existsSync(indexPath)) return res.sendFile(indexPath);
  return res.status(404).send('Not Found');
});

// 404 for other unmatched requests
app.use((req, res) => {
  const notFoundPath = path.join(root, '404.html');
  if (fs.existsSync(notFoundPath)) return res.status(404).sendFile(notFoundPath);
  return res.status(404).send('Not Found');
});

app.listen(PORT, '0.0.0.0', () => {
  // eslint-disable-next-line no-console
  console.log(`TaskFlow server listening on http://0.0.0.0:${PORT}`);
});

