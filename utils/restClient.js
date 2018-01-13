var Client = require('node-rest-client').Client;
var client = new Client();

function get(url, auth) {

    return getHeader(auth).then(data => {
        var headers = data;
        return new Promise((resolve, reject) => {
            client.get(url, { headers: headers }, function (data, response) {
                resolve(data);
            });
        })
    });
}

function post(url, data, auth) {

    return getHeader(auth).then(data => {
        var headers = data;
        var args = {
            data: data,
            headers: headers
        };
        return new Promise((resolve, reject) => {
            client.post(url, args, function (data, response) {
                resolve(data);
            });
        })
    });
}

function getHeader(auth) {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    return new Promise((resolve, reject) => {
        switch (auth.type) {
            case 'NO_AUTH':
                resolve(headers);
                break;

            case 'BASIC':
                headers['Authorization'] = auth.value
                resolve(headers);
                break;

            case 'OAUTH':
                var args = {
                    data: auth.data,
                    headers: { "Content-Type": "application/json" }
                };

                client.post(auth.value['url'], args, function (data, response) {
                    headers['Authorization'] = data.token_type + ' ' + data.access_token;
                    resolve(headers);
                });
                break;
        }
    });

}

module.exports = { get, post }