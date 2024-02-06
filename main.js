var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query; // queryData 변수에 저장된 것은 URL의 쿼리 스트링 부분을 키-값 쌍으로 가지는 객체
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
        fs.readdir('./data', function(err, filelist){
            var title = 'Welcome';
            var description = 'Hello, Node.js';
            var list = template.list(filelist);
            var html = template.HTML(title,list,
                `<h2>${title}</h2>${description}`,
                `<a href="/create">create</a>`
            );
            response.writeHead(200);
            response.end(html);
    
        })} else {
            fs.readdir('./data', function(error, filelist){
                var fileteredId = path.parse(queryData.id).base;
                fs.readFile(`data/${fileteredId}`, 'utf8', function(err, description){
                var title = queryData.id;
                var list = template.list(filelist);
                var html = template.HTML(title,list,
                    `<h2>${title}</h2>${description}`,
                    `<a href = "/create">create</a>
                     <a href = "/update?id=${title}">update</a>
                     <form action="delete_process" method="post">
                        <input type="hidden" name = "id" value = "${title}">
                        <input type="submit" value="delete">
                     </form>
                     `
                    
                );
              response.writeHead(200);
              response.end(html);
            });
          });
        }
    } else if(pathname === '/create'){
        fs.readdir('./data', function(err, filelist){
            var title = 'WEB - create';
            
            var list = template.list(filelist);
            var html = template.HTML(title,list,`
                <form action="http://localhost:3000/create_process" method = "post">
                <p><input type="text" name="title" placeholder ="title"></p>
                <p>
                    <textarea name = "description" placeholder = "description"></textarea>
                </p>
                <p>
                    <input type = "submit">
                </p>
                </form>
            `, '');
            response.writeHead(200);
            response.end(html);
    
        });

    } else if(pathname === '/create_process') {
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}`, description,'utf-8', function(err){
                response.writeHead(302, {Location: `/?id=${title}`});
                response.end('success');
            })
        });
    } else if (pathname === '/update'){
        fs.readdir('./data', function(error, filelist){
            var fileteredId = path.parse(queryData.id).base;
            fs.readFile(`data/${fileteredId}`, 'utf8', function(err, description){
            var title = queryData.id;
            var list = template.list(filelist);
            var html = template.HTML(title,list,
                `
                <form action="/update_process" method = "post">
                <input type="hidden" name="id" value="${title}">
                <p><input type="text" name="title" placeholder ="title" value="${title}"></p>
                <p>
                    <textarea name = "description" placeholder = "description">${description}</textarea>
                </p>
                <p>
                    <input type = "submit">
                </p>
                </form>
                `,
                `<a href = "/create">create</a> <a href = "/update?id=${title}">update</a>`
                
            );
          response.writeHead(200);
          response.end(html);
        });
      });
    } else if(pathname === '/update_process'){
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;

            fs.rename(`data/${id}`, `data/${title}`, function(error){
                fs.writeFile(`data/${title}`, description,'utf-8', function(err){ // 파일 수정
                    response.writeHead(302, {Location: `/?id=${title}`});
                    response.end('success');
                })
            } )
        });
    } else if(pathname === '/delete_process'){
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var id = post.id;
            var fileteredId = path.parse(id).base;
            fs.unlink(`data/${fileteredId}`, function(error){
                response.writeHead(302, {Location: '/'});
                response.end('success');
            })
        });
    }
    
    else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);