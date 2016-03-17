var express = require('express');
var authRouter = express.Router();
var passport = require('passport');
var sql = require('mssql');


var router = function(){
    authRouter.route('/signUp')
        .post(function(req, res){
            console.log(req.body);
            //Insert the user in the database
            var preparedStatement= new sql.PreparedStatement();
            var user = {
                username: req.body.userName,
                password: req.body.password
            };
            preparedStatement.input('username', sql.VarChar(100));
            preparedStatement.input('password', sql.VarChar(200));

            //TODO:Do a select first and search for the username and then insert it into the database
            preparedStatement.prepare('INSERT Users VALUES (@username, @password)', function(err){
                console.log(err);
                preparedStatement.execute(user, function(err, results){
                    console.log(err);
                    req.login(results, function(){
                        res.redirect('/auth/profile');
                    })
                });
            });

        });
    authRouter.route('/profile')
        .all(function(req,res,next){
        //This all checks to see if the user is signed in, if not redirect to homepage
        if(!req.user){
            res.redirect('/');
        }
        next();
        })
        .get(function(req, res){
        res.json(req.user);
    });
    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
        failureRedirect: '/'
        }), function(req, res){
        res.redirect('/auth/profile');
    });
    return authRouter;
}

module.exports = router;