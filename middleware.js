const config = require('./config');

exports.bass = (req,res,next)=>{
    // 设置头部的信息
    res.locals.headSite = config.site;
    next();
}