/**
 * GENERAL JSON OBJECT BUTTON EVENT
 */

angular.module('App').factory('buttons', function( $rootScope, utils ){

    'use strict';
    
    return {

        // VIEW RECORD BUTTON 
        viewButton: function(){
            var btn = '<button type="button" class="btn btn-xs"';
            btn += ' data-id="view"';
            btn += ' data-ng-click="button($index, $event)"';
            btn += ' data-ng-disabled="disableButton">';
            btn += '<i class="fa fa-eye"></i></button>';
            return btn;
        },

        // EDIT RECORD BUTTON
        editButton: function(){
            var btn = '<button type="button" class="btn btn-xs"';
            btn += ' data-id="edit"';
            btn += ' data-ng-click="button($index, $event)"';
            btn += ' data-ng-disabled="disableButton"';
            btn += ' style="margin-top: 5px;">';
            btn += '<i class="fa fa-pencil"></i></button>';
            return btn;
        },

        // DELETE RECORD BUTTON
        deleteButton: function(){
            var btn = '<button type="button" class="btn btn-sm"';
            btn += ' data-id="delete"';
            btn += ' data-ng-click="button($index, $event)"';
            btn += ' data-ng-disabled="disableButton">';
            btn += '<i class="fa fa-trash-o"></i></button>';
            return btn;
        },
        
        modalClose: function(){
            var btn = '<button class="btn btn-sm btn-default" data-dismiss="modal" data-ng-click="resetModal();">';
            btn += '<i class="fa fa-times"></i> cancel</button>';
            return btn;
        },
        
        modalTimesClose: function(){
            var btn = '<button type="button" class="close" data-dismiss="modal" aria-label="Close"';
            btn += ' data-ng-click="closeModal();">';
            btn += '<span aria-hidden="true"><i class="fa fa-times"></i></span></button>';
            return btn;
        },
        
        modalSubmit: function( moduleName, moduleMethod ){
            var btn = '<button class="btn btn-sm btn-primary"';
            moduleName === 'login' ? 
                btn += ' data-ng-click="login()">' : 
                btn += ' data-ng-click="modalSubmit(\'' + moduleMethod + '\');">';
            btn += '<i class="fa fa-save"></i>';
            btn += ' <small>' + utils.stringCapitalise(moduleMethod.replace(/_/g, ' '));
            btn += ' ' + utils.stringCapitalise(moduleName.replace(/_/g, ' '));
            btn += '</small></button>';
            return btn;
        },
        
        modalExit: function(){
            var btn = '<button type="button" class="btn btn-sm btn-default"';
            btn += ' data-dismiss="modal" aria-label="Close" data-ng-click="closeModal();">';
            btn += '<span aria-hidden="true"><i class="fa fa-times"></i> Close</span></button>';
            return btn;
        },
        
    };

});
