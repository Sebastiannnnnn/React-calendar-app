var express = require('express');
var app = express();

app.get('/calendar', function(req, res){
  res.send('hello world');
});

app.listen(4000);