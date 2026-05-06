npm i 
sudo chmod 4755 node_modules/electron/dist/chrome-sandbox
sudo chown root:root node_modules/electron/dist/chrome-sandbox
npm start
npm run build 
npm run build -- --win --x64