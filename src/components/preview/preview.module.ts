/**
 * Created by Steve on 05/03/2016.
 */
module ngCropResize.preview {

    angular.module("ngCropResize.preview", [])
        .controller("crPreviewCtrl", controllers.preview)
        .directive("crPreview", directives.preview);
}