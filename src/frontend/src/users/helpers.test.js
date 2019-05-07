import { getApprovedRoles } from './helpers'

describe('getApprovedRoles tests', () => {
  const roles = { SUPER_ADMIN: 1, ADMIN: 2, USER: 3 }
  it('get roles with more than rank 1', () => {
    const approvedRoles = getApprovedRoles(1, roles)
    const result = { ADMIN: 2, USER: 3 }
    expect(approvedRoles).toEqual(result)
  })
  it('get roles all roles', () => {
    const approvedRoles = getApprovedRoles(-1, roles)
    const result = { SUPER_ADMIN: 1, ADMIN: 2, USER: 3 }
    expect(approvedRoles).toEqual(result)
  })
  it('get empty roles', () => {
    const approvedRoles = getApprovedRoles(999, roles)
    expect(approvedRoles).toEqual({})
  })
})
