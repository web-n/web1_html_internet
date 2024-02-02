var http = require('http');
var fs = require('fs');

var app = http.createServer(function(request,response){
    var _url = request.url;
    // URL 객체를 사용하여 쿼리 스트링 추출
    var queryData = new URL(_url, 'http://localhost:3000').searchParams;
    var title = queryData.get('id');
    if(_url == '/'){
      title = 'Welcome';
    }
    if(_url == '/favicon.ico'){
      response.writeHead(404);
      response.end();
      return;
    }
    response.writeHead(200);

    fs.readFile(`data/${queryData.get('id')}`, 'utf8', function(err,description){
      var template = `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <ul>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
          </ul>
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
        </html>
        `;
        response.end(template);
    });
});
app.listen(3000);