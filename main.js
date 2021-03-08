const { app, BrowserWindow } = require("electron")
const path = require("path")
const url = require("url")
const isDev = require("electron-is-dev")


if (require("electron-squirrel-startup")) {
    app.quit()
}

function createWindow() {
    console.log(`file://${path.join(__dirname, "./build/index.html")}`);
    const win = new BrowserWindow({
        width: 800,
        height: 700,
        webPreferences: {
            nodeIntegration: true 
        }
    })
    win.loadURL(
        isDev ? "http://localhost:3000" :  `file://${__dirname}/build/index.html`
    )

    if (isDev) {
        win.webContents.openDevTools({ mode: "detach" })
    }
}

app.whenReady().then(createWindow)

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow() 
    }
})