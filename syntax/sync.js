var fs = require('fs');

// readFileSync 동기
// console.log('A');
// var result = fs.readFileSync('syntax/sample.txt', 'utf8');
// console.log(result);
// console.log('c');

// redaFile 비동기 - js에서 가장 선호 비동기적 처리를 좋아함
console.log('A');
fs.readFile('syntax/sample.txt', 'utf8', function(err, result){
    console.log(result);
});
console.log('c');