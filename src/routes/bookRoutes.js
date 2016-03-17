var express = require('express');
var bookRouter = express.Router();
//This instance is same as app.js, so anything that happens to it on app.js is going to happen here
var sql = require('mssql');

//General Redirect if not signed in
bookRouter.use(function(req,res,next){
    //This all checks to see if the user is signed in, if not redirect to homepage
    if(!req.user){
        res.redirect('/');
    }
    next();
});
var router = function(nav){
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
                var request = new sql.Request()
                request.query('select * from books', function(err,recordset){
                   console.log(recordset);
                    res.render('booksList', {
                    title: 'Hello from render',
                    nav:nav,
                    books: recordset
            });
                });
 
          });
    bookRouter.route('/:id')
                .all(function(req, res, next){
                    var ps = new sql.PreparedStatement();
                    var id=req.params.id;
                    ps.input('id', sql.Int);
                    ps.prepare('select * from books where id=@id', function(err){
                        ps.execute({id:id}, 
                        function(err, recordset){
                            if(recordset.length === 0)
                            {
                                res.status(404).send('Not Found');
                            }
                            else
                            {
                                req.book = recordset[0];
                                next();
                            }

                        });
                    })
                     
                })
                .get(function(req, res){
                    res.render('bookView', {
                        title: 'Books',
                        nav: nav,
                        book: req.book
                    });
                });
    return bookRouter;
}

module.exports = router;