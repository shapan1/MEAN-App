var express = require("express");
// stylus to serve up css files.
var stylus =  require("stylus");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

function compile(str, path){
    return stylus(str).set('filename', path);
}
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/partials:partialPath', function(req, res){
    res.render('partials/' + req.paras.partialPath);
});
// * matches all routes, js css and img requests.
// allows me to setup client side route to show the correct view.
// remember to co-ordinate the routes.
app.get('*', function(req, res){
    res.render('index');
});

var port = 3030;
app.listen(port);
console.log("listening to Port on port#: " + port);

module.exports = app;