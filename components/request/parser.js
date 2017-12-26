var jp = require('jsonpath');
const config = require("./config.json");

function parse(request) {
    console.log(request)

    for (const key in request) {
        debugger;
        if (request.hasOwnProperty(key)) {
            debugger;

            field = 'context.timestamp';
            var data = jp.query(config.field, `$..validation[?(@.name =="context.timestamp")]`);
        }

    }
}

module.exports = {
    parse: parse
}
