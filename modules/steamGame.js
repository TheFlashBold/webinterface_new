const steamApi = require('./steamApi');
const Game = require('./game');

module.exports = class SteamGame extends Game {

    constructor(id, appID, config){
        super(id, config);
        this.appID = appID;
    }

    async install(config){
        await super.install(config);
        await steamApi.install(this.appID, this.serverID, this.onUpdate);
    }

    async update(){
        await this.install();
    }

};