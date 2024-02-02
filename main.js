var http = require('http');
var fs = require('fs');
var urlModule = require('url'); // 변수 이름 변경

var app = http.createServer(function(request,response){
  var _url = request.url;
  var queryData = new URL('http://localhost:3000' + _url).searchParams;
  console.log(queryData.get('id'));

  if(_url == '/'){
    _url = '/index.html'; // 변수 이름 변경
  }
  if(_url == '/favicon.ico'){
    response.writeHead(404);
    response.end();
    return;
  }

  response.writeHead(200);
  // index.html 파일 읽기 및 응답
  fs.readFile(__dirname + _url, 'utf-8', function(err, data) {
    if (err) {
      response.writeHead(404);
      response.end("Not Found");
    } else {
      response.end(data);
    }
  });
});
app.listen(3000);ㅋ