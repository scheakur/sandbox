var app = require('app');
var BrowserWindow = require('browser-window');
var Menu = require('menu');

var menu = Menu.buildFromTemplate([{
  label: 'ElectronHello',
  submenu: [
    {
      label: 'About Electron Hello',
      selector: 'orderFrontStandardAboutPanel:'
    },
  ],
}]);

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});



function file(relPath) {
  return 'file://' + __dirname + relPath;
}


app.on('ready', function() {

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
  });

  mainWindow.loadUrl(file('/main.html'));

  mainWindow.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  Menu.setApplicationMenu(menu);
});

