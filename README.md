# Ledger

Ledger is a desktop-friendly **Litematica / Minecraft schematic material analyzer**.

It reads a `.litematic` file entirely on your own machine, counts the actual placed blocks, and gives you a build-ready materials list with quantities, stacks, shulkers, search, sorting, exports, print view, saved checklist progress, and automatic update support in the Windows desktop build.

This repository is set up to support **both**:

- a browser version (`index.html`)
- a Windows desktop version built with **Electron** and packaged as an **auto-updating NSIS `.exe` installer** using **GitHub Actions**

---

## What Ledger does

- Drag-and-drop or browse for `.litematic` files
- Parse Litematica/NBT data client-side
- Decode Litematica's bit-packed block-state arrays
- Count real placed blocks, not just palette entries
- Show quantities, stacks, shulkers, and percentage share
- Show overall build progress for gathered materials
- Save checked-off progress automatically on the same device for the same schematic
- Auto-detect a local Minecraft installation in the desktop app and use those real block textures when available
- Search, sort, filter, print, export CSV/JSON
- Run fully offline after packaging
- Auto-check for app updates on startup in the Windows desktop build

---

## Repository contents

```text
.github/workflows/build-windows.yml   GitHub Actions workflow that builds the Windows EXE on Windows
build/icon.ico                        Windows installer/app icon
build/icon.png                        App/tab icon
index.html                            Main app UI and client-side logic
main.js                               Electron main process
preload.js                            Safe renderer bridge for desktop-only features
package.json                          Electron + build configuration
scripts/sync-vendor.js                Copies offline libraries/fonts into vendor/
vendor/                               Offline JS libraries and bundled fonts
GITHUB_CMD_WALKTHROUGH.md             Beginner Git + CMD walkthrough
GITHUB_NEW_REPO_WALKTHROUGH.md        Beginner browser-upload walkthrough
WINDOWS_MSI_GUIDE.md                  Older guide file (superseded by the current EXE setup)
```

---

## Quick start for normal users

### Use the web version

1. Download this repository
2. Open `index.html`
3. Load a `.litematic` file

### Use the Windows desktop version

1. Go to this repo's **Actions** tab or **Releases** page
2. Download the built Windows installer `.exe`
3. Run the installer
4. Open **Ledger** from your desktop or Start menu

---

## How the Windows build works

You do **not** need your own Windows computer.

This repo includes a GitHub Actions workflow that:

1. runs on `windows-latest`
2. installs dependencies
3. vendors the offline browser libraries and fonts
4. runs `electron-builder`
5. builds a Windows **NSIS `.exe` installer**
6. uploads that installer as a GitHub Actions artifact
7. publishes release files for auto-update when you push a version tag like `v1.0.0`

Workflow file:

```text
.github/workflows/build-windows.yml
```

---

## Auto-updates

The packaged Windows desktop app now targets **NSIS**, which is the standard Electron/electron-builder path for Windows auto-updates [2](https://www.electron.build/docs/features/auto-update/) [3](https://mintlify.wiki/electron-userland/electron-builder/packaging/windows). The app checks for updates automatically on startup, and tagged releases can be published to GitHub Releases for download/update delivery [2](https://www.electron.build/docs/features/auto-update/).

---

## Build triggers

The Windows EXE build runs when:

- you push to `main`
- you manually run the workflow from the **Actions** tab
- you push a tag like `v1.0.0`

---

## Downloading the finished Windows installer

After a workflow run finishes:

1. Open the repo on GitHub
2. Click **Actions**
3. Click the latest **Build Windows EXE** run
4. Scroll to **Artifacts**
5. Download **Ledger-Windows-EXE**

If you pushed a version tag like `v1.0.0`, you can also find the release files under **Releases**.

---

## Local development (optional)

If you want to run the Electron version locally on your own machine:

```bash
npm install
npm run sync:vendor
npm start
```

To build the Windows installer locally on Windows:

```bash
npm run build:win
```

To publish a tagged Windows release locally on Windows:

```bash
npm run release:win
```

---

## Notes

- the app is packaged to run offline
- `JSZip` and `pako` are bundled locally from npm
- fonts are bundled locally from npm so the installed app does not depend on Google Fonts
- the Windows icon is in `build/icon.ico`
- Ledger includes bundled built-in block textures using Faithful 64x (see `THIRD_PARTY_NOTICES.md`)
- the bundled Faithful license file is included in `vendor/faithful/LICENSE.txt`
- Mojang's default Minecraft textures are not redistributed inside the app package

---

## First-time GitHub users

If you are completely new to GitHub, use one of these guides next:

### Browser upload guide

```text
GITHUB_NEW_REPO_WALKTHROUGH.md
```

### Git + Command Prompt guide

```text
GITHUB_CMD_WALKTHROUGH.md
```

---

## License

MIT
