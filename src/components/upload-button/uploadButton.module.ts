/**
 * Created by Steve on 13/02/2016.
 */
/// <reference path="./controllers/uploadButton.controller.ts" />
/// <reference path="./directives/uploadButton.directive.ts" />
module ngCropResize.uploadButton {
    angular.module("ngCropResize.crUploadButton", [])
        .controller("crUploadButtonCtrl", controllers.UploadButtonCtrl)
        .directive("crUploadButton",      directives.UploadButton.Factory());
}