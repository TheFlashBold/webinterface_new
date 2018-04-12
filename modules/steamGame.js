const steamApi = require('./steamApi');
const Game = require('./game');

module.exports = class SteamGame extends Game {

    constructor(id, appID, config){
        super(id, config);
        this.appID = appID;
    }

    async install(){
        await super.install();
        await steamApi.install(this.appID, this.serverID, this.onUpdate, this.onExit);
    }

    async update(){
        await super.update();
    }

};