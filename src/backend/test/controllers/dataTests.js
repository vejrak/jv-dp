import chai from 'chai'
import { getAuthToken, getRequest, loginAs } from './helpers'
import Data from '../../app/models/Data'
import Group from '../../app/models/Group'
import Metric from '../../app/models/Metric'
import Sensor from '../../app/models/Sensor'
import User from '../../app/models/User'

chai.should()
const expect = chai.expect

describe('DataController tests', () => {
  let sensor = null
  let groups = null
  let metrics = null
  const metricData = [
    {
      name: 'Length',
      units: [{ name: 'm', anchor: true }, { name: 'cm', to_anchor: 0.01 }],
    },
  ]

  before((done) => {
    const groupData = [{ name: 'test' }, { name: 'test2' }]
    const userData = [
      { username: 'user1', password: 'test1', rank: 3 },
      { username: 'user2', password: 'test2', rank: 3 },
      { username: 'user3', password: 'test3', rank: 1 },
    ]
    const sensorData = {
      identificator: 'sensors-test',
      description: 'test1',
      datasource_type: 'json',
    }
    Promise.all([
      User.deleteMany({}),
      Metric.deleteMany({}),
      Group.deleteMany({}),
      Sensor.deleteMany({}),
      Data.deleteMany({}),
    ])
      .then(async () => {
        groups = await Group.create(groupData)
      })
      .then(() => {
        userData[0].groups = groups
        return User.create(userData)
      })
      .then(() => {
        sensorData.groups = groups
        return Sensor.create(sensorData)
      })
      .then((newSensor) => {
        sensor = newSensor
        return Metric.create(metricData)
      })
      .then((newMetrics) => {
        metrics = newMetrics
        const data = [
          {
            sensor_id: sensor._id,
            value: '10',
            metric: metrics[0]._id,
            unit: 'm',
          },
          {
            sensor_id: sensor._id,
            value: '10',
            metric: metrics[0]._id,
            unit: 'm',
          },
          {
            sensor_id: sensor._id,
            value: '500',
            is_status: true,
          },
        ]
        return Data.create(data)
      })
      .then(() => {
        done()
      })
      .catch((err) => {
        throw err
        done()
      })
  })

  describe('/GET data', () => {
    it('it should get all data', (done) => {
      loginAs('user1', 'test1').then(() => {
        getRequest()
          .get('/data/' + sensor._id)
          .set('Authorization', getAuthToken())
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('Array')
            expect(res.body.length).to.equal(2)
            expect(res.body[0].value).to.be.a('string')
            expect(res.body[0].unit).to.be.a('string')
            done()
          })
      })
    })
    it('it should get no data after convert data if unit not exists', (done) => {
      loginAs('user1', 'test1').then(() => {
        getRequest()
          .get(
            '/data/' +
              sensor._id +
              '/' +
              metrics[0]._id +
              '?convertUnit=noExists',
          )
          .set('Authorization', getAuthToken())
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('Array')
            expect(res.body.length).to.equal(0)
            done()
          })
      })
    })
    it('it should get same data after convert', (done) => {
      loginAs('user1', 'test1').then(() => {
        getRequest()
          .get('/data/' + sensor._id + '/' + metrics[0]._id + '?convertUnit=m')
          .set('Authorization', getAuthToken())
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('Array')
            expect(res.body.length).to.equal(2)
            expect(res.body[0].value).to.be.a('string')
            expect(res.body[0].unit).to.equal('m')
            done()
          })
      })
    })
    it('it should get all data with converted unit', (done) => {
      loginAs('user1', 'test1').then(() => {
        getRequest()
          .get('/data/' + sensor._id + '/' + metrics[0]._id + '?convertUnit=cm')
          .set('Authorization', getAuthToken())
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('Array')
            expect(res.body.length).to.equal(2)
            expect(res.body[0].value).to.be.a('string')
            expect(res.body[0].unit).to.be.a('string')
            expect(res.body[0].unit).to.equal('cm')
            done()
          })
      })
    })
    it('it should get overview data', (done) => {
      loginAs('user1', 'test1').then(() => {
        getRequest()
          .get('/data/overview/' + metrics[0].id + '/' + sensor._id)
          .set('Authorization', getAuthToken())
          .end((err, res) => {
            res.should.have.status(200)
            expect(res.body.min).to.be.a('number')
            expect(res.body.max).to.be.a('number')
            expect(res.body.unit).to.be.a('string')
            expect(res.body.mean).to.be.a('number')
            done()
          })
      })
    })
    it('it should not get overview data because of low permission', (done) => {
      loginAs('user2', 'test2').then(() => {
        getRequest()
          .get('/data/overview/' + metrics[0].id + '/' + sensor._id)
          .set('Authorization', getAuthToken())
          .end((err, res) => {
            res.should.have.status(400)
            done()
          })
      })
    })
    it('it should get overview data with admin permissions', (done) => {
      loginAs('user3', 'test3').then(() => {
        getRequest()
          .get('/data/overview/' + metrics[0].id + '/' + sensor._id)
          .set('Authorization', getAuthToken())
          .end((err, res) => {
            res.should.have.status(200)
            expect(res.body.min).to.be.a('number')
            expect(res.body.max).to.be.a('number')
            expect(res.body.unit).to.be.a('string')
            expect(res.body.mean).to.be.a('number')
            done()
          })
      })
    })
    it('it should get status data', (done) => {
      loginAs('user3', 'test3').then(() => {
        getRequest()
          .get('/data/' + sensor._id + '/status')
          .set('Authorization', getAuthToken())
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('Array')
            expect(res.body.length).to.equal(1)
            expect(res.body[0].value).to.be.a('string')
            expect(res.body[0].value).to.equal('500')
            done()
          })
      })
    })
    it('it should get data metrics', (done) => {
      loginAs('user3', 'test3').then(() => {
        getRequest()
          .get('/data/' + sensor._id + '/metrics')
          .set('Authorization', getAuthToken())
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('Array')
            expect(res.body.length).to.equal(1)
            expect(res.body[0].name).to.be.a('string')
            expect(res.body[0].units).to.be.a('Array')
            expect(res.body[0].units.length).to.equal(2)
            expect(res.body[0].units[0].name).to.equal('m')
            expect(res.body[0].units[1].name).to.equal('cm')
            done()
          })
      })
    })
  })
})
