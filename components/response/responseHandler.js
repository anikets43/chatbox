
function processResponse(request, response, isSuccess) {
    const data = request.body;
    var result = {};

    result.context = {
        "timestamp": response.timestamp || new Date(),
        "version": data['context']['version']
    };

    result.result = {
        "message": isSuccess ? 'SUCCESS' : (request.validationErrors().length > 0 ? 'REQ_VAL' : 'SER_ERR'),
        // "statusCode": isSuccess ? response.status.code : response.statusCode,
        "statusCode": isSuccess ? 'SUC000' : 'FAIL',        
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
