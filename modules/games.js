const fs = require('fs');
const path = require('path');
const logger = global.logger;

module.exports = (steamApi) => {
    let games = {};

    logger.info(`Loading games:`);

    fs.readdirSync(path.join(global.config.path, 'games')).forEach(game => {
        logger.info(`- ${game.replace('.js', '')}`);
        games[game.replace(".js", "")] = require(path.resolve(global.config.path, 'games', game));
    });

    global.games = games;

    return games;
};