/**
 * Resource Service for all API Calls
 * Migrated from personal project
 * James Van Leuven
 * Created: 2014-06-27
 * Migrated: 2018-04-04
 */

angular.module('App.apiServices', [])
.service('restAPI', function($rootScope, $http, $window, $location, $resource) {
    'use strict';
    var api = 'http://localhost:5001/', 
        token = $window.sessionStorage.token;
    
    $http.defaults.headers.common['X-Auth-Token'] = token;

    return {
        
        // USER LOGIN
        userLogin: $resource(api + 'auth/login', { 
            email: '@email', 
            passwd: '@passwd'
        },{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
            },
            contentType: "application/json",
            isArray: true
        }),
        
        /*****************************************************************/
        // GET REQUEST
        getModules: $resource(api + 'api/:module/:table', { 
            module: '@module',
            table: '@table',
            params: '@params'
        },{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
            },
            withCredentials: true,
            isArray: true
        }),
        
        /****************************************************************/
        getSchema: $resource(api + 'api/schema', {
            module: '@module',
            table: '@table',
            params: '@params'
        },{
            method: 'GET',
            withCredentials: true,
            isArray: true
        }),
        /*
        getResource: $resource('/api/resource', {
            module: '@module',
            table: '@table',
            params: '@params'
        },{
            method: 'GET', 
            withCredentials: true,
            isArray: false
        }),
        */
        
        /****************************************************************/
        postTransaction: $resource(api + '/api/:module/:method', {
            module: '@module',
            method: '@method',
            params: '@params'
        },{
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            contentType: "application/json",
            withCredentials: true,
            isArray: false
        }),
        
    };

});