/**
 * Created by Steve on 18/02/2016.
 */
module ngCropResize.cropArea.directives {
    "use strict";

    import ICropAreaScope   = ngCropResize.crCropArea.models.ICropAreaScope;
    import ICropDataService = ngCropResize.cropData.models.ICropDataService;

    export class CropAreaDirective implements angular.IDirective {

        public restrict     : string = "EA";
        public controller   : string = "crCropAreaCtrl";
        public controllerAs : string = "crCropAreaVM";
        public scope        : any    = {
            crSrc:"@"
        };

        public static Factory(){
            var directive = ()=>new CropAreaDirective();
            directive.$inject = [];
            return directive;
        }

        constructor(){}

        link = ($scope   : ICropAreaScope,
                $element : angular.IAugmentedJQuery,
                $attrs   : angular.IAttributes)=>{

            $scope.$canvas    = createCanvas();

            function createCanvas(){
                var $newCanvas;
                if($element[0].tagName.toLowerCase() !== 'canvas'){
                    $newCanvas = angular.element('<canvas></canvas>');
                    $element.append($newCanvas);
                }
                return $newCanvas || $element;
            }
        };

    }
}