'use strict';
var GulpConfig = (function () {
    function GulpConfig() {

        this.debug               = './debug/';
        this.dist                = './dist/';
        this.source              = './src/';
        this.testsDir            = './test/';
        this.typings             = './tools/typings/';
        this.application         = this.source + 'app.js';
        this.assets              = this.source + 'assets/';
        this.bowerFilesSettings  = {};
        this.libraryTypeScriptDefinitions   =   this.typings + '**/*.ts';
        this.appTypeScriptReferences        =   this.typings + 'typescriptApp.d.ts';

        this.scss = [
            this.source + "*.scss",
            this.source + "**/*.scss"
        ];

        this.javascript = [
            "!" + this.source + "sourceBundle.js",
            "!" + this.source + '**/*.test.js',
            this.source + '*.js',
            this.source + '**/*.js'
        ];

        this.typescript = [
            "!" + this.source + '**/*.test.ts',
            this.source + '*.ts',
            this.source + '**/*.ts'
        ];

        this.allTypeScriptFiles = [].concat(this.typescript)
            .concat(this.libraryTypeScriptDefinitions)
            .concat(this.appTypeScriptReferences);

        this.images = [
            this.assets + '**/*.gif',
            this.assets + '**/*.tiff',
            this.assets + '**/*.bmp',
            this.assets + '**/*.png',
            this.assets + '**/*.jpg',
            this.assets + '**/*.jpeg'
        ];

        this.html = [
            this.source + "**/*.html",
            "!" + this.source + "index.html"
        ];

        this.index = [
            this.source + "index.html"
        ];

        this.testIndexName   = "SpecRunner.html";
        this.testIndex       = this.source + this.testIndexName;
        this.testSourceFiles = this.source + "sourceBundle.js";
        this.tests           = [
            this.source + '**/*.test.js'
        ];

    }
    return GulpConfig;
})();
module.exports = GulpConfig;