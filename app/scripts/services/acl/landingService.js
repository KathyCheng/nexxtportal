/**
 * Resource Service for all landing Page Calls
 * Migrated from personal project
 * James Van Leuven
 * Created: 2014-06-27
 * Migrated: 2018-04-04
 */

angular.module('App.landingServices', []).service('landingService', [
    '$rootScope',
    '$compile',
    '$q',
    'utils',
    'elements',
    'modalService',
function($rootScope, $compile, $q, utils, elements, modalService) {
    'use strict';
    return {

        form: function(str, html){

            var form = '';
            form += '<div class="row"><form class="form-horizontal" name="frm';
            form += utils.stringCapitalise(str) + '" id = "frm' + utils.stringCapitalise(str);
            form += '" novalidate data-ng-show="!AuthenticationService.isLogged"';
            form += 'ng-submit="login()" autocomplete="false">';
            form += html;
            form += '</form></div>';

            return form;

        },

        login: function(str, $scope){

            $scope.user = {
                email: null,
                passwd: null
            };
            console.log( 'landingService.' + str );
            $scope.currentModule.name = str;

            modalService.launchModal($scope);

            var self = this, 
                html = '';
            
            html += '<input type="email" style="display:none;"/>';
            html += '<input type="password" style="display:none;"/>';
            html += '<div growl inline="false" reference="1"></div>';
            html +='<div id="fmLogin" class="col-sm-12"><div class="form-group"><div class="col-sm-2">';
            html += '<label for="email">Email</label></div><div class="col-sm-6">'
            html += '<input type="email" name="email" class="form-control" data-ng-model="user.email"';
            html += ' data-ng-required="true" autocomplete="false" placeholder="Email Address"/>';
            html += '</div></div><div class="form-group"><div class="col-sm-2">';
            html += '<label for="password">Password</label></div><div class="col-sm-6">'
            html += '<input type="password" name="passwd" class="form-control" data-ng-model="user.passwd"';
            html += ' data-ng-required="true" autocomplete="false" placeholder="Password"/></div></div>';
            
            angular.element('#modalContainer').html( $compile(self.form(str, html))($scope) );
        },

        register: function(str, $scope){
            console.log( 'landingService.' + str );
            $scope.currentModule.name = str;
            modalService.launchModal($scope);
            angular.element('#modalContainer').html('Load the ' + str );
        },

        contact: function(str, $scope){
            console.log( 'landingService.' + str );
            $scope.currentModule.name = str;
            modalService.launchModal($scope);
            angular.element('#modalContainer').html('Load the ' + str );
        }

    };

}]);