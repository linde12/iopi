import traverson from 'traverson';
import JsonHalAdapter from 'traverson-hal';

traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);

const API = traverson
  .from('/api')
  .jsonHal();

export default API;
