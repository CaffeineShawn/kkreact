import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface RequestInterceptors {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (error: any) => any
  responseInterceptors?: <T = AxiosResponse>(config: T) => T
  responseInterceptorsCatch?: (error: any) => any
}

export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors
}
