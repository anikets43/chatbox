module.exports = {
    doVersionApi: false,

    port: process.env.PORT || 3000,

    db: {
        sess_interval: 3600,
        uri:
            process.env.MONGOLAB_URI ||
            process.env.COMPOSEMONGO_URL ||
            'mongodb://testuser:testuser@ds231987.mlab.com:31987/chatbox'
    },

    basicAuth: {
        username: 'testuser',
        password: 'testpass'
    },
    externalUrlEndpoint: 'https://reqres.in/api/unknown/2'
}
