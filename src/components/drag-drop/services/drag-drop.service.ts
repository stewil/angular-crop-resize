/**
 * Created by Steve on 18/02/2016.
 */
module ngCropResize.dragDrop.services {
    "use strict";

    import IDragDropService = ngCropResize.dragDrop.models.IDragDropService;

    export class DragDropService implements IDragDropService{

        public static $inject = ["$rootScope"];

        constructor(private $rootScope:angular.IRootScopeService){
        }
    }
}