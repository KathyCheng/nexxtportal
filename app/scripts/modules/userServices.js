'use strict';

/**
 * User Login Services
 * Migrated from personal project
 * James Mendham
 * Created: 2013-11-22
 * Migrated: 2018-04-17
 *
 * to manage a users login, password recovery, and 
 * new user registration
 */

angular.module('App.userServices', []).service('userService', [
    '$http',
    '$q',
    '$window',
    '$location',
    '$cookies',
    'restAPI',
    'base64',
    '$rootScope',
    'AuthenticationService',
    'utils',
function($http, $q, $window, $location, $cookies, restAPI, base64, $rootScope, AuthenticationService, utils) {

    return {

        /**
         * @LoggedOnAlreadyMsg
         * User is already logged in
         */
        loggedOnAlreadyMsg : function() {
            //Request
            base64.getJwtProfile().then(function() {

                $location.url('/#!/dashboard');
                return this;

            });
        },

        /**
         * @loginUser
         * Existing user login
         */
        loginUser : function(user){

            var deferred = $q.defer();

            restAPI.userLogin.save(user, function(res){
                
                console.log( 'login form', user );
                console.log('login response', res);
                
                var results = res;
                
                console.log( '|----------------------------------------|' );
                console.log( 'USER-SERVICE.RESTAPI-USER-LOGIN.RESPONSE >> ', JSON.stringify(res) );
                console.log( '|----------------------------------------|' );
                console.log( 'RESULTS >> ', results );

                // FAILED RESPONSE
                if(results.status === 401){ utils.growlMessage('warning', results.msg, 1); }
                if(results.status === 500){ utils.growlMessage('error', results.msg, 1); }
                
                // SUCCESS RESPONSE
                if(results.status === 200){

                    base64.saveJwtToSessionStorage(results.token);
                    var acl = results.payload;

                    $rootScope.credentials = acl.permissions;
                    $rootScope.system = acl.system;
                    $rootScope.assets = [];
                    $rootScope.organization = acl.organization;
                    $rootScope.profile = acl.profile;
                    $rootScope.modules = acl.modules;

                    $window.sessionStorage.profile = JSON.stringify($rootScope.profile);
                    $window.sessionStorage.credentials = JSON.stringify($rootScope.credentials);
                    $window.sessionStorage.organization = JSON.stringify($rootScope.organization);
                    $window.sessionStorage.modules = JSON.stringify($rootScope.modules);

                    deferred.resolve(res);
                }
            });

            return deferred.promise;

        },
		
        /**
         * @logoutUser
         * Clear cookies, localStorage, sessionStorage
         * for existing user
         * redirect back to login page
         */
        logoutUser : function() { 
            var deferred = $q.defer();
            deferred.resolve('Successfully logged out!');
        
            AuthenticationService.isLogged = false;

            $rootScope.permissions.destroy();
            $rootScope.credentials.destroy();
            $rootScope.profile.destroy();
            $rootScope.locations.destroy();
            $rootScope.modules.destroy();
            $rootScope.env.destroy();
            $window.sessionStorage.destroy();
            $cookies.remove('x-token'); delete $cookies['x-token'];

            $window.location.href = $window.location.origin;

            return deferred.promise;
        }
    };  //@END return()
}]); //@ EOF