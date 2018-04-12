
module.exports = (router) => {

    router.get('/', async (ctx, next) => {
        await ctx.render('index', {
            title: "test"
        });
    });

};