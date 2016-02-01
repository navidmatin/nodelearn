var express = require('express');
//Instance of express
var app = express();
var bookRouter =require('./src/routes/bookRoutes');

var port = process.env.PORT || 5000;


app.use(express.static('public'));
app.use('/books', bookRouter);

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
