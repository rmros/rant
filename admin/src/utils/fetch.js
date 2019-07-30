import { message } from 'antd';
import { merge } from 'lodash';
import { router } from 'umi';
import { formatMessage } from 'umi-plugin-locale';
import Logger from './logger';
import Config from '@/config';

export const createFetch = (url, config) => {
  let defaultConfig = {
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };
  return fetch(Config.basePath + url, merge(defaultConfig, config))
    .then(res => {
      const data = !!res ? res.json() : {};

      if (401 === res.status) {
        message.error(formatMessage({ id: 'errors.invalid.auth' }));
        router.replace('/user/login');
        return false;
      }

      return data;
    })
    .catch(error => Logger.error(error));
};

export const get = async (url, params) => {
  let queryString = null;

  if (params) {
    const searchParams = new URLSearchParams();

    Object.keys(params).forEach(key => searchParams.append(key, params[key]));

    queryString = searchParams.toString();
  }

  return createFetch(`${url}${queryString ? '?' + queryString : ''}`, { method: 'GET' });
};

export const post = async (url, data) => createFetch(url, { method: 'POST', body: data });

export const uploadOne = async (file, fileName) => {
  const data = new FormData();
  data.append('fileName', fileName || file.name);
  data.append('file', file);

  return await post('/api/storage', data);
};