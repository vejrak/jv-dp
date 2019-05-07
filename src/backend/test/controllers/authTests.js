import chai from 'chai'
import { getAuthToken, getRequest, loginAs } from './helpers'
import User from '../../app/models/User'

chai.should()
const expect = chai.expect

describe('AuthController tests', () => {
  beforeEach((done) => {
    const data = [{ username: 'user1', password: 'test1', rank: 1 }]

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

  describe('test login process', () => {
    it('it should login and receive token', (done) => {
      getRequest()
        .post('/auth/login')
        .send({ username: 'user1', password: 'test1' })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('Object')
          expect(res.body.token).to.be.a('string')
          done()
        })
    })
    it('it should failed login', (done) => {
      getRequest()
        .post('/auth/login')
        .send({ username: 'notexist', password: 'test1' })
        .end((err, res) => {
          res.should.have.status(404)
          expect(res.body.token).to.not.exist
          done()
        })
    })
  })
  describe('test logout user', () => {
    it('it should logout user', (done) => {
      loginAs('user1', 'test1').then(() => {
        getRequest()
          .post('/auth/logout')
          .set('Authorization', getAuthToken())
          .end((err, res) => {
            res.should.have.status(200)
            done()
          })
      })
    })
  })
  describe('test change password', () => {
    it('it should change passsword of user', (done) => {
      loginAs('user1', 'test1').then(() => {
        getRequest()
          .patch('/auth/change-password')
          .set('Authorization', getAuthToken())
          .send({
            password: 'test1',
            password_confirm: 'test2',
            password_new: 'test2',
          })
          .end((err, res) => {
            res.should.have.status(200)
            done()
          })
      })
    })
  })
})
