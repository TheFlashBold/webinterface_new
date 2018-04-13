import angular from 'angular';
import io from 'socket.io-client';

window.io = io;

import './css/maed.min.css';
import './css/material-design-iconic-font.min.css';
import './css/animate.min.css';

const MODULE_NAME = 'webinterface';

const app = angular.module(MODULE_NAME, []);


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

angular.element(function () {
    angular.bootstrap(document, [MODULE_NAME]);
});
