/**
 * Created by Steve on 18/02/2016.
 */
module ngCropResize.cropData.services {
    "use strict";

    import ICropDataService = ngCropResize.cropData.models.ICropDataService;

    export class CropDataService implements ICropDataService{

        public croppedImageInfo : any = {};
        public croppedImageData : any = {};

        public static $inject = ["$rootScope", "$timeout"];

        constructor(private $rootScope : angular.IRootScopeService,
                    private $timeout   : angular.ITimeoutService){
        }

        public addModel = (key:string, info:any, data:any) =>{
            this.$timeout(()=>{
                this.$rootScope.$apply(()=>{
                    this.croppedImageData[key] = data;
                    this.croppedImageInfo[key] = info;
                });
            });
        };

        public getModel = () =>{};

    }
}