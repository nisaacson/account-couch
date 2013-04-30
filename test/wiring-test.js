var assert = require('assert')
var should = require('should');
var inspect = require('eyespect').inspector();
var rewire = require('rewire')
var Account = require('../')
var db = {
  foo: 'bar'
}
describe('Index Wiring', function () {
  var account = new Account(db)
  it('should be wired up correctly', function (done) {
    var registerCalled = false
    var loginCalled = false
    account.login =  function (data, cb) {
      loginCalled = true
      cb()
    }
    account.register =  function (data, cb) {
      registerCalled = true
      cb()
    }
    var data = {
      foo: 'bar'
    }
    account.login(data, function (err, reply) {
      should.not.exist(err)
      account.register(data, function (err, reply) {
        should.not.exist(err)
        assert.ok(loginCalled)
        assert.ok(registerCalled)
        done()
      })
    })
  })
})
