const https = require('https');
const fs = require('fs');
const Promise = require('bluebird');
const logger = global.logger;

async function download(url, dest) {
    return new Promise((resolve, reject) => {
        logger.info(`Downloading ${url} to ${dest}.`);
        let file = fs.createWriteStream(dest);
        let request = https.get(url, function(response) {
            response.pipe(file);
            file.on('finish', function() {
                file.close();
                logger.info(`Download ${url} done.`);
                return resolve();
            });
        }).on('error', function(err) {
            logger.error(`Error downloading ${url}.`);
            fs.unlink(dest);
            return reject(err);
        });
    });
}

module.exports = download;