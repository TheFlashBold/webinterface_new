const steamApi = require('./steamApi');
const Game = require('./game');

module.exports = class SteamGame extends Game {

    constructor(id, appID, settings){
        super(id, settings);
        this.appID = appID;
    }

    async install(){
        await super.install();
        await steamApi.install(this.appID, this.serverID, (state, progress) => {this.onUpdate(state, progress)});
    }

    async update(){
        await this.install();
    }

};