//This instance of sql is same as app.js, so anything that happens to it on app.js is going to happen here
var sql = require('mssql');

var bookController = function(bookService, nav){

    var getIndex = function(req, res){
                var request = new sql.Request()
                request.query('select * from books', function(err,recordset){
                   console.log(recordset);
                    res.render('booksList', {
                    title: 'Hello from render',
                    nav:nav,
                    books: recordset
            });
                });
 
          };
    
    var getById = function(req, res){
                var ps = new sql.PreparedStatement();
                var id=req.params.id;
                ps.input('id', sql.Int);
                ps.prepare('select * from books where id=@id', function(err, results){
                    ps.execute({id:id}, 
                    function(err, results){
                    if(results.length === 0)
                    {
                        res.status(404).send('Not Found');
                    }
                    else
                    {
                        req.book = results[0];
						bookService.getBookById(results.bookId, function(err, bookInfo){
						if(err)
							{
								console.log(err);
								res.render("ERROR");
							}
						else
							{

								var bookResult = {
									nav: nav,
									book: bookInfo
								};
								req.book = bookResult;
								res.render('bookView', bookResult);
							}

						});
						


                    }

                    });
                });
                



            };

        var middleware = function(req,res,next){
        //This all checks to see if the user is signed in, if not redirect to homepage
        //if(!req.user){
            //res.redirect('/');
        //}
        next();
    };   
    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    };
}

module.exports = bookController;