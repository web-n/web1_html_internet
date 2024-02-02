var http = require('http');
var fs = require('fs');

var app = http.createServer(function(request, response) {
    var _url = request.url;
    // 'new URL()' 생성자를 사용하여 URL 객체 생성
    var parsedUrl = new URL(_url, `http://${request.headers.host}`);
    var pathname = parsedUrl.pathname;
    var title = parsedUrl.searchParams.get('id');

    if (pathname === '/') {
        if (title === null) {
            fs.readFile('data/welcome', 'utf8', function(err, description) {
                title = 'Welcome';
                description = description || 'Hello, Node.js'; // 파일이 없거나 읽을 수 없는 경우 기본 텍스트 사용
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
                response.writeHead(200);
                response.end(template);
            });
        } else {
            fs.readFile(`data/${title}`, 'utf8', function(err, description) {
                if (err) {
                    response.writeHead(404);
                    response.end('Not found');
                    return;
                }
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
                response.writeHead(200);
                response.end(template);
            });
        }
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
});

app.listen(3000);
