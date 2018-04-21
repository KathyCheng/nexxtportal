/**
 * @ngdoc function
 * @name App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the App
 */
angular.module('App').controller('MainCtrl', [
    '$log',
    '$rootScope',
    '$scope',
    '$location',
    '$window',
    'utils',
    'AuthenticationService',
    'userService',
    'landingService',
    'growl',
function ($log, $rootScope, $scope, $location, $window, utils, AuthenticationService, userService, landingService, growl) {
    'use strict';

    this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];

    if(!$window.sessionStorage.token){

    $log.info( 'SCOPE > ', $scope );
    $scope.currentModule = {
        name: null,
        modal: { 
            method: 'get'
        },
        type: 0 
    };

    $scope.modalWindow = function(str){ 
        return landingService[str](str, $scope); 
    };

    $scope.login = function(){
        
        var user = $scope.user;
        
        // user.hash = utils.stringEncode(user.password);
        
        $log.info( '|--------------------------------------|' );
        $log.info( 'USER >> ', user );

        growl.warning('Checking Your Credentials', { referenceId: 1, ttl: 3000 });

        userService.loginUser(user).then(function(){
            
            if(!$rootScope.assets){ $rootScope.assets = []; }
            AuthenticationService.isLogged = true;

            $log.info( 'load environment...' );

            growl.info('Loading Your Environment', {
                referenceId: 1,
                onopen: function(){ angular.element('#fmLogin').css('display', 'none'); }
            });

            growl.success('Logged In Successfully!', {
                referenceId: 1,
                onclose: function(){ $window.location.href = '/dashboard'; }
            });
        },
        function(error){
            AuthenticationService.isLogged = false;
            var msg = 'Error: ' + error;
            utils.growlMessage('error', msg, 1);
        });

    }; 

    }
    else{
        $location.url('/dashboard');
    }

}]);
