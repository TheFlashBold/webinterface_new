import angular from 'angular';

import webinterfaceCtrl from './controller/webinterface';

import login from './directives/login';
import formInput from './directives/formInput';
import dropdown from './directives/dropdown';
import dropdownProfile from './directives/dropdownProfile';

import './css/maed.min.css';
import './css/material-design-iconic-font.min.css';
import './css/animate.min.css';

const MODULE_NAME = 'webinterface';

angular.module(MODULE_NAME, [])
    .controller('webinterfaceCtrl', webinterfaceCtrl)
    .directive('formInput', formInput)
    .directive('dropdown', dropdown)
    .directive('dropdownProfile', dropdownProfile)
    .directive('login', login);

angular.element(function() {
    angular.bootstrap(document, [MODULE_NAME]);
});
