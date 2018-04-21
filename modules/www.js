const koa = require('koa');
const koaBody = require('koa-body');
const koaRouter = require('koa-router');
const koaEjs = require('koa-ejs');
const koaIO = require('koa-socket');
const koaStatic = require('koa-static');
const logger = global.logger;
const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');

module.exports = function () {

    const app = new koa();
    const router = new koaRouter();
    const io = new koaIO();

    io.attach(app);

    global.io = app._io;
    global.app = app;


    app._io.on('connection', (socket) => {
        socket.join('server-mc');
        socket.on('joinChannel', (channel) => {
            socket.join(channel);
        });
    });

    app.use(koaBody());
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.use(koaStatic(path.resolve(__dirname + '/../frontend/')));

    koaEjs(app, {
        root: path.join(global.config.path, 'views'),
        layout: false,
        viewExt: 'ejs',
        cache: false,
        debug: false
    });

    fs.readdirSync(path.join(global.config.path, 'routes')).forEach(file => {
        require(path.resolve(global.config.path, 'routes', file))(router);
    });

    app.listen(global.config.webserver.port);
    logger.info(`Starting webserver on port ${global.config.webserver.port}.`);

    return app;
};