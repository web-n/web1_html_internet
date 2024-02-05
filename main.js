var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body){
    return `
        <!doctype html>
            <html>
            <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
            </head>
                
            <body>
                <h1><a href="/">WEB</a></h1>
                ${list}
                <a href="/create">create</a>
                ${body}
            </body>
            </html>
    `;
}

function templateList(filelist){
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
    }
    list = list+'</ul>';
    return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query; // queryData 변수에 저장된 것은 URL의 쿼리 스트링 부분을 키-값 쌍으로 가지는 객체
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
        fs.readdir('./data', function(err, filelist){
            var title = 'Welcome';
            var description = 'Hello, Node.js';
            var list = templateList(filelist);
            var template = templateHTML(title,list,`<h2>${title}</h2>${description}`);
            response.writeHead(200);
            response.end(template);
    
        })} else {
            fs.readdir('./data', function(error, filelist){
                fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
                var title = queryData.id;
                var list = templateList(filelist);
                var template = templateHTML(title,list,`<h2>${title}</h2>${description}`);
              response.writeHead(200);
              response.end(template);
            });
          });
        }
    } else if(pathname === '/create'){
        fs.readdir('./data', function(err, filelist){
            var title = 'WEB - create';
            
            var list = templateList(filelist);
            var template = templateHTML(title,list,`
                <form action="http://localhost:3000/process create" method = "post">
                <p><input type="text" name="title" placeholder ="title"></p>
                <p>
                    <textarea name = "description" placeholder = "description"></textarea>
                </p>
                <p>
                    <input type = "submit">
                </p>
                </form>
            `);
            response.writeHead(200);
            response.end(template);
    
        });

    } else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);