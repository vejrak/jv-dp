// @flow
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'

export type Config = {
  port: number,
  jwt_secret: string,
  jwt_expiration: number,
  mongo_url: string,
}

let envConfig: Config = {
  port: parseInt(process.env.OPT_APP_PORT, 10) || 8000,
  jwt_secret: process.env.IOT_APP_JWT_SECRET || 'default',
  jwt_expiration: parseInt(process.env.IOT_APP_JWT_EXPIRATION, 10) || 10000,
  mongo_url: process.env.IOT_APP_MONGO_URL || 'mongodb://localhost:27017/myapp',
}

try {
  // $FlowFixMe
  envConfig = require(`./env/${env}.js`)
} catch (e) {
  // eslint-disable-next-line no-console
  console.log('Enviroment without configuration file.')
}
export default envConfig
