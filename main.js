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

    //let server = new games.ark("ark", {fields:{sessionName: "SOOOS Test Server"}});
    //await server.install();
    //await server.start();

    //let server = new games.minecraft("mc", {fields:{version: '1.8.9'}, files:{"server\.properties":{motd:"lululululu"}}});
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