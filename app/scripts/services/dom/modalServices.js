/**
 * @ngdoc service
 * @name App.modalServices
 * @description
 * # generatePDF
 * Service in the clientApp.modalService
 */
angular.module('App.modalServices',[]).service('modalService', function ($q, $compile, utils, buttons){
    'use strict';
    
    return {
        
        closeModal: function(){
            angular.element('.modal').remove();
        },
        
        launchModal: function( $scope ){
            
            console.log( '|----------------------------------------|' );
            console.log( 'launchModal.$scope', $scope );
            
            var self = this, 
                modalHeader = '', modalBody = '', modalFooter = '',
                thisModule = $scope.currentModule,
                moduleName = thisModule.name,
                moduleMethod = thisModule.modal.method,
                moduleType = thisModule.type,
                status = 0;
            
            // PROTOTYPE HIJACK OF MODAL WINDOW ATTRIBUTES
            Element.prototype.setAttributes = function(attrs){
                for (var idx in attrs) {
                    if ((idx === 'styles' || idx === 'style') && typeof attrs[idx] === 'object') {
                        for (var prop in attrs[idx]){this.style[prop] = attrs[idx][prop];}
                    } else if (idx === 'html') {
                        this.innerHTML = attrs[idx];
                    } else {
                        this.setAttribute(idx, attrs[idx]);
                    }
                }
            };
            
            modalHeader += '<div class="modal-dialog modal-lg" data-backdrop="static" data-keyboard="false">';
            modalHeader += '<div class="modal-content">';
            modalHeader += '<div class="modal-header">';
            
            modalHeader += '<span class="pull-right">' + buttons.modalTimesClose();
            modalHeader += '<div growl inline="false" reference="3"/>';
            
			modalHeader += '</span><h4 class="modal-title">';
			modalHeader += '</span><h4 class="modal-title clearfix">';
			modalHeader += '<div class="modal-spinner-holder pull-left" style="display:none" data-loading>';		
			modalHeader += '<div class="modal-spinner">';		
			modalHeader += '<i class="fa fa-spinner fa-pulse fa-1x fa-fw margin-bottom"></i>';		
			modalHeader += '</div></div>';
			modalHeader += utils.stringCapitalise(moduleMethod + ' ' + moduleName);
			modalHeader += '</h4></div>';
            
            modalBody += '<div class="modal-body container-fluid" id="modalContainer" bs-affix-target>';
            modalBody += '</div>';

            modalFooter += '<div class="modal-footer">';

            modalFooter += buttons.modalClose();
            modalFooter += buttons.modalSubmit(moduleName,moduleMethod);
            
            modalFooter += '</div></div></div>';
            
            var modal = modalHeader + modalBody + modalFooter,
                id = utils.camelCase(moduleName + '-' + moduleMethod);
            
            var div = document.createElement('div');
            div.setAttributes({ 
                class: 'modal fade',role: 'document',
                style: {display: 'none'}
            });
            
            div.appendChild(document.createDocumentFragment(modal));
            angular.element('div#wrap').append($compile(div)($scope));
            angular.element('div.modal').html($compile(modal)($scope));
            angular.element('div.modal')
            .modal()
            .on('hidden.bs.modal', function(e){ 
                self.closeModal(); 
            });
        }
        
    };
    
});