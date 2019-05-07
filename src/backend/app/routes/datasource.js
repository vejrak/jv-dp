// @flow

import type { $Application } from 'express'
import * as DataSourceController from '../controllers/DataSourceController'
import datasource from '../middlewares/datasource'

export default (app: $Application) => {
  app.post('/datasource', datasource, DataSourceController.post)
}
