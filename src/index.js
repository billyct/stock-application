import React from 'react';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import { Router, Route, IndexRoute} from 'react-router';

import thunk from 'redux-thunk';

import createBrowserHistory from 'history/lib/createBrowserHistory'
let history = createBrowserHistory()

import reducers from './reducers';

import App from './containers/App';
import ModelPage from './containers/ModelPage';

import persistStateLocalStorage from 'redux-localstorage';
//import { devTools, persistState } from 'redux-devtools'
//import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';


//store.js
let store;

const finalCreateStore = compose(

  //devTools(),
  applyMiddleware(thunk), //apply thunk middleware
  persistStateLocalStorage([
    'models'
  ], {
    key : 'THE_STORAGE_KEY'
  })
)(createStore);

store = finalCreateStore(reducers);

//<DebugPanel top right bottom>
//  <DevTools store={store} monitor={LogMonitor} />
//</DebugPanel>
//index


React.render(
  <Provider store={store}>
    {() =>
      <Router history={history}>
        <Route path='/' component={App}>
          <IndexRoute component={ModelPage} />
          <Route path='models' component={ModelPage} />
        </Route>
      </Router>
    }
  </Provider>
  ,
  document.getElementById('app')
);

