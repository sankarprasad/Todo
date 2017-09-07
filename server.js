const express = require('express');
const app = express();
const port = process.env.port || 8080;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var bodyParser = require('body-parser');
const router = express.Router();
const path = require('path');
//custom imports
const todo = require('./routes/toDo')(router);

mongoose.connection.openUri('mongodb://sankar:sankar@ds129004.mlab.com:29004/randomdb', (err) => {
    if (err) {
        console.log("Something Wrong Happened with MongoDB", err);
    } else {
        console.log("MongoDB connected...")
    }
});

//Middlewares
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use('/', todo);
app.use(express.static(__dirname + '/client'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/index.html'));
})
app.listen(port, () => {
    console.log("Magic happens at: ", port);
})