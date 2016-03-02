/**
 * Created by Steve on 18/02/2016.
 */
/// <reference path="./controllers/drag-drop.controller.ts" />
/// <reference path="./directives/drag-drop.directive.ts" />
/// <reference path="./services/drag-drop.service.ts" />
module ngCropResize.dragDrop {
    angular.module("ngCropResize.crDragArea", [])
    .controller("crDragAreaCtrl", controllers.DragAreaController)
    .directive("crDropArea",      directives.DragAreaDirective.Factory())
    .service("crDragAreaService", services.DragDropService);
}