import chai from 'chai'
import { getAuthToken, getRequest, loginAs } from './helpers'
import SensorIdMapper from '../../app/models/SensorIdMapper'
import User from '../../app/models/User'
import consts from '../../app/consts'

chai.should()
const expect = chai.expect
const { contentType } = consts

describe('SensorIdMapperController tests', () => {
  const sensorIdMapperData = [
    { source_name: 'id', content_type: contentType.JSON },
    { source_name: 'id=', content_type: contentType.TEXT, separator: ';' },
  ]

  beforeEach((done) => {
    SensorIdMapper.deleteMany({})
      .then(() => {
        return SensorIdMapper.create(sensorIdMapperData)
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

  describe('/GET sensor_id_mappers', () => {
    it('it should get all sensor_id_mappers', (done) => {
      loginAs('user1', 'test1').then(() => {
        getRequest()
          .get('/sensor_id_mappers')
          .set('Authorization', getAuthToken())
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('Array')
            expect(res.body[0].source_name).to.be.a('string')
            done()
          })
      })
    })
  })

  describe('/DELETE sensor id mapper', () =>
    it('it should delete sensor id mapper', (done) => {
      loginAs('user1', 'test1').then(() => {
        getRequest()
          .get('/sensor_id_mappers')
          .set('Authorization', getAuthToken())
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('Array')
            getRequest()
              .delete('/sensor_id_mappers/' + res.body[0]._id)
              .set('Authorization', getAuthToken())
              .end((err, res) => {
                res.should.have.status(204)
                done()
              })
          })
      })
    }))

  describe('/PATCH sensor id mapper', () =>
    it('it should edit sensor id mapper data', (done) => {
      loginAs('user1', 'test1').then(() => {
        const data = {
          source_name: 'new name',
          content_type: contentType.JSON,
        }
        getRequest()
          .get('/sensor_id_mappers')
          .set('Authorization', getAuthToken())
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('Array')
            getRequest()
              .patch('/sensor_id_mappers/' + res.body[0]._id)
              .set('Authorization', getAuthToken())
              .send(data)
              .end((err, res) => {
                expect(res.body.name).to.be.eql(data.name)
                res.should.have.status(200)
                done()
              })
          })
      })
    }))

  describe('/POST sensor id mapper', () =>
    it('it should create and get new sensor id mapper', (done) => {
      loginAs('user1', 'test1').then(() => {
        const data = { source_name: 'new name', content_type: contentType.JSON }
        getRequest()
          .post('/sensor_id_mappers')
          .set('Authorization', getAuthToken())
          .send(data)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('Object')
            done()
          })
      })
    }))

  describe('/POST error sensor id mapper', () =>
    it('it should get error', (done) => {
      loginAs('user1', 'test1').then(() => {
        getRequest()
          .post('/sensor_id_mappers')
          .set('Authorization', getAuthToken())
          .send({ falsename: 'Length eror', descc: 'test' })
          .end((err, res) => {
            res.should.have.status(400)
            res.body.should.be.a('Object')
            done()
          })
      })
    }))
})
