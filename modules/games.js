const fs = require('fs');
const path = require('path');

module.exports = (steamApi) => {
    let games = {};

    fs.readdirSync(path.join(global.config.path, 'games')).forEach(game => {
        games[game.replace(".js", "")] = require(path.resolve(global.config.path, 'games', game));
    });

    global.games = games;

    return games;
};