var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://rhemas:584223@ds159892.mlab.com:59892/rhemadb', ['logregister']);
var staticPageHandler = function(req, res){

    var path = '';
    if(req.viewName){
        path = req.viewName;
    } else {
        path = req.route.path;
        if(path == '/')
            path = '/index';
        path = 'pages' + path;
    }
    res.placeholders = {
        title: 'Home Page',
        description: 'main page'
    }
    res.render(path, res.placeholders, function(err,html){
        res.placeholders.content = html;
        res.render('index', res.placeholders);
    })
}



var notFoundHandler = function(req, res){
    req.viewName = '404';
    res.status(404);
    return staticPageHandler(req, res)
};

var errorHandler = function(req, res){
    req.viewName = '404';
    res.status(404);
    return staticPageHandler(req, res)
}


router.get('/', staticPageHandler);
router.get('/login', function(req, res, next){
    res.send('Hello world');
    //db.logregister.find(function(err, data){
        //if(err){
            //res.send(err);
        //}
        //console.log(data);
        //res.json(data);
    //});
});
router.notFoundHandler = notFoundHandler;
router.errorHandler = errorHandler;
module.exports = router;