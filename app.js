const express = require('express'); // express 모듈 추가하기

const app = express();
const port = 3000;
const path = require('path');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname + '/login.html'));
});

app.listen(port, function (err) {
  console.log('Connected port - ' + port);
  if (err) {
    return console.log('Found error - ', err);
  }
});

app.post('/dataInfo', function (request, response) {
  response.sendFile(path.join(__dirname + '/dataInfo.html'));
});

app.post('/', function(req,res,next) {
  var id = req.body.userID;
  var pw = req.body.userPW;

  console.log(id,pw);
});


function loginBtnClicked()  {
  const id = document.getElementsByName('userID').value;
  const pw = document.getElementsByName('userPW').value;
  
  console.log("id: " + id);
  console.log("pw: " + pw);
}
