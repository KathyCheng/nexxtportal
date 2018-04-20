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
    '$window',
    '$location',
    '$route',
    'base64',
    'moduleService',
    'contentService',
function ($rootScope, $scope, $window, $location, $route, base64, moduleService, contentService) {
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

  // BUILD THIS MODULE CONTENT
  if ($rootScope.profile) {
    // LOAD THIS MODULE
    moduleService.loadModule( $route, $scope );
  } 
  else {
    $rootScope.profile = JSON.parse($window.sessionStorage.profile);
    $rootScope.credentials = JSON.parse($window.sessionStorage.credentials);
    $rootScope.modules = JSON.parse($window.sessionStorage.modules);
    $rootScope.system = JSON.parse($window.sessionStorage.system);
    // LOAD THIS MODULE
    moduleService.loadModule( $route, $scope );
  }

  $scope.isActive = function (path) {
    return ($location.path().indexOf(path) > -1);
  };



    
}]);
