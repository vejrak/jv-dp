import chai from 'chai'
import map from 'lodash/map'
import omit from 'lodash/omit'
import { getAuthToken, getRequest, loginAs } from './helpers'
import Metric from '../../app/models/Metric'
import User from '../../app/models/User'

chai.should()
const expect = chai.expect

describe('MetricController tests', () => {
  const metricData = [
    { name: 'Pressure', units: [{ name: 'test1' }] },
    { name: 'Temprature', units: [{ name: 'test2', to_anchor: 30 }] },
  ]

  beforeEach((done) => {
    Metric.deleteMany({})
      .then(() => {
        return Metric.create(metricData)
      })
      .then(() => {
        done()
      })
      .catch((err) => {
        throw err
      })
  })

  before((done) => {
    const userData = [{ username: 'user1', password: 'test1', rank: 1 }]
    User.deleteMany({})
      .then(() => {
        return User.create(userData)
      })
      .then(() => {
        done()
      })
      .catch((err) => {
        throw err
      })
  })

  describe('/GET metrics', () => {
    it('it should get all metrics', (done) => {
      loginAs('user1', 'test1').then(() => {
        getRequest()
          .get('/metrics')
          .set('Authorization', getAuthToken())
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('Array')
            expect(res.body[0].name).to.be.a('string')
            done()
          })
      })
    })

    it('it should get specific metric', (done) => {
      loginAs('user1', 'test1').then(() => {
        getRequest()
          .get('/metrics/name/' + metricData[0].name)
          .set('Authorization', getAuthToken())
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('Array')
            expect(res.body[0].name).to.be.a('string')
            done()
          })
      })
    })
  })

  describe('/DELETE metric', () =>
    it('it should delete metric', (done) => {
      loginAs('user1', 'test1').then(() => {
        getRequest()
          .get('/metrics')
          .set('Authorization', getAuthToken())
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('Array')
            getRequest()
              .delete('/metrics/' + res.body[0]._id)
              .set('Authorization', getAuthToken())
              .end((err, res) => {
                res.should.have.status(204)
                done()
              })
          })
      })
    }))

  describe('/PATCH metric', () =>
    it('it should edit metric data', (done) => {
      loginAs('user1', 'test1').then(() => {
        const data = {
          name: 'new',
          units: [
            { name: 'new', anchor: true },
            { name: 'new5', to_anchor: 10 },
          ],
        }
        getRequest()
          .get('/metrics')
          .set('Authorization', getAuthToken())
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('Array')
            getRequest()
              .patch('/metrics/' + res.body[0]._id)
              .set('Authorization', getAuthToken())
              .send(data)
              .end((err, res) => {
                const result = map(res.body.units, (o) => omit(o, ['_id']))
                expect(result).to.deep.equals(data.units)
                expect(res.body.name).to.be.eql(data.name)
                res.should.have.status(200)
                done()
              })
          })
      })
    }))

  describe('/POST metric', () =>
    it('it should create and get new metric', (done) => {
      loginAs('user1', 'test1').then(() => {
        const data = { name: 'new', units: [{ name: 'new' }, { name: 'new5' }] }
        getRequest()
          .post('/metrics')
          .set('Authorization', getAuthToken())
          .send(data)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('Object')
            done()
          })
      })
    }))

  describe('/POST error metric', () =>
    it('it should get error', (done) => {
      loginAs('user1', 'test1').then(() => {
        getRequest()
          .post('/metrics')
          .set('Authorization', getAuthToken())
          .send({ Falsename: 'Length eror', units: ['m', 'yard'] })
          .end((err, res) => {
            res.should.have.status(400)
            res.body.should.be.a('Object')
            done()
          })
      })
    }))
})
