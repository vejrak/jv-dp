import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../../app/server'

chai.use(chaiHttp)

let token

export const getRequest = () => chai.request(server)

export const loginAs = (username, password) =>
  getRequest()
    .post('/auth/login')
    .send({ username, password })
    .then((res) => {
      token = res.body.token
    })

export const getAuthToken = () => token
