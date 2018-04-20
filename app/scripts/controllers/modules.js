/**
 * @ngdoc function
 * @name App.controller:ModulesCtrl
 * @description
 * # AboutCtrl
 * Controller for all the Application Modules
 */
angular.module('App').controller('ModulesCtrl', [
    '$log',
    '$rootScope',
    '$scope',
    '$window',
    '$location',
    '$route',
    'base64',
    'moduleService',
    'contentService',
function ($log, $rootScope, $scope, $window, $location, $route, base64, moduleService, contentService) {
  'use strict';
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  $log.info( '$rootScope: ', $rootScope );
  $log.info( '$scope: ', $scope );

  $scope.logout = function () {
    base64.deleteJwtFromSessionStorage();
  };

  // BUILD THIS MODULE CONTENT
  if(!$window.sessionStorage.token){
    base64.deleteJwtFromSessionStorage();
  }
  else{

    $scope.isActive = function (path) {
      return ($location.path().indexOf(path) > -1);
    };

    $rootScope.profile = JSON.parse($window.sessionStorage.profile);
    $rootScope.credentials = JSON.parse($window.sessionStorage.credentials);
    $rootScope.modules = JSON.parse($window.sessionStorage.modules);
    $rootScope.system = JSON.parse($window.sessionStorage.system);
    // LOAD THIS MODULE
    moduleService.loadModule( $route, $scope ).then(function(){
      $log.info( 'currentModule: ', $scope.currentModule );

      // PULL THIS MODULE's DB ASSETS
      moduleService.activeModule( $route, $scope );

    });

  }

}]);
