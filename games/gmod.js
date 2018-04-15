const steamGame = require('./../modules/steamGame');

const sboxMax = 5000;
const appId = 4020;

const config = {
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
            file: `
            hostname                "<%- hostname %>"
            rcon_password           "<%- rcon_password %>" 
            sv_password             "<%- sv_password %>"
            "sbox_maxprops"         "<%- sbox_maxprops %>"
            "sbox_maxragdolls"      "<%- sbox_maxragdolls %>"
            "sbox_maxballoons"      "<%- sbox_maxballoons %>"
            "sbox_maxeffects"       "<%- sbox_maxeffects %>"
            "sbox_maxdynamite"      "<%- sbox_maxdynamite %>"
            "sbox_maxlamps"         "<%- sbox_maxlamps %>"
            "sbox_maxthrusters"     "<%- sbox_maxthrusters %>"
            "sbox_maxwheels"        "<%- sbox_maxwheels %>"
            "sbox_maxnpcs"          "<%- sbox_maxnpcs %>"
            "sbox_maxhoverballs"    "<%- sbox_maxhoverballs %>"
            "sbox_maxvehicles"      "<%- sbox_maxvehicles %>"
            "sbox_maxbuttons"       "<%- sbox_maxbuttons %>"
            
            "sbox_plpldamage"       "<%- sbox_plpldamage %>"
            "sbox_godmode"          "<%- sbox_godmode %>"
            "sbox_noclip"           "<%- sbox_noclip %>"
            
            "sv_noclipaccelerate"   "<%- sv_noclipaccelerate %>"
            "sv_alltalk"            "<%- sv_alltalk %>"
            
            "sv_minrate"            "<%- sv_minrate %>"
            "sv_maxrate"            "<%- sv_maxrate %>"
            "decalfrequency"        "<%- decalfrequency %>" 
            "sv_maxupdaterate"      "<%- sv_maxupdaterate %>"
            "sv_minupdaterate"      "<%- sv_minupdaterate %>"
            "net_maxfilesize"       "<%- net_maxfilesize %>"
            
            "sv_lan"                "<%- sv_lan %>"
            "sv_region"             "<%- sv_region %>"           
            
            exec banned_user.cfg
        `
        }
    }
};

module.exports = class GmodServer extends steamGame {

    constructor(id) {
        super(id, appId, config);
    }

    async start() {
        await super.start(["srcds.exe", "-console", "-game \"garrysmod\"", "+exec \"server.cfg\" +gamemode sandbox +map gm_construct +maxplayers 16"]);
    }

};