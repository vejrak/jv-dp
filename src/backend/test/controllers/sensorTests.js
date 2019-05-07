import chai from 'chai'
import { getAuthToken, getRequest, loginAs } from './helpers'
import Sensor from '../../app/models/Sensor'
import User from '../../app/models/User'

chai.should()
const expect = chai.expect

describe('SensorController tests', () => {
  const sensorData = [
    {
      identificator: 'sensors-test',
      description: 'test1',
      datasource_type: 'json',
    },
    { identificator: 'sensors', description: 'test2', datasource_type: 'text' },
  ]

  beforeEach((done) => {
    Sensor.deleteMany({})
      .then(() => {
        return Sensor.create(sensorData)
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

  describe('/GET sensors', () => {
    it('it should get all sensors', (done) => {
      loginAs('user1', 'test1').then(() => {
        getRequest()
          .get('/sensors')
          .set('Authorization', getAuthToken())
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('Array')
            expect(res.body[0].identificator).to.be.a('string')
            done()
          })
      })
    })
  })

  describe('/DELETE sensor', () =>
    it('it should delete sensor', (done) => {
      loginAs('user1', 'test1').then(() => {
        getRequest()
          .get('/sensors')
          .set('Authorization', getAuthToken())
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('Array')
            getRequest()
              .delete('/sensors/' + res.body[0]._id)
              .set('Authorization', getAuthToken())
              .end((err, res) => {
                res.should.have.status(204)
                done()
              })
          })
      })
    }))

  describe('/PATCH sensor', () =>
    it('it should edit sensor data', (done) => {
      loginAs('user1', 'test1').then(() => {
        const data = {
          identificator: 'new identificator',
          description: 'new desc',
        }
        getRequest()
          .get('/sensors')
          .set('Authorization', getAuthToken())
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('Array')
            getRequest()
              .patch('/sensors/' + res.body[0]._id)
              .set('Authorization', getAuthToken())
              .send(data)
              .end((err, res) => {
                expect(res.body.identificator).to.be.eql(data.identificator)
                res.should.have.status(200)
                done()
              })
          })
      })
    }))

  describe('/POST sensor', () =>
    it('it should create and get new sensor', (done) => {
      loginAs('user1', 'test1').then(() => {
        const data = {
          identificator: 'new identificator',
          description: 'new desc',
          datasource_type: 'text',
        }
        getRequest()
          .post('/sensors')
          .set('Authorization', getAuthToken())
          .send(data)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('Object')
            done()
          })
      })
    }))

  describe('/POST error sensor', () =>
    it('it should get error', (done) => {
      loginAs('user1', 'test1').then(() => {
        getRequest()
          .post('/sensors')
          .set('Authorization', getAuthToken())
          .send({ falseidentificator: 'Length eror', descc: 'test' })
          .end((err, res) => {
            res.should.have.status(400)
            res.body.should.be.a('Object')
            done()
          })
      })
    }))
})
