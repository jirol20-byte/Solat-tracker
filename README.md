# Solat Tracker — Clean V1

A minimalist, installable Android-friendly Progressive Web App for tracking five daily prayers.

## Files

- `index.html` — app structure
- `styles.css` — minimalist dark green design
- `app.js` — calendar, status selection, monthly totals, local storage
- `sw.js` — offline caching
- `manifest.webmanifest` — PWA install metadata
- `icon.svg` — app icon

## Publish with GitHub Pages

1. Upload all files to the repository root (same folder as `index.html`).
2. Commit the changes to the `main` branch.
3. In repository Settings → Pages, choose **Deploy from a branch**, branch **main**, folder **/(root)**.
4. Wait for the GitHub Pages deployment to finish.
5. Open the published HTTPS URL on Android.
6. In the browser menu, choose **Install app** or **Add to Home screen**.

## Use

Tap a prayer cell to choose:
- Tunai dalam waktu
- Sudah qadha
- Tertinggal / perlu qadha
- Kosongkan rekod

Monthly totals update automatically. Records are stored locally in the browser on this device.

## Important

- This app is a personal record-keeping tool, not a religious ruling.
- Data is stored locally and does not sync between devices.
- Clearing browser/site storage may erase records.
