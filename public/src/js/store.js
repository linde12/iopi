import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const logger = createLogger({duration: true, collapsed: true});
export default createStore(reducers, applyMiddleware(logger, thunk));
