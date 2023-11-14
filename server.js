const bodyParser = require("body-parser");
const express = require("express");
const app =express();

//json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
 app.listen(3000, () =>{
console.log("Server Berjalan")
 });