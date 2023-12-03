const bodyParser = require("body-parser");
const express = require("express");
const app =express();
var morgan = require('morgan');

//json

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));


// call routes
var routes = require('./routes');
routes(app);
app.use('/', require('./middleware'));

 app.listen(3000, () =>{
console.log('Server Berjalan');
 });