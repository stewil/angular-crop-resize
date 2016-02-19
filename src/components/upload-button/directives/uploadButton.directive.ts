/**
 * Created by Steve on 14/02/2016.
 */
module ngCropResize.uploadButton.directives {
    "use strict";

    export class UploadButton implements angular.IDirective {

        public restrict     : string = "EA";
        public controller   : string = "";
        public controllerAs : string = "";
        public templateUrl  : string = "";
        public scope        : any = {};

        public static Factory(){
            var directive = ()=>new UploadButton();
            directive.$inject = [];
            return directive;
        }

        constructor(){}

        link = ($scope   : angular.IScope,
                $element : angular.IAugmentedJQuery,
                $attrs   : angular.IAttributes)=>{

            $element.on("change", onChange);

            function onChange(e){ }
        };

    }
}