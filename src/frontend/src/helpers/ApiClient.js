// @flow
import axios, { type Axios, type AxiosPromise } from 'axios'
import qs from 'qs'
import { getAuthHeaders } from './authentication'
import env from '../../env'

let instance = null
const { API_BASE_URL } = env

export class ApiClient {
  axios: Axios

  baseURL: string

  accessToken: ?string

  instance: ?Object

  constructor(baseURL: string) {
    if (!instance) {
      instance = this
    }

    this.baseURL = baseURL
    this.axios = axios.create({
      baseURL,
      timeout: 30000,
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'repeat' }),
    })
    return instance
  }

  async get(path: string, config?: Object): AxiosPromise<*> {
    return this.axios.get(path, config)
  }

  async post(
    path: string,
    data: Array<any> | Object,
    config?: Object = {},
  ): AxiosPromise<Object> {
    return this.axios.post(path, data, config)
  }

  async patchAuth(
    path: string,
    data?: Array<any> | Object,
    config?: Object = {},
  ): AxiosPromise<Object> {
    const headers = getAuthHeaders()
    return this.axios.patch(path, data, {
      headers,
      ...config,
    })
  }

  async getAuth(path: string, config?: Object): AxiosPromise<Object> {
    const headers = getAuthHeaders()
    return this.axios.get(path, { headers, ...config })
  }

  async deleteAuth(
    path: string,
    data?: Array<any> | Object,
    config?: Object = {},
  ): AxiosPromise<Object> {
    const headers = getAuthHeaders()
    return this.axios.delete(path, {
      data,
      headers,
      ...config,
    })
  }

  async postAuth(
    path: string,
    data?: Array<any> | Object,
    config?: Object = {},
  ): AxiosPromise<Object> {
    const headers = getAuthHeaders()
    return this.axios.post(path, data, {
      headers,
      ...config,
    })
  }
}

export default new ApiClient(API_BASE_URL)
