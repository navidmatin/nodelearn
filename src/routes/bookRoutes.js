var express = require('express');
var bookRouter = express.Router();
var bookService = require('../services/goodreadsService')();



var router = function(nav){
    var bookController = require('../controllers/bookController')(bookService, nav);
    //General Redirect if not signed in
    bookRouter.use(bookController.middleware);
    bookRouter.route('/')
          .get(bookController.getIndex);
    bookRouter.route('/:id')
                .get(bookController.getById);
    return bookRouter;
}

module.exports = router;