(function () {
    'use strict';

    angular
        .module('app.route')
        .config(routerConfig);

    routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routerConfig($stateProvider, $urlRouterProvider) {
        // 默认路由
        $urlRouterProvider.otherwise('/app/index');

        // 路由
        $stateProvider
            
            //
        	// 视图
        	// ---------------------
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: './tpls/app.html'
            })
            
            //
            // 测试
            // ------------------------
            .state('app.index', {
                url: '/index',
                title: '测试',
                templateUrl: './tpls/test/home.html',
                controller: 'testCrtl'
            })
        ;
    }
}());