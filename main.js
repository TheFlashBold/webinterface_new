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

    //let gmodServer = new games.gmod("test");
    //await gmodServer.install();
    //await gmodServer.start();

})();

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});