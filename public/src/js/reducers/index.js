import { combineReducers } from 'redux';
import ports from './ports';
import discovery from './discovery';

export default combineReducers({
  ports,
  discovery
});
