// @flow

import type { $Application } from 'express'
import * as ConstsController from '../controllers/ConstsController'

export default (app: $Application) => {
  app.get('/consts/roles', ConstsController.getRoles)
  app.get('/consts/datasource', ConstsController.getDatasource)
  app.get('/consts/content-type', ConstsController.getContentType)
  app.get('/consts/options', ConstsController.getOptions)
}
