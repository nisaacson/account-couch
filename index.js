var account = require('account')
var mixin = require('simple-mixin')
var register = require('./lib/register')
var login = require('./lib/login')

var accountCouch = {
  login: login,
  register: register
}
mixin(account, accountCouch)
module.exports = accountCouch
