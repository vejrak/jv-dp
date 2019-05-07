// @flow

import React from 'react'
import { ClipLoader } from 'react-spinners'

const Spinner = () => (
  <div className="text-center">
    <ClipLoader color="#123abc" loading size={150} sizeUnit="px" />
  </div>
)

export default Spinner
