# Put the Trip Hub on everyone's phone — 5 minutes

## 1. Create the repo
1. Go to github.com → **New repository**
2. Name it something like `orlando-trip` → set to **Public** → Create

## 2. Upload these files
Drag and drop from this folder (Add file → Upload files):
- `index.html`
- `trip-hub.html`
- `trip-data.js`  ← **required.** The app won't load without it.
- `manifest.webmanifest`
- `sw.js`
- `icon-192.png`
- `icon-512.png`
- the whole `xr/` folder (`index.html`, `panels.js`, `panel-preview.html`) — the Quest 3 spatial dashboard
- (skip `snack-guide.html`, this README, and `.sync-test.txt` — that last one is leftover junk, feel free to delete it)

## 3. Turn on GitHub Pages
Repo → **Settings → Pages** → Source: **Deploy from a branch** → Branch: **main**, folder **/ (root)** → Save.
Wait ~1 minute. Your app is live at:
`https://YOURUSERNAME.github.io/orlando-trip/`

## 4. On each family phone
Open that URL, then:
- **iPhone:** Share button → **Add to Home Screen**
- **Android:** Chrome menu (⋮) → **Add to Home screen / Install app**

It installs with the purple star icon, opens full-screen with no browser bar,
and **works offline** after the first visit (dead zones in the parks included —
only Live Waits needs a signal).

## The XR app (Quest 3)
`https://YOURUSERNAME.github.io/orlando-trip/xr/` — open it in **Quest Browser**
and tap the AR button for a passthrough spatial dashboard. No install, no app
store, no sideloading: same URL, same data as the phone app.

WebXR requires HTTPS, which GitHub Pages already gives you. Nothing extra to set up.

- On a laptop it falls back to a normal 3D view (drag to look, WASD to move) and
  shows a diagnostics panel telling you what WebXR features the browser supports.
- `xr/panel-preview.html` renders the panel artwork in a plain browser tab — use
  it to iterate on layout and typography without putting a headset on.
- Add `?day=2026-07-20` to either page to pin a specific trip day.

## Updating later
Edit `trip-hub.html`, re-upload it to the repo, done. Phones pick up the new
version next time they open the app with a connection. If an update seems stuck,
bump the version in `sw.js` (`triphub-v2` → `triphub-v3`) and upload that too.
The `xr/` folder is deliberately never cached by the service worker, so it always
picks up your latest push on reload.

## Notes
- Each phone keeps its own snack checklist and day plan (localStorage) — the
  kids can compete on snack count.
- Live waits come from the free Queue-Times.com API, refreshed every 5 min,
  covering all parks except Volcano Bay (TapuTapu virtual queue there).
