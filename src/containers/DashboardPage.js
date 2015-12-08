import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';

import Icon from '../components/Icon';
import ClearFix from '../components/ClearFix';
import Message from '../components/Message';
import {Link, IndexLink} from 'react-router';

import './styles/dashboard.scss';

class DashboardPage extends Component {




  render() {

    const block = 'dashboard';
    const {children, products} = this.props;


    let productsElements = '';

    if(products.length > 0) {
      productsElements = (
        <div>
          <h5 className='ui horizontal divider header' style={{width: '15rem'}}>
            您的产品列表
          </h5>
          <div className='ui vertical menu'>
            {products.map(product =>
                <Link to={`/dashboard/products/${product.id}`} className='item' key={product.id} activeClassName='active'>
                  {product.name} <i className='angle right icon'></i>
                </Link>
            )}
          </div>
        </div>
      )
    }


    let childElements = (
      <h2 className={`${block}__content__empty`}>
        试试左边的按钮？
        <Icon name='doge' size='l' />
      </h2>
    );

    if(children) {
      childElements = children;
    }

    return (


      <div className={block}>
        <div className='ui grid'>

          <div className='ui column six wide'>

            <div className='ui vertical menu text'>
              <Link className='item' to='/dashboard/products/create'>
                <i className='plus icon'></i> 创建一个新产品
              </Link>
            </div>

            {productsElements}

          </div>
          <div className='ui column ten wide'>

            {childElements}
          </div>

        </div>

      </div>
    );
  }
}

DashboardPage.displayName = 'DashboardPage';



export default connect((state) => {
  return {
    products : state.products
  }
})(DashboardPage);