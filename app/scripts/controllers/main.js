'use strict';

/**
 * @ngdoc function
 * @name App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the App
 */
angular.module('App').controller('MainCtrl', [
  '$rootScope',
  '$scope',
  '$location',
  '$window',
  'utils',
  'AuthenticationService',
  'userService',
  'landingService',
  function ($rootScope, $scope, $location, $window, utils, AuthenticationService, userService, landingService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    if(!$window.sessionStorage.token){

      console.log( 'SCOPE > ', $scope );
      $scope.currentModule = {
        name: null,
        modal: {
          method: ''
        },
        type: 0
      };

      $scope.modalWindow = function(str){ 
        return landingService[str](str, $scope); 
      };

      $scope.login = function(){
          
          var user = $scope.user;
          
          // user.hash = utils.stringEncode(user.password);
          
          console.log( '|--------------------------------------|' );
          console.log( 'USER >> ', user );

          // growl.warning('Checking Your Credentials', { referenceId: 1, ttl: 15000 });

          userService.loginUser(user).then(function(){
              
              !$rootScope.assets ? $rootScope.assets = [] : null;
              AuthenticationService.isLogged = true;

              console.log( 'load environment...' );
              $location.url('/dashboard');

              /*
              growl.info('Loading Your Environment', {
                  referenceId: 1,
                  onopen: function(){ angular.element('#fmLogin').css('display', 'none'); }
              });
              
              growl.success('Logged In Successfully!', {
                  referenceId: 1,
                  onclose: function(){ $location.url('/dashboard'); }
              });
              */
              
          },
          function(error){
              AuthenticationService.isLogged = false;
              var msg = 'Error: ' + error;
              // utils.growlMessage('error', msg, 1);
          });

      }; 

    }
    else{
        $location.url('/dashboard');
    }

}]);
