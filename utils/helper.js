function parseParam(parameters) {
    let params = '?';

    for (const key in parameters) {
        const val = `${parameters[key]}` ? `${parameters[key]}` : null;
        params += `${key}=${val}` + '&';
    }

    return params.slice(0, - 1);
}

module.exports = {
    parseParam
}