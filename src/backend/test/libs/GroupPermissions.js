import chai from 'chai'
import Group from '../../app/models/Group'
import Sensor from '../../app/models/Sensor'
import User from '../../app/models/User'
import GroupPermissions from '../../app/lib/groupPermissions'

var assert = require('assert')
describe('GroupPermissions tests', function() {
  var sensors
  var users
  var groups

  before((done) => {
    const groupData = [{ name: 'test' }, { name: 'test2' }]
    const sensorData = [
      {
        identificator: 'sensors-test',
        description: 'test1',
        datasource_type: 'json',
      },
      {
        identificator: 'sensors-test2',
        description: 'test1',
        datasource_type: 'json',
      },
    ]
    const userData = [
      { username: 'user1', password: 'test1', rank: 1 },
      { username: 'user2', password: 'test2', rank: 3 },
      { username: 'user3', password: 'test3', rank: 3 },
    ]
    Promise.all([
      Group.deleteMany({}),
      Sensor.deleteMany({}),
      User.deleteMany({}),
    ])
      .then(async () => {
        groups = await Group.create(groupData)
      })
      .then(() => {
        userData[1].groups = groups
        return User.create(userData)
      })
      .then((newUser) => {
        users = newUser
        sensorData[1].groups = groups
        return Sensor.create(sensorData)
      })
      .then((newSensor) => {
        sensors = newSensor
        done()
      })
      .catch((err) => {
        throw err
        done()
      })
  })

  it('Test case when user and sensor have same group', function() {
    assert.equal(GroupPermissions(users[1], sensors[1], 2), true)
  })
  it('Test case when user and sensor havent same group', function() {
    assert.equal(GroupPermissions(users[2], sensors[0], 2), false)
  })
  it('Test case when user is admin and he hasnt any group', function() {
    assert.equal(GroupPermissions(users[0], sensors[0], 2), true)
  })
})
