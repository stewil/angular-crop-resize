/**
 * Created by Steve on 18/02/2016.
 */
/// <reference path="./controllers/crop-area.controller.ts" />
/// <reference path="./services/crop-area.service.ts" />
/// <reference path="./directives/crop-area.directive.ts" />
module ngCropResize.cropArea{
    angular.module("ngCropResize.crCropArea", [])
        .controller("crCropAreaCtrl", controllers.CropAreaController)
        .service("crCropAreaService", services.CropAreaService)
        .directive("crCropArea",      directives.CropAreaDirective.Factory());
}