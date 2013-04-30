var async = require('async')
var fs = require('fs')
var assert = require('assert')
var should = require('should');
var configFilePath = require('optimist').demand('config').argv.config
assert.ok(fs.existsSync(configFilePath), 'config file not found at path: ' + configFilePath)
var config = require('nconf').env().argv().file({file: configFilePath})
var db = require('cradle-nconf')(config)
var Account = require('../..')
var account = new Account(db)
describe('Login Integration', function () {
  this.timeout('20s')
  this.slow('10s')
  var data = {
    email: 'user1@example.com',
    password: 'password1',
    db: db
  }
  before(function (done) {
    var email = data.email
    removeForEmail(email, function (err) {
      should.not.exist(err)
      should.exist(account.register)
      account.register(data, function (err, reply) {
        should.not.exist(err)
        should.exist(reply)
        should.exist(reply.email)
        reply.email.should.eql(data.email)
        done()
      })
    })
  })

  it('should login correctly', function (done) {
    var email = data.email
    account.login(data, function (err, reply) {
      should.not.exist(err)
      should.exist(reply)
      should.exist(reply.email)
      reply.email.should.eql(data.email)
      should.exist(reply._id)
      should.exist(reply._rev)
      done()
    })
  })

  it('should return undefined if password is incorrect', function (done) {
    data.password = 'wrong password'
    account.login(data, function (err, reply) {
      should.not.exist(err)
      should.not.exist(reply)
      done()
    })
  })

  it('should give error if profile cannot be found', function (done) {
    data.email = 'user2@example.com'
    removeForEmail(data.email, function (err) {
      should.not.exist(err)
      should.exist(account.register)
      account.login(data, function (err, reply) {
        should.not.exist(err)
        should.not.exist(reply)
        done()
      })
    })
  })
})


function removeForEmail(email, callback) {
  db.view('user_profile/byEmail', {key: email}, function (err, res) {
    should.not.exist(err, 'error removing profiles: ' + JSON.stringify(err, null, ' '))
    if (res.length === 0) {
      return callback()
    }
    async.forEachSeries(
      res,
      function (doc, cb) {
        doc = doc.value
        var id = doc._id
        var rev = doc._rev
        db.remove(id, rev, cb)
      }, callback
    )
  })
}
