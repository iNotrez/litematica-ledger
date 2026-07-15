const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ledgerDesktop', {
  loadBundledTexturePack: () => ipcRenderer.invoke('ledger:load-bundled-texture-pack')
});
