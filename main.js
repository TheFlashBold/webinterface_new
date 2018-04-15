const Promise = require('bluebird');
const path = require('path');

global.config = require('./config');
global.config.path = path.resolve('./');

const www = require('./modules/www');
const steamApi = require('./modules/steamApi');
const Games = require('./modules/games');

(async () => {
    let app = www();

    await steamApi.init();
    let games = Games(steamApi);

    let minecraftServer = new games.minecraft("mc");
    //await minecraftServer.install({version: '1.12.2'});
    //await minecraftServer.start();

    //let gmodServer = new games.gmod("test");
    //await gmodServer.install();
    //await gmodServer.start();
})();

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});