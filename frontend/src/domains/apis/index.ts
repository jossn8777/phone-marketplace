import { extend } from 'umi-request';

const API_VERSION = process.env.API_VERSION || '';
const END_POINT = process.env.END_POINT || 'http://localhost:3000';

const BE = extend({
  prefix: `${END_POINT}${API_VERSION}`,

});

export const PATHS = {
  // authorization
  LOGIN: '/auth/login/',
  // phones
  PHONE_CREATE: `/phones`,
  PHONE_UPDATE: (id: number) => `/phones/${id}`,
  PHONE_DELETE: (id: number) => `/phones/${id}`,
  PHONE_DETAIL: (id: number) => `/phones/${id}`,
  PHONE_LIST: `/phones`,
  PHONE_PICTURE: (id: number) =>  `/phones/${id}/picture`
};

const injectBearer = (token: string, configs: any) => {
  if (!configs) {
    return {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
  }

  if (configs.headers) {
    return {
      ...configs,
      headers: {
        ...configs.headers,
        Authorization: `bearer ${token}`,
      },
    };
  }

  return {
    ...configs,
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
};


export const withAuthRequest = (request: Function, path: string, options?: any) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw 'Unauthorized';
  }

  return request(path, injectBearer(accessToken, options))
}

export default BE;
