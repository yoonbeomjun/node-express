const express = require('express'); // express 모듈 추가하기

const app = express();
const port = 5432;
const path = require('path');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, function (err) {
  console.log('Connected port - ' + port);
  if (err) {
    return console.log('Found error - ', err);
  }
});

app.get('/dataInfo', function (request, response) {
  response.sendFile(path.join(__dirname + '/dataInfo.html'));
});

app.get('/join', function (request, response) {
  var title = '회원가입';
  var description = "환영합니다! : )";
  var html = `
  <!doctype html> 
  <html> 
  <head><title>${title}</title> <meta charset="utf-8"></head> 
  <body>
      <h2>회원 가입</h2>
      <form action = "/join_process" method = "post">
      <ul>
          <p> 이름  
          <input type = "text" name = "name" placeholder = "name">
          </p>
      </ul>
      <ul>
          <p>  부서  
          <select name="department">                    
              <option value="1">R&D</option>              
              <option value="2">IT개발</option>     
              <option value="3">경영관리</option>
          </select>
          </p>
      </ul>
      <ul>
          <p> 사용하실 ID  
          <input type = "text" name = "id" placeholder = "id">
          </p>
      </ul>
      <ul>
          <p> 비밀번호  
          <input type = "text" name = "pw" placeholder = "pw">
          </p>
      </ul>
      <ul>
          <p> 비밀번호 확인 
          <input type = "text" name = "pw_check" placeholder = "pw_check">
          </p>
      </ul>
      <p>
          <input type="submit" value = "가입하기">
      </p>
      </form>

  </body> 
  </html>
  `;
  response.writeHead(200);
  response.end(html);

});

app.get('/join_process', function (request, response) {
  // join에서 submit 하면 여기에서 데이터를 db로 넘겨주자
  var body = '';
  request.on('data', function (data) {
    body = body + data;
  });
  request.on('end', function (req) {
    var post = qs.parse(body);
    const obj = JSON.parse(JSON.stringify(post));
    var keys = Object.keys(obj);
    // for (var i=0; i < keys.length; i++){
    //     console.log(obj[keys[i]]);
    // }
    const { Client } = require('pg');
    const client = new Client({
      user: 'postgres',
      host: '127.0.0.1',
      database: 'postgres',
      password: 'abcd1234',
      port: 5000,
    });
    client.connect();
    const query = {
      text: 'SELECT * FROM testdb',
    };
    client
      .query(query)
      .then((res) => {
        console.log(res.rows[0]);
        client.end();
      })
      .catch((e) => console.error(e.stack));

    // 수행하고 싶은 작업(sql문) 
    var sql = 'INSERT INTO testdb(id, name, path, age) VALUES(?,?,?,?)';
    var params = [obj[keys[0]], obj[keys[1]], obj[keys[2]], obj[keys[4]]]
    con.query(sql, params, function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        console.log(rows.name);
      }
    });

    con.end();


    // 전송 후 첫화면으로 돌아간다.
    response.writeHead(302, { Location: `/` });
    response.end();

  })
});
