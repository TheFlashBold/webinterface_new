const Game = require('./../../modules/game');
const downloadFile = require('./../../modules/downloadFile');
const path = require('path');
const serverUtility = require('./../../modules/serverUtility');
const fs = require('fs-extra');

const versions = {
    '1.12.2': 'https://launcher.mojang.com/mc/game/1.12.2/server/886945bfb2b978778c3a0288fd7fab09d315b25f/server.jar',
    '1.12.1': 'https://launcher.mojang.com/mc/game/1.12.1/server/561c7b2d54bae80cc06b05d950633a9ac95da816/server.jar',
    '1.12': 'https://launcher.mojang.com/mc/game/1.12/server/8494e844e911ea0d63878f64da9dcc21f53a3463/server.jar',
    '1.11.2': 'https://launcher.mojang.com/mc/game/1.11.2/server/f00c294a1576e03fddcac777c3cf4c7d404c4ba4/server.jar',
    '1.11.1': 'https://launcher.mojang.com/mc/game/1.11.1/server/1f97bd101e508d7b52b3d6a7879223b000b5eba0/server.jar',
    '1.11': 'https://launcher.mojang.com/mc/game/1.11/server/48820c84cb1ed502cb5b2fe23b8153d5e4fa61c0/server.jar',
    '1.10.2': 'https://launcher.mojang.com/mc/game/1.10.2/server/3d501b23df53c548254f5e3f66492d178a48db63/server.jar',
    '1.10.1': 'https://launcher.mojang.com/mc/game/1.10.1/server/cb4c6f9f51a845b09a8861cdbe0eea3ff6996dee/server.jar',
    '1.10': 'https://launcher.mojang.com/mc/game/1.10/server/a96617ffdf5dabbb718ab11a9a68e50545fc5bee/server.jar',
    '1.9.4': 'https://launcher.mojang.com/mc/game/1.9.4/server/edbb7b1758af33d365bf835eb9d13de005b1e274/server.jar',
    '1.9.3': 'https://launcher.mojang.com/mc/game/1.9.3/server/8e897b6b6d784f745332644f4d104f7a6e737ccf/server.jar',
    '1.9.2': 'https://launcher.mojang.com/mc/game/1.9.2/server/2b95cc7b136017e064c46d04a5825fe4cfa1be30/server.jar',
    '1.9.1': 'https://launcher.mojang.com/mc/game/1.9.1/server/bf95d9118d9b4b827f524c878efd275125b56181/server.jar',
    '1.9': 'https://launcher.mojang.com/mc/game/1.9/server/b4d449cf2918e0f3bd8aa18954b916a4d1880f0d/server.jar',
    '1.8.9': 'https://launcher.mojang.com/mc/game/1.8.9/server/b58b2ceb36e01bcd8dbf49c8fb66c55a9f0676cd/server.jar',
    '1.8.8': 'https://launcher.mojang.com/mc/game/1.8.8/server/5fafba3f58c40dc51b5c3ca72a98f62dfdae1db7/server.jar',
    '1.8.7': 'https://launcher.mojang.com/mc/game/1.8.7/server/35c59e16d1f3b751cd20b76b9b8a19045de363a9/server.jar',
    '1.8.6': 'https://launcher.mojang.com/mc/game/1.8.6/server/2bd44b53198f143fb278f8bec3a505dad0beacd2/server.jar',
    '1.8.5': 'https://launcher.mojang.com/mc/game/1.8.5/server/ea6dd23658b167dbc0877015d1072cac21ab6eee/server.jar',
    '1.8.4': 'https://launcher.mojang.com/mc/game/1.8.4/server/dd4b5eba1c79500390e0b0f45162fa70d38f8a3d/server.jar',
    '1.8.3': 'https://launcher.mojang.com/mc/game/1.8.3/server/163ba351cb86f6390450bb2a67fafeb92b6c0f2f/server.jar',
    '1.8.2': 'https://launcher.mojang.com/mc/game/1.8.2/server/a37bdd5210137354ed1bfe3dac0a5b77fe08fe2e/server.jar',
    '1.8.1': 'https://launcher.mojang.com/mc/game/1.8.1/server/68bfb524888f7c0ab939025e07e5de08843dac0f/server.jar',
    '1.8': 'https://launcher.mojang.com/mc/game/1.8/server/a028f00e678ee5c6aef0e29656dca091b5df11c7/server.jar',
    '1.7.10': 'https://launcher.mojang.com/mc/game/1.7.10/server/952438ac4e01b4d115c5fc38f891710c4941df29/server.jar',
    '1.7.9': 'https://launcher.mojang.com/mc/game/1.7.9/server/4cec86a928ec171fdc0c6b40de2de102f21601b5/server.jar',
    '1.7.8': 'https://launcher.mojang.com/mc/game/1.7.8/server/c69ebfb84c2577661770371c4accdd5f87b8b21d/server.jar',
    '1.7.7': 'https://launcher.mojang.com/mc/game/1.7.7/server/a6ffc1624da980986c6cc12a1ddc79ab1b025c62/server.jar',
    '1.7.6': 'https://launcher.mojang.com/mc/game/1.7.6/server/41ea7757d4d7f74b95fc1ac20f919a8e521e910c/server.jar',
    '1.7.5': 'https://launcher.mojang.com/mc/game/1.7.5/server/e1d557b2e31ea881404e41b05ec15c810415e060/server.jar',
    '1.7.4': 'https://launcher.mojang.com/mc/game/1.7.4/server/61220311cef80aecc4cd8afecd5f18ca6b9461ff/server.jar',
    '1.7.3': 'https://launcher.mojang.com/mc/game/1.7.3/server/707857a7bc7bf54fe60d557cca71004c34aa07bb/server.jar',
    '1.7.2': 'https://launcher.mojang.com/mc/game/1.7.2/server/3716cac82982e7c2eb09f83028b555e9ea606002/server.jar',
    '1.6.4': 'https://launcher.mojang.com/mc/game/1.6.4/server/050f93c1f3fe9e2052398f7bd6aca10c63d64a87/server.jar'
};

