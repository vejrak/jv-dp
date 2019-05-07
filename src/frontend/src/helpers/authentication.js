// @flow

import Cookies from 'universal-cookie'

let cookies

cookies = new Cookies()

export const setServerCookies = function(serverCookies: Object) {
  cookies = new Cookies(serverCookies)
}

export const getAuthHeaders = (): Object => ({
  Authorization: cookies.get('jwtToken'),
})

export const setAuthToken = (
  token: string,
  username: string,
  rank: number,
): void => {
  cookies.set('jwtToken', token, { path: '/' })
  cookies.set('username', username, { path: '/' })
  cookies.set('rank', rank, { path: '/' })
}

export const removeAuthToken = (): void => {
  cookies.remove('jwtToken')
  cookies.remove('username')
  cookies.remove('rank')
}

export const isAuthenticationCookieValid = (): boolean =>
  cookies.get('jwtToken') && cookies.get('username') && cookies.get('rank')

export const getAuthenticationUsername = (): string =>
  cookies.get('username') || ''

export const getAuthenticationRank = (): ?number =>
  parseInt(cookies.get('rank'), 10) || null
