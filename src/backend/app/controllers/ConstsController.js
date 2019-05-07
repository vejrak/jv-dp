// @flow

import type { $Request, $Response } from 'express'
import consts from '../consts'

export const getRoles = (req: $Request, res: $Response) => {
  res.status(200).json(consts.roles)
}

export const getDatasource = (req: $Request, res: $Response) => {
  res.status(200).json(consts.datasource)
}

export const getContentType = (req: $Request, res: $Response) => {
  res.status(200).json(consts.contentType)
}

export const getOptions = (req: $Request, res: $Response) => {
  res.status(200).json(consts.options)
}
