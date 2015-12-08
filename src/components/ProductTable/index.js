import React, {Component, PropTypes} from 'react';
import LazyRender from 'react-lazy-render';

import ProductTableRow from './ProductTableRow';

import Loader from '../Loader';



import './ProductTable.scss';


class ProductTable extends Component {

  constructor(props, context) {
    super(props, context);

    //const {data} = props.product;
    this.state = {
      data : [],
      loading : false
    }
  }


  updateProductData(product) {

    this.setState({
      data : [],
      loading : true
    });

    let start = 0,
      range = 10,
      end = start + range;


    this.timer = setInterval(function() {


      if(start > product.data.length - 1) {
        clearInterval(this.timer);
        this.setState({
          loading : false
        });
        this.timer = null;
      }

      if(end > product.data.length) {
        end = product.data.length;
      }


      this.setState({
        data : this.state.data.concat(product.data.slice(start, end))
      });


      start = start + range;
      end = start + range;



    }.bind(this));

  }


  componentWillReceiveProps(nextProps) {

    if(this.props.product.id !== nextProps.product.id) {

      this.updateProductData(nextProps.product);

    }
  }


  componentWillMount() {

    this.updateProductData(this.props.product);

  }


  handleSaveCount({flag, count}) {

    let {id} = this.props.product;
    let data = {flag, count};

    this.props.actions.updateProductData({
      id, data
    });

  }


  render() {


    let {product} = this.props;


    let dataElements = [];


    _.each(this.state.data, (single, index) => {

      dataElements.push(
        <ProductTableRow key={`${product.id}_${index}`}
                         data={single}
                         handleSaveCount={this.handleSaveCount.bind(this)}/>
      )
    });


    return (

      <div className='ui segment basic'>

        <Loader loading={this.state.loading} />

        <h3 className='ui horizontal divider header'>
          {product.name}
        </h3>

        <table className='ui yellow table'>
          <thead>
          <tr>
            {product.features.map(feature =>
              <th key={feature.id}>{feature.name}</th>
            )}
            <th>数量</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>

          {dataElements}


          </tbody>
        </table>

      </div>

    );
  }
}

ProductTable.displayName = 'ProductTable';

export default ProductTable