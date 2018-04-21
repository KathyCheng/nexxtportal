/**
 * @ngdoc overview
 * @name App
 * @description
 * # App
 *
 * Main module of the application.
 */
angular.module('App', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-growl',
    /* ACL COMPONENTS */
    'App.authServices',
    'App.base64Services', // jwtService.js
    'App.apiServices',
    /* MODULES */
    'App.landingServices',
    'App.userServices',
    'App.moduleServices',
    'App.contentServices',
    /* DOM */
    'App.modalServices',
])
.config([
    'growlProvider',
    '$httpProvider', 
    '$locationProvider', 
    '$routeProvider', 
function (growlProvider, $httpProvider, $locationProvider, $routeProvider) {
    'use strict';

    // manage GROWL Notification Messages
    growlProvider.globalTimeToLive({
        success: 2000,
        error: 2000,
        warning: 3000,
        info: 5000
    })
    .globalInlineMessages(false)
    .globalPosition('top-right')
    .globalDisableIcons(false);

    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push('authInterceptor');

    $locationProvider.html5Mode(true).hashPrefix('!');
    if (window.history && window.history.pushState) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        }).hashPrefix('!');
    }

    // console.log( 'httpProvider: ', $httpProvider );
    // console.log( 'locationProvider: ', $locationProvider );

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        resolve: {
          app: function ($q, $timeout) {
              var defer = $q.defer();
              $timeout(function () {
                  defer.resolve();
              });
              return defer.promise;
          }
        },
        access: {
            requireLogin: false
        }
      })
      .when('/:module', {
        templateUrl: 'views/modules/index.html',
        controller: 'ModulesCtrl',
        controllerAs: 'app',
        resolve: {
          app: function ($q, $timeout) {
              var defer = $q.defer();
              $timeout(function () {
                  defer.resolve();
              });
              return defer.promise;
          }
        },
        access: {
            requireLogin: true
        }
      })
      .otherwise({
        redirectTo: '/'
      });
}])
.run([
  '$rootScope',
  '$route','$http',
  '$location',
  '$window', 
  'AuthenticationService',
  function ($rootScope, $route, $http, $location, $window, AuthenticationService) {

    // DISABLE BUTTON ON CLICK FOR ALL XHR CALLS
    $http.defaults.transformRequest.push(function (data) {
        $rootScope.disableButton = true;
        angular.element('.loading-spinner-holder').show();
        return data;
    });
    // ENABLE BUTTONS ON XHR COMPLETION
    $http.defaults.transformResponse.push(function (data) {
        $rootScope.disableButton = false;
        angular.element('.loading-spinner-holder').hide();
        return data;
    });

    $rootScope.$on('$routeChangeStart', function (event, nextRoute) {

      if ( nextRoute !== null &&
          nextRoute.access !== null &&
          !AuthenticationService.isLogged &&
          !$window.sessionStorage.token) {
          $location.path('/');
      }

    });

}]);