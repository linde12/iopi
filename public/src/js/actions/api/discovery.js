import API from './api';

export function createDiscovery (callback) {
  return API
    .newRequest()
    .follow('discovery')
    .post({}, callback);
}

export function pollDiscovery (url, callback) {
  return API
    .newRequest()
    .from(url)
    .getResource(callback);
}
