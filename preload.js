const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ledgerDesktop', {
  detectMinecraftJar: () => ipcRenderer.invoke('ledger:detect-minecraft-jar')
});
