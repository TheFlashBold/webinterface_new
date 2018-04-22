const steamGame = require('./../../modules/steamGame');
const os = require('os');
const fs = require('fs');
const path = require('path');

const appId = 4940;

const config = {
    fields: {
        name: ["NS2 Server", "Name", "String", 0, 64],
        map: ["ns2_summit", "Map", "String", 0, 64],
        port: [27015, "Port", "Number", 0, 65355]
    },
    files: {

    }
};

module.exports = class NS2Server extends steamGame {

    constructor(id, settings) {
        super(id, appId, settings);
        this.config = config;
    }

    async start() {
        await super.start([
            os.type() === "Windows_NT"?"Server.exe":"./server_linux32",
            "-name \"" + this.getConfigKey('name') + "\"",
            "-port " + this.getConfigKey('port'),
            //"-webadmin",
            //"-webdomain \"192.168.1.1\"",
            //"-webuser admin",
            //"-webpassword password",
            //"-webport 8080",
            "-map " + this.getConfigKey('map'),
            "-limit 24"
        ], ["x64"]);
    }

};