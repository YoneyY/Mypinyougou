// 依赖模块
const express = require('express');
const path = require('path');
const artTemplate = require('express-art-template');
const createError = require('http-errors');
const Youch = require('youch'); // 首字母大写的话 一般是构造函数
const mongan = require('morgan');
const favicon = require('express-favicon');

// 创建应用
const app = express();

// 引入的文件
const routers = require('./routers');
const middleware = require('./middleware');
app.listen(3000, () => console.log('http://127.0.0.1:3000'));

// 打印日志
app.use(mongan('dev')); //要放在请求之前去打印请求日志

//处理静态资源
app.use('/', express.static(path.join(__dirname, 'public')));

// 解析请求体
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 会话处理


// 模板引擎
app.engine('art', artTemplate);
app.set('view options',{
  debug: process.env.NODE_ENV !== 'production'
});

// 设置网站的小图标
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));

// 设置公用头部
app.use(middleware.bass);
// 设置路由
app.use(routers)

// 设置错误
app.use((req, res, next) => { 
  // 以上路由走到这里 是404 没有找到资源  (在app.use没有去写路径 肯定是没有资源);
  // const err = new Error('Not Found sb') // 这里面设置的内容会显示到youch生成的html页面上
  // err.status = 404
  next(createError(404, 'Not Found sb')); //跟上面代码效果是一样的
  // next();
});
app.use((err,req,res,next)=>{
  if (req.app.get('env') === 'development') {
    const youch = new Youch(err, req);
    return youch.toHTML().then((html) => res.send(html));
  } else {
    res.status(err.status || 500);
    res.locals.status = err.status === 404 ? 404 : 500;
    res.render('error.art');
  }
});
