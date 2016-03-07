/**
 * Created by Steve on 07/03/2016.
 */
 module ngCropResize.preview.directives {
    "use strict";

    import IPreviewScope   = ngCropResize.preview.models.IPreviewScope;

    export class PreviewDirective implements angular.IDirective{

        public restrict     : string = "EA";
        public controller   : string = "crPreviewCtrl";
        public controllerAs : string = "crPreviewVM";

        public static Factory(){
            var directive = ($rootScope : angular.IRootScopeService) =>
                new PreviewDirective($rootScope);

            directive.$inject = ["$rootScope"];
            return directive;
        }

        constructor(private $rootScope : angular.IRootScopeService){}

        link = ($scope   : IPreviewScope,
                $element : angular.IAugmentedJQuery,
                $attrs   : angular.IAttributes)=>{
        };
    }
}