# Ledger

Ledger is a desktop-friendly **Litematica / Minecraft schematic material analyzer**.

It reads a `.litematic` file entirely on your own machine, counts the actual placed blocks, and gives you a build-ready materials list with quantities, stacks, shulkers, search, sorting, exports, and print view.

This repository is set up to support **both**:

- a browser version (`index.html`)
- a Windows desktop version built with **Electron** and packaged as an **`.msi` installer** using **GitHub Actions**

---

## What Ledger does

- Drag-and-drop or browse for `.litematic` files
- Parse Litematica/NBT data client-side
- Decode Litematica's bit-packed block-state arrays
- Count real placed blocks, not just palette entries
- Show quantities, stacks, shulkers, and percentage share
- Search, sort, filter, print, export CSV/JSON
- Run fully offline after packaging

---

## Repository contents

```text
.github/workflows/build-windows.yml   GitHub Actions workflow that builds the MSI on Windows
build/icon.ico                        Windows installer/app icon
build/icon.png                        App/tab icon
index.html                            Main app UI and client-side logic
main.js                               Electron main process
package.json                          Electron + build configuration
scripts/sync-vendor.js                Copies offline libraries/fonts into vendor/
vendor/                               Offline JS libraries and bundled fonts
WINDOWS_MSI_GUIDE.md                  Beginner build/install guide
```

---

## Quick start for normal users

### Use the web version

1. Download this repository
2. Open `index.html`
3. Load a `.litematic` file

### Use the Windows desktop version

1. Go to this repo's **Actions** tab or **Releases** page
2. Download the built `.msi` installer
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
5. builds a real Windows **`.msi` installer**
6. uploads that installer as a GitHub Actions artifact
7. optionally attaches it to a GitHub Release when you push a version tag like `v1.0.0`

Workflow file:

```text
.github/workflows/build-windows.yml
```

---

## Build triggers

The MSI build runs when:

- you push to `main`
- you manually run the workflow from the **Actions** tab
- you push a tag like `v1.0.0`

---

## Downloading the finished MSI

After a workflow run finishes:

1. Open the repo on GitHub
2. Click **Actions**
3. Click the latest **Build Windows MSI** run
4. Scroll to **Artifacts**
5. Download **Ledger-Windows-MSI**

If you pushed a version tag like `v1.0.0`, you can also find the `.msi` under **Releases**.

---

## Local development (optional)

If you want to run the Electron version locally on your own machine:

```bash
npm install
npm run sync:vendor
npm start
```

To build the Windows MSI locally on Windows:

```bash
npm run build:msi
```

---

## Notes

- The app is packaged to run offline
- `JSZip` and `pako` are bundled locally from npm
- fonts are bundled locally from npm so the installed app does not depend on Google Fonts
- the Windows icon is in `build/icon.ico`
- Minecraft textures are **not bundled** with the app; load your own local `minecraft.jar` or resource pack `.zip` if you want real block textures in the list

---

## First-time GitHub users

If you are completely new to GitHub, use one of these guides next:

### Browser upload guide

```text
GITHUB_NEW_REPO_WALKTHROUGH.md
```

This is the click-by-click browser upload method.

### Git + Command Prompt guide

```text
GITHUB_CMD_WALKTHROUGH.md
```

This is the beginner-friendly Git CMD method for creating the first commit and pushing the project to GitHub.

---

## License

MIT
