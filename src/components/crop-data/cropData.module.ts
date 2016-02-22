/**
 * Created by Steve on 18/02/2016.
 */
/// <reference path="./services/crop-data.service.ts" />
module ngCropResize.cropData {
    angular.module("ngCropResize.crCropData", [])
        .service("crCropDataService", services.CropDataService);
}