module ngCropResize.crCropArea.models{

    export interface ICropAreaScope extends angular.IScope{
        crSrc:string
        $canvas:angular.IAugmentedJQuery
    }

    export interface ICropAreaService {
        measureContext(canvasWidth:number, canvasHeight:number, imageWidth:number, imageHeight:number):any
    }
}