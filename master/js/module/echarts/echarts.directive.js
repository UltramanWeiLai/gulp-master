(function(){
	'use strict';
	
	angular
		.module('app.charts')
		/* 各种图表的指令 */
		.directive('linechart',    linechart )
    ;
	
	function linechart(){
		return {
			restrict: 'EA',
			scope: { data: '=' },
			link: function(scope, elm, attr) {
				var option,
					$node =  $(elm[0]),
					myChart = echarts.init( elm[0] );
			
				// 基本设置
				option = {
					color: ['#79bbec','#E48879','#F09B70','#96C29F'],
				    tooltip: {
				        trigger: 'axis'
				    },
				    legend: {
				        data:['面试','待录用','待入职','以入职']
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data: ['周一','周二','周三','周四','周五','周六','周天'],
				        axisLine: {
			            	lineStyle: {
			            		color: '#999'
			            	}
			            }
				    },
				    yAxis: {
				        type: 'value',
				        axisLine: {
			            	lineStyle: {
			            		color: '#999'
			            	}
			            }
				    },
				    series: [
				        {
				            name:'面试',
				            type:'line',
				            stack: '总量',
				            data:[1, 3, 5, 7, 9, 2, 4]
				        },
				        {
				            name:'待录用',
				            type:'line',
				            stack: '总量',
				            data:[2, 4, 6, 8, 0, 1, 3]
				        },
				        {
				            name:'待入职',
				            type:'line',
				            stack: '总量',
				            data:[2, 3, 3, 2, 3, 3, 1]
				        },
				        {
				            name:'以入职',
				            type:'line',
				            stack: '总量',
				            data:[6, 6, 6, 9, 9, 9, 3]
				        }
				    ]
				};
				
				// 绘制图表
				myChart.setOption( option );
			}
		};
	}
}());
