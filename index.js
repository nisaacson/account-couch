var account = require('account')
var mixin = require('simple-mixin')
var register,
    login
register = function (data, cb) {
  return cb('register not implemented')
}
login = function (data, cb) {
  return cb('login not implemented')
}

var accountCouch = {
  login: login,
  register: register
}
mixin(account, accountCouch)
module.exports = accountCouch
