var mysql = require ('mysql');

//connection
const connection= mysql.createConnection({
    host :'localhost',
    user :'root',
    password: '',
    database:'restapi'
});
connection.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Terkoneksi');
});
module.exports = connection;