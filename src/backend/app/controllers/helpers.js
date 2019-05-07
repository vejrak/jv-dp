// @flow

import cloneDeep from 'lodash/cloneDeep'
import omit from 'lodash/omit'
import transform from 'lodash/transform'
import type { FiltredUser, User } from '../models/types'

export const filterUsers = (users: Array<User>): Array<FiltredUser> =>
  transform(
    users,
    (filtredUsers, user) => {
      filtredUsers.push(cloneDeep(omit(user, ['password'])))
      return filtredUsers
    },
    [],
  )
