/**
 * Created by Steve on 07/03/2016.
 */
 module ngCropResize.preview.directives {
    "use strict";

    import IPreviewScope   = ngCropResize.preview.models.IPreviewScope;
    import ICropDataService = ngCropResize.cropData.models.ICropDataService;

    export class PreviewDirective implements angular.IDirective{

        public restrict     : string = "EA";
        public controller   : string = "crPreviewCtrl";
        public controllerAs : string = "crPreviewVM";
        public scope        : any = {
            crSrc:"="
        };

        public static Factory(){
            var directive = ($rootScope : angular.IRootScopeService,
                             crCropData : ICropDataService) =>
                new PreviewDirective($rootScope, crCropData);

            directive.$inject = ["$rootScope", "crCropData"];
            return directive;
        }

        constructor(private $rootScope : angular.IRootScopeService,
                    private crCropData : crCropData){}

        link = ($scope   : IPreviewScope,
                $element : angular.IAugmentedJQuery,
                $attrs   : angular.IAttributes)=>{


            $scope.$watch(()=>{
                return this.crCropData[$scope.crSrc]
            }, onDraw, true);

            function onDraw(imageData){

            }
        };
    }
}