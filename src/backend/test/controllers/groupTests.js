import chai from 'chai'
import { getAuthToken, getRequest, loginAs } from './helpers'
import Group from '../../app/models/Group'
import User from '../../app/models/User'

chai.should()
const expect = chai.expect

describe('GroupController tests', () => {
  const groupData = [
    { name: 'sensors-test', description: 'test1' },
    { name: 'sensors', description: 'test2' },
  ]

  beforeEach((done) => {
    Group.deleteMany({})
      .then(() => {
        return Group.create(groupData)
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

  describe('/GET groups', () => {
    it('it should get all groups', (done) => {
      loginAs('user1', 'test1').then(() => {
        getRequest()
          .get('/groups')
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

  describe('/DELETE group', () =>
    it('it should delete group', (done) => {
      loginAs('user1', 'test1').then(() => {
        getRequest()
          .get('/groups')
          .set('Authorization', getAuthToken())
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('Array')
            getRequest()
              .delete('/groups/' + res.body[0]._id)
              .set('Authorization', getAuthToken())
              .end((err, res) => {
                res.should.have.status(204)
                done()
              })
          })
      })
    }))

  describe('/PATCH group', () =>
    it('it should edit group data', (done) => {
      loginAs('user1', 'test1').then(() => {
        const data = {
          name: 'new name',
          description: 'new desc',
        }
        getRequest()
          .get('/groups')
          .set('Authorization', getAuthToken())
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('Array')
            getRequest()
              .patch('/groups/' + res.body[0]._id)
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

  describe('/POST group', () =>
    it('it should create and get new group', (done) => {
      loginAs('user1', 'test1').then(() => {
        const data = { name: 'new name', description: 'new desc' }
        getRequest()
          .post('/groups')
          .set('Authorization', getAuthToken())
          .send(data)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('Object')
            done()
          })
      })
    }))

  describe('/POST error group', () =>
    it('it should get error', (done) => {
      loginAs('user1', 'test1').then(() => {
        getRequest()
          .post('/groups')
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
