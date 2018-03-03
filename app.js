var express = require("express");
var app = express();

var request = require("request");
app.set('port', 3000);
app.set("view engine", "ejs")

app.get("/", function(req, res){
	res.render("search");
});

app.get("/results", function(req, res){
	var query = req.query.search;
	var url = "http://omdbapi.com/?s="+ query +"&apikey=thewdb";
	request(url, function(error, response, body){
		if( !error && response.statusCode == 200)
		{
			var data = JSON.parse(body);
			//res.send(parsedData["Search"][0]["Title"]);
			res.render("results", {data: data});
		}
	});
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate. ');
});