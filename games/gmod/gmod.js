const steamGame = require('./../../modules/steamGame');
const path = require('path');
const fs = require('fs-extra');

const sboxMax = 5000;
const appId = 4020;

const config = {
    fields: {
        map: ["gm_construct", "Map", "String", 0, 64],
        maxPlayers: [16, "Max Players", "Number", 1, 100],
        authkey: ["", "Steam API Key", "String", 0, 128],
        workshop_collection: ["", "Workshop collection", "String", 0, 128]
    },
    files: {
        "server\.cfg": {
            fields: {
                hostname: ["Gmod Server", "Hostname", "String", 0, 64],
                decalfrequency: [10, "Decalfrequency", "Number", 0, 10],
                rcon_password: ["changeme", "Rcon password", "String", 0, 64],
                sv_password: ["", "Password", "String", 0, 64],
                sv_noclipaccelerate: [5, "Noclip speed", "Number", 0, 10],
                sv_alltalk: [1, "Alltalk", "Number", 0, 1],
                sv_minrate: [0, "Min rate", "Number", 0, 20000],
                sv_maxrate: [20000, "Max rate", "Number", 0, 20000],
                sv_minupdaterate: [10, "Min update rate", "Number", 0, 144],
                sv_maxupdaterate: [66, "Max update rate", "Number", 0, 144],
                sv_lan: [0, "Lan", "Number", 0, 1,],
                sv_region: [255, "Region", "Number", 0, 255],
                sbox_maxprops: [150, "Max props", "Number", 0, sboxMax],
                sbox_maxragdolls: [6, "Max ragdolls", "Number", 0, sboxMax],
                sbox_maxballoons: [15, "Max balloons", "Number", 0, sboxMax],
                sbox_maxeffects: [1, "Max effects", "Number", 0, sboxMax],
                sbox_maxdynamite: [2, "Max dynamite", "Number", 0, sboxMax],
                sbox_maxlamps: [3, "Max lamps", "Number", 0, sboxMax],
                sbox_maxthrusters: [30, "Max thrusters", "Number", 0, sboxMax],
                sbox_maxwheels: [20, "Max wheels", "Number", 0, sboxMax],
                sbox_maxnpcs: [0, "Max npcs", "Number", 0, sboxMax],
                sbox_maxhoverballs: [10, "Max hoverballs", "Number", 0, sboxMax],
                sbox_maxvehicles: [10, "Max vehicles", "Number", 0, sboxMax],
                sbox_maxbuttons: [15, "Max buttons", "Number", 0, sboxMax],
                sbox_plpldamage: [0, "plpldamage", "Number", 0, 1],
                sbox_godmode: [0, "Godmode", "Number", 0, 1],
                sbox_noclip: [1, "Noclip", "Number", 0, 1],
                net_maxfilesize: [60, "Max file size", "Number", 0, 1024]
            },
            file: fs.readFileSync(path.resolve(__dirname, 'config', 'server.cfg.ejs'), 'UTF-8')
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
            "./srcds_linux",
            "-console",
            "-game \"garrysmod\"",
            "-authkey " + this.getConfigKey('authkey'),
            "+exec \"server.cfg\" " +
            "+gamemode sandbox " +
            "+map " + this.getConfigKey('map') + " " +
            "+maxplayers " + this.getConfigKey('maxPlayers') + " " +
            "+host_workshop_collection " + this.getConfigKey('workshop_collection')
        ]);
    }

};