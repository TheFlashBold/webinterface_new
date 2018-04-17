const spawn = require('child_process').spawn;
const app = global.app;
const io = global.io;
const path = require('path');
const serverUtility = require('./serverUtility');
const fs = require('fs-extra');

module.exports = class Game {

    constructor(id, settings) {
        this.serverID = id;
        this.settings = settings;
        this.config = {};

        //io.attachNamespace(app, 'server-' + id);
        //this.channel = app['server-' + id].socket;
        this.channel = app._io;
    }

    async install() {
        fs.mkdirsSync(path.resolve(global.config.server.path, this.serverID));
    }

    async update() {

    }

    async remove() {
        fs.removeSync(path.resolve(global.config.server.path, this.serverID));
    }

    async onUpdate(progress) {
        console.log("process: " + progress);
        this.channel.emit('progress', progress);
    }

    async onExit(exitCode) {
        // 0 = success
        console.log("exit: " + exitCode);
        this.channel.emit('exit', exitCode);
    }

    async start(cmd) {
        await this.generateConfig();
        let p = spawn(cmd.shift(), cmd, {
            //detached: true,
            cwd: path.resolve(global.config.server.path, this.serverID),
            shell: true
        });

        p.stdout.on('data', (data) => {
            this.onLog(data);
        });
        p.stderr.on('data', (data) => {
            this.onLog(data);
        });
        //this.watchLog();
    }

    async stop(){

    }

    async watchLog() {
        let blah = spawn('tail', ['-f', 'process.log']);
        blah.stdout.on('data', this.onLog);
        blah.stderr.on('data', this.onLog);
        blah.on('exit', this.onExit);
    }

    async onLog(data) {
        console.log("[" + this.serverID + "]: " + data.toString().replace("\n", ""));
        this.channel.emit('log', data.toString());
    }

    async generateConfig() {
        if (this.config && this.config.files) {
            for (let [filename, config] of Object.entries(this.config.files)) {
                fs.writeFileSync(path.resolve(global.config.server.path, this.serverID, filename), serverUtility.renderFile(config, {}), 'UTF-8');
            }
        }
    }
};