const config = {
    fields: {
        version: [Object.keys(versions)[0], "Version", "Enumerator", Object.keys(versions)],
        ram: [1, "Ram (GB)", "Number", 1, 128],
    },
    files: {
        "server\.properties": {
            fields: {
                motd: ["", "Message of the day", "String", 0, 64],
                maxPlayers: [20, "Max players", "Number", 1, 2147483647],
                gamemode: [0, "Gamemode", "Number", 0, 3],
                viewDistance: [10, "View distance", "Number", 3, 15],
                opPermissionLevel: [4, "Op permission level", "Number", 1, 4],
                allowNether: [true, "Allow nether", "Boolean"],
                levelName: ["world", "Level name", "String", 0, 64],
                enableQuery: [false, "Enable query", "Boolean"],
                allowFlight: [false, "Allow flight", "Boolean"],
                preventProxyConnections: [false, "Prevent proxy connections", "Boolean"],
                serverPort: [25565, "Port", "Number", 1, 65534],
                maxWorldSize: [29999984, "Max world size", "Number", 0, 29999984],
                levelType: ["DEFAULT", "Level type", "Enumerator", ["DEFAULT", "FLAT", "LARGEBIOMES", "AMPLIFIED", "CUSTOMIZED"]],
                enableRcon: [false, "Rcon", "Boolean"],
                levelSeed: ["", "Seed", "String", 0, 64],
                forceGamemode: [false, "Force gamemode", "Boolean"],
                serverIp: ["", "Ip", "String", 0, 16],
                networkCompressionThreshold: [256, "Compression threshold", "Number", 0, 1024],
                maxBuildHeight: [256, "Max build height", "Number", 0, 256],
                spawnNpcs: [true, "Spawn NPCs", "Boolean"],
                whiteList: [false, "White list", "Boolean"],
                spawnAnimals: [true, "Spawn animals", "Boolean"],
                hardcore: [false, "Hardcore", "Boolean"],
                snooperEnabled: [true, "Snooper", "Boolean"],
                onlineMode: [true, "Online mode", "Boolean"],
                pvp: [true, "PvP", "Boolean"],
                difficulty: [1, "Difficulty", "Number", 0, 3],
                enableCommandBlock: [false, "Command block", "Boolean"],
                maxTickTime: [60000, "Max tick time", "Number", 0, 60000],
                spawnMonsters: [true, "Spawn monsters", "Boolean"],
                generateStructures: [true, "Generate structures", "Boolean"],
                broadcastConsoleToOps: [true, "Broadcast console to ops", "Boolean"],
                playerIdleTimeout: [0, "Player idle timeout", "Number", 0, 36000],
                resourcePack: ["", "Resource pack", "String", 0, 128],
                generatorSettings: ["", "Generator settings", "String", 0, 128],
                resourcePackSha: ["", "Resouce pack sha1", "String", 0, 128]
            },
            file: fs.readFileSync(path.resolve(__dirname, 'config', 'server.properties.ejs'), 'UTF-8')
        },
        "eula\.txt": {
            fields: {
                eula: [true, "Eula", "Boolean"]
            },
            file: fs.readFileSync(path.resolve(__dirname, 'config', 'eula.txt.ejs'), 'UTF-8')
        },
        "ops\.json": {
            fields: {
                ops: [[], "Ops", "Array", {uuid: ["", "UUID", "String", 0, 64], name: ["", "Name", "String", 0, 64], level: [0, "Level", "Number", 0, 10]}]
            },
            file: fs.readFileSync(path.resolve(__dirname, 'config', 'ops.json.ejs'), 'UTF-8')
        }
    }
};

module.exports = class MinecraftServer extends Game {

    constructor(id, settings) {
        super(id, settings);
        this.config = config;
    }

    async install() {
        await super.install();
        await downloadFile(versions[this.getConfigKey('version')], path.resolve(global.config.server.path, this.serverID, 'server.jar'))
    }

    async start() {
        await super.start(["java", "-server", "-d64", "-Xms" + this.getConfigKey('ram') + "G", "-Xmx" + this.getConfigKey('ram') +"G", "-jar server.jar", "nogui"]);
    }

    async stop(){
        await this.sendInput('/stop\n');
    }

};