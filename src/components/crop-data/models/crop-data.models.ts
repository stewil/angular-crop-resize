module ngCropResize.cropData.models {

    export interface ICropDataService {
        croppedImageInfo:any;
        addModel(key:string, info:any, data:any):void
    }
}