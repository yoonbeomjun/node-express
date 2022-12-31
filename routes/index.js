var express = require('express');
var router = express.Router();
const port = 3000;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hello world!');
});

app.listen(port, function (err) {
  console.log('Connected port - ' + port);
  if (err) {
    return console.log('Found error - ', err);
  }
});
