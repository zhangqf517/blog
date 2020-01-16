# electron-builder打包教程







1.  源程序执行 npm run build 进行webpack打包到dist目录下

2. 进入dist目录执行  npm init

3. 将以下代码插入到package.json

   ```javascript
   {
       "name": "zhgw-quick-start",
       "version": "1.0.0",
       "main": "main.js",
       "build": {
           "win": {
               "target": [
                   "nsis",
                   "zip"
               ]
           }
       },
       "scripts": {
           "dist": "electron-builder --win --x64"
       },
       "devDependencies": {
           "electron": "^6.0.9"
       }
   }
   ```

4. 在dist下新建 main.js

5. 将以下代码插入到main.js

   ```javascript
   // Modules to control application life and create native browser window
   const {app, BrowserWindow} = require('electron')
   const path = require('path')
   
   // Keep a global reference of the window object, if you don't, the window will
   // be closed automatically when the JavaScript object is garbage collected.
   let mainWindow
   
   function createWindow () {
     // Create the browser window.
     mainWindow = new BrowserWindow({
       width: 800,
       height: 600,
       webPreferences: {
         preload: path.join(__dirname, 'preload.js')
       }
     })
   
     // and load the index.html of the app.
     mainWindow.loadFile('./index.html')
   
     // Open the DevTools.
     // mainWindow.webContents.openDevTools()
   
     // Emitted when the window is closed.
     mainWindow.on('closed', function () {
       // Dereference the window object, usually you would store windows
       // in an array if your app supports multi windows, this is the time
       // when you should delete the corresponding element.
       mainWindow = null
     })
   }
   
   // This method will be called when Electron has finished
   // initialization and is ready to create browser windows.
   // Some APIs can only be used after this event occurs.
   app.on('ready', createWindow)
   
   // Quit when all windows are closed.
   app.on('window-all-closed', function () {
     // On macOS it is common for applications and their menu bar
     // to stay active until the user quits explicitly with Cmd + Q
     if (process.platform !== 'darwin') app.quit()
   })
   
   app.on('activate', function () {
     // On macOS it's common to re-create a window in the app when the
     // dock icon is clicked and there are no other windows open.
     if (mainWindow === null) createWindow()
   })
   
   // In this file you can include the rest of your app's specific main process
   // code. You can also put them in separate files and require them here.
   ```

6. 执行 npm run dist 打包完成