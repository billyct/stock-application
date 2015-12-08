import React, {Component, PropTypes} from 'react';
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

  handleSaveAlias({indexFeature, indexAlias, name}) {

    let {id} = this.props.product;
    let alias = {indexFeature, indexAlias, name};

    this.props.actions.updateProductAlias({
      id, alias
    });
  }


  render() {


    let {product} = this.props;

    const block = 'product';


    return (

      <div className='ui segment basic'>

        <div className='ui horizontal divider header'>
          <span className={`${block}__title`}>{product.name}</span>
          <div className={`ui small inline loader ${this.state.loading ? 'active' : ''} ${block}__loader`}></div>
        </div>

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

          {this.state.data.map((single, index) =>
              <ProductTableRow key={`${product.id}_${index}`}
                               aliases={product.aliases}
                               data={single}
                               handleSaveAlias={this.handleSaveAlias.bind(this)}
                               handleSaveCount={this.handleSaveCount.bind(this)}/>
          )}


          </tbody>
        </table>

      </div>

    );
  }
}

ProductTable.displayName = 'ProductTable';

export default ProductTable