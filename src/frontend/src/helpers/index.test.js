import { createGroupsOptions, getGroupForSelect } from './index'

describe('helpers tests', () => {
  const groups = [
    { _id: 'id1', name: 'group1' },
    { _id: 'id2', name: 'group2' },
  ]
  test('Get group data for selectBox', () => {
    expect(getGroupForSelect(groups, ['id1'])).toEqual([
      { value: 'id1', label: 'group1' },
    ])
    expect(getGroupForSelect(groups, ['id1', 'id2'])).toEqual([
      { value: 'id1', label: 'group1' },
      { value: 'id2', label: 'group2' },
    ])
    expect(getGroupForSelect(groups, [])).toEqual([])
  })
  test('Create groups options', () => {
    expect(createGroupsOptions(groups)).toEqual([
      { value: 'id1', label: 'group1' },
      { value: 'id2', label: 'group2' },
    ])
    expect(createGroupsOptions([])).toEqual([])
  })
})
