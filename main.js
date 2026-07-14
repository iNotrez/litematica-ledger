const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');
const fs = require('fs/promises');
const path = require('path');
const os = require('os');

const APP_TITLE = 'Ledger';
const INDEX_PATH = path.join(__dirname, 'index.html');
const PRELOAD_PATH = path.join(__dirname, 'preload.js');
const ICON_PATH = path.join(__dirname, 'build', 'icon.png');

let mainWindow = null;
let hasCheckedForUpdates = false;

function createWindow() {
  mainWindow = new BrowserWindow({
    title: APP_TITLE,
    width: 1440,
    height: 920,
    minWidth: 1100,
    minHeight: 720,
    backgroundColor: '#0d100e',
    autoHideMenuBar: true,
    icon: ICON_PATH,
    show: false,
    webPreferences: {
      preload: PRELOAD_PATH,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true
    }
  });

  Menu.setApplicationMenu(null);

  mainWindow.on('page-title-updated', (event) => {
    event.preventDefault();
  });

  mainWindow.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    checkForAppUpdates();
  });

  mainWindow.loadFile(INDEX_PATH);
}

function getMinecraftRoots() {
  const home = os.homedir();
  const appData = process.env.APPDATA || path.join(home, 'AppData', 'Roaming');
  const candidates = [
    path.join(appData, '.minecraft'),
    path.join(home, '.minecraft'),
    path.join(home, 'Library', 'Application Support', 'minecraft')
  ];
  return Array.from(new Set(candidates));
}

async function fileExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function detectInstalledMinecraftJar() {
  const jarCandidates = [];

  for (const root of getMinecraftRoots()) {
    const versionsDir = path.join(root, 'versions');
    if (!(await fileExists(versionsDir))) continue;

    let versionEntries = [];
    try {
      versionEntries = await fs.readdir(versionsDir, { withFileTypes: true });
    } catch {
      continue;
    }

    for (const versionEntry of versionEntries) {
      if (!versionEntry.isDirectory()) continue;
      const versionDir = path.join(versionsDir, versionEntry.name);
      const preferredJar = path.join(versionDir, `${versionEntry.name}.jar`);
      const jarsToCheck = [preferredJar];

      try {
        const nested = await fs.readdir(versionDir, { withFileTypes: true });
        for (const entry of nested) {
          if (entry.isFile() && entry.name.toLowerCase().endsWith('.jar')) {
            jarsToCheck.push(path.join(versionDir, entry.name));
          }
        }
      } catch {
        // ignore unreadable version folder
      }

      for (const jarPath of Array.from(new Set(jarsToCheck))) {
        try {
          const stats = await fs.stat(jarPath);
          if (stats.isFile()) {
            jarCandidates.push({
              jarPath,
              versionName: versionEntry.name,
              modifiedMs: stats.mtimeMs,
              size: stats.size
            });
          }
        } catch {
          // ignore missing jar candidates
        }
      }
    }
  }

  if (jarCandidates.length === 0) {
    return { found: false, message: 'No installed Minecraft .jar was found on this computer.' };
  }

  jarCandidates.sort((a, b) => b.modifiedMs - a.modifiedMs);
  const selected = jarCandidates[0];
  const bytes = await fs.readFile(selected.jarPath);

  return {
    found: true,
    fileName: path.basename(selected.jarPath),
    versionName: selected.versionName,
    size: selected.size,
    dataBase64: bytes.toString('base64')
  };
}

ipcMain.handle('ledger:detect-minecraft-jar', async () => {
  try {
    return await detectInstalledMinecraftJar();
  } catch (error) {
    log.error('Minecraft jar detection failed', error);
    return {
      found: false,
      message: (error && error.message) ? error.message : 'Could not detect an installed Minecraft version.'
    };
  }
});

function checkForAppUpdates() {
  if (hasCheckedForUpdates || !app.isPackaged) return;
  hasCheckedForUpdates = true;

  log.initialize();
  log.transports.file.level = 'info';
  autoUpdater.logger = log;
  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.on('error', (error) => {
    log.error('Auto-update error', error);
  });

  autoUpdater.on('update-downloaded', async (info) => {
    const detail = info && info.version
      ? `Ledger ${info.version} is ready to install.`
      : 'A new Ledger update is ready to install.';

    const result = await dialog.showMessageBox(mainWindow, {
      type: 'info',
      buttons: ['Restart and install', 'Later'],
      defaultId: 0,
      cancelId: 1,
      title: 'Ledger update ready',
      message: 'An update has been downloaded.',
      detail
    });

    if (result.response === 0) {
      setImmediate(() => autoUpdater.quitAndInstall());
    }
  });

  setTimeout(() => {
    autoUpdater.checkForUpdatesAndNotify().catch((error) => {
      log.error('Update check failed', error);
    });
  }, 2500);
}

app.whenReady().then(() => {
  app.setName(APP_TITLE);
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
