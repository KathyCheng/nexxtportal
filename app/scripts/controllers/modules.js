'use strict';

/**
 * @ngdoc function
 * @name App.controller:ModulesCtrl
 * @description
 * # AboutCtrl
 * Controller for all the Application Modules
 */
angular.module('App').controller('ModulesCtrl', [
    '$rootScope',
    '$scope',
    'base64',
function ($rootScope, $scope, base64) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  console.log( '$rootScope: ', $rootScope );
  console.log( '$scope: ', $scope );

  $scope.logout = function () {
    base64.deleteJwtFromSessionStorage();
  };

    
}]);
