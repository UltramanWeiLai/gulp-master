(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    appRun.$inject = ['$rootScope','$state','$stateParams','$window','$cookieStore','$sessionStorage','$localStorage','CONFIG'];

    function appRun($rootScope, $state, $stateParams, $window, $cookieStore, $sessionStorage, $localStorage, CONFIG) {

        // 
        // 这里把常用的 服务 添加到 $rootScope 根作用域里面方便后期使用
        // -----------------------------------------------------------------

        $rootScope.$state       = $state;               // 
        $rootScope.$stateParams = $stateParams;         // ui-router的参数
        $rootScope.$storage     = $window.localStorage; // 原生的本地存储
        $rootScope.$cookie      = $cookieStore;         // 基于ngCookie的cookie服务
        $rootScope.$session     = $sessionStorage;      //              ~临时会话
        $rootScope.$local       = $localStorage;        // 基于ngStorage的本地存储
        $rootScope.CONFIG       = CONFIG;               // 常用配置项
    }

}());