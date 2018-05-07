const mongoose = require('mongoose');

require('./unit');

var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

//lconst unit = require('./units');

// Create a schema, a model, and a new object


let userSchema = new Schema({
  department: String,
  email: String,
  enabled: Boolean,
  firstName: String,
  hash: String,
  lastName: String,
  phoneNumber: String,
  position: {
    type: Number,
    enum: ['SYS_ADMIN', // 0 
      'SUPERVISING_TECHNICIAN', // 1
      'TECHNICIAN', // 2
      'USER'] // 3
  },
  username: String,
  unit: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },
  email: String
}, { collection: 'users' });


userSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, function (err, salt) {
          if (err) {
              return next(err);
          }
          bcrypt.hash(user.password, salt, function (err, hash) {
              if (err) {
                  return next(err);
              }
              user.password = hash;
              next();
          });
      });
  } else {
      return next();
  }
});

userSchema.methods.comparePassword = function (passw, schema, cb) {
  schema.findOne({username: this.username}).select('password').exec(function (err, user) {
    bcrypt.compare(passw, user.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
  });

};        

let User = mongoose.model('User', userSchema);
module.exports = User;

mongoose.connection.on('connected', () => console.log('Mongoose for User connected.'));
mongoose.connection.on('disconnected', () => console.log("Mongoose for User disconnected."));

