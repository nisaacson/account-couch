var couchProfile = require('couch-profile')
module.exports = function confirmUniqueEmail(email, db, cb) {
  var findData = {
    email: email,
    db: db
  }
  couchProfile.findProfile(findData, function (err, profile) {
    if (err) { return cb(err) }
    var unique = true
    if (profile) {
      unique = true
    }
    cb(null, unique)
  })
}
