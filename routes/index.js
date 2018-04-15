
module.exports = (router) => {

    router.get('/', async (ctx, next) => {
        await ctx.render('index', {
            title: "test"
        });
    });

    router.get('/server/:serverId', async (ctx, next) => {
        await ctx.render('index', {
            title: "test"
        });
    });

};