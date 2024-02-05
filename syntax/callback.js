// function a(){
//     console.log('a');
// }

// 익명함수
var a = function (){
    console.log('a');
}

function slowfunc(callback){
    callback();
}

slowfunc(a);