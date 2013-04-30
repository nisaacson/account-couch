var Account = require('account')
var mixin = require('simple-mixin')
var register = require('./lib/register')
var login = require('./lib/login')

var AccountCouch = function(db) {
  this.db = db
}
AccountCouch.prototype = Object.create(Account)

AccountCouch.prototype.register = register
AccountCouch.prototype.login = login

module.exports = AccountCouch
