const Promise = require('bluebird');
const path = require('path');

global.config = require(path.resolve(process.cwd(), 'config.json'));
global.config.path = path.resolve('./');

const logger = require('./modules/logger');
const db = require('./modules/db');
const www = require('./modules/www');
const steamApi = require('./modules/steamApi');
const Games = require('./modules/games');

(async () => {
    let app = www();

    await steamApi.init();
    let games = Games(steamApi);

    //let server = await Game.getFromId("5adb362aea2b6479d685b108");
    //await server.install();
    //await server.start();

    //let server = new games.minecraft("5adb0229ea2b6479d685a582", {fields:{version: '1.8.9'}, files:{"server\.properties":{motd:"lululululu"}}});
    //await server.loadSettings();
    //await server.install();
    //await server.start();

    //let server = new games.gmod("test", {fields:{}});
    //await server.install();
    //await server.start();
})();

process.on('unhandledRejection', (err) => {
    logger.error(err);
    process.exit(1);
});