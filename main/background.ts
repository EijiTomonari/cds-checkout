import { Key, keyboard } from "@nut-tree/nut-js";
import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("emmit-nf", async (event, arg) => {
  const grams = (parseFloat(arg as string) / 59.99).toString();
  const gramsString = grams.replace(".", ",");
  keyboard.config.autoDelayMs = 100;
  await keyboard.pressKey(Key.RightSuper, Key.Num3);
  await keyboard.releaseKey(Key.RightSuper, Key.Num3);
  await keyboard.type(Key.Insert);
  await keyboard.type(gramsString.slice(0, 7));
  await keyboard.type(Key.Enter);
  await keyboard.type(Key.Num3);
  await keyboard.type(Key.Enter);
  await new Promise((r) => setTimeout(r, 1000));
  await keyboard.type(Key.F12);
  await new Promise((r) => setTimeout(r, 5000));
  await keyboard.pressKey(Key.LeftAlt, Key.Tab);
  await keyboard.releaseKey(Key.LeftAlt, Key.Tab);
  event.sender.send("emmit-nf", "NF emmited");
});
