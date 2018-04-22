const {spawn, exec, execFile} = require('child_process');
const app = global.app;
const io = global.io;
const path = require('path');
const serverUtility = require('./serverUtility');
const fs = require('fs-extra');
const mongoose = require('mongoose');
const Promise = require('bluebird');

/**
 * Base class for games
 * @type {module.Game}
 */
module.exports = class Game {

    constructor(id, settings) {
        this.serverID = id;
        this.settings = settings || {fields: {}, files: {}};
        this.config = {fields: {}, files: {}};

        //io.attachNamespace(app, 'server-' + id);
        //this.channel = app['server-' + id].socket;
        this.channel = {
            emit: (event, data) => {
                io.emit(event, {id: this.serverID, data: data});
            }
        };

        if (!global.servers) {
            global.servers = {};
        }

        global.servers[id] = this;
    }

    async loadSettings() {
        return new Promise((resolve, reject) => {
            return mongoose.model('server').findOne({_id: this.serverID}).exec().then((server) => {
                if (!server) {
                    return console.log("No server found by id!");
                }
                this.model = server;
                this.settings = JSON.parse(server.config);
                //console.log(JSON.stringify(this.settings, null, 4));
                return resolve();
            });
        });
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

    async onUpdate(state, progress) {
        console.log(state + " progress: " + progress);
        this.channel.emit('progress', {state: state, progress: progress});
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
        let cwd = path.resolve.apply(null, [global.config.server.path, this.serverID].concat(folders));
        console.log(cwd, cmd);
        let p = spawn(cmd.shift(), cmd, {
            detached: false,
            cwd: cwd,
            shell: true
        });

        p.stdin.setEncoding('utf-8');
        this.process = p;

        this.model.set('pid', p.pid);
        this.model.save();

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
    async stop() {
        try {
            this.process.kill();
            //this.sendInput("\x03");
        } catch (e) {
            console.log(e);
        }
    }

    async sendInput(test) {
        if (this.process) {
            try {
                return this.process.stdin.write(test);
            } catch (e) {
                console.log(e);
            }
        }
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
                let fileSettings = {fields: {}};
                if (this.settings.files && this.settings.files[filename]) {
                    fileSettings = this.settings.files[filename];
                }
                fs.writeFileSync(path.resolve.apply(null, [global.config.server.path, this.serverID].concat(config.fullpath || [filename])), serverUtility.renderFile(config, fileSettings.fields), 'UTF-8');
            }
        }
    }

    /**
     * Get key from config, else get default value
     * @param key
     * @returns {*}
     */
    getConfigKey(key) {
        if (this.settings && this.settings.fields && this.settings.fields[key]) {
            return this.settings.fields[key];
        }
        if (this.config.fields[key]) {
            return this.config.fields[key][0];
        }
        return "";
    }

    /***
     * Returns server class with settings from db
     * @param id
     * @param owner
     * @returns {Promise<void>}
     */
    static async getFromId(id, owner) {
        return new Promise((resolve, reject) => {
            if (!global.servers) {
                global.servers = {};
            }
            if (global.servers[id]) {
                return resolve(global.servers[id]);
            }

            let query = {_id: id};
            if (owner) {
                query.owners = owner;
            }
            return mongoose.model('server').findOne(query).lean().exec().then(async (server) => {
                if (!server) {
                    return reject(new Error("No server found by id / no permission."));
                }
                if (global.games[server.game]) {
                    let s = new global.games[server.game](id);
                    await s.loadSettings();
                    return resolve(s);
                }
                return reject(new Error("Game not found."))
            });
        });
    }
};