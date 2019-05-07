// @flow

import type { Sensor as SensorType, User } from '../../models/types'

const hasUserMinimalRank = (user, minUserRank) => {
  return user && user.rank <= minUserRank
}

export default (
  user: User,
  sensor: SensorType,
  minUserRank: number,
): boolean => {
  if (minUserRank && hasUserMinimalRank(user, minUserRank)) return true
  if (!user.groups || !sensor.groups) return false
  if (!Array.isArray(user.groups) || !Array.isArray(sensor.groups)) return false
  return user.groups.some(function(userGroupId) {
    return (
      sensor.groups &&
      sensor.groups.some(function(sensorGroupId) {
        return userGroupId.toString() === sensorGroupId.toString()
      })
    )
  })
}
