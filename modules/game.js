const spawn = require('child_process').spawn;
const app = global.app;
const io = global.io;
const path = require('path');
const serverUtility = require('./serverUtility');
const fs = require('fs-extra');

/**
 * Base class for games
 * @type {module.Game}
 */
module.exports = class Game {

    constructor(id, settings) {
        this.serverID = id;
        this.settings = settings;
        this.config = {};

        //io.attachNamespace(app, 'server-' + id);
        //this.channel = app['server-' + id].socket;
        this.channel = app._io;
    }

    /**
     * Install gameserver
     * @returns {Promise<void>}
     */
    async install() {
        fs.mkdirsSync(path.resolve(global.config.server.path, this.serverID));
    }

    /**
     * Update gameserver
     * @returns {Promise<void>}
     */
    async update() {

    }

    /**
     * Remove gameserver
     * @returns {Promise<void>}
     */
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

    /***
     * Starts gameserver
     * @param cmd, cmd[0] = binary, cmd[1+] = args
     * @param folders path to binary folder relative to server folder
     * @returns {Promise<void>}
     */
    async start(cmd, folders = []) {
        await this.generateConfig();
        let p = spawn(cmd.shift(), cmd, {
            //detached: true,
            cwd: path.resolve.apply(null, [global.config.server.path, this.serverID].concat(folders)),
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

    /***
     * Stops gameserver
     * @returns {Promise<void>}
     */
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

    /**
     * Builds all config files
     * @returns {Promise<void>}
     */
    async generateConfig() {
        if (this.config && this.config.files) {
            for (let [filename, config] of Object.entries(this.config.files)) {
                let fileSettings = {};
                if(this.settings.files && this.settings.files[filename]) {
                    fileSettings = this.settings.files[filename];
                }
                fs.writeFileSync(path.resolve.apply(null, [global.config.server.path, this.serverID].concat(config.fullpath || [filename])), serverUtility.renderFile(config, fileSettings), 'UTF-8');
            }
        }
    }

    /**
     * Get key from config, else get default value
     * @param key
     * @returns {*}
     */
    getConfigKey(key){
        if(this.settings.fields[key]){
            return this.settings.fields[key];
        }
        if(this.config.fields[key]){
            return this.config.fields[key][0];
        }
        return "";
    }
};