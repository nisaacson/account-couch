var bcrypt = require('bcrypt-nodejs')
var couchProfile = require('couch-profile')
var rk = require('required-keys');
var inspect = require('eyespect').inspector();
module.exports = function (data, cb) {
  inspect(data.email, 'user to remove')
  var keys = ['email', 'password']
  var err = rk.truthySync(data, keys)
  if (err) {
    return cb({
      message: 'failed to remove user, missing key in data',
      error: err,
      stack: new Error().stack
    })
  }
  var email = data.email
  var db = this.db
  var password = data.password
  var findData = {
    email: email,
    db: db
  }
  couchProfile.findProfile(findData, function (err, profile) {
    if (err) { return cb(err) }
    if (!profile) {
      return cb()
    }
    inspect(profile, 'profile to remove')
    var id = profile._id
    var rev = profile._rev
    db.remove(id, rev, function (err, reply) {
      if (err) {
        return cb({
          message: 'failed to remove user',
          error: err,
          stack: new Error().stack
        })
      }
      cb()
    })
  })
}
