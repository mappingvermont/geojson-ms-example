const Router = require('koa-router');
const arcgis = require('terraformer-arcgis-parser')

const geojsonRouter = new Router({
    prefix: '/geojson-ms-example',
});

class GeoJsonRouter {

    static async toEsri (ctx) {
        console.log('got post request')

        var input = ctx.request.body;       
        var toArcGIS = arcgis.convert(input.geom)

        var toProject = checkProject(input)

        if (toProject) {
           console.log('projecting')
           if (input.t_srs === 3857) {
              var projected = arcgis.parse(toArcGIS).toMercator()
           } else {
              var projected = arcgis.parse(toArcGIS).toGeographic()
           }

           ctx.body = arcgis.convert(projected)

        } else {

            ctx.body = toArcGIS
         }
    }


    static async toGeoJson (ctx) {
      console.log('got post request on to-geojson endpoint')

        var input = ctx.request.body;
        var toGeoJSON = arcgis.parse(input.geom)

        var toProject = checkProject(input)

        if (toProject) {
           console.log('projecting')
           if (input.t_srs === 3857) {
              var projected = toGeoJSON.toMercator()
           } else {
              var projected = toGeoJSON.toGeographic()
           }

           var output = projected.toJSON()
           delete output.bbox

           ctx.body = output

        } else {

            var output = toGeoJSON.toJSON()
            delete output.bbox

            ctx.body = output
         }
    }

}

function checkProject(input) {
   if ((input.hasOwnProperty('s_srs')) && (input.hasOwnProperty('t_srs'))) {
      if (input.s_srs !== input.t_srs) {
         return true
         } else { 
         return false }
      return false}
}


geojsonRouter.post('/to-esri', GeoJsonRouter.toEsri);
geojsonRouter.post('/to-geojson', GeoJsonRouter.toGeoJson);

module.exports = geojsonRouter;
