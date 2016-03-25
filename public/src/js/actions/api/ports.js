import API from './api';

export function getPorts (callback) {
  return API
    .newRequest()
    .follow('ports')
    .getResource(callback);
}
