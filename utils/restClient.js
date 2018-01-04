var Client = require('node-rest-client').Client;
var client = new Client();

function get(url) {
    console.log('GET METHOD: ' + url);
    return new Promise((resolve, reject) => {
        client.get(url, function (data, response) {
            resolve(data);
        });
    })
}

function post(url, data) {
    var args = {
        data: data,
        headers: { "Content-Type": "application/json" }
    };
    return new Promise((resolve, reject) => {
        client.post(url, args, function (data, response) {
            resolve(data);
        });
    })
}

module.exports = { get, post }