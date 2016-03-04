/**
 * Created by Steve on 25/02/2016.
 */
module ngCropResize.cropWindow.controllers {
    "use strict";

    import ICropWindowScope = ngCropResize.cropWindow.models.ICropWindowScope;

    export class CropWindowController {

        private isHeld           : boolean = false;
        private transformOnStart : Array<number>;
        private focusElement     : angular.IAugmentedJQuery;

        static $inject = ["$scope", "$rootScope", "$element"];

        constructor(private $scope     : ICropWindowScope,
                    private $rootScope : angular.IRootScopeService,
                    private $element   : angular.IAugmentedJQuery) {
            this.$rootScope.$on("crMouseUp", this.onMouseUp);
            this.$rootScope.$on("crMouseDown", this.onMouseDown);
            this.$rootScope.$on("crMouseMove", this.onWindowDrag);
        }

        private onMouseUp = (e, eventData) => {
            this.isHeld = false;
            this.transformOnStart = [];
        };

        private onMouseDown = (e, eventData) =>{
            if(eventData.target.getAttribute('cr-src') === this.$scope.crSrc){
                this.isHeld           = true;
                this.focusElement     = angular.element(eventData.target);
                this.transformOnStart = this.getElementTransform(this.$element[0]);
            }
        };

        private onWindowDrag = (e, mouseData) => {
            if(this.isHeld){
                var newTransform = this.transformOnStart.slice(0);
                newTransform[4] = Number(this.transformOnStart[4] + mouseData.x);
                newTransform[5] = this.transformOnStart[5] + mouseData.y;
                this.$element.css("transform", "matrix(" + newTransform.join(",") + ")");
            }
        };

        private getElementTransform(element){
            var computedStyles          = (window.getComputedStyle(element)['transform' || 'webkitTransform' || 'mozTransform'].match(/-?\d+(?:\.\d+)?/g)),
                computedStylesAsNumbers;
            if(computedStyles){
                computedStylesAsNumbers = [];
                computedStyles.forEach((value, index)=>{
                    computedStylesAsNumbers.push(Number(value));
                });
            }
            return computedStylesAsNumbers || [1,0,0,1,0,0];
        }
    }
}