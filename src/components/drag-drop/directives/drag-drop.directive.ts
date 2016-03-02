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

        public static Factory(){
            var directive = ($rootScope : angular.IRootScopeService,
                             $timeout   : angular.ITimeoutService) =>
                new DragAreaDirective($rootScope, $timeout);

            directive.$inject = ["$rootScope", "$timeout"];
            return directive;
        }

        constructor(private $rootScope : angular.IRootScopeService,
                    private $timeout   : angular.ITimeoutService){}

        link = ($scope   : IDragDropScope,
                $element : angular.IAugmentedJQuery,
                $attrs   : angular.IAttributes)=>{
            $scope.$watch(()=>{
                return $attrs['crSrc'];
            },(newValue)=>{
                this.$timeout(()=>{
                    $scope.$apply(()=>{
                        $scope.crSrc = newValue;
                    });
                })
            }, true);
        };
    }
}