var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    googleId: 'string',
    name: 'string'
    // email: mongoose.SchemaTypes.Email
});

var User = mongoose.model("User", UserSchema);

module.exports = {
   findOrCreate: function (user, callback) {
       var u = new User({
                    googleId: user.googleId,
                    name : user.displayName
//                     email: user.emails[0].value
       });
       u.save(function () {
           callback(u);
       });
   }
}