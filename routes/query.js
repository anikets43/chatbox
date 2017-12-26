var express = require('express');
var router = express.Router();
var bot = require('apiai');

var requestParser = require('../components/request/parser');
const processResponse = require('../components/response/responseHandler');
const uuidv1 = require('uuid/v1');

router.post("/", function (req, res) {
    const data = req.body;

    const requestResult = requestParser.parse(req);

    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
    } else {
        const context = data['context'];
        const aiProvider = data['aiProvider'];
        const userData = data['data'];


        // Read the configuration for validation rules and apply validation on properties.
        // If validation rules fails, return the error context and terminate the request.

        const sessionId = aiProvider['sessionId'] || uuidv1();
        var apiai = bot(aiProvider['accessToken']);

        var request = apiai.textRequest(userData['queryText'], {
            sessionId: sessionId
        });

        request.on('response', function (response) {
            // Validation on Score and further API call decision.
            const result = processResponse(req, response);
            res.send(result);
        });

        request.on('error', function (error) {
            console.log(error);
        });

        request.end();
    }
});

module.exports = router;
