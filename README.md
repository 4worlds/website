# LLC Website Template

A static, config-driven website template for LLC pages. Edit `config.json` to customize — no code changes needed.

## Quick Start

1. Edit `config.json` with your LLC's information
2. Open `index.html` in a browser, or deploy to any static host

## Files

| File | Purpose |
|---|---|
| `config.json` | All LLC content — edit this only |
| `index.html` | Page structure |
| `style.css` | Styling and layout |
| `script.js` | Loads config and populates the page |

## Config Reference

All editable content lives in `config.json`:

- **company** — Name, tagline, logo, description, mission, founded year, location
- **services** — Array of `{title, description, icon}` (icons: `code`, `server`, `shield`)
- **team** — Array of `{name, role, bio, photo, linkedin, email}`
- **contact** — Email, phone, address, website
- **contracts** — CAGE code, DUNS, EIN, UEI, SAM status, and contract vehicles
- **pastPerformance** — Array of `{title, client, period, description, value}`
- **certifications** — Array of `{name, issuer, expiry}`
- **social** — LinkedIn, Twitter, GitHub URLs
- **theme** — `primary_color`, `accent_color`, `font`

## Deploying

Works with any static host:

- **GitHub Pages** — Push to a `gh-pages` branch
- **Netlify** — Drag and drop the folder
- **S3 + CloudFront** — Upload files to an S3 bucket
- **Any web server** — Copy files to your web root

## Customization

- **Colors** — Edit `theme.primary_color` and `theme.accent_color` in config.json
- **Sections** — Add/remove sections by editing both `index.html` and `script.js`
- **Icons** — Use `code`, `server`, or `shield` for service cards
- **Contact form** — Opens the user's email client with pre-filled fields
