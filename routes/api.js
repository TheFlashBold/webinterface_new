const serverUtitlity = require('./../modules/serverUtility');

module.exports = (router) => {

    router.get('/api/', (ctx, next) => {
        ctx.body = "test";
    });

    router.get('/api/server/:serverId', (ctx, next) => {
        let id = ctx.params.serverId;
        let server = {};
        if (id === "mc") {
            server = new global.games.minecraft("mc");
        } else if (id === "kalasch") {
            server = new global.games.ark("ark");
        } else {
            server = new global.games.gmod("test");
        }
        ctx.body = server.config;
    });

    router.post('/login/', (ctx, next) => {
        ctx.body = {
            name: ctx.request.body.name || "Tycho Holzer",
            email: ctx.request.body.email,
            token: "dgjdszsd68873gh3h8f",
            success: true,
            servers: {
                "mc": {
                    name: "Minecraft"
                },
                "test": {
                    name: "Gmod TTT"
                },
                "kalasch": {
                    name: "Ark"
                }
            }
        };
    });

};