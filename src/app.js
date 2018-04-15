import angular from 'angular';
import ngRoute from 'angular-route';
import io from 'socket.io-client';

import * as jQuery from 'jquery';
import 'bootstrap/dist/js/bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.pro.css';
import '@mdi/font/css/materialdesignicons.min.css';
import './css/customStyles.css';

window.io = io;

const MODULE_NAME = 'webinterface';

const app = angular.module(MODULE_NAME, ['ngRoute']);

let controllerContext = require.context("./controllers", true, /^.*\.js$/);
controllerContext.keys().forEach(function (controllerPath) {
    let controllerName = controllerPath.replace("./", "").replace(".js", "");
    app.controller(controllerName, require("./controllers/" + controllerName));
});

let directiveContext = require.context("./directives", true, /^.*\.js$/);
directiveContext.keys().forEach(function (directivePath) {
    let directiveName = directivePath.replace("./", "").replace(".js", "");
    app.directive(directiveName, require("./directives/" + directiveName));
});

app.config([
    "$routeProvider",
    "$locationProvider",
    function ($routeProvider, $locationProvider) {
        let directiveContext = require.context("./views", true, /^.*\.js$/);
        directiveContext.keys().forEach(function (directivePath) {
            let directiveName = directivePath.replace("./", "").replace(".js", "");
            let template = require("./views/" + directiveName);
            $routeProvider.when(template[0], template[1]);
        });
        $locationProvider.html5Mode({enabled: true, requireBase: false});
    }
]);

app.filter('filenames', function() {
    return function(input) {
        return input.replace('.', '_');
    };
});

angular.element(function () {
    angular.bootstrap(document, [MODULE_NAME]);
});
