/**
 * Created by Steve on 07/03/2016.
 */
module ngCropResize.preview.controllers {
    "use strict";

    import IPreviewScope   = ngCropResize.preview.models.IPreviewScope;

    export class PreviewController{
        static $inject = ["$scope"];
        constructor(private $scope : IPreviewScope){
        }
    }
}