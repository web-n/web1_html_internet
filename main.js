var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
  var _url = request.url; // 클라이언트로부터의 HTTP 요청에 포함된 URL을 _url 변수에 저장
  var queryData = new URL('http://localhost:3000' + _url).searchParams;
  console.log(queryData.get('id'));

  if(_url == '/'){
    _url = '/index.html';
  }
  if(_url == '/favicon.ico'){
    response.writeHead(404);
    response.end();
    return;
  }

  response.writeHead(200);
  response.end(queryData.id);

});
app.listen(3000)