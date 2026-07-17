# For My Bacha ❤️

A frontend-only React apology website built with Vite and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown by Vite, usually `http://localhost:5173`.

## Build

```bash
npm run build
```

## Deploy on Vercel

1. Push this folder to GitHub.
2. Open Vercel and import the repository.
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click Deploy.

## Customisation

Edit the text in:

`src/App.jsx`

Replace or add photos in:

`src/assets/`

The music button currently opens a YouTube search for “Perfect” rather than bundling copyrighted audio.


## Blank white screen fix

Use Node.js 18 or newer, then reset the installation:

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

On Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm install
npm run dev
```

Also check the browser console with `F12` → **Console** if an error is displayed.
