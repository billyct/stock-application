import {uuid} from '../helpers';
import _ from 'lodash';

const CREATE = 'app/products/CREATE';
const UPDATE = 'app/products/UPDATE';
const UPDATE_DATA = 'app/products/UPDATE_DATA';
const REMOVE = 'app/products/REMOVE';


export default function reducers(state = [], action = {}) {

  let stateTemp = _.clone(state), index, indexData;

  switch (action.type) {

  case CREATE:
    stateTemp.push(_.assign({}, action.data.product, {id: uuid()}));
    return stateTemp;


  case UPDATE:
    index = _.findIndex(stateTemp, product => product.id === action.data.product.id);
    stateTemp[index] = action.data.product;
    return stateTemp;


  case UPDATE_DATA:
    index = _.findIndex(stateTemp, product => product.id === action.data.id);
    indexData = _.findIndex(stateTemp[index].data, data => data.flag === action.data.data.flag);

    if(indexData !== -1) {
      stateTemp[index].data[indexData] = action.data.data;
    } else {
      stateTemp[index].data.push(action.data.data);
    }

    return stateTemp;

  case REMOVE:
    _.remove(stateTemp, (product) => product.id === action.data.product.id);
    return stateTemp;
  default:
    return state;

  }
}


export function createProduct(product) {
  return {type: CREATE, data: {product}};
}

export function updateProduct(product) {
  return {type: UPDATE, data: {product}};
}

export function removeProduct(product) {
  return {type: REMOVE, data: {product}};
}


export function updateProductData({id, data}) {
  return {type: UPDATE_DATA, data: {id, data}}
}
