const {app, BrowserWindow} = require('electron')
const WebSocket = require('./socket');

function indexHtml () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: true
  })
  mainWindow.loadFile('../ws-client/index.html');
}

function aboutHtml (){
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: true
  })
  mainWindow.loadFile('../ws-client/about.html');
}

app.on('ready', indexHtml);
app.on('ready', aboutHtml);
WebSocket();
