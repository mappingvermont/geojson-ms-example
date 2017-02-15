const Router = require('koa-router');


const hiRouter = new Router({
    prefix: '/geojson-ms-example',
});

class HiRouter {

    static hi(ctx) {
        ctx.body = {
            hi: 'Ra'
        };
    }

}

hiRouter.get('/hi', HiRouter.hi);


module.exports = hiRouter;
