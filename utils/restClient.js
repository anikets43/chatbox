var Client = require('node-rest-client').Client;
var client = new Client();

const config = require('../config');

const baseUrl = config.externalUrlEndpoint;

function get(params) {
    console.log('GET METHOD: ' + baseUrl + params);
    return new Promise((resolve, reject) => {
        client.get(baseUrl + params, function (data, response) {
            resolve(data);
        });
    })
}

function post(data) {
    var args = {
        data: data,
        headers: { "Content-Type": "application/json" }
    };
    return new Promise((resolve, reject) => {
        client.post(baseUrl, args, function (data, response) {
            resolve(data);
        });
    })
}

module.exports = { get, post }