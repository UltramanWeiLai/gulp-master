// ------------------------------------------------------
// 时间：2017.12.1
// 作者：未来
// 邮箱：798008773@qq.cpm
// 介绍：
// 		对$http进行二次封装，进而使其更易于使用。
// 		且有效的减少代码行数，提高代码维护性和可读性
// 		使用方法：ajax.get || post || put || file
// ------------------------------------------------------
(function () {
    'use strict';

    angular
    	.module('public')
    	.service('ajax', ajax)
    ;
    
    ajax.$inject = ['$http','CONFIG'];
    function ajax($http, CONFIG) {
		
		//
		// 对外api
		// --------------------------------------------------------------
		
		// get 请求
		// 必填参数：
		// 			src 传入接口地址即可 (可以结合 CONFIG.PATH 把协议、域名、端口 和 重复的路径 设置进去后 在控制器里面使用时就可以减少输入字符长度)
		// 可选参数：
		//          1、headers 当headers没有设置的时候会有默认值 当主动设置headers的时候，将会使用设置的值
    	this.get = (src, ...args) => {
    		
			let headers = {'Content-type': undefined };
	    	
			if(args.length >= 1){ headers = !!args[0] ? args[0] : {'Content-type': undefined }; }
    		
    		return $http({
				method: 'get',
				url: CONFIG.PATH + src,
				headers: headers
			}).then(
				sendSuccess(res, CONFIG), 
				sendError(err, CONFIG) 
			);
    	};
    	
    	// post 请求 传值为接口名和需要的json格式的数据
    	// 必填参数：
		// 			src 传入接口地址即可 (可以结合 CONFIG.PATH 把协议、域名、端口 和 重复的路径 设置进去后 在控制器里面使用时就可以减少输入字符长度)
		//			data 需要发送到服务器的数据
		// 可选参数：
		//			1、布尔类型 主要用于判断 传入的值是否需要转换成form格式
		//  		2、headers 当headers没有设置的时候会有默认值 当主动设置headers的时候，将会使用设置的值
    	this.post = (src, data, ...args) => {
    		
    		let headers = {'Content-type': undefined };
    		
    		data = data ? data : {};
    		
    		if(args.length >= 1){ data = !!args[0] ? $.param(data) : data; }
    		
    		if(args.length >= 2){ headers = !!args[1] ? args[1] : {'Content-type': undefined }; }
    		
    		return $http({
				method: 'post',
				url: CONFIG.PATH + src,
				data: data,
				headers: headers
			}).then(
				sendSuccess(res, CONFIG), 
				sendError(err, CONFIG) 
			);
    	};
    	
		// put 请求 传值为接口名和需要的json格式的数据
		// 必填参数：
		// 			src 传入接口地址即可 (可以结合 CONFIG.PATH 把协议、域名、端口 和 重复的路径 设置进去后 在控制器里面使用时就可以减少输入字符长度)
		//			data 需要发送到服务器的数据
		// 可选参数：
		//			1、布尔类型 主要用于判断 传入的值是否需要转换成form格式
		//  		2、headers 当headers没有设置的时候会有默认值 当主动设置headers的时候，将会使用设置的值
    	this.put = function (src, data, ...args){
    		
    		let headers = {'Content-type': undefined };
    		
    		data = data ? data : {};
    		
    		if(args.length >= 1){ data = !!args[0] ? $.param(data) : data; }
    		
    		if(args.length >= 2){ headers = !!args[1] ? args[1] : {'Content-type': undefined }; }
    		
    		return $http({
				method: 'put',
				url: CONFIG.PATH + src,
				data: data,
				headers: headers
			}).then(
				sendSuccess(res, CONFIG), 
				sendError(err, CONFIG) 
			);
    	};
		
		// 用于提交表单文件的 - 讲道理 这个我没有进行二次修改，具体看使用情况把
		this.file = (src, data) => {
			
			// 防止数据不存在
			data = data ? data : {};
			
			// 提交信息
				return $http({
					method: 'post',
					url: CONFIG.PATH + src,
					headers: { 'Content-Type': undefined },
					data: data,
					transformRequest: (data, headersGetter) => {
						let formData = new FormData();
						angular.forEach(data, function(value, key) {
							formData.append(key, value);
						});
						return formData;
					}
				}).then(
					sendSuccess(res, CONFIG), 
					sendError(err, CONFIG) 
				);
		};

		//
		// 方法
		// --------------------------------------------------------------------

		// 请求成功
		function sendSuccess(res, CONFIG) {
			if(CONFIG.AJAXCUE) {
				console.info('-- ajax -- ' + src);
				console.info(res,'\n');
			}
			
			return res;
		}

		// 请求失败
		function sendError(err, CONFIG) {
			if(CONFIG.AJAXCUE) {
				console.error(err);
				layer.msg(CONFIG.AJAXERR);
			}
			
			return err;
		}
    }
})();
