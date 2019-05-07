// @flow

module.exports = {
  port: parseInt(process.env.OPT_APP_PORT, 10) || 8000,
  jwt_secret: process.env.IOT_APP_JWT_SECRET || 'test',
  jwt_expiration: parseInt(process.env.IOT_APP_JWT_EXPIRATION, 10) || 10000,
  mongo_url: process.env.IOT_APP_MONGO_URL || 'mongodb://localhost:27017/myapp',
}
