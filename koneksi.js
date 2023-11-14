var mysql = require ('mysql');

//connection
const conn= mysql.createConnection({
    host :'localhost',
    user :'root',
    password: '',
    database:'restapi'
});
conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Terkoneksi');
});