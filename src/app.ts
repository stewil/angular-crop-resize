module ngCropResize.App {
    "use strict";

    export class AppBuilder {

        public static instance : AppBuilder;
        public angularModule   : ng.IModule;

        constructor(name:string) {
            AppBuilder.instance = this;

            this.angularModule = angular.module(name, [
                "ngCropResize.crUtils",
                "ngCropResize.crUploadButton"
            ]);
        }
        public start(){
            angular.element(document).ready(()=>{
                angular.bootstrap(document, [this.angularModule.name]);
            });
        }
    }

    new ngCropResize.App.AppBuilder('ngCropResize').start();
}