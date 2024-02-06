var roles = {
    'programmer' : 'egoing',
    'designer' : 'k8805',
    'manager' : 'hoya'
}

console.log(roles.designer);

for(var key in roles){
    console.log(key);
    console.log(roles[key]);
}