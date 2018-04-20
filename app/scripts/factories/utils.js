/**
 * utility helper functions added to $scope
 * added on 2015-05-14 - James Van Leuven
 *  --------------------
 *  Validation RegExp
 *  --------------------
 *  1: generic email
 *  2: cdn/usa phone number
 *  3: uk phone number
 *  4: eu phone number
 *  5: usa zipcode
 *  6: cdn postalcode
 *  7: uk postalcode
 *  8: strong password
 *  --------------------
 *  9: growl utility
 *  --------------------
 * 10: replace all instances of a character in a string
 * 11: round up number with decimal float
 */

angular.module('App').factory('utils', function( $q, $window ){
    'use strict';
    
    return {
		
        /**
         * generic email regex pattern
         */
        validateEmail: function(str){
            var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return emailPattern.test(str);
        },
		
        /**
         * generic north america phone regex pattern
         */
        validateNAPhone: function(str){
            var phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            return phonePattern.test(str);
        },
		
        /**
         * generic united kingdom phone regex pattern
         */
        validateUKPhone: function(str){
            var phonePattern = /^\s*\(?(020[7,8]{1}\)?[ ]?[1-9]{1}[0-9{2}[ ]?[0-9]{4})|(0[1-8]{1}[0-9]{3}\)?[ ]?[1-9]{1}[0-9]{2}[ ]?[0-9]{3})\s*$/;
            return phonePattern.test(str);
        },
		
        /**
         * generic european phone regex pattern (france as default)
         */
        validateEUPhone: function(str){
            var phonePattern = /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/;
            return phonePattern.test(str);
        },
		
        /**
         * generic USA zipcode regex pattern
         */
        validateZipCode: function(str){
            var zipcodePattern = /(\d{5}([\-]\d{4})?)/;
            return zipcodePattern.test(str);
        },
		
        /**
         * generic Canadian postal code regex pattern
         */
        validateCDNPostalCode: function(str){
            var postalcodePattern = /[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]/;
            return postalcodePattern.test(str);
        },
		
        /**
         * generic united kingdom postal code regex pattern
         */
        validateUKPostalCode: function(str){
            var postalcodePattern = /[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? [0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}/;
            return postalcodePattern.test(str);
        },
		
        /**
         * password regex pattern for required:
         * 1: 8 characters minimum
         * 2: lowercase characters
         * 3: UPPERCASE characters
         * 4: Special Characters
         * 5: Numeric characters
         */
        validatePassword: function(str){
            var passwordPattern = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
            return passwordPattern.test(str);
        },

        /**
         * test for string or number
         */
        isNumber: function(n) { 
            return /^-?[\d.]+(?:e-?\d+)?$/.test(n); 
        },
        
        isNull: function(val){
            return !val;
        },
        
        
		
		/**
		 * PAD A STRING WITH ZERO'S
		 *
		 ***********************************************
		 * VARYING INPUT
		 * padZerosToLength(1, 6, 0);       ===>  000001
		 * padZerosToLength(12, 6, 0);      ===>  000012
		 * padZerosToLength(123, 6, 0);     ===>  000123
		 * padZerosToLength(1234, 6, 0);    ===>  001234
		 * padZerosToLength(12345, 6, 0);   ===>  012345
		 * padZerosToLength(123456, 6, 0);  ===>  123456
		 ***********************************************
		 *  VARYING LENGTH
		 * padZerosToLength(1, 1, 0);  ===>  1
		 * padZerosToLength(1, 2, 0);  ===>  01
		 * padZerosToLength(1, 3, 0);  ===>  001
		 * padZerosToLength(1, 4, 0);  ===>  0001
		 * padZerosToLength(1, 5, 0);  ===>  00001
		 * padZerosToLength(1, 6, 0);  ===>  000001
		 ***********************************************
		 * VARYING PADDING CHARACTER
		 * padZerosToLength(1, 6, 0);         ===>  000001
		 * padZerosToLength(1, 6, 1);         ===>  111111
		 * padZerosToLength(1, 6, "x");       ===>  xxxxx1
		 * padZerosToLength(1, 6, ".");       ===>  .....1
		 * padZerosToLength(1, 6, " ");       ===>       1
		 * padZerosToLength(1, 6, "\u25CF");  ===>  ●●●●●1
		 *
		 */
		padZerosToLength: function(value, minLength, padChar) {
			
			var iValLength= value.toString().length;
			return ((new Array((minLength + 1) - iValLength).join(padChar)) + value);
		
		},
		
        /**
         * capitalise every word in a string
         * split on ' ' to handle special characters
         */
        stringCapitalise: function( str ){

            var self = this;

            if(self.toType(str) !== 'undefined' ){
                
                var text = str.toLowerCase(), firstLtr = 0;

                for (var i = 0;i < text.length;i++){
                    if (i === 0 &&/[a-zA-Z]/.test(text.charAt(i))){ firstLtr = 2; }
                    if (firstLtr === 0 &&/[a-zA-Z]/.test(text.charAt(i))){ firstLtr = 2; }
                    if (firstLtr === 1 &&/[^a-zA-Z]/.test(text.charAt(i))){
                        if (text.charAt(i) === "'"){

                            if (i + 2 === text.length &&/[a-zA-Z]/.test(text.charAt(i + 1))) { 
                                firstLtr = 3; 
                            }
                            else if (i + 2 < text.length &&/[^a-zA-Z]/.test(text.charAt(i + 2))) { 
                                firstLtr = 3; 
                            }
                        }
                    }

                    if (firstLtr === 3){ firstLtr = 1; } 
                    else { firstLtr = 0; }

                    if (firstLtr === 2){
                        firstLtr = 1;
                        text = text.substr(0, i) + text.charAt(i).toUpperCase() + text.substr(i + 1);
                    }
                    else {
                        text = text.substr(0, i) + text.charAt(i).toLowerCase() + text.substr(i + 1);
                    }
                }

                return text;
                
            }
			
        },
		
        /**
         *  FORCE DYNAMIC (HYPEN-BASED) VARIABLES TO CAMEL-CASE
         */
        camelCase: function(input) { 
            return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
                return group1.toUpperCase();
            });
        },
		
        /**
         * ENCODE: BASE64 ENCODE FROM UTF-8
         * DECODE: UTF-8 DECODE FROM BASE64
         */
        stringEncode: function( str ){ var encodedString = window.btoa(encodeURI(str)); return encodedString; },
        stringDecode: function( str ){ var decodedString = decodeURI(window.atob(str)); return decodedString; },
		
        /**
         * REPLACE JAVASCRIPT typeOf
         * toType({a: 4}); //"object"
         * toType([1, 2, 3]); //"array"
         * (function() {// console.log(toType(arguments))})(); //arguments
         * toType(new ReferenceError); //"error"
         * toType(new Date); //"date"
         * toType(/a-z/); //"regexp"
         * toType(Math); //"math"
         * toType(JSON); //"json"
         * toType(new Number(4)); //"number"
         * toType(new String("abc")); //"string"
         * toType(new Boolean(true)); //"boolean"
         */
        toType: function(obj) {
            return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
        },
		
        /**
         * NEEDLE IN A HAYSTACK
		 * @method utils.hayStack(myArray, needle); 
         */
        hayStack: function(needle) {
			var findNaN = needle !== needle;
			var indexOf;

			if(!findNaN && typeof Array.prototype.indexOf === 'function') {
				indexOf = Array.prototype.indexOf;
			} else {
				indexOf = function(needle) {
					var i = -1, index = -1;

					for(i = 0; i < this.length; i++) {
						var item = this[i];

						if((findNaN && item !== item) || item === needle) {
							index = i;
							break;
						}
					}

					return index;
				};
			}

			return indexOf.call(this, needle) > -1;
        },
		
        /**
         * COUNT JSON OBJECT KEY/VALUE PAIRS 
         */
        countJSON : function(obj) { 
            return Object.keys(obj).length; 
        },
		
        /**
         * Round up a number
         * determine number of decimal places
         */
        roundUp: function(num, dec){
            dec = dec || 0;
            num = num || 0;
            var result = Math.round( String(num) * 100 )/100;
            return Number( (result).toFixed(dec) );
        }

    };
});