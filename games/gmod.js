const steamGame = require('./../modules/steamGame');

const sboxMax = 5000;
const appId = 4020;

const config = {
    files: {
        "server\.cfg": {
            fields: {
                hostname: ["Gmod Server", String, 0, 64],
                decalfrequency: [10, Number, 0, 10],
                rcon: {
                    password: ["changeme", String, 0, 64]
                },
                sv: {
                    password: ["", String, 0, 64],
                    noclipaccelerate: [5, Number, 0, 10],
                    alltalk: [1, Number, 0, 1],
                    minrate: [0, Number, 0, 20000],
                    maxrate: [20000, Number, 0, 20000],
                    maxupdaterate: [66, Number, 0, 144],
                    minupdaterate: [10, Number, 0, 144],
                    lan: [0, Number, 0, 1,],
                    region: [255, Number, 0, 255]
                },
                sbox: {
                    maxprops: [150, Number, 0, sboxMax],
                    maxragdolls: [6, Number, 0, sboxMax],
                    maxballoons: [15, Number, 0, sboxMax],
                    maxeffects: [1, Number, 0, sboxMax],
                    maxdynamite: [2, Number, 0, sboxMax],
                    maxlamps: [3, Number, 0, sboxMax],
                    maxthrusters: [30, Number, 0, sboxMax],
                    maxwheels: [20, Number, 0, sboxMax],
                    maxnpcs: [0, Number, 0, sboxMax],
                    maxhoverballs: [10, Number, 0, sboxMax],
                    maxvehicles: [10, Number, 0, sboxMax],
                    maxbuttons: [15, Number, 0, sboxMax],
                    plpldamage: [0, Number, 0, 1],
                    godmode: [0, Number, 0, 1],
                    noclip: [1, Number, 0, 1]
                },
                net: {
                    maxfilesize: [60, Number, 0, 1024]
                }
            },
            file: `
            hostname                "<%- hostname %>"
            rcon_password           "<%- rcon.password %>" 
            sv_password             "<%- sv.password %>"
            "sbox_maxprops"         "<%- sbox.maxprops %>"
            "sbox_maxragdolls"      "<%- sbox.maxragdolls %>"
            "sbox_maxballoons"      "<%- sbox.maxballoons %>"
            "sbox_maxeffects"       "<%- sbox.maxeffects %>"
            "sbox_maxdynamite"      "<%- sbox.maxdynamite %>"
            "sbox_maxlamps"         "<%- sbox.maxlamps %>"
            "sbox_maxthrusters"     "<%- sbox.maxthrusters %>"
            "sbox_maxwheels"        "<%- sbox.maxwheels %>"
            "sbox_maxnpcs"          "<%- sbox.maxnpcs %>"
            "sbox_maxhoverballs"    "<%- sbox.maxhoverballs %>"
            "sbox_maxvehicles"      "<%- sbox.maxvehicles %>"
            "sbox_maxbuttons"       "<%- sbox.maxbuttons %>"
            
            "sbox_plpldamage"       "<%- sbox.plpldamage %>"
            "sbox_godmode"          "<%- sbox.godmode %>"
            "sbox_noclip"           "<%- sbox.noclip %>"
            
            "sv_noclipaccelerate"   "<%- sv.noclipaccelerate %>"
            "sv_alltalk"            "<%- sv.alltalk %>"
            
            "sv_minrate"            "<%- sv.minrate %>"
            "sv_maxrate"            "<%- sv.maxrate %>"
            "decalfrequency"        "<%- decalfrequency %>" 
            "sv_maxupdaterate"      "<%- sv.maxupdaterate %>"
            "sv_minupdaterate"      "<%- sv.minupdaterate %>"
            "net_maxfilesize"       "<%- net.maxfilesize %>"
            
            "sv_lan"                "<%- sv.lan %>"
            "sv_region"             "<%- sv.region %>"           
            
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