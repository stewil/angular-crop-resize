/**
 * Created by Steve on 25/02/2016.
 */
/// <reference path="./controllers/crop-window.controller.ts" />
/// <reference path="./directives/crop-window.directive.ts" />
module ngCropResize.cropWindow {
    angular.module("ngCropResize.crCropWindow", [])
        .controller("crCropWindowCtrl", controllers.CropWindowController)
        .directive("crCropWindow",    directives.cropWindowDirective.Factory());
}