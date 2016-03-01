/**
 * Created by Steve on 18/02/2016.
 */
module ngCropResize.cropArea.controllers {
    "use strict";

    import ICropAreaScope   = ngCropResize.crCropArea.models.ICropAreaScope;
    import ICropAreaService = ngCropResize.crCropArea.models.ICropAreaService;
    import ICropDataService = ngCropResize.cropData.models.ICropDataService;

    export class CropAreaController{

        private cachedModel : any;
        private $image      : angular.IAugmentedJQuery = angular.element('<img/>');
        private $cropWindow : angular.IAugmentedJQuery = angular.element('<div cr-crop-window></div>');

        static $inject = ["$scope", "$element", "$compile", "$rootScope", "crCropData", "crCropAreaService"];
        constructor(private $scope            : ICropAreaScope,
                    private $element          : angular.IAugmentedJQuery,
                    private $compile          : angular.ICompileService,
                    private $rootScope        : angular.IRootScopeService,
                    private crCropData        : ICropDataService,
                    private crCropAreaService : ICropAreaService){

            this.$image.on("load", this.onImageSrcChange);

            if($scope.crSrc){
                $scope.$watch(()=>{
                    return crCropData.croppedImageInfo
                },this.onCropDataChange,true);
            }
        }

        private onImageSrcChange = () =>{
            var crSrc        = this.$scope.crSrc,
                imgInfo      = this.crCropData.croppedImageInfo,
                context      = this.$scope.$canvas[0].getContext('2d'),
                $canvas      = this.$scope.$canvas,
                measurements = this.crCropAreaService.measureContext($canvas[0].offsetWidth,$canvas[0].offsetHeight, imgInfo[crSrc].width, imgInfo[crSrc].height);

            measurements.asArray.unshift(this.$image[0]);
            context.drawImage.apply(context, measurements.asArray);
            this.buildWindow();
        };

        private buildWindow = () =>{
            this.$compile(this.$cropWindow)(this.$rootScope.$new());
            this.$element.append(this.$cropWindow);
        };

        private onCropDataChange = () =>{
            var crSrc   = this.$scope.crSrc,
                imgInfo = this.crCropData.croppedImageInfo,
                imgData = this.crCropData.croppedImageData;

            if(crSrc && imgInfo[crSrc] && (imgInfo[crSrc] !== this.cachedModel)){
                this.cachedModel   = imgInfo[crSrc];
                this.$image.attr('src', imgData[crSrc].dataURL);
            }
        }
    }
}