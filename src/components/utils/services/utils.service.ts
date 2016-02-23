/**
 * Created by Steve on 20/02/2016.
 */
module ngCropResize.utils.services {
    "use strict";

    import IUtilsService = ngCropResize.utils.models.IUtilsService;

    export class UtilsService implements IUtilsService {

        public static $inject = ["$rootScope", "$q"];

        constructor(private $rootScope : angular.IRootScopeService,
                    private $q         : angular.IQService) {
        }

        public fileToBase64 = (file:any) => {
            var defer     = this.$q.defer(),
                reader    = new FileReader();
            reader.onload = (e)=>{
                this.onReaderLoad(e, file, defer);
            };
            reader.readAsDataURL(file);
            return defer.promise;
        };

        public fileDataObject = (file, base64String) =>{
            return {
                blob    : file,
                dataURL : base64String
            }
        };

        public fileInfoObject = (file, base64String) =>{
            var image = document.createElement('img');

            image.src = base64String;

            return {
                name   : file.name,
                type   : file.type,
                size   : file.size,
                width  : image.width,
                height : image.height
            }
        };

        private onReaderLoad =(e, file:any, defer:angular.IDeferred)=>{
            var base64String = e.target.result;
            defer.resolve({
                info:this.fileInfoObject(file, base64String),
                data:this.fileDataObject(file, base64String)
            });
        }
    }
}