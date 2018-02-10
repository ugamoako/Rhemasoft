var express = require('express');
var _ = require('underscore');
var router = express.Router();
var mongojs = require('mongojs');
var user = require('./user');
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

var supportPageHandler = function(req, res){
    res.placeholders = {
        title: 'Contact us',
        description: 'Our contact information'
    };
    res.render('pages/contacts', res.placeholders);
};

var notFoundHandler = function(req, res){
    req.viewName = 'pages/404-page';
    res.status(404);
    return staticPageHandler(req, res)
};

var errorHandler = function(req, res){
    req.viewName = 'pages/404-page';
    res.status(404);
    return staticPageHandler(req, res)
}


router.get('/', staticPageHandler);
router.get('/support', supportPageHandler);
router.get('/login', function(req, res, next){
    res.send('Hello world');

});

router.post('/register',function(req, res){
    var name = req.body.usrname;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;
    
    req.checkBody('password2', 'passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if(errors){
        res.render('register',{
            errors:errors
        });
    } else {
        var newUser = new user({
            name: name,
            email:email,
            password:password
            
        })
    }
 
 });

router.notFoundHandler = notFoundHandler;
router.errorHandler = errorHandler;
module.exports = router;