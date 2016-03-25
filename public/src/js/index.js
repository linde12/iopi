// Your code here

import ReactDOM from 'react-dom';
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Provider} from 'react-redux';
import {Router, IndexRoute, Route, hashHistory} from 'react-router';
import App from 'grommet/components/App';

import store from './store';
import AppContainer from './containers/AppContainer';
import HomeContainer from './containers/HomeContainer';
import PortsContainer from './containers/PortsContainer';
injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <App centered={false}>
      <Router history={hashHistory}>
        <Route component={AppContainer}>
          <Route path='/' component={HomeContainer} />
          <Route path='ports' component={PortsContainer} />
        </Route>
      </Router>
    </App>
  </Provider>
, document.getElementById('root'));
