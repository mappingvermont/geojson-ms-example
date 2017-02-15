'use strict';

var Router = require('koa-router');
var logger = require('logger');
var GeoJSONSerializer = require('serializers/geoJSONSerializer');


var router = new Router({
    prefix: '/geojson'
});


class GeoJSONRouter {
    static * convert() {
		
		console.log(this.request.body)
		/*
        logger.debug('Converting file...');
        this.assert(this.request.body.files.file, 400, 'File required');

        try {
            var ogr = ogr2ogr(this.request.body.files.file.path);
            ogr.project('EPSG:4326');
            ogr.options(['-dim', '2']);
            var result = yield ogrExec(ogr);
            // logger.debug(result);
            this.body = GeoJSONSerializer.serialize(result);
        } catch (e) {
            logger.error('Error convert file', e);
            this.throw(400, 'File not valid');
        } finally {
            logger.debug('Removing file');
            yield unlink(this.request.body.files.file.path);
        }
		*/
    }
}


router.post('/convert', GeoJSONRouter.convert);

module.exports = router;
