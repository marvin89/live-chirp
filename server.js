var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

var tweets = require('./public/data/feed.json');

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

app.post('/tweets', function(req, res) {
	console.log(req.body);
	tweets.push(req.body);

	fs.writeFile('./data/feed.json', JSON.stringify(tweets), function(err) {
		if (err) {
			res.send({ message: 'There was a problem!', success: false });
		} else {
			res.send({ message: 'Tweet saved!', success: true });
		}
	});
});

app.get('/tweets', function(req, res) {
	res.send(tweets);
});

app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});
