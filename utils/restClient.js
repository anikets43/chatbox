const axios = require('axios');

function get(url, auth) {

    return getHeader(auth).then(data => {
        var headers = data;
        return new Promise((resolve, reject) => {
            axios.get(url, { headers: headers })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    resolve(error);
                });
        });
    });
}

function post(url, data, auth) {
    return getHeader(auth).then(headers => {
        return new Promise((resolve, reject) => {
            axios.post(url, data, { headers: headers })
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    resolve(error);
                });
        })
    });
}

function getHeader(auth) {
    let headers = {
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
                    data: auth.value,
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