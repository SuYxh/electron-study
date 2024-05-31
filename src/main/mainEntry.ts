import { app, BrowserWindow } from "electron";
import { CustomScheme } from "./CustomScheme";
import { CommonWindowEvent } from "./CommonWindowEvent";
import { Updater } from "./Updater";

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";

app.on("browser-window-created", (e, win) => {
  CommonWindowEvent.regWinEvent(win);
});

let mainWindow: BrowserWindow;

app.whenReady().then(() => {
  let config = {
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      contextIsolation: false,
      webviewTag: true,
      spellcheck: false,
      disableHtmlFullscreenWindowResize: true,
    },
  };
  mainWindow = new BrowserWindow(config);

  if (process.argv[2]) {
    mainWindow.webContents.openDevTools({ mode: "undocked" });
    mainWindow.loadURL(process.argv[2]);
  } else {
    CustomScheme.registerScheme();
    mainWindow.loadURL(`app://index.html`);
    Updater.check();
  }

  CommonWindowEvent.listen();
  // CommonWindowEvent.regWinEvent(mainWindow);
});
