const headModls = require('../../models/home');
exports.index = (req, res, next) => {
    // 轮播
    headModls.getSlider().then(data => {
        res.locals.lunbo = data
        res.render('index.art');
    }).catch(err => {
        next(err);
    })
}