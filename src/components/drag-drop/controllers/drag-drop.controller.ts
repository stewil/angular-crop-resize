/**
 * Created by Steve on 18/02/2016.
 */
module ngCropResize.dragDrop.controllers {
    "use strict";

    import IDragDropScope = ngCropResize.dragDrop.models.IDragDropScope;

    export class DragAreaController{
        static $inject = ["$scope", "$element"];
        constructor(private $scope   : IDragDropScope,
                    private $element : angular.IAugmentedJQuery){
            $element.on('drop',      this.onDrop);
            $element.on('dragover',  this.onDragOver);
            $element.on('dragleave', this.onDragEnter);
            $element.on('dragenter', this.onDragLeave);
        }

        private onDrop = (e) =>{
            e.preventDefault();
            var data             = e.dataTransfer.files;
            if(data[0] instanceof Blob){

            }
        };

        private onDragOver = (e:any) =>{
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        };

        private onDragEnter = () =>{

        };

        private onDragLeave = () =>{

        };
    }
}