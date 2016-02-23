/**
 * Created by Steve on 20/02/2016.
 */
/// <reference path="./services/utils.service.ts" />
module ngCropResize.utils {
    angular.module("ngCropResize.crUtils", [])
        .service("crUtils", services.UtilsService);
}