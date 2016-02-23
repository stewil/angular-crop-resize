module ngCropResize.utils.models{
    export interface IUtilsService {
        fileInfoObject(file?:any, base64String?:string):any
        fileDataObject(file?:any, base64String?:string):any
        fileToBase64(file:any):angular.IPromise<any>
    }
}