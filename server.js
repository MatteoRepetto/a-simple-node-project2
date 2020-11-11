console.log("node is running");

let express = require("express");

let app = express();
let port = 3000;

app.use(express.static("public"));
