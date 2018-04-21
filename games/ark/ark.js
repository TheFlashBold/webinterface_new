const steamGame = require('./../../modules/steamGame');
const os = require('os');
const fs = require('fs');
const path = require('path');

const appId = 376030;

const config = {
    fields: {
        sessionName: ["Ark Server", "Session Name", "String", 0, 64],
        map: ["TheIsland", "Map", "String", 0, 64],
        serverPassword: ["", "Server Password", "String", 0, 64],
        serverAdminPassword: ["", "Admin Password", "String", 0, 64],
        port: [7777, "Sever Port", "Number", 0, 65535],
        queryPort: [27015, "Query Port", "Number", 0, 65535],
        maxPlayers: [20, "Max Players", "Number", 1, 100]
    },
    files: {
        "GameUserSettings\.ini":{
            fields:{
                messageOfTheDay: ["", "Message of the day", "String", 0, 128],
                allowThirdPersonPlayer: [false, "Allow thirdperson player", "Boolean"],
                AllowCaveBuildingPvE: [false, "AllowCaveBuildingPvE", "Boolean"],
                alwaysNotifyPlayerJoined: [false, "alwaysNotifyPlayerJoined", "Boolean"],
                alwaysNotifyPlayerLeft: [false, "alwaysNotifyPlayerLeft", "Boolean"],
                bAllowFlyerCarryPvE: [false, "bAllowFlyerCarryPvE", "Boolean"],
                bDisableStructureDecayPvE: [false, "bDisableStructureDecayPvE", "Boolean"],
                globalVoiceChat: [false, "globalVoiceChat", "Boolean"]
            },
            file: fs.readFileSync(path.resolve(__dirname, 'config', 'GameUserConfig.ini.ejs'), 'UTF-8'),
            fullpath: ['ShooterGame', 'Saved', 'Config', os.type() === 'Windows_NT'?'WindowsServer':'LinuxServer', 'GameUserSettings.ini']
        }
    }
};

module.exports = class GmodServer extends steamGame {

    constructor(id, settings) {
        super(id, appId, settings);
        this.config = config;
    }

    async start() {
        await super.start([
            "ShooterGameServer.exe",
            this.getConfigKey('map') +
            "?listen?SessionName=\"" + this.getConfigKey('sessionName') + "\"" +
            "?ServerPassword=" + this.getConfigKey('serverPassword') +
            "?ServerAdminPassword=" + this.getConfigKey('serverAdminPassword') +
            "?Port=" + this.getConfigKey('port') +
            "?QueryPort=" + this.getConfigKey('queryPort') +
            "?MaxPlayers=" + this.getConfigKey('maxPlayers')
        ], ['ShooterGame', 'Binaries', 'Win64']);
    }

};