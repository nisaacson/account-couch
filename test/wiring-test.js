var assert = require('assert')
var should = require('should');
var inspect = require('eyespect').inspector();
var rewire = require('rewire')
var accountCouch = require('../')
describe('Index Wiring', function () {
  it('should be wired up correctly', function (done) {
    var registerCalled = false
    var loginCalled = false
    accountCouch.login =  function (data, cb) {
      loginCalled = true
      cb()
    }
    accountCouch.register =  function (data, cb) {
      registerCalled = true
      cb()
    }
    var data = {
      foo: 'bar'
    }
    accountCouch.login(data, function (err, reply) {
      should.not.exist(err)
      accountCouch.register(data, function (err, reply) {
        should.not.exist(err)
        assert.ok(loginCalled)
        assert.ok(registerCalled)
        done()
      })
    })
  })
})
