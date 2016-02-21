/**
 * Created by Steve on 20/02/2016.
 */
/// <reference path="./utils.controller.ts" />
/// <reference path="./utils.directive.ts" />
/// <reference path="./utils.filter.ts" />
/// <reference path="./utils.service.ts" />
module ngCropResize.utils {
    angular.module("utils.module", [])
        .controller("utilsController", app.controllers.AngularController)
        .directive("utilsDirective", app.directives.AngularDirective.Factory())
        .service("utilsService", app.services.AngularService)
        .filter("utilsFilter", app.filters.AngularFilter);
}