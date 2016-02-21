/**
 * Created by Steve on 20/02/2016.
 */
module ngCropResize.utils.services {
    "use strict";

    export interface IutilsService {
        exampleFunc(arg:any):void
    }

    export class utilsService implements IutilsService {

        public static $inject = ["$rootScope"];

        constructor(private $rootScope:angular.IRootScopeService) {
        }

        exampleFunc = (arg:any) => {
        };
    }
}