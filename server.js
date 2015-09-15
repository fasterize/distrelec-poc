var express = require('express');
var cookieParser = require('cookie-parser')

var app = express();
app.use(cookieParser());
// public folder to store assets
app.use(express.static(__dirname + '/public'));

var loggedIn=false;

function computeVariation () {
  return "FR_PRICE" + (Math.random()) + (loggedIn ? "logged" : "unlogged");
}

// routes for app
app.get('/', function(req, res) {
  var variation;

  console.log(req.headers);

  if (req.cookies.variation) {
    //It's possible to cache this response since the variation of the page is known
    variation = req.cookies.variation;
    if (loggedIn)
      res.append('Cache-Control', 'private, max-age=0');
    else
      res.append('Cache-Control', 'public, max-age=300');
  }
  else {
    //It's not possible to cache this response since the variation of the page is known
    variation = computeVariation();
    res.append('Cache-Control', 'private, max-age=0');
  }

  //header found in distrelec.com
  res.append('Content-Language', 'en-CH');
  res.append('Content-Type', 'text/html;charset=UTF-8');
  res.append('Date', 'Wed, 08 Jul 2015 15:44:05 GMT');
  res.append('P3P', 'CP="This is not a P3P policy! See http://www.distrelec.ch/cms/p3p for more info."');
  res.append('Vary', 'User-Agent');

  res.append('Set-Cookie', 'JSESSIONID=08A03FE57316B6178D726DF513577B66; Path=/; HttpOnly');
  res.append('Set-Cookie', 'variation=' + variation);

  res.send('Hello world : ' + variation);
});

app.post('/loggedin', function (req, res) {
  loggedIn = true;
  var variation = computeVariation();
  res.append('Set-Cookie', 'variation=' + variation);
  res.send('Hello world : ' + variation);
});

app.post('/loggedout', function (req, res) {
  loggedIn = false;
  var variation = computeVariation();
  res.append('Set-Cookie', 'variation=' + variation);
  res.send('Hello world : ' + variation);
});

// listen on port 8000 (for localhost) or the port defined for heroku
var port = process.env.PORT || 8000;
console.log("listening on " + port);
app.listen(port);
