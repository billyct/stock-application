import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';

import {bindActionCreators} from 'redux';

import * as productsActions from '../reducers/products';

import ProductTable from '../components/ProductTable';

class ProductPage extends Component {
  render() {

    const {dispatch, products, history, params} = this.props;
    const actions = bindActionCreators(productsActions, dispatch);

    let product = _.find(products,{id : params.id});

    return (
      <ProductTable actions={actions} product={product} history={history}/>
    );
  }
}


export default connect(state => {
  return {
    products : state.products
  }
})(ProductPage);