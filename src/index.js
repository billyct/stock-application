import React from 'react';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import { Router, Route, IndexRoute} from 'react-router';

import thunk from 'redux-thunk';

import { syncReduxAndRouter } from 'redux-simple-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';


import reducers from './reducers';

import App from './containers/App';
import DashboardPage from './containers/DashboardPage';
import ProductEditorPage from './containers/ProductEditorPage';
import ProductPage from './containers/ProductPage';
import NoMatchPage from './containers/NoMatchPage';

import persistStateLocalStorage from 'redux-localstorage';

import {__DEV_TOOL__} from './constants';
import { devTools, persistState } from 'redux-devtools'
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';



let finalCreateStore = __DEV_TOOL__ ? compose(
  // Provides support for DevTools:
  devTools(),
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore) : createStore;

finalCreateStore = compose(
  applyMiddleware(thunk), //apply thunk middleware
  persistStateLocalStorage([
    'products'
  ], {
    key : 'stock'
  })
)(finalCreateStore);



let history = createBrowserHistory();
let store = finalCreateStore(reducers);

syncReduxAndRouter(history, store);



React.render(
  <div>
    <Provider store={store}>
      {() =>
        <Router history={history}>
          <Route path='/' component={App}>
            <IndexRoute component={DashboardPage} />
            <Route path='dashboard' component={DashboardPage}>
              <Route path='products'>
                <Route path='create' component={ProductEditorPage}/>
                <Route path=':id' component={ProductPage}/>
              </Route>
            </Route>


            <Route path="*" component={NoMatchPage}/>
          </Route>
        </Router>
      }
    </Provider>
    {
      __DEV_TOOL__ &&
      <DebugPanel top left bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    }
  </div>
  ,
  document.getElementById('app')
);

