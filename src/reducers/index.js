import {combineReducers} from 'redux';
import _ from 'lodash';
import { routeReducer } from 'redux-simple-router';


import products from './products';


export default combineReducers(_.assign({},
  {products},
  {
    routing : routeReducer
  }
));