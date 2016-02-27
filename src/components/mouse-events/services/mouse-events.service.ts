/**
 * Created by Steve on 27/02/2016.
 */
module ngCropResize.mouseEvents.services {
    "use strict";

    import IMouseEventsService =  ngCropResize.mouseEvents.models.IMouseEventsService;

    export class MouseEventsService implements IMouseEventsService {

        public static $inject = ["$rootScope"];

        constructor(private $rootScope:angular.IRootScopeService) {
        }
    }
}