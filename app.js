var express = require('express');
//Instance of express
var app = express();

var port = process.env.PORT || 5000;

app.use(express.static('public'));
app.set('view', '/src/views');

app.set('view engine', '.ejs');

app.use(express.static('src/views'));

app.get('/', function(req, res) {
    res.render('index', {title: 'Hello from render', list:['a','b']});
});

app.get('/books', function(req, response) {
    response.send('Hello books');
});

app.listen(port, function(err) {
    console.log('running server on port' + port);
});
