import { messageBox } from './messageBox';

const defaults = {
  loadingText: '加载中...',
  loadingSpinnerType: 'triple-bounce'
};

const settings = {
  baseURL: '',
  requestCount: 0
};

const closeLoading = () => {
  settings.requestCount--;
  if (settings.requestCount <= 0) {
    messageBox.loading(false);
  }
};

const request = (method, url, data, options = {}) => {
  options = Object.assign({}, defaults, options, {
    url,
    method,
    data,
    baseURL: settings.baseURL
  });
  settings.requestCount++;
  if (!options.noLoading) {
    messageBox.loading(true, options.loadingText, options.loadingSpinnerType);
  }
  return axios.request(options)
    .then(res => {
      closeLoading();
      return res;
    })
    .catch(err => {
      closeLoading();
      let errMessage = err.message;
      if (!options.noErrorTip) {
        messageBox.toast(errMessage);
      }
      return Promise.reject(err);
    });
};

export const ajax = {
  setBaseUrl(baseUrl) {
    settings.baseURL = baseUrl;
  },
  get(url, options) {
    return request('get', url, null, options);
  },
  delete(url, options) {
    return request('delete', url, null, options);
  },
  post(url, data, options) {
    return request('post', url, data, options);
  },
  put(url, data, options) {
    return request('put', url, data, options);
  }
};
