import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';

import {bindActionCreators} from 'redux';

import * as productsActions from '../reducers/products';

import ProductTable from '../components/ProductTable';
import NoMatchPage from './NoMatchPage';

import {Link} from 'react-router';

class ProductPage extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      confirm : false
    };
  }

  handleConfirmDelete() {

    this.setState({
      confirm : true
    });
  }


  handleDelete(product) {
    this.props.dispatch(productsActions.removeProduct(product));
    this.props.history.pushState(null, '/dashboard/products');
  }


  handleCancel() {

    this.setState({
      confirm : false
    });

  }


  render() {

    const { router } = this.context;

    const {dispatch, history, products, params} = this.props;
    const actions = bindActionCreators(productsActions, dispatch);

    let product = _.find(products,{id : params.id});

    if(!product) {
      return <NoMatchPage />
    }


    return (
      <div>
        <div className='ui bottom fixed menu'>

          <div className='ui text container'>

              <Link to={`/dashboard/products/${product.id}/edit`} className='item'>编辑</Link>
              <a onClick={this.handleConfirmDelete.bind(this)} className='item'>删除</a>
          </div>


        </div>

        <ProductTable actions={actions} product={product} history={history}/>


        <div className={`ui modal small ${this.state.confirm ? 'active' : ''}`}>
          <div className='header'>{`删除产品 ${product.name}`}</div>
          <div className='content'>
            <p>确定删除？</p>
          </div>
          <div className='actions'>
            <div className='ui negative button' onClick={this.handleCancel.bind(this)}>取消</div>
            <div className='ui positive button' onClick={this.handleDelete.bind(this, product)}>确定</div>
          </div>
        </div>

      </div>

    );
  }
}

ProductPage.displayName = 'ProductPage';


export default connect(state => {
  return {
    products : state.products
  }
})(ProductPage);