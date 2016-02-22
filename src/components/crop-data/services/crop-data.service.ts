/**
 * Created by Steve on 18/02/2016.
 */
module ngCropResize.cropData.services {
    "use strict";

    import ICropDataService = ngCropResize.cropData.models.ICropDataService;

    export class CropDataService implements ICropDataService{

        public croppedImageInfo  : any = {};
        private croppedImageData : any = {};

        public static $inject = ["$rootScope"];

        constructor(private $rootScope:angular.IRootScopeService){
        }

        public addModel = (key:string, info:any, data:any) =>{
            this.croppedImageData[key] = data;
            this.croppedImageInfo[key] = info;
        };

        public getModel = () =>{};

    }
}