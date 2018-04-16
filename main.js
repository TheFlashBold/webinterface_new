const Promise = require('bluebird');
const path = require('path');

global.config = require(path.resolve(process.cwd(), 'config.json'));
global.config.path = path.resolve('./');

let timeStamp = () => '[' + (new Date()).toLocaleTimeString() + ']';
const winston = require('winston');
const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            timestamp: timeStamp,
            colorize: true
        }),
        new (winston.transports.File)({
            filename: path.resolve(global.config.path, 'app.log'),
            timestamp: timeStamp,
            level: 'debug',
            json: false
        })
    ]
});

global.logger = logger;

const www = require('./modules/www');
const steamApi = require('./modules/steamApi');
const Games = require('./modules/games');

(async () => {
    let app = www();

    await steamApi.init();
    let games = Games(steamApi);

    //let minecraftServer = new games.minecraft("mc");
    //await minecraftServer.install({version: '1.12.2'});
    //await minecraftServer.start();

    //let gmodServer = new games.gmod("test");
    //await gmodServer.install();
    //await gmodServer.start();
})();

process.on('unhandledRejection', (err) => {
    logger.error(err);
    process.exit(1);
});