'use strict';

/**
 * @ngdoc function
 * @name App.controller:ModulesCtrl
 * @description
 * # AboutCtrl
 * Controller for all the Application Modules
 */
angular.module('App')
  .controller('ModulesCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    console.log( 'MODULES CONTROLLER INSTANTIATED' );
  });
