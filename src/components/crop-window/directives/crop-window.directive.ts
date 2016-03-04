/**
 * Created by Steve on 25/02/2016.
 */
module ngCropResize.cropWindow.directives {
    "use strict";

    import ICropWindowScope = ngCropResize.cropWindow.models.ICropWindowScope;

    export class cropWindowDirective implements angular.IDirective {

        public restrict     : string = "EA";
        public controller   : string = "crCropWindowCtrl";
        public controllerAs : string = "cropWindowVM";
        public templateUrl  : string = "./views/cr-crop-window.template.html";

        public static Factory() {
            var directive = ($rootScope:angular.IRootScopeService) =>
                new cropWindowDirective($rootScope);

            directive.$inject = ["$rootScope"];
            return directive;
        }

        constructor(private $rootScope:angular.IRootScopeService) {
        }

        link = ($scope   : ICropWindowScope,
                $element : angular.IAugmentedJQuery,
                $attrs   : angular.IAttributes)=> {
            $element.attr('cr-src', $scope.crSrc);
            [].forEach.call($element[0].querySelectorAll("*"), (child, index)=>{
                child.setAttribute('cr-src', $scope.crSrc);
            })
        };
    }
}