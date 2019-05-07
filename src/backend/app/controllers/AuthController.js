// @flow
import type { $Request, $Response } from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User'

export const login = (req: $Request, res: $Response) => {
  User.findOne({ username: req.body.username }, (error, user) => {
    if (error) return res.status(500).json('Error on the server.')
    if (!user) return res.status(404).json('User not found')

    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password)
    if (!isPasswordValid)
      return res.status(401).json({ auth: false, token: null })

    res.status(200).json({
      auth: true,
      token: user.getJwt(),
      username: user.username,
      rank: user.rank,
    })
  })
}

export const changePassword = (req: $Request, res: $Response) => {
  const { password, password_confirm, password_new } = req.body
  if (
    !password ||
    !password_confirm ||
    !password_new ||
    password_new !== password_confirm ||
    !bcrypt.compareSync(password, req.user.password)
  )
    return res.status(400).json('Bad request')
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { password: password_new } },
    { new: true },
  )
    .lean()
    .exec((err, user) => {
      if (err || !user) return res.status(400).json('Bad request')
      return res.status(200).json()
    })
}

export const logout = (req: $Request, res: $Response) => {
  res.status(200).json({ auth: false, token: null })
}

export const check = (req: $Request, res: $Response) => {
  res.status(200).json({ auth: true })
}

export const createInit = (req: $Request, res: $Response) => {
  User.create(
    {
      username: 'administrator',
      password: 'rE$eeb4w45',
      rank: 1,
    },
    (err) => {
      if (err) return res.status(400).json({ message: 'failed' })
      return res.status(200).json({ message: 'success' })
    },
  )
}
