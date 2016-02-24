/**
 * Created by Steve on 18/02/2016.
 */
module ngCropResize.dragDrop.directives {
    "use strict";

    import IDragDropScope = ngCropResize.dragDrop.models.IDragDropScope;

    export class DragAreaDirective implements angular.IDirective{

        public restrict     : string = "EA";
        public controller   : string = "crDragAreaCtrl";
        public controllerAs : string = "crDragAreaVM";
        public scope        : any = {
            crSrc : "@?"
        };

        public static Factory(){
            var directive = ($rootScope : angular.IRootScopeService) =>
                new DragAreaDirective($rootScope);

            directive.$inject = ["$rootScope"];
            return directive;
        }

        constructor(private $rootScope : angular.IRootScopeService){}

        link = ($scope   : IDragDropScope,
                $element : angular.IAugmentedJQuery,
                $attrs   : angular.IAttributes)=>{
        };
    }
}