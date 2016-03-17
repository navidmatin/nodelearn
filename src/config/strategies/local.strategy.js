var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var sql = require('mssql');

module.exports = function(){
  passport.use(new LocalStrategy({
      usernameField: 'userName',
      passwordField: 'password'
  },
 function(username,password, done){
      //Verify username and password
      var request = new sql.PreparedStatement();
      request.input('username', sql.VarChar(100));
      request.input('password', sql.VarChar(200));
      request.prepare('select * from Users where username=@username AND password=@password', function(err){
          if(err !== null)
          {
            console.log(err);
          }
          else
          {
            request.execute({username: username, password: password}, function(err, result){
                console.log(err);
                if(result.length > 0)
                {
                  done(null, result);
                }
                else
                {
                    done(null, false);
                }

            });
          }

          
      });

  }));  
};