# Ledger Windows desktop build guide

This turns your existing repo into **both**:

- the original web version (`index.html` still works in a browser), and
- a Windows desktop build made with **Electron** and packaged as an **`.msi` installer**.

You do **not** need a Windows computer. GitHub Actions will build the `.msi` for you on GitHub's own `windows-latest` runner.

---

## 1) Where the files go in your repo

Put these files/folders in the **root** of your existing repository (`litematica-ledger`):

```text
litematica-ledger/
├─ .github/
│  └─ workflows/
│     └─ build-windows.yml
├─ build/
│  ├─ icon.ico
│  ├─ icon.png
│  └─ logo-source.png
├─ scripts/
│  └─ sync-vendor.js
├─ vendor/
│  ├─ fonts.css
│  ├─ jszip.min.js
│  ├─ pako.min.js
│  └─ fonts/
│     └─ ...woff2 files
├─ index.html
├─ main.js
├─ package.json
├─ package-lock.json
├─ .gitignore
├─ LICENSE
├─ README.md
└─ WINDOWS_MSI_GUIDE.md
```

### What each new thing does

- `main.js` — Electron main process; opens Ledger in a native app window
- `package.json` — tells npm/Electron/electron-builder how to run and package the app
- `package-lock.json` — locks dependency versions so GitHub Actions builds consistently
- `vendor/` — local offline copies of `JSZip` and `pako`
- `build/icon.ico` — Windows app/installer icon
- `build/icon.png` — tab/window icon source
- `.github/workflows/build-windows.yml` — the GitHub Actions workflow that actually builds the `.msi` on Windows
- `scripts/sync-vendor.js` — copies `JSZip` and `pako` from npm into `vendor/`

---

## 2) What changed in `index.html`

Your app logic stayed as-is.

The only functional changes for packaging/offline use are:

- CDN `JSZip` → local `vendor/jszip.min.js`
- CDN `pako` → local `vendor/pako.min.js`
- added a local tab icon: `build/icon.png`
- removed the Google Fonts hotlink so the desktop app makes no network calls for fonts

That means the installed app can run fully offline.

---

## 3) How to upload the files to GitHub

Since your repo already exists, the simplest path is:

1. Open your repo: `https://github.com/iNotrez/litematica-ledger`
2. Click **Add file** → **Upload files**
3. Upload/replace the files listed above
4. Commit the changes to `main`

If GitHub asks whether to replace files like `index.html`, choose **replace**.

---

## 4) How to trigger the Windows build

You have **two easy options**.

### Option A — automatic build on push to `main`

Just push or commit the files to the `main` branch.

That automatically triggers:

- `.github/workflows/build-windows.yml`

### Option B — manual run from the Actions tab

1. Open your repo on GitHub
2. Click the **Actions** tab
3. In the left sidebar, click **Build Windows MSI**
4. Click **Run workflow**
5. Choose the `main` branch
6. Click the green **Run workflow** button

---

## 5) Where to find the finished `.msi`

### If you used a normal push or manual run

1. Open the **Actions** tab in your repo
2. Click the workflow run that just finished
3. Scroll down to **Artifacts**
4. Download **Ledger-Windows-MSI**
5. Inside that download will be your built `.msi`

### If you want the `.msi` attached to a GitHub Release too

Create and push a version tag like this:

- `v1.0.0`
- `v1.0.1`
- `v1.1.0`

When the workflow runs for a tag starting with `v`, it will:

- build the `.msi`
- upload the artifact in Actions
- also attach the `.msi` to a GitHub Release

If you are new to tags, you can ignore this at first and just download the artifact from **Actions**.

---

## 6) How to install and run Ledger on Windows

After downloading the built installer:

1. Double-click the `.msi`
2. Follow the install wizard
3. Let it create the shortcuts if prompted
4. Launch **Ledger** from:
   - the desktop shortcut, or
   - the Start menu

Once installed, Ledger opens in a clean native window with no browser tabs or address bar.

---

## 7) If you update the app later

When you change `index.html` later:

1. commit/push the new version to `main`
2. GitHub Actions rebuilds the Windows installer
3. download the new `.msi` from the latest workflow run

If you ever change the npm versions of `jszip` or `pako`, the workflow already runs:

```bash
npm run sync:vendor
```

So the local vendor files are refreshed automatically during the build.

---

## 8) Quick checklist

Before you run the workflow, make sure your repo contains:

- `package.json`
- `package-lock.json`
- `main.js`
- `index.html`
- `vendor/jszip.min.js`
- `vendor/pako.min.js`
- `vendor/fonts.css`
- `build/icon.ico`
- `.github/workflows/build-windows.yml`

If those are present, GitHub can build your `.msi`.
