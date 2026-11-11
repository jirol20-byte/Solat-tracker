# Solat Tracker — Version 1

A minimalist, installable Android-friendly web app (PWA) for tracking five daily prayers.

## Version 1 features
- Monthly calendar with five prayer slots.
- Tap a slot to choose: Tunai, Sudah Qadha, Tertinggal, or clear record.
- Monthly totals for each status.
- Records persist in the browser on this device using local storage.
- Offline support after the first successful load.
- No login, analytics, or cloud sync.

## Install on Android
A PWA must be served from an HTTPS website (or localhost for development).

1. Publish the contents of this folder to an HTTPS static host (for example, GitHub Pages, Netlify, or your own hosting).
2. Open the HTTPS address in Chrome on Android.
3. Open Chrome menu (⋮) and choose **Install app** or **Add to Home screen**.
4. Launch **Solat Tracker** from your home screen.

## Local preview
You can run a local static server from this folder, then open the local address on your computer:
`python -m http.server 8000`

## Important
- Data is stored only in this browser on this phone. Clearing browser/site data may erase it.
- This first version does not yet sync across devices, send prayer-time notifications, calculate prayer times, or provide a qadha planner.
- "Tertinggal" is a manual record, not a religious ruling. The app does not calculate obligations or make fiqh decisions.
