let timeStamp = () => '[' + (new Date()).toLocaleTimeString() + ']';
const path = require('path');
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

module.exports = logger;