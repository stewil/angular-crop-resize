/**
 * Created by Steve on 22/02/2016.
 */
module ngCropResize.cropArea.services {
    "use strict";

    import ICropAreaService = ngCropResize.crCropArea.models.ICropAreaService;

    export class CropAreaService implements ICropAreaService {

        public static $inject = ["$rootScope"];

        constructor(private $rootScope:angular.IRootScopeService) {
        }

        private updateCanvasImage = ($canvas:angular.IAugmentedJQuery) =>{

        };

        public measureContext = (canvasWidth:number, canvasHeight:number, imageWidth:number, imageHeight:number) =>{
            var hRatio         = canvasWidth  / imageWidth,
                vRatio         = canvasHeight  / imageHeight,
                ratio          = Math.min( hRatio, vRatio),
                paramsAsObject = {
                    sx      : 0,
                    sy      : 0,
                    sWidth  : imageWidth,
                    sHeight : imageHeight,
                    dx      : (canvasWidth - imageWidth * ratio ) / 2,
                    dy      : (canvasHeight - imageHeight * ratio ) / 2,
                    dWidth  : imageWidth * ratio,
                    dHeight : imageHeight * ratio
                };
            return {
                asObject : paramsAsObject,
                asArray  : Object.keys(paramsAsObject).map(function (key) {
                    return paramsAsObject[key]
                })
            }
        }
    }
}