module ngCropResize.cropData.models {

    export interface ICropDataService {
        croppedImageInfo:any;
        croppedImageData:any;
        addModel(key:string, info:any, data:any):void
    }
}