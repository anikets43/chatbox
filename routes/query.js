var express = require('express');
var router = express.Router();

var bot = require('apiai');
//const express = require('express');
var app = express();

const uuidv1 = require('uuid/v1');


var bodyParser = require('body-parser');

//var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post("/query", function (req, res) {
    const data= req.body;

    const sessionId =  data.sessionId || uuidv1();

    console.log(uuidv1());

    var apiai = bot(data.accessToken);
    
    var request = apiai.textRequest(data.query, {
        sessionId: sessionId
    });

    request.on('response', function (response) {
        console.log(response);

        // Validation will go here for the required field.
        res.send(response);
    });

    request.on('error', function (error) {
        console.log(error);
    });

    request.end();
    
   
});

//app.listen(port, function () {
//    console.log("Express server listening on port 3000");
//});