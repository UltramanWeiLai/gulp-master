(function(){
	'use strict';
	
	angular
		.module('test')
		.controller('testCrtl', testCrtl);
	
	testCrtl.$inject = ['$scope','ajax'];
	
	function testCrtl($scope,ajax) {
		
		//
		// 变量
		// -----------------------------------------------

		$scope.myData = {};

		//
		// 逻辑
		// -----------------------------------------------

		ajaxTest();

		//
		// 方法
		// -----------------------------------------------

		// ajax服务实例
		function ajaxTest() {
			ajax
				.get('./ajax/ajax.json')
				.then(res => {
					$scope.myData = res;
				})
			;
		}
	}
}());
