var mongoose = require('mongoose');

var UserSchema = new new mongoose.Schema({
    firstname: String,
    lastname: String,
    address: String
});

UserSchema.methods.toJSONFor = function (user) {
    return {
        firstName: this.firstname,
        lastname: this.lastname,
        address: this.address
    };
};

mongoose.model('User', UserSchema);
