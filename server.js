var express = require('express');
var cookieParser = require('cookie-parser')

var app = express();
app.use(cookieParser());
// public folder to store assets
app.use(express.static(__dirname + '/public'));

// routes for app
app.get('/', function(req, res) {
  var variation;

  console.log(req.headers);

  if (req.cookies.variation) {
    variation = req.cookies.variation;
  }
  else {
    variation = "FR_PRICE" + (Math.random());
  }

  res.append('Content-Language', 'en-CH');
  res.append('Content-Type', 'text/html;charset=UTF-8');
  res.append('Date', 'Wed, 08 Jul 2015 15:44:05 GMT');
  res.append('P3P', 'CP="This is not a P3P policy! See http://www.distrelec.ch/cms/p3p for more info."');

  if (!req.cookies.variation) {
    res.append('Set-Cookie', 'JSESSIONID=08A03FE57316B6178D726DF513577B66; Path=/; HttpOnly');
    res.append('Set-Cookie', 'variation=' + variation + ';shopSettings="channel:B2B,language:en,country:CH,cookieMessageConfirmed:false,useTechnicalView:false,autoApplyFilter:false"; Version=1; Max-Age=604800; Expires=Wed, 15-Jul-2015 15:44:05 GMT; Path=/');
  }
  res.append('Vary', 'User-Agent');

  res.send('Hello world : ' + variation);
});

// listen on port 8000 (for localhost) or the port defined for heroku
var port = process.env.PORT || 8000;
console.log("listening on " + port);
app.listen(port);
