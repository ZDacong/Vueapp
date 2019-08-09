let bcrypt = require('bcrypt');
let passowrd = 'alex123';

//加密： hashSync
var hash = bcrypt.hashSync(passowrd, 1); 
console.log(hash)


//校验:   compareSync
let pass = bcrypt.compareSync('alex321', hash)
console.log(pass)