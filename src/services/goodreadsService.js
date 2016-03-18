var http = require('http');
var xmlToJson = require('xml2js');
var parser = xmlToJson.Parser({
    explicitArray:false
});

var goodreadsService = function(){
    var getBookById = function(id, cb){
        var options = {
            host: 'www.goodreads.com',
            path: '/book/show/656?format=xml&key=POwU66k6kRxTBmYpNvHgQ'
        };
        var callback = function(response){
            var str = "";
            response.on('data', function(chunk){
               str+= chunk; 
            });
            response.on('end', function(){
                parser.parseString(str, function(err, result){

                    if(!err)
                        {
                            cb(null, result.GoodreadsResponse.book);
                        }
                    else
                        {
                            console.log(err);
                            cb(err, null);
                        }

                });
            });
        };

        
        http.request(options, callback).end();
        
    };
    return {
        getBookById:getBookById
    };
}

module.exports = goodreadsService;