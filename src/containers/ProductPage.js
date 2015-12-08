import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';

import {bindActionCreators} from 'redux';

import * as productsActions from '../reducers/products';

import ProductTable from '../components/ProductTable';
import NoMatchPage from './NoMatchPage';

class ProductPage extends Component {



  render() {

    const { router } = this.context;

    const {dispatch, history, products, params} = this.props;
    const actions = bindActionCreators(productsActions, dispatch);

    let product = _.find(products,{id : params.id});

    if(!product) {
      return <NoMatchPage />
    }


    return (
      <ProductTable actions={actions} product={product} history={history}/>
    );
  }
}

ProductPage.displayName = 'ProductPage';


export default connect(state => {
  return {
    products : state.products
  }
})(ProductPage);