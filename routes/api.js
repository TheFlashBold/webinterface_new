const serverUtitlity = require('./../modules/serverUtility');
const mongoose = require('mongoose');
const uuid = require('fast-uuid').uuid4;
const Game = require('./../modules/game');

module.exports = (router) => {
    let userModel = mongoose.model('user');
    let serverModel = mongoose.model('server');

    router.get('/api/', (ctx, next) => {
        ctx.body = "test";
    });

    router.post('/api/server/:serverId/command', async (ctx, next) => {
        let id = ctx.params.serverId;
        let cmd = ctx.request.body.cmd + "\n";
        /* Session ?
        let owner = ;
        */
        try {
            let s = await Game.getFromId(id);
            s.sendInput(cmd);
            ctx.body = {
                success: true
            };
        } catch (e) {
            return ctx.body = {
                success: false,
                error: "Server not found / no permission."
            };
        }
    });

    router.get('/api/server/:serverId/install', async (ctx, next) => {
        let id = ctx.params.serverId;
        /* Session ?
        let owner = ;
        */
        try {
            let s = await Game.getFromId(id);
            ctx.body = {
                success: true
            };
            await s.install();
        } catch (e) {
            return ctx.body = {
                success: false,
                error: "Server not found / no permission."
            };
        }
    });

    router.get('/api/server/:serverId/stop', async (ctx, next) => {
        let id = ctx.params.serverId;
        /* Session ?
        let owner = ;
        */
        try {
            let s = await Game.getFromId(id);
            await s.stop();
            return ctx.body = {
                success: true
            };
        } catch (e) {
            return ctx.body = {
                success: false,
                error: "Server not found / no permission."
            };
        }
    });

    router.get('/api/server/:serverId/start', async (ctx, next) => {
        let id = ctx.params.serverId;
        /* Session ?
        let owner = ;
        */
        try {
            let s = await Game.getFromId(id);
            await s.start();
            return ctx.body = {
                success: true
            };
        } catch (e) {
            console.log(e);
            return ctx.body = {
                success: false,
                error: "Server not found / no permission."
            };
        }
    });

    router.post('/api/server/:serverId', (ctx, next) => {
        let id = ctx.params.serverId;
        let config = ctx.request.body;

        return serverModel.findOne({_id: id}).exec().then((server) => {
            if (!server) {
                return ctx.body = {
                    success: false,
                    error: "Server not found / no permission."
                };
            }
            server.set('config', JSON.stringify(config));
            server.save();
            ctx.body = {
                success: true
            };
        });
    });

    router.get('/api/server/:serverId', async (ctx, next) => {
        let id = ctx.params.serverId;
        /* Session ?
        let owner = ;
        */
        try {
            let s = await Game.getFromId(id);
            return ctx.body = {
                success: true,
                server: {
                    config: s.config,
                    values: s.settings
                }
            };
        } catch (e) {
            return ctx.body = {
                success: false,
                error: "Server not found / no permission."
            };
        }
    });

    router.post('/user', (ctx, next) => {
        let sessionData = ctx.request.body;
        if (sessionData && sessionData.session && sessionData.email) {
            return userModel.findOne({
                email: sessionData.email,
                session: sessionData.session
            }).lean().exec().then((user) => {
                if (!user) {
                    return ctx.body = {
                        success: false,
                        error: 'Session / email invalid.'
                    };
                }
                let userData = {
                    email: user.email,
                    session: user.session,
                    name: user.name
                };
                return serverModel.find({owners: user._id}, {name: 1}).lean().then((servers) => {
                    if (servers) {
                        userData.servers = servers;
                    }
                    return ctx.body = {
                        user: userData,
                        success: true
                    };
                });
            });
        }
    });

    router.post('/login', (ctx, next) => {
        let loginData = ctx.request.body;
        if (loginData && loginData.email && loginData.password) {
            return userModel.findOne({email: loginData.email}).exec().then((user) => {
                if (!user) {
                    return ctx.body = {
                        success: false,
                        error: "No user found by email.",
                    };
                }

                user.session = uuid();
                user.save();

                if (true || user.password === loginData.password) {
                    let userData = {
                        email: user.email,
                        session: user.session,
                        name: user.name
                    };
                    return serverModel.find({owners: user._id}, {name: 1}).lean().then((servers) => {
                        if (servers) {
                            userData.servers = servers;
                        }
                        return ctx.body = {
                            user: userData,
                            success: true
                        };
                    });
                }
            });
        }
    });

};