const spawn = require('child_process').spawn;
const io = global.io;
const path = require('path');
const serverUtility = require('./serverUtility');
const fs = require('fs');

module.exports = class Game {

    constructor(id, config){
        this.serverID = id;
        this.config = config;
        this.channel = io.of(id);
    }

    async install(){

    }

    async update(){
        await this.install();
    }

    async remove(){

    }

    async onUpdate(progress){
        console.log("process: " + progress);
        //this.channel.emit('progress', progress);
        global.io.emit('progress', progress);
    }

    async onExit(exitCode){
        // 0 = success
        console.log("exit: " + exitCode);
        //this.channel.emit('exit', exitCode);
        global.io.emit('exit', exitCode);
    }

    async start(cmd){
        await this.generateConfig();
        spawn(cmd.shift(), cmd, {
            detached: true,
            cwd: path.resolve(global.config.server.path, this.serverID),
            shell: true
        });
        //this.watchLog();
    }

    async watchLog(){
        let blah = spawn('tail', ['-f', 'process.log']);
        blah.stdout.on('data', this.onLog);
        blah.stderr.on('data', this.onLog);
        blah.on('exit', this.onExit);
    }

    async onLog(data){
        this.channel.emit('log', data);
    }

    async generateConfig(){
        for(let [filename, config] of Object.entries(this.config)){
            fs.writeFileSync(path.resolve(global.config.server.path, this.serverID, filename), serverUtility.renderFile(config, {}), 'UTF-8');
        }
    }
};