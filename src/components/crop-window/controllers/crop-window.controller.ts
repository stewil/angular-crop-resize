/**
 * Created by Steve on 25/02/2016.
 */
module ngCropResize.cropWindow.controllers {
    "use strict";

    import ICropWindowScope = ngCropResize.cropWindow.models.ICropWindowScope;

    export class CropWindowController {
        static $inject = ["$scope"];

        constructor(private $scope:angular.IScope) {

        }
    }
}