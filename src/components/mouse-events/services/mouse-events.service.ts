/**
 * Created by Steve on 27/02/2016.
 */
module ngCropResize.mouseEvents.services {
    "use strict";

    import IMouseEventsService =  ngCropResize.mouseEvents.models.IMouseEventsService;

    export class MouseEventsService implements IMouseEventsService {

        private startEvent    : any     = {};
        private mouseMoveData : any     = {};
        private isHeld        : boolean = false;
        private isMoving      : boolean = false;
        private isDragging    : boolean = false;

        public static $inject = ["$rootScope"];

        constructor(private $rootScope:angular.IRootScopeService) {
        }

        private init = ()=>{
            var $window = angular.element(window);

            $window.on("mousedown", this.mouseDownHandler);
            $window.on("mouseup",   this.mouseUpHandler);
            $window.on("mousemove", this.onMouseMoveHandler);

            $window.on("dragstart", this.onDragStartHandler);
            $window.on("dragend",   this.onDragEndHandler);
            $window.on("drag",      this.throttle(this.onMove, 50));

        };

        private updateMouseMoveData = (e) =>{
            if(e.x !== 0){
                this.mouseMoveData = {
                    x:e.x - this.startEvent.x,
                    y:e.y - this.startEvent.y
                };
            }
        };

        private onDown = (e) =>{
            if(!this.startEvent){
                this.startEvent = e;
                this.$rootScope.$broadcast("crMouseDown", e);
            }
        };

        private mouseDownHandler = (e) =>{

            this.isHeld   = true;
            this.isMoving = true;
            this.onDown(e);
        };

        private onMove = (e) =>{
            if(this.isHeld){
                this.updateMouseMoveData(e);
                this.$rootScope.$broadcast("crMouseMove", this.mouseMoveData);
            }
        };

        private onMouseMoveHandler = (e) =>{
            if(!this.isDragging){
                this.onMove(e);
            }
        };

        private onUp =(e) =>{
            this.startEvent = null;
            this.isHeld     = false;
            this.$rootScope.$broadcast("crMouseUp", e);
        };

        private mouseUpHandler = (e) =>{
            this.isMoving = false;
            if(!this.isDragging){
                this.onUp(e);
            }
        };

        private onDragStartHandler = (e) =>{
            this.onDown(e);
            this.isHeld     = true;
            this.isDragging = true;
        };

        private onDragEndHandler = (e) =>{
            this.isMoving   = false;
            this.isDragging = false;
            this.onUp(e);
        };

        private throttle = (callback:any, time:number)=>{
            var wait = false,
                timeout;

            return function(e){
                if(!wait){
                    callback(e);
                    wait = true;
                    timeout = setTimeout(function(){
                        wait = false;
                    }, time);
                }
            }
        }
    }
}