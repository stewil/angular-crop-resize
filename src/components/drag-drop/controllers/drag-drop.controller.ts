/**
 * Created by Steve on 18/02/2016.
 */
module ngCropResize.dragDrop.controllers {
    "use strict";

    import IDragDropScope   = ngCropResize.dragDrop.models.IDragDropScope;
    import IUtilsService    = ngCropResize.utils.models.IUtilsService;
    import ICropDataService = ngCropResize.cropData.models.ICropDataService;

    export class DragAreaController{
        static $inject = ["$scope", "$element", "crUtils", "crCropData"];
        constructor(private $scope     : IDragDropScope,
                    private $element   : angular.IAugmentedJQuery,
                    private crUtils    : IUtilsService,
                    private crCropData : ICropDataService){
            $element.on('drop',      this.onDrop);
            $element.on('dragover',  this.onDragOver);
            $element.on('dragleave', this.onDragEnter);
            $element.on('dragenter', this.onDragLeave);
        }

        private onDrop = (e) =>{
            e.preventDefault();
            var files = e.dataTransfer.files;
            if(files[0] instanceof Blob){
                this.crUtils.fileToBase64(files[0]).then((data)=>{
                    this.crCropData.addModel(this.$scope.crSrc, data.info, data.data);
                });
            }
        };

        private onDragOver = (e:any) =>{
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        };

        private onDragEnter = () =>{
            this.$element.addClass("cr-drag-over");
        };

        private onDragLeave = () =>{
            this.$element.removeClass("cr-drag-over");
        };
    }
}