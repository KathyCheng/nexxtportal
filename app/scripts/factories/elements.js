/**
 * elements factory added to $scope
 * added on 2016-02-12 - James Mendham
 */
angular.module('App').factory('elements',[
    '$compile',
    'utils',
function($compile, utils){
	'use strict';
	
    return {
        
        // COMPILE HTML STRING > INSERT
        insertHTML: function(str, $scope){ angular.element('#insertModule').html($compile(str)($scope)); }

    };
    
}]);