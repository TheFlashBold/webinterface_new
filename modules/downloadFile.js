const https = require('https');
const fs = require('fs');
const Promise = require('bluebird');

async function download(url, dest) {
    return new Promise((resolve, reject) => {
        let file = fs.createWriteStream(dest);
        let request = https.get(url, function(response) {
            response.pipe(file);
            file.on('finish', function() {
                file.close();
                return resolve();
            });
        }).on('error', function(err) {
            fs.unlink(dest);
            return reject(err);
        });
    });
}

module.exports = download;