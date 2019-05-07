// @flow

import React from 'react'
import { Button } from 'react-bootstrap'

type Props = $ReadOnly<{|
  index: number,
  canBeAnchor: boolean,
  name: string,
  anchor: boolean,
  to_anchor: number,
  removeUnit: Function,
  editUnit: Function,
|}>

type State = {
  name: string,
  anchor: boolean,
  to_anchor: number,
}

class UnitForm extends React.PureComponent<Props, State> {
  state = {
    name: this.props.name,
    anchor: this.props.anchor,
    to_anchor: this.props.to_anchor,
  }

  onChange = (value: Object) => {
    this.setState({ ...value }, () => this.props.editUnit({ ...this.state }))
  }

  render() {
    const { name, anchor, to_anchor } = this.state
    const { canBeAnchor, index, removeUnit } = this.props
    return (
      <div>
        <label htmlFor="unitName">Unit name</label>
        <input
          className="form-control mb-3"
          id="unitName"
          name="name"
          onChange={({ target }) => this.onChange({ name: target.value })}
          value={name}
        />
        {!anchor && (
          <>
            <label htmlFor="to_anchor">To anchor</label>
            <input
              className="form-control mb-3"
              id="to_anchor"
              name="to_anchor"
              onChange={({ target }) =>
                this.onChange({ to_anchor: target.value })
              }
              value={to_anchor}
            />
          </>
        )}
        {canBeAnchor && (
          <div className="form-check form-check-inline">
            <input
              checked={anchor}
              className="form-check-input mb-3"
              id={`anchor${index}`}
              onChange={() => {
                let value = { anchor: !anchor }
                if (value.anchor) value = { ...value, to_anchor: 1 }
                this.onChange(value)
              }}
              type="checkbox"
              value={anchor}
            />
            <label className="form-check-label" htmlFor={`anchor${index}`}>
              Anchor
            </label>
          </div>
        )}
        <Button
          className="mt-3 btn d-block btn-danger"
          onClick={() => {
            if (window.confirm('Are you sure you wish to delete this item?'))
              removeUnit()
          }}
        >
          Delete
        </Button>
      </div>
    )
  }
}

export default UnitForm
