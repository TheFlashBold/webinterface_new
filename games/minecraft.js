const Game = require('./../modules/game');

const versions = {
    '1.12.2': 'https://launcher.mojang.com/mc/game/1.12.2/server/886945bfb2b978778c3a0288fd7fab09d315b25f/server.jar',
    '1.12.1': 'https://launcher.mojang.com/mc/game/1.12.1/server/561c7b2d54bae80cc06b05d950633a9ac95da816/server.jar',
    '1.12': 'https://launcher.mojang.com/mc/game/1.12/server/8494e844e911ea0d63878f64da9dcc21f53a3463/server.jar',
    '1.11.2': 'https://launcher.mojang.com/mc/game/1.11.2/server/f00c294a1576e03fddcac777c3cf4c7d404c4ba4/server.jar',
    '1.11': 'https://launcher.mojang.com/mc/game/1.11/server/48820c84cb1ed502cb5b2fe23b8153d5e4fa61c0/server.jar',
    '1.10': 'https://launcher.mojang.com/mc/game/1.10/server/a96617ffdf5dabbb718ab11a9a68e50545fc5bee/server.jar',
    '1.9.4': 'https://launcher.mojang.com/mc/game/1.9.4/server/edbb7b1758af33d365bf835eb9d13de005b1e274/server.jar',
    '1.9': 'https://launcher.mojang.com/mc/game/1.9/server/b4d449cf2918e0f3bd8aa18954b916a4d1880f0d/server.jar',
    '1.8.9': 'https://launcher.mojang.com/mc/game/1.8.9/server/b58b2ceb36e01bcd8dbf49c8fb66c55a9f0676cd/server.jar',
    '1.8': 'https://launcher.mojang.com/mc/game/1.8/server/a028f00e678ee5c6aef0e29656dca091b5df11c7/server.jar'
};

const config = {
    "server\.properties": {
        fields: {
            motd: ["", String, 0, 64],
            maxPlayers: [20, Number, 0, 100],
            gamemode: [0, Number, 0, 3],
            viewDistance: [0, Number, 1, 32],
            opPermissionLevel: [4, Number, 0, 6],
            allowNether: [true, Boolean],
            levelName: ["world", String, 0, 64],
            enableQuery: [false, Boolean],
            allowFlight: [false, Boolean],
            preventProxyConnections: [false, Boolean],
            serverPort: [25565, Number, 0, 65535],
            maxWorldSize: [29999984, Number, 0, 29999984],
            levelType: ["DEFAULT", "Enumerator", ["DEFAULT", "FLAT"]],
            enableRcon: [false, Boolean],
            levelSeed: ["", String, 0, 64],
            forceGamemode: [false, Boolean],
            serverIp: ["", String, 0, 16],
            networkCompressionThreshold: [256, Number, 0, 1024],
            maxBuildHeight: [256, Number, 0, 256],
            spawnNpcs: [true, Boolean],
            whiteList: [false, Boolean],
            spawnAnimals: [true, Boolean],
            hardcore: [false, Boolean],
            snooperEnabled: [true, Boolean],
            onlineMode: [true, Boolean],
            pvp: [true, Boolean],
            difficulty: [1, Number, 0, 3],
            enableCommandBlock: [false, Boolean],
            maxTickTime: [60000, Number, 0, 60000],
            spawnMonsters: [true, Boolean],
            generateStructures: [true, Boolean],
            broadcastConsoleToOps: [true, Boolean],
            playerIdleTimeout: [0, Number, 0, 36000],
            resourcePack: ["", String, 0, 128],
            generatorSettings: ["", String, 0, 128],
            resourcePackSha: ["", String, 0, 128]
        },
        file: `
            generator-settings=<%- generatorSettings %>
            op-permission-level=<%- opPermissionLevel %>
            allow-nether=<%- allowNether %>
            level-name=<%- levelName %>
            enable-query=<%- enableQuery %>
            allow-flight=<%- allowFlight %>
            prevent-proxy-connections=<%- preventProxyConnections %>
            server-port=<%- serverPort %>
            max-world-size=<%- maxWorldSize %>
            level-type=<%- levelType %>
            enable-rcon=<%- enableRcon %>
            level-seed=<%- levelSeed %>
            force-gamemode=<%- forceGamemode %>
            server-ip=<%- serverIp %>
            network-compression-threshold=<%- networkCompressionThreshold %>
            max-build-height=<%- maxBuildHeight %>
            spawn-npcs=<%- spawnNpcs %>
            white-list=<%- whiteList %>
            spawn-animals=<%- spawnAnimals %>
            hardcore=<%- hardcore %>
            snooper-enabled=<%- snooperEnabled %>
            resource-pack-sha1=<%- resourcePackSha %>
            online-mode=<%- onlineMode %>
            resource-pack=<%- resourcePack %>
            pvp=<%- pvp %>
            difficulty=<%- difficulty %>
            enable-command-block=<%- enableCommandBlock %>
            gamemode=<%- gamemode %>
            player-idle-timeout=<%- playerIdleTimeout %>
            max-players=<%- maxPlayers %>
            max-tick-time=<%- maxTickTime %>
            spawn-monsters=<%- spawnMonsters %>
            view-distance=<%- viewDistance %>
            generate-structures=<%- generateStructures %>
            motd=<%- motd %>
            broadcast-console-to-ops=<%- broadcastConsoleToOps %>
        `
    }
};

module.exports = class GmodServer extends Game {

    constructor(id){
        super(id, appId, config);
    }

    async start(){
        await super.start(["srcds.exe", "-console", "-game \"garrysmod\"", "+exec \"server.cfg\" +gamemode sandbox +map gm_construct +maxplayers 16"]);
    }

};