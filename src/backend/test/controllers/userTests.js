import chai from 'chai'
import { getAuthToken, getRequest, loginAs } from './helpers'
import User from '../../app/models/User'

chai.should()
const expect = chai.expect

describe('UsersController tests', () => {
  const data = [
    { username: 'user1', password: 'test1', rank: 1 },
    { username: 'user2', password: 'test2', rank: 3 },
    { username: 'user3', password: 'test3', rank: 3 },
  ]

  beforeEach((done) => {
    User.deleteMany({})
      .then(() => {
        return User.create(data)
      })
      .then(() => {
        done()
      })
      .catch((err) => {
        throw err
      })
  })

  describe('/GET user', () => {
    it('it should GET user by name', (done) => {
      loginAs('user1', 'test1').then(() => {
        getRequest()
          .get('/users/username/' + data[1].username)
          .set('Authorization', getAuthToken())
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('array')
            res.body.length.should.be.above(0)
            expect(res.body[0].password).to.not.exist
            expect(res.body[0].username).to.be.a('string')
            expect(res.body[0].rank).to.be.equal(3)
            expect(res.body[0]._id).to.be.a('string')
            done()
          })
      })
    })
    it('user hasnt authorization for GET', (done) => {
      loginAs('user2', 'test2').then(() => {
        getRequest()
          .get('/users/username/' + data[0].username)
          .set('Authorization', getAuthToken())
          .end((err, res) => {
            res.should.have.status(401)
            done()
          })
      })
    })
  })

  describe('/POST users', () => {
    it('it should POST new user', (done) => {
      loginAs('user1', 'test1').then(() => {
        getRequest()
          .post('/users')
          .set('Authorization', getAuthToken())
          .send({ username: 'postuser', password: 'password', rank: 3 })
          .end((err, res) => {
            res.should.have.status(200)
            done()
          })
      })
    })
    it('it cant create duplicate user', (done) => {
      loginAs('user1', 'test1').then(() => {
        getRequest()
          .post('/users')
          .set('Authorization', getAuthToken())
          .send(data[1])
          .end((err, res) => {
            res.should.have.status(400)
            done()
          })
      })
    })
    it('user hasnt authorization for POST', (done) => {
      loginAs('user2', 'test2').then(() => {
        getRequest()
          .post('/users')
          .set('Authorization', getAuthToken())
          .send(data[0])
          .end((err, res) => {
            res.should.have.status(401)
            done()
          })
      })
    })
  })

  describe('/GET users', () => {
    it('it should GET all the users', (done) => {
      loginAs('user1', 'test1').then(() => {
        getRequest()
          .get('/users')
          .set('Authorization', getAuthToken())
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('array')
            Object.keys(res.body).length.should.be.eql(2)
            done()
          })
      })
    })
  })
})
