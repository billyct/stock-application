import {uuid} from '../helpers';
import _ from 'lodash';

import {Promise} from 'es6-promise';

const CREATE = 'app/products/CREATE';
const UPDATE = 'app/products/UPDATE';
const UPDATE_DATA = 'app/products/UPDATE_DATA';
const REMOVE = 'app/products/REMOVE';


export default function reducers(state = [], action = {}) {

  let stateTemp = _.clone(state), index, indexData;

  switch (action.type) {

  case CREATE:
    stateTemp.push(_.assign({}, action.data.product));
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

export function createProductWithGenerate({id, name, features, data}) {
  return (dispatch) => {

    return new Promise((resolved, reject) => {

      function rows() {
        let indexFeature = arguments[0] ? arguments[0] : 0;
        let indexRecorded = arguments[1] ? arguments[1] : [];
        let indexRecordedClone;

        for(let index = 1; index <= parseInt(features[indexFeature].count, 10); index++) {
          if(indexFeature === features.length - 1) {
            //最后一个feature的时候
            //最后一个参数是第一个feature的数字，
            indexRecordedClone = _.clone(indexRecorded);
            indexRecordedClone.push(index);
            data.push({
              flag: indexRecordedClone,
              count : 0
            });
          } else {
            indexRecordedClone = _.clone(indexRecorded);
            indexRecordedClone.push(index);
            //如果这里的第二个参数是传递的数组，记录之前的数据 + 现在需要传递的数据
            rows(indexFeature + 1, indexRecordedClone);
          }
        }
      }

      rows();
      dispatch(createProduct({id, name, features, data}));
      resolved({id, name, features, data});
    });




  }
}
