import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { RequestConfig, RequestInterceptors } from './types'

class Request {
  instance: AxiosInstance
  interceptors?: RequestInterceptors

  constructor (config: RequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    this.instance.interceptors.request.use((res: AxiosRequestConfig) => {
      console.log('Global request interceptor', res)
      return res
    }, (error: any) => error)

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )

    this.instance.interceptors.response.use((res: AxiosRequestConfig) => {
      console.log('Global response interceptor', res)
      return res
    }, (error: any) => error)
  }

  request<T> (config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      this.instance
        .request<any, T>(config)
        .then(res => {
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors<T>(res)
          }
          resolve(res)
        })
        .catch((error: any) => reject(error))
    })
  }
}

export default Request
