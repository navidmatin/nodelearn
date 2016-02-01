var express = require('express');
var bookRouter = express.Router();

var books = [
    {
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'lev Nikolayevich Tolstoy',
        read: false
    },
	{
        title: 'Peace',
        genre: ' Fiction',
        author: 'lev qwf Tolstoy',
        read: false
    },
	{
        title: 'War',
        genre: 'Historical Fiction',
        author: 'lev asd Tolstoy',
        read: false
    }
    ];
bookRouter.route('/')
      .get(function(req, res){
            res.render('booksList', {title: 'Hello from render',
             list:[
                 {
                     Link:'/Books', 
                     Text: 'Books'
                 },
                 {
                     Link: '/Authors',
                      Text: 'Authors'
                }
			 ],
            books: books
        }); 
      });
bookRouter.route('/:id')
            .get(function(req, res){
				var id=req.params.id;
                            res.render('bookView', {title: 'Hello from render',
             list:[
                 {
                     Link:'/Books', 
                     Text: 'Books'
                 },
                 {
                     Link: '/Authors',
                      Text: 'Authors'
                }
			 ],
            book: books[id]
        }); 
            });

module.exports = bookRouter;