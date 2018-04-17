const Promise = require('bluebird');
const path = require('path');

global.config = require(path.resolve(process.cwd(), 'config.json'));
global.config.path = path.resolve('./');

const logger = require('./modules/logger');
const www = require('./modules/www');
const steamApi = require('./modules/steamApi');
const Games = require('./modules/games');

(async () => {
    let app = www();

    await steamApi.init();
    let games = Games(steamApi);

    //let minecraftServer = new games.minecraft("mc", {version: '1.8.9'});
    //await minecraftServer.install();
    //await minecraftServer.start();

    //let gmodServer = new games.gmod("test", {});
    //await gmodServer.install();
    //await gmodServer.start();
})();

process.on('unhandledRejection', (err) => {
    logger.error(err);
    process.exit(1);
});