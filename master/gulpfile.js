var gulp 		= require('gulp'),
	del  		= require('del'),
  	$    		= require('gulp-load-plugins')(),
  	babel 		= require('gulp-babel'),
  	browserSync = require('browser-sync'),
  	reload 	    = browserSync.reload;
	  
//
// 统一资源路径管理
// ----------------------------------------------

// 是否进行混淆压缩
var isUglify = false;

// gulp-html-prettify 的配置
var prettifyOpts = {
    indent_char: ' ',
    indent_size: 4,
    unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u', 'pre', 'code']
};

// 基础路径
var path = {
	app:  '../app/',
    view: 'view/',
    img:  'images/',
    css:  'sass/',
    js:   'js/'
};

// 依赖插件设置
var vendor = {
    // 启动项目所依赖的插件
    base: {
        source: require('./vendor.base.json'),
        js: 	'base.js',
        css: 	'base.css'
    },
    // 手动加载依赖的插件
    app: {
        source: require('./vendor.json'),
        dest: 	'../vendor'
    }
};

// 设置
var source = {
    // js
    js: [
        path.js + 'app.module.js',
        // 基础配置的模块
        path.js + 'module/**/*.module.js',
        path.js + 'module/**/*.js',
        // 开发页面的模块
        path.js + 'app/**/*.module.js',
        path.js + 'app/**/*.js'
    ],
    // html
    view: {
        index: [path.view + 'index.*'],
        views: [path.view + '**/*.*', '!' + path.view + 'index.*']
    },
    // 样式
    css: { 
    	app:   [ path.css + '*.*' ] ,
    	child: [ path.css + '**/*.*']
    },
    // 图片
    img: { img: [path.img + '**/*.*']}
};

// 生产目录
var build = {
    js: path.app + 'js',
    css:  path.app + 'css',
    img: path.app + 'img',
    view: {
        index: '../',
        views: path.app
    }
};

//
// 生产模式 - 任务
// --------------------------------------------

// ====================
// 模板处理
// ====================
gulp.task('view',['view:index','view:tpls']);

// 首页
gulp.task('view:index',function(){
	return gulp.src(source.view.index)
		.pipe($.htmlPrettify(prettifyOpts))
		.pipe($.if(isUglify, $.htmlmin()))
		.pipe(gulp.dest(build.view.views))
		.pipe(reload({ stream: true }))
	;
});

// 视图
gulp.task('view:tpls',function(){
	return  gulp.src(source.view.views)
		.pipe($.htmlPrettify(prettifyOpts))
		.pipe($.if(isUglify, $.htmlmin()))
		.pipe(gulp.dest(build.view.views))
		.pipe(reload({ stream: true }))
	;
});

// =========================
// 代码合成 & 混淆压缩
// =========================
gulp.task('concat',['concat:base','concat:app']);

// 将项目所依赖的基础插件分别合并成base.js & base.css
gulp.task('concat:base',function(){
	
	console.log(build.css)
	
	// 过滤器，根据文件的后缀名分别进行合并
	let jsFilter = $.filter('**/*.js',{ restore: true}),
		cssFilter = $.filter('**/*.css',{ restore: true});
		
	return gulp.src(vendor.base.source)
		.pipe(jsFilter)
			.pipe($.concat(vendor.base.js))
			.pipe($.if(isUglify, $.uglify()))
			.pipe(gulp.dest(build.js))
			.pipe(jsFilter.restore)
		.pipe(cssFilter)
			.pipe($.concat(vendor.base.css))
			.pipe($.if(isUglify, $.cleanCss()))
			.pipe(gulp.dest(build.css))
			.pipe(cssFilter.restore)
		.pipe(reload({ stream: true }))
	;
});

// 为项目定制的 js & css 进行合并和混淆压缩
gulp.task('concat:app',['concat:app:js','concat:app:sass']);

// 定制 js 文件合并
gulp.task('concat:app:js',function(){
	return gulp.src(source.js)
		.pipe(babel({
            presets: ['env']
        }))
		.pipe($.concat('app.js'))
		.pipe($.if(isUglify, $.uglify()))
		.pipe(gulp.dest(build.js))
		.pipe(reload({ stream: true }))
	;
});

// 定制 css 文件合并
gulp.task('concat:app:sass',function(){
	return gulp.src(source.css.app)
		.pipe($.sass())
		.on('error', $.sass.logError)
		.pipe($.autoprefixer({ cascade: false}))
		.pipe($.if(isUglify, $.cleanCss()))
		.pipe(gulp.dest(build.css))
		.pipe(reload({ stream: true }))
	;
});




// =====================
// 额外处理
// =====================

gulp.task('extend', ['extend:layer','extend:image']);

// layer
gulp.task('extend:layer', function(){
	return gulp.src('./bower_components/layer/build/**/*.*')
		.pipe(gulp.dest(build.js + '/layer'));
});

// 图片处理
gulp.task('extend:image', function(){
	return gulp.src(source.img.img)
		.pipe($.imagemin())
		.pipe(gulp.dest(build.img))
		.pipe(reload({ stream: true }))
	;
});

// 删除app下的文件
gulp.task('delApp', function(){
    return del(path.app, {force: true});
})

// 对所有文件进行压缩
gulp.task('uglify', function(){
    isUglify = true;
})

//
// 服务
// ----------------------------------------
// 监视一些经常修改的文件，当发生修改的时候自行编译
//gulp.task('watch', function () {
//  gulp.watch(source.js, ['concat:app:js']);
//  gulp.watch(source.css, ['concat:app:sass']);
//  gulp.watch(source.view.index, ['view:index']);
//  gulp.watch(source.view.views, ['view:tpls']);
//  gulp.watch(source.img.img, ['image']);
//});

gulp.task('watch', function () {
    gulp.watch(source.js, ['concat:app:js']);
    gulp.watch(source.css.app, ['concat:app:sass']);
    gulp.watch(source.css.child, ['concat:app:sass']);
    gulp.watch(source.view.index, ['view:index']);
    gulp.watch(source.view.views, ['view:tpls']);
    gulp.watch(source.img.img, ['image']);
    
});

gulp.task('serve', ['watch'], function(){
    browserSync.init({
        server: {
            baseDir:"../",
            index: "app/index.html"
        },
        port: 8080
    });
});


// 开发模式
gulp.task('default', ['concat', 'view', 'extend']);

// 生产模式
gulp.task('build', ['delApp','uglify','default']);