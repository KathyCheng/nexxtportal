/**
 * @ngdoc service
 * @name clientApp.contentServices
 * @description
 * # contentServices
 * Service in the App.
 */

/* ================================================
    Service to Manage Modules
================================================ */

angular.module('App.contentServices', []).service('contentService', [
    '$log',
    '$rootScope', 
    '$q', 
    '$timeout', 
    '$window', 
    '$location',
    '$route', 
    '$compile', 
    'utils', 
    'elements',
    'moduleService',
function($log, $rootScope, $q, $timeout, $window, $location, $route, $compile, utils, elements, moduleService) {
    'use strict';

    return {
        
        // RELOAD MODULE ON PAGINATION CHANGES
        newPagingOptions: function( $scope ){
            
            console.log( '|-------------------------------------|' );
            console.log( 'SCOPE >> ', $scope ); 
            
            var self = this,
                pagingOptions = $scope.$parent.currentModule.paging,
                upper = pagingOptions.limit*pagingOptions.page,
                lower = parseInt(upper - pagingOptions.limit );
            
            pagingOptions.range.lower = lower;
            pagingOptions.range.upper = upper;
            pagingOptions.range.total = pagingOptions.totalRecords;
            pagingOptions.offset = lower;
            
            $scope.$parent.currentModule.paging = pagingOptions;
            $window.sessionStorage.paging = JSON.stringify( $scope.currentModule.paging );

            self.loadModule( $route, $scope );
        },
		
        //  INSERT CONTENT HTML
        loadContent: function( $route, $scope ){
            var str = '', 
                thisModule = $scope.currentModule,
                credentials = JSON.parse($window.sessionStorage.credentials),
                role = parseInt(credentials.group_id), 
                moduleName = angular.lowercase($scope.currentModule.name),
                moduleType = parseInt($scope.currentModule.type),
                manufacturer = parseInt($window.sessionStorage.establishment),
                manufacturers = $rootScope.profile.manufacturers,
                adminBtn = '<div data-ng-include="\'views/modules/_partials/_viewbuttons_admin.html\'"/>', 
                usrBtn = '<div data-ng-include="\'views/modules/_partials/_buttons/_viewbuttons.html\'"/>';
                
            viewService.viewBuild($route, $scope).then(function(success){

                // role === 1 && moduleName === 'products' ? 
                //    success.content.length > 0 ? 
                //        str += adminBtn + success.content : str += usrBtn : 
                str += usrBtn + success.content;
                // confirm socket connection
                // channels.connection( $route, $scope );
                // compile and load html results
                elements.insertHTML(str, $scope);
            }, function(error){
                console.log('viewServices.viewBuild Error', error);
            });
        }, 
        
        loadError: function( $route, $scope, error ){
            errorService.contentError( $route, $scope, error ).then(function(success){
                $scope.currentModule.paging.totalRecords = 0;
                var str = success.content;
                elements.insertHTML(str.replace('NaN',''), $scope);
            }, function(error){
                $log.info('viewServices.viewBuild Error', error);
            });
        }
    };

}]);
// @EoF