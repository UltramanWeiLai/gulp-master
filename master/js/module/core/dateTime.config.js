(function() {
    'use strict';

    angular
        .module('app.core')
        .config(AMDdtp);

    AMDdtp.$inject = ['ADMdtpProvider'];
    function AMDdtp(ADMdtpProvider) {
    	ADMdtpProvider.setOptions({
	        calType: 'gregorian',
	        format: 'YYYY-MM-DD',
	        multiple: false,
	        autoClose: true,
	        gregorianDic: {
				title: '请选择注册日期',
				monthsNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
				daysNames: ['天', '一', '二', '三', '四', '五', '六'],
				todayBtn: "今天"
			}
	    });
    }

}());