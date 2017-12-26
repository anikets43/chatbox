
function processResponse(request, response) {
    debugger;
    const data = request.body;
    var result = {};
    result.context = {
        "timestamp": response.timestamp,
        "version": data['context']['version']
    };

    result.result = {
        "message": response.status.errorType,
        "statusCode": response.status.code,
        "error": {

        }
    };
    result.output = {};
    result.aiResponse = {
        "aiEngine": "dialogflow",
        "response": response
    }

    return result;

}

module.exports = processResponse;
