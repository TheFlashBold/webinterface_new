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

    if(global.config.steamcmd.code){
        config.steamGuardCode = global.config.steamcmd.code;
    }

    config.binDir = path.resolve(global.config.steamcmd.path);
    config.installDir = path.resolve(global.config.server.path);
}

const steamcmd = new SteamCmd(config);

function mapNumber(value, in_min, in_max, out_min, out_max) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

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

                // exclude steamcmd update from progress!!!!
                console.log(data);

                if (data.indexOf("Update state") !== -1) {
                    let percentData = data.toString().match(/(\d{1,2}\.\d{1,2})/);
                    if (percentData != null && percentData.length && percentData.length > 0) {
                        if (onUpdate && onUpdate instanceof Function) {
                            let state = "";
                            let progress = parseFloat(percentData[1]);
                            if(data.indexOf("reconfiguring") !== -1){
                                state = "reconfiguring";
                                progress = mapNumber(progress, 0, 100, 0, 1);
                            } else if(data.indexOf("preallocating") !== -1){
                                state = "preallocating";
                                progress = mapNumber(progress, 0, 100, 1, 2);
                            } else if(data.indexOf("downloading") !== -1){
                                state = "downloading";
                                progress = mapNumber(progress, 0, 100, 2, 90);
                            } else if(data.indexOf("committing") !== -1){
                                state = "committing";
                                progress = mapNumber(progress, 0, 100, 90, 100);
                            }
                            onUpdate(state, progress.toFixed(2));
                        }
                    }
                } else if(data.indexOf("already up to date") !== -1) {
                    if (onUpdate && onUpdate instanceof Function) {
                        onUpdate("already up to date", 100);
                    }
                    return resolve();
                } else if (data.indexOf("Success!") !== -1){
                    if (onUpdate && onUpdate instanceof Function) {
                        onUpdate("done", 100);
                    }
                }
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