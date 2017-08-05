var config = require('./config.json');
var dbs = require('./controller/api/mongodb.js');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//var index = require('./routes/index');
//var tasks = require('./routes/tasks');

var app = express();
//view Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/', require('./controller/site.js'));

app.listen(config.http_port, function(){
    console.log('Server started on port'+ config.http_port);
})