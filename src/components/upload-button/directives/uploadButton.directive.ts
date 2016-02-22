/**
 * Created by Steve on 14/02/2016.
 */
module ngCropResize.uploadButton.directives {
    "use strict";

    import IUtilsService        = ngCropResize.utils.models.IUtilsService;
    import ICropDataService     = ngCropResize.cropData.models.ICropDataService;
    import ICrUploadButtonScope = ngCropResize.crUploadButton.models.ICrUploadButtonScope

    export class UploadButton implements angular.IDirective {

        public restrict     : string = "EA";
        public controller   : string = "";
        public controllerAs : string = "";
        public templateUrl  : string = "";
        public scope        : any = {
            id      :"@?",
            crSrc   :"@?"
        };

        public static Factory(){
            var directive = (crUtils           : IUtilsService,
                             crCropDataService : ICropDataService)=>
                new UploadButton(crUtils, crCropDataService);
            directive.$inject = ["crUtils", "crCropDataService"];
            return directive;
        }

        constructor(private crUtils           : IUtilsService,
                    private crCropDataService : ICropDataService){}

        link = ($scope   : ICrUploadButtonScope,
                $element : angular.IAugmentedJQuery,
                $attrs   : angular.IAttributes)=>{

            var directive = this,
                srcKey    = $scope.crSrc || $scope.id;

            if(srcKey){
                $element.on("change", onFileInputChange);
            }else{
                console.warn("'crUploadButton' not initialized with required 'id' or 'crSrc' attribute. \n" + $element + "\nwill have no functionality");
            }

            function onFileInputChange(e){
                var files       = this.files;
                for(var file in this.files){
                    if(files[file] instanceof Blob){
                        directive.crUtils.fileToBase64(files[file]).then((data)=>{
                            directive.crCropDataService.addModel(srcKey, data.info, data.data);
                        });
                    }
                }
            }
        };
    }
}