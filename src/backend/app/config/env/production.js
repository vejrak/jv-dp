// @flow

module.exports = {
  port: parseInt(process.env.OPT_APP_PORT, 10) || 8001,
  jwt_secret: process.env.IOT_APP_JWT_SECRET || 'production',
  jwt_expiration: parseInt(process.env.IOT_APP_JWT_EXPIRATION, 10) || 10000,
  mongo_url:
    process.env.IOT_APP_MONGO_URL ||
    'mongodb+srv://admin:admin@cluster0-dmwho.mongodb.net/test?retryWrites=true',
}
