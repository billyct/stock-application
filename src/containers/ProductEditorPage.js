import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';

import {bindActionCreators} from 'redux';

import ProductForm from '../components/ProductForm';

import * as productsActions from '../reducers/products';


class ProductEditorPage extends Component {

  render() {

    const {products, dispatch, params, history} = this.props;
    const actions = bindActionCreators(productsActions, dispatch);


    let currentProduct = {
      id : '',
      name : '',
      features : [],
      data: [],
      aliases: []
    };

    if (params.id) {
      currentProduct = _.find(products, {id : params.id});
      if (!currentProduct) {
        return <NoMatchPage />
      }
    }

    return (
      <ProductForm actions={actions} product={currentProduct} history={history}/>
    );
  }
}


ProductEditorPage.displayName = 'ProductEditorPage';

//BindEditorPage.propTypes = {
//  dispatch : PropTypes.func.isRequired,
//  binds : PropTypes.array.isRequired
//};

export default connect((state) => {
  return {
    products : state.products
  }
})(ProductEditorPage);