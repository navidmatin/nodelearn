var express = require('express');
//Instance of express
var app = express();
//BodyParser for parsing body
var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

//Database
var sql = require('mssql');
var config = {
    user: 'sa',
    password: 'F9ou2hiu!',
    server: '10.105.30.62',
    database: 'Books'
}
sql.connect(config, function(err){
    console.log(err);
})

var port = process.env.PORT || 5000;
var nav=[{
    Link: '/Books',
    Test: 'Book'
    },{
    Link: '/Authors',
    Text: 'Author'
}];

//Middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
//Takes secret
app.use(session({secret: 'library'}));
require('./src/config/passport')(app);

//Routers
var bookRouter =require('./src/routes/bookRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);
app.use('/books', bookRouter);
app.use('/auth', authRouter);






app.set('views', 'src/views');

app.set('view engine', 'ejs');




app.get('/', function(req, res) {
    res.render('index', {title: 'Hello from render', list:[
        {Link:'/Books', Text: 'Books'},{Link: '/Authors', Text: 'Authors'}]});
});

//app.get('/books', function(req, response) {
//    response.send('Hello books');
//});

app.listen(port, function(err) {
    console.log('running server on port' + port);
});
