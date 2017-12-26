const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

function customValidator(request, jsonPath, rules) {

    rules.forEach(rule => {
        switch (rule) {
            case 'required':
                debugger;
                request.check(jsonPath).isEmpty();
                parseErrors(request);
                break;

            case 'hash':
                break;

            default:
                console.log('Rule not defined');
        }
    });
    return request;

}

function parseErrors(req) {
    var errors = req.validationErrors();
    if (errors) {
        req.session.errors = errors;
        req.session.success = false;
       // res.send(errors);
    } else {
        req.session.success = true;
    }

}

module.exports = {
    customValidator: customValidator
}
