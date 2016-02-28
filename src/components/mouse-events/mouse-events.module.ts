/**
 * Created by Steve on 27/02/2016.
 */
/// <reference path="./services/mouse-events.service.ts" />
module ngCropResize.mouseEvents {

    import IMouseEventsService =  ngCropResize.mouseEvents.models.IMouseEventsService;

    angular.module("ngCropResize.mouseEvents", [])
        .service("crMouseEventsService", services.MouseEventsService)
        .run(["crMouseEventsService", (crMouseEventsService:IMouseEventsService)=>{
            crMouseEventsService.init();
        }]);
}