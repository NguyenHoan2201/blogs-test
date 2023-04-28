import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse
} from 'axios';
import { getCookie, packOpts, removeCookie, setCookie } from '../helpers';
import { USER_COOKIE_TOKEN_NAME, USER_IDENTITY_COOKIE_NAME } from '../constants';
import { LoginData } from './auth';

export interface RequestOptions<D> {
  headers?: AxiosRequestHeaders;
  data?: D;
  params?: Record<string, string | number | boolean>;
}

export const apiHost = import.meta.env.VITE_API_URL;

export class Axios {
  config: AxiosRequestConfig = {
    baseURL: apiHost,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    paramsSerializer: (params: Record<string, string | number | boolean>) =>
      packOpts(params)
  };
  http: AxiosInstance;
  handlers: { [key: string]: ((args: any) => any)[] } = {};
  token: string;
  constructor(config?: AxiosRequestConfig) {
    this.config = Object.assign({}, this.config, config);
    this.http = axios.create(this.config);
  }

  clearIdentity() {
    this.token = '';
    this.http.defaults.headers.common.authorization = '';
    removeCookie(USER_COOKIE_TOKEN_NAME);
    removeCookie(USER_IDENTITY_COOKIE_NAME);
    return this;
  }

  setIdentity(user: LoginData) {
    setCookie(USER_COOKIE_TOKEN_NAME, user.token);
    setCookie(USER_IDENTITY_COOKIE_NAME, JSON.stringify(user));
    this.http.defaults.headers.common.authorization = `Bearer ${user.token}`;
    this.token = user.token;
    return this;
  }

  default() {
    this.token = getCookie(USER_COOKIE_TOKEN_NAME);
    if (this.token) {
      this.http.defaults.headers.common.authorization = `Bearer ${this.token}`;
    }

    this.http.interceptors.response.use(
      (res: AxiosResponse) => {
        return res.data;
      },
      (err: AxiosError) => {
        return new Promise(() => {
          if (err.message === 'Network Error') {
            this.emit('disconnected');
          }
          if (err.response?.status === 401) {
            this.emit('noauth');
          } else {
            throw new Error((err.response?.data as any)?.message ?? 'unknown error');
          }
          throw err;
        });
      }
    );
    return this;
  }

  on(event: string, fn: (...args: any) => any) {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }
    this.handlers[event].push(fn);
  }

  emit(event: string, data?: any) {
    if (!this.handlers[event]) {
      return;
    }
    for (let i = 0, ii = this.handlers[event].length; i < ii; i++) {
      this.handlers[event][i](data);
    }
  }
}

export const $axios = new Axios().default();

async function get<T, B>(path: string, opts?: RequestOptions<B>): Promise<T> {
  return await $axios.http.get(path, Object.assign({}, $axios.config, opts));
}
async function post<T, B>(path: string, opts?: RequestOptions<B>): Promise<T> {
  return await $axios.http.post(
    path,
    opts?.data,
    Object.assign({}, $axios.config, opts)
  );
}

async function put<T, B>(path: string, opts?: RequestOptions<B>): Promise<T> {
  return await $axios.http.put(
    path,
    opts?.data,
    Object.assign({}, $axios.config, opts)
  );
}
async function del<T, B>(path: string, opts?: RequestOptions<B>): Promise<T> {
  return await $axios.http.delete(path, Object.assign({}, $axios.config, opts));
}

export default {
  get,
  put,
  del,
  post,
  on: $axios.on.bind($axios),
  emit: $axios.emit.bind($axios),
  setIdentity: $axios.setIdentity.bind($axios),
  clearIdentity: $axios.clearIdentity.bind($axios)
};
