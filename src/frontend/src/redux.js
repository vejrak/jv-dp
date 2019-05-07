// @flow

import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import pick from 'lodash/pick'
import apiClient from './helpers/ApiClient'
import env from '../env'
import user, { type UserState } from './user/reducer'
import users, { type UsersState } from './users/reducer'
import metric, { type MetricState } from './metric/reducer'
import sensor, { type SensorState } from './sensor/reducer'
import group, { type GroupState } from './group/reducer'
import consts, { type ConstsState } from './consts/reducer'
import data, { type DataState } from './data/reducer'
import sensorIdMapper, {
  type SensorIdMapperState,
} from './sensorIdMapper/reducer'

export type AppState = {
  consts: ConstsState,
  data: DataState,
  group: GroupState,
  metric: MetricState,
  sensor: SensorState,
  sensorIdMapper: SensorIdMapperState,
  user: UserState,
  users: UsersState,
}

export type ActionDeps = {
  apiClient: typeof apiClient,
  dispatch: (Object) => Object,
  getState: () => AppState,
}

type Reducer = $Keys<AppState>

const createDiMiddleware = (deps) => ({ dispatch, getState }) => (
  next,
) => async (action) =>
  next(
    typeof action === 'function'
      ? await action({ ...deps, dispatch, getState })
      : action,
  )

const createMidleware = () => {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    (typeof window !== 'undefined' &&
      env.ENV !== 'production' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose
  /* eslint-enable */
  return composeEnhancers(
    applyMiddleware(...[createDiMiddleware({ apiClient }), thunk]),
  )
}

const resetStateOnLogoutReducer = (reducer) => (
  state: AppState,
  action: Object,
) => {
  if (action.type !== 'LOGOUT_FULFILLED') {
    return reducer(state, action)
  }

  const keepAfterLogout: Array<Reducer> = []
  // $FlowFixMe
  const stateAfterLogout = pick(state, keepAfterLogout)
  return reducer(stateAfterLogout, action)
}

export default () => {
  const reducers = {
    consts,
    data,
    group,
    metric,
    sensor,
    sensorIdMapper,
    user,
    users,
  }

  const combinedReducers: Function = combineReducers(reducers)
  const rootReducer = resetStateOnLogoutReducer(combinedReducers)
  const middleware = createMidleware()
  const store = createStore(rootReducer, {}, middleware)

  if (typeof window !== 'undefined') {
    window.store = store
  }

  return store
}
