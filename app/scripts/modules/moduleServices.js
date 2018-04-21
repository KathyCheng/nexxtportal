/**
 * @ngdoc service
 * @name App.moduleServices
 * @description
 * # moduleServices
 * Service in the App.
 *
 *  DASHBOARD.SERVICE IS TEMP FOR NOW
 *  BECAUSE WE'RE NOT YET PULLING THE DASHBOARD
 *  FROM THE DATABASE.
 *  ANY AREA WHERE THE DASHBOARD IS LISTED IS A HACK
 *  BECAUSE IT'LL BE RENDERED BY THE API - THIS ALLOWS
 *  FOR US TO DEAL W/ A THIRD-PARTY SOFTWARE INCLUSION
 *  ON THE SERVER IF WE CHOOSE TO
 */

/* ================================================
    Service to Manage Modules
================================================ */

angular.module('App.moduleServices', []).service('moduleService', [
    '$log',
    '$q', 
    '$rootScope',
    '$compile', 
    '$window',
    '$location',
    '$route',
    'AuthenticationService',
    'base64',
    'utils',
    'restAPI',
function($log, $q, $rootScope, $compile, $window, $location, $route, AuthenticationService, base64, utils, restAPI) {
    'use strict';
    
    return {
		
        /**
         * PAGING OPTIONS
         */
        modulePagingOptions: function(thisModule){
            var pagingOptions = {
                limit: 25,
                offset: 0,
                totalRecords: 0,
                page: 1,
                options: [10, 25, 50, 100, 150, 200],
                range: {
                    lower: 0,
                    upper: 25,
                    total: 0
                }
            };

            return pagingOptions;
        },

        // RELOAD MODULE ON PAGINATION CHANGES
        newPagingOptions: function( limit, offset, pageNumber, thisModule, moduleName, $scope ){

            var self = this, 
                upper = parseInt(limit*pageNumber) || 1, 
                lower = parseInt(upper-limit+1) || 1, 
                pagingOptions = {
                    limit: limit || 25,
                    offset: lower || 0,
                    page: pageNumber || 1,
                    options: $scope.currentModule.paging.options,
                    totalRecords: $scope.currentModule.paging.totalRcords,
                    range: {
                        lower: lower || 1,
                        upper: upper || 1,
                        total: $scope.currentModule.paging.totalRecords
                    }
                };

            $scope.currentModule.paging = pagingOptions;
            $window.sessionStorage.paging = JSON.stringify( $scope.currentModule.paging );
        },

        /**
         * @menu
         */
        loadModule: function( $route, $scope ){

            if($window.sessionStorage.token){

                var self = this, 
                    path = $location.path().split('/'),
                    idx = $window.sessionStorage.idx,
                    modules = JSON.parse($window.sessionStorage.modules),
                    profile = JSON.parse($window.sessionStorage.profile),
                    credentials = JSON.parse($window.sessionStorage.credentials),
                    currentModule = {}, 
                    deferred = $q.defer(), 
                    i = 0;

                path.shift(); // first element is null

                if(!$rootScope.assets){ $rootScope.assets = []; } 

                // DEFINE CURRENT MODULE
                // var modules = $rootScope.modules;
                $log.info( 'Modules : ', modules );
                for( i = 0; i < modules.length; i++ ){

                    if(modules[i].name.toLowerCase() === path[0]){

                        currentModule = { 
                            id: modules[i].id, 
                            name: modules[i].name, 
                            // ico: modules[i].ico, 
                            // type: modules[i].type,
                            paging: {}
                            // hwh: false
                        };

                        currentModule.permissions = $rootScope.credentials;
                        $scope.currentModule = currentModule;
                    }
                }

                deferred.resolve(currentModule);
                return deferred.promise;

            }
            else{
                base64.deleteJwtFromSessionStorage();
            }
        },

        /**
         * LOAD ASSETS FOR ACTIVE MODULE
         */
        activeModule: function( $route, $scope ){

            var self = this, 
                deferred = $q.defer(),
                thisModule = $scope.currentModule,
                moduleName = thisModule.name.toLowerCase(),
                moduleType = 1,
                idx = parseInt($window.sessionStorage.idx),
                pagingOptions = {},
                filterOptions = {};

            // SET UP QUERY OPTIONS
            !$window.sessionStorage.paging ? 
                pagingOptions = this.modulePagingOptions(thisModule) :
                pagingOptions = JSON.parse( $window.sessionStorage.paging );

            thisModule.paging = pagingOptions;

            var moduleData = {
                module: moduleName,
                type: moduleType,
                paging: pagingOptions,
                filters: filterOptions,
                organization: JSON.parse($window.sessionStorage.organization).id,
                token: $window.sessionStorage.token.toString()
            };

            var modalExists = angular.element('div.modal').length;

            if( modalExists === 1 ){
                angular.element( 'div.modal-dialog').show();
            }
            else{
                if( moduleName === 'dashboard' ){
                    $log.info( 'LOAD DASHBOARD' );
                    /*
                    dashboardService.config($scope).then(function(results){

                        var templates = [];

                        $scope.dashboard = results;
                        $window.sessionStorage.paging = JSON.stringify( pagingOptions );

                        templates['header'] = ''; templates['footer'] = '';
                        templates['body'] = dashboardService.templates();

                        deferred.resolve(templates);
                    }, function(error){

                        console.log( '|--------------------------------------|' );
                        console.log( 'ERROR >> ', error );
                    });
                    */
                }
                else{
                    $log.info( 'moduleData : ', moduleData );

                    restAPI.getModules.query(moduleData, function(results){
                        
                        $log.info( '|--------------------------------------|' );
                        $log.info( moduleName + ' RESULTS >> ', results );

                        /*
                        var totalRecords = parseInt(results[0].rows[moduleName].totalRecords.count);
                        
                        $log.info( 'TOTAL-RECORDS >> ', totalRecords );

                        totalRecords >= 0 ? 
                            $window.sessionStorage.totalRecords = totalRecords :
                            $window.sessionStorage.totalRecords = 0;
                        
                        moduleType === 3 ? 
                            $rootScope.assets[moduleName] = results[0].rows[moduleName].assets : 
                            $rootScope.assets[moduleName] = results[0].rows[moduleName].assets[moduleName];
                        
                        if( moduleType === 3 ){
                            // REBUILD FILTERS
                            var filters = results[0].filter, 
                                filterObject = {};

                            for(var i = 0; i < filters.length; i++ ){
                                var obj = JSON.parse( filters[i] );
                                filterObject[obj.alias] = obj;   
                            }
                            
                            thisModule.report = {};
                            thisModule.report = filterObject;
                            
                            var dateRange = utils.parseDateRange(filterObject.range.value);
                            thisModule.report.range = dateRange;
                            
                            $scope.filterItems = filterObject;
                            $window.sessionStorage.filterOptions = JSON.stringify(filterObject);
                            $window.sessionStorage.filters = JSON.stringify(filterObject);
                            
                            self.setDateRange( $scope );
                        }

                        $window.sessionStorage.paging = JSON.stringify( pagingOptions );
                        deferred.resolve( results[0].rows[moduleName] );
                        */

                    });

                }
            }

            return deferred.promise;
        }

    };
}]);
// @EoF

