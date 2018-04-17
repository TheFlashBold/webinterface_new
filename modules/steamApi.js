const SteamCmd = require('steamcmd-interface');
const Promise = require('bluebird');
const path = require('path');
const logger = global.logger;

let config = {installDir: global.config.path};
if (global.config.steamcmd) {
    if (global.config.steamcmd.username && global.config.steamcmd.password) {
        config.username = global.config.steamcmd.username;
        config.password = global.config.steamcmd.password;
    }
    config.binDir = path.resolve(global.config.steamcmd.path);
    config.installDir = path.resolve(global.config.server.path);
}

const steamcmd = new SteamCmd(config);

module.exports = {
    init: async () => {
        logger.info(`Loggin in steam ${config.username ? config.username : 'Anonymously'}.`);
        await steamcmd.prep();
    },
    install: async (appId, serverId, onUpdate) => {
        return new Promise((resolve, reject) => {
            logger.info(`Installing ${appId} in ${serverId}.`);
            steamcmd.setOptions({installDir: path.resolve(global.config.server.path, serverId)});
            let runObj = steamcmd.updateApp(appId);
            runObj.outputStream.on('data', data => {
                if (data.indexOf("Update state") !== -1) {
                    let percentData = data.toString().match(/(\d{1,2}\.\d{1,2})/);
                    if (percentData != null && percentData.length && percentData.length > 0) {
                        if (onUpdate && onUpdate instanceof Function) {
                            onUpdate(parseFloat(percentData[1]));
                        }
                    }
                } else {
                    //console.log(data);
                }
                // exclude steamcmd update from progress!!!!
                console.log(data);
            });
            runObj.outputStream.on('close', exitCode => {
                if (exitCode === 126) {
                    console.error("steam error -- 32bit on 64bit system?");
                    process.exit(126);
                }
                return resolve();
            });
        });
    }
};