# gulp-master
使用gulp搭建的前端自动化架构

# 目录解析

```master
+-- app/
|   +-- css/
|   +-- img/
|   +-- js/
|   +-- pages/
|   +-- tpls/
|   +-- index.html
+-- master/
|   +-- images/
|   +-- js/
|   |   +-- modules/
|   |   +-- app/
|   |   +-- app.module.js
|   +-- sass/
|   |   +-- app/
|   |   +-- public/
|   |   +-- app.scss
|   +-- vendor.json
|   +-- vendor.base.json  
|   +-- gulpfile.js
|   +-- package.json
|   +-- bower.json
```
app/ 该目录是gulp编译打包过后可执行的项目目录  
app/index.html 页面入口  
app/css/  
~  /img  
~  /js/ 压缩后的静态资源文件夹  
app/pages/ 用于存放公用组件的页面以及常用的异常页面 例如 404 502 等  
app/tpls/ html模板，用于存放项目展示的html页面  

---------

master/                     开发目录  
master/images/              未经压缩的图片目录  
master/js/                  项目js脚本目录  
master/js/app.module.js     angularJS的入口模块  
master/js/modules/ angular  模块的核心目录 所有插件和预处理都会在 coro 里面完成 public 是公共插件库 这个目录请不要随意修改内容  
master/js/app/              项目脚本目录 所有自定义的项目脚本都在这里，请做好模块区分  
master/sass/                项目css文件目录  
master/sass/app.scss        主样式入口文件 所有其他的样式文件，请用引入到该文件中，最终gulp只会对这一个文件进行编译压缩  
master/sass/public/         公共样式库 浏览器重置 以及常用样式和组件样式  
master/sass/app/            项目css目录 所有自定义的项目脚本都在这里，请做好模块区分  
master/vendor.json          暂时没用  
master/vendor.base.json     基础依赖库的路径，所有需要使用到的插件或者库都用 bower 安装后将执行文件的目录写入，gulp会读取后进行合并压缩成base.js 如果遇到无法合并使用的，请参考layer的任务复写一个即可  
master/gulpfile.js          gulp的配置文件  
master/package.json  
master/bower.json           npm 和 bower的配置文件  


# 使用方法
请在 master 目录下面进行一下操作  
早操作前，请保证你安装了nodejs 和 gulp  
请在执行 gulp serve 之前在 生成的app文件夹下 新建一个ajax文件夹，并创建一个ajax.json的文件   
这个文件是 ajax 服务事例请求的文件，并不妨碍实际使用  
ajax.json 文件内容如下  

```ajax.json
{
    "name": "xxx",
    "email": "123456789@qq.com",
    "age": "100"
}
```

```操作命令
npm install // 安装依赖插件
bower install // 安装依赖库
gulp // 生产项目
gulp serve // 启动服务器并自动打开到浏览器
gulp build // 会将 app 目录删除后 建造压缩文件后的项目
```
