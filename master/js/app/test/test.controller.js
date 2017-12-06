(function(){
	'use strict';
	
	angular
		.module('test')
		.controller('testCrtl', testCrtl);
	
	testCrtl.$inject = ['$scope','$http', '$state'];
	
	function testCrtl($scope, $http, $state) {
		console.log('test')
	}
}());
