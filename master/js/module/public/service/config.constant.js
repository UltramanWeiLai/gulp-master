// ------------------------------------------------------
// 固定配置项
// path: 数据请求的地址
// ajaxerr：接口请求报错提示
// ajaxcue：是否将请求到的信息输出到控制台
// ------------------------------------------------------
(function () {
    'use strict';

    angular
    	.module('public')
    	.constant('CONFIG', {
            PATH: '',
            AJAXERR: '服务器繁忙，请稍后重试！',
            AJAXCUE: true
        })
    ;
})();
