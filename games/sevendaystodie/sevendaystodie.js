const steamGame = require('./../../modules/steamGame');
const os = require('os');
const fs = require('fs');
const path = require('path');

const appId = 294420;

const config = {
    fields: {},
    files: {
        "serverconfig\.xml": {
            fields: {
                serverPort: [26900, "Server Port", "Number", 0, 65535],
                serverIsPublic: [true, "Server is public", "Boolean"],
                serverName: ["My Game Host", "Server Name", "String", 0, 64],
                serverPassword: ["", "Server Password", "String", 0, 64],
                serverMaxPlayerCount: [8, "Max Players", "Number", 1, 40],
                serverDescription: ["A 7 Days to Die server", "Server Description", "String", 0, 128],
                serverWebsiteURL: ["", "Server Website URL", "String", 0, 128],
                gameWorld: ["Navezgane", "Game World", "Enumerator", ["Navezgane", "Random Gen"]],
                gameName: ["My Game", "Game Name", "String", 0, 64],
                gameDifficulty: [2, "Game Difficulty", "Number", 0, 5],
                gameMode: ["GameModeSurvivalMP", "Game Mode", "Enumerator", ["GameModeSurvivalMP", "GameModeSurvivalSP"]],
                zombiesRun: ["default", "Zombies run", "Enumerator", ["default", "never", "always"]],
                buildCreate: [false, "Build Crate", "Boolean"],
                dayNightLength: [50, "Night length", "Number", 1, 200],
                dayLightLength: [18, "Light hours", "Number", 1, 24],
                friendlyFire: [false, "Friendly fire", "Boolean"],
                persistentPlayerProfiles: [true, "Persisten Player Profiles", "Boolean"],
                playerSafeZoneLevel: [5, "Player Safezone level", "Number", 0, 10],
                playerSafeZoneHours: [5, "Player Safezone time", "Number", 1, 24],
                controlPanelEnabled: [false, "Controlpanel enabled", "Boolean"],
                controlPanelPort: [8080, "Controlpanel Port", "Number", 0, 65355],
                controlPanelPassword: ["CHANGEME", "Controlpanel Password", "Number", 0, 64],
                telnetEnabled: [true, "Telnet enabled", "Boolean"],
                telnetPort: [8081, "Telnet port", "Boolean"],
                telnetPassword: ["CHANGEME", "Telnet password", "String", 0, 64],
                adminFileName: ["serveradmin.xml", "Admin File Name", "String", 0, 64],
                dropOnDeath: ["everything", "Drop on Death", "Enumerator", ["everything", "toolbelt only", "backpack only", "delete all"]],
                dropOnQuit: ["everything", "Drop on Quit", "Enumerator", ["nothing", "everything", "toolbelt only", "backpack only"]],
                enemySenseMemory: [60, "Enemy Sense Memory", "Number", 1, 120],
                enemySpawnMode: ["medium", "Enemy Spawn Mode", "Enumerator", ["disabeld", "very low", "low", "medium", "high", "very high"]],
                enemyDifficulty: ["normal", "Enemy Difficulty", "Enumerator", ["normal", "feral"]],
                blockDurabilityModifier: [100, "Block Durability Modifier", "Number", 1, 250],
                lootAbundance: [100, "Loot Abundance", "Number", 1, 250],
                lootRespawnDays: [7, "Loot Respawn Days", "Number", 1, 14],
                landClaimSize: [7, "Land Claim Size", "Number", 1, 15],
                landClaimDeadZone: [30, "Land Claim Deadzone", "Number", 1, 30],
                landClaimExpiryTime: [3, "Land Claim Expiry Time", "Number", 1, 14],
                landClaimDecayMode: ["linear", "Land Claim Decay Mode", "Enumerator", ["linear", "exponential", "until expired"]],
                landClaimOnlineDurabilityModifier: [4, "Land Claim Online Durability Modifier", "Number", 0, 32],
                landClaimOfflineDurabilityModifier: [4, "Land Claim Offline Durability Modifier", "Number", 0, 32],
                airDropFrequency: [72, "Air Drop Frequency", "Number", 0, 144],
                airDropMarker: [false, "Air Drop Marker", "Boolean"],
                maxSpawnedZombies: [60, "Max Spawned Zombies", "Number", 1, 100],
                maxSpawnedAnimals: [50, "Max Spawned Animals", "Number", 1, 100],
                eacEnabled: [true, "EAC Enabled", "Boolean"]
            },
            file: fs.readFileSync(path.resolve(__dirname, 'config', 'serverconfig.xml.ejs'), 'UTF-8')
        }
    }
};

module.exports = class SevenDaysToDieServer extends steamGame {

    constructor(id, settings) {
        super(id, appId, settings);
        this.config = config;
    }

    async start() {
        await super.start([
            "./startserver.sh",
            "-quit",
            "-batchmode",
            "-nographics",
            "-configfile=serverconfig.xml",
            "-dedicated"
        ]);
    }

};