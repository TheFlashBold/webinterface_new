const steamGame = require('./../../modules/steamGame');

const appId = 376030;

const config = {
    fields: {
        sessionName: ["Ark Server", "Session Name", "String", 0, 64],
        serverPassword: ["", "Server Password", "String", 0, 64],
        serverAdminPassword: ["", "Admin Password", "String", 0, 64],
        port: [7777, "Sever Port", "Number", 0, 65535],
        queryPort: [27015, "Query Port", "Number", 0, 65535],
        maxPlayers: [20, "Max Players", "Number", 1, 100]
    },
    files: {}
};

module.exports = class GmodServer extends steamGame {

    constructor(id, settings) {
        super(id, appId, settings);
        this.config = config;
    }

    async start() {
        await super.start([
            "ShooterGameServer.exe",
            "TheIsland?listen?SessionName=" + this.getConfigKey('sessionName') +
            "?ServerPassword=" + this.getConfigKey('serverPassword') +
            "?ServerAdminPassword=" + this.getConfigKey('serverAdminPassword') +
            "?Port=" + this.getConfigKey('port') +
            "?QueryPort=" + this.getConfigKey('queryPort') +
            "?MaxPlayers=" + this.getConfigKey('maxPlayers')
        ], ['ShooterGame', 'Binaries', 'Win64']);
    }

};