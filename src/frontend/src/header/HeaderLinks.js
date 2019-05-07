// @flow

import React from 'react'
import Link from 'next/link'

type Props = $ReadOnly<{|
  isLoggedIn: boolean,
  rank: number,
|}>

const HeaderLinks = ({ isLoggedIn, rank }: Props) =>
  isLoggedIn ? (
    <>
      <li className="nav-item">
        <Link href="/data">
          <a className="nav-link" href="#">
            Data
          </a>
        </Link>
      </li>
      {rank === 1 && (
        <>
          <li className="nav-item">
            <Link href="/metrics">
              <a className="nav-link" href="#">
                Metrics
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/sensors">
              <a className="nav-link" href="#">
                Sensors
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/groups">
              <a className="nav-link" href="#">
                Groups
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/sensorIdMappers">
              <a className="nav-link" href="#">
                Sensor id mappers
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/user">
              <a className="nav-link" href="#">
                User
              </a>
            </Link>
          </li>
        </>
      )}
    </>
  ) : null

export default HeaderLinks
