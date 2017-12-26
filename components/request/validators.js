const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

// Refer for default validators '../../node_modules/express-validator/shared-typings.d.ts'

function customValidator(request, jsonPath, rules) {

    rules.forEach(rule => {
        switch (rule) {

            case 'required':
                request.check(jsonPath).exists();
                parseErrors(request);
                break;

            case 'hash':
                request.check(jsonPath).isAlphanumeric();
                break;

            case 'number':
                request.check(jsonPath).matches(/\d/);
                break;

            case 'email':
                request.check(jsonPath).isEmail();
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
