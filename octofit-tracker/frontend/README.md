# OctoFit Tracker Frontend

React 19 presentation tier for the OctoFit Tracker multi-tier application.

## Environment

Define `VITE_CODESPACE_NAME` when running in GitHub Codespaces, for example in `.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, the frontend calls the API with this base URL:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api
```

When `VITE_CODESPACE_NAME` is unset, the frontend safely falls back to:

```text
http://localhost:8000/api
```

This avoids `https://undefined-8000.app.github.dev` URLs during local development.

## Scripts

```bash
npm run dev
npm run build
npm run lint
```
