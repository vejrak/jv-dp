// @flow
import type { $Request, $Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import glob from 'glob'
import logger from 'morgan'
import mongoose from 'mongoose'
import passport from 'passport'
import config from './config/config'

let app = express()
const port = process.env.PORT || config.port
mongoose.set('useFindAndModify', false)

app.use(cors())
app.use(compression())
app.use(bodyParser.text({ type: 'text/plain' }))
app.use(bodyParser.json())
app.use(
  bodyParser.raw({
    type: 'application/octet-stream',
    limit: '10mb',
  }),
)
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(passport.initialize())

mongoose
  .connect(config.mongo_url, { useCreateIndex: true, useNewUrlParser: true })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Database connected')
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log(`Database connection failed: ${error}`)
  })

app.use((err, req: $Request, res: $Response, next: NextFunction) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Missing authentication credentials.')
  }
  next()
})

glob.sync('routes/**/*.js', { cwd: __dirname }).map((filename) => {
  // $FlowFixMe
  import(`./${filename}`).then((module) => {
    module.default(app)
  })
})

app.listen(port)
// eslint-disable-next-line no-console
console.log('Listening on port ' + port)

export default app
