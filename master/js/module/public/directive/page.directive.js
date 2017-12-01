// ------------------------------------------------------
// 分页指令
// 描述：
//      通过同步  page & count & total 三个变量对分页进行初始化的显示
//      显示样式这边有默认的 ，在sass - public - _th-page.sass 可以自行修改
// 使用：
//      在控制器中使用$watch来监控 page 的值是否改变来进行分页逻辑的执行
//      这里的 page 指定的使用是你传入的当前页码变量
//      例如：<div list-page page="myPage" count="size" total="myTotal"></div>
//           $scope.$watch('myPage', ...)
// ------------------------------------------------------
(function() {
    'use strict';

    angular
        .module('public')
    	.directive('listPage', page)
    ;
    
    // 课程难度级别的过滤器
    function page(){
		return {
			restrict:'AE',
			replace: true,
			templateUrl: '../tpls/pages/paging.html',
			scope: { page: '=', count: '=', total: '='},
			link: function(scope, elm, attr){
				
				// page 是页码
				// count 是每页多少条数据
				// total 是总共多少条数据
				
				//
				// 变量预定义
				// ---------------------------------
				
				// 计算总页数
				scope.totalPage = Math.ceil( scope.total / scope.count );
				
				// 记录转跳页数
				scope.untilVal = null;
				
				// 显示的页码列表
				scope.pageList = [];
				
				
				//
				// 事件监听 - 逻辑方法
				// ---------------------------------
				
				// 初始化
				pageHtml();
				
				// 当总条数的数据发送了变化后刷新分页效果
				scope.$watch('total', function(a, b){
					
					if(!a) return ;
					
					if(a != b) pageHtml();
				});
				
				// 当页码发生变化的时候自动刷新
				scope.$watch('page', function(a, b){
					
					if(!a) return ;
					
					if(a != b) pageHtml();
				});
				
				
				// 当点击页码的时候，更新当前页码为点击的那个页码
				scope.changePage = (i) => { 
					if(i != '...') scope.page = i; 
					else return;
					pageHtml();
				};
				
				// 首页
				scope.firstPage = () => {
					scope.page = 1;
					pageHtml();
				};
				
				// 尾页
				scope.tailPage = () => {
					scope.page = scope.totalPage;
					pageHtml();
				};
				
				// 上一页
				scope.prevPage = () => {
					
					if( scope.page > 1 ){
						scope.page = --scope.page;
					} else {
						scope.page = 1;
					}
					pageHtml();
				};
				
				// 下一页
				scope.nextPage = () => {
					
					if( scope.page < scope.totalPage ){
						scope.page = ++scope.page;
					} else {
						scope.page = scope.totalPage;
					}
					pageHtml();
				};
				
				// 转跳
				scope.untilPage = (until) => {
					if(until == null) return ;
					
					until = until < 1 ? 1 : until;
					until = until > scope.totalPage ? scope.totalPage : until;
					scope.page = until;
					scope.untilVal = null;// 记录转跳页数
					pageHtml();
				};
				
				// 
				function pageHtml(){
					
					// 重置总页数
					scope.totalPage = Math.ceil( scope.total / scope.count );
					
					// 防止分页数量超出范围
					if( scope.page < 1 ){
						scope.page = 1;
					} else if( scope.page > scope.totalPage ){
						scope.page = scope.totalPage
					}
					
					scope.pageList = [];// 页码数组
					// 计算当前总页数，是否达到需要动态设置左右偏移(... 1 2 3 ...)加省略号的程度
					if( scope.totalPage <= 5 ){
						for(var i = 1; i <= scope.totalPage; i++) scope.pageList.push(i);
					} else {
						// 此时分为三种情况：1.左边没有...2.右边没有...3.左右都有...
						// 计算中心偏移量
						 var offset = (5 - 1)/2;
						 
						// 计算偏移量
						if( scope.page <= offset + 1 ){
                        	// 左边没有...
                            for(i =1; i <= 5; i++) scope.pageList.push(i);
                            
                            scope.pageList.push('...');
						} else if( scope.page > scope.totalPage - offset ){
							
                            scope.pageList.push('...');
                            
                            for(i = offset + 1; i >= 1; i--) scope.pageList.push(scope.totalPage - i); 
                            
                            scope.pageList.push(scope.totalPage);
						} else {
							
                            scope.pageList.push('...');

                            for(i = offset; i >= 1; i--) scope.pageList.push(scope.page - i);
						
                            scope.pageList.push(scope.page);
                            
                            for(i = 1; i <= offset; i++) scope.pageList.push(scope.page + i); 

                            scope.pageList.push('...');
						}
					}
				}
			}
		};
    }
})();