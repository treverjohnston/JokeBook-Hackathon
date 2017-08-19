var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var bcrypt = require('bcryptjs')
const SALT_FACTOR = 10;

var schema = new Schema({
    email: { type: String, required: true, unique: true, dropDups: true },
    userName: { type: String, required: true },
    age: { type: Number },
    password: { type: String, required: true },
    //RELATIONSHIPS
})

schema.pre('save', function(next) {
    //console.log("in pre")
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        //console.log("tom rocks")
        if (err) {
            //console.log("error fired")
            return next(err);
        } else {
            // console.log("testing hash")
            bcrypt.hash(user.password, salt, function(err, hash) {
                user.password = hash;
                next();
            });
        }
    });
});

schema.methods.validatePassword = function(password) {
    return new Promise((resolve, reject) => {


        //  console.log("testing: ", this.password);
        bcrypt.compare(password, this.password, function(err, isMatch) {

            if (err || !isMatch) {
                return reject(err);
            }
            return resolve(isMatch);
        });
    })
};


module.exports = mongoose.model('User', schema);