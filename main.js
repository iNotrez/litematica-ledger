const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');
const fs = require('fs/promises');
const path = require('path');

const APP_TITLE = 'Ledger';
const INDEX_PATH = path.join(__dirname, 'index.html');
const PRELOAD_PATH = path.join(__dirname, 'preload.js');
const ICON_PATH = path.join(__dirname, 'build', 'icon.png');
const BUNDLED_TEXTURE_PACK_PATH = path.join(__dirname, 'vendor', 'programmerart', 'ProgrammerArt-ResourcePack.zip');

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

ipcMain.handle('ledger:load-bundled-texture-pack', async () => {
  try {
    const bytes = await fs.readFile(BUNDLED_TEXTURE_PACK_PATH);
    return {
      ok: true,
      fileName: path.basename(BUNDLED_TEXTURE_PACK_PATH),
      packName: 'ProgrammerArt',
      dataBase64: bytes.toString('base64')
    };
  } catch (error) {
    log.error('Bundled texture pack load failed', error);
    return {
      ok: false,
      message: (error && error.message) ? error.message : 'Could not load the bundled block textures.'
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
