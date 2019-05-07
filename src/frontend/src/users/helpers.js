// @flow

import pickBy from 'lodash/pickBy'

export const getApprovedRoles = (roleRank: number, roles: Object) =>
  pickBy(roles, (value) => value > roleRank)
