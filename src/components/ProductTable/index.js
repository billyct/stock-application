import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';

import {bindActionCreators} from 'redux';

import $ from 'jquery';

const BUTTON_POPUP = 'button-popup';

import './ProductTable.scss';

class ProductTableRow extends Component {


  constructor(props, context) {
    super(props, context);

    let {count, flag} = props.data;

    this.state = {
      count: count,
      flag: flag,

      plus: 0,
      minus: 0,

      error: '',
      loading: false
    };
  }

  componentDidMount() {
    $(`.${BUTTON_POPUP}`)
      .popup({
        on: 'click'
      })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  handleSaveCount() {

    let {count, flag} = this.state;

    this.props.handleSaveCount({
      flag, count
    });

    $(`.${BUTTON_POPUP}`).popup('hide');
  }

  handlePlusCount() {

    let {count, plus} = this.state;

    this.setState({
      count : parseInt(count, 10) + parseInt(plus, 10)
    });

    this.handleSaveCount();
  }

  handleMinusCount() {
    let {count, minus} = this.state;

    this.setState({
      count : parseInt(count, 10) - parseInt(minus, 10)
    });

    this.handleSaveCount();
  }

  render() {

    let {indexRecorded, indexCurrent} = this.props;

    const block = 'row';


    return (

      <tr>
        {indexRecorded.map(index =>
            <td key={`KEY_TD_FEATURE_${index}`}>{index}</td>
        )}
        <td key={`KEY_TD_FEATURE_${indexCurrent}`}>{indexCurrent}</td>

        <td>
          <a className={`ui button basic mini ${BUTTON_POPUP}`}>{this.state.count}</a>

          <div className={`ui popup top left transition hidden ${block}__popup`}>
            <div className='ui action input fluid'>
              <input type='text'
                     value={this.state.count}
                     onChange={this.handleChange.bind(this)}
                     name='count'/>
              <button
                className='ui teal mini button'
                onClick={this.handleSaveCount.bind(this)}>
                保存
              </button>
            </div>
          </div>
        </td>

        <td>

          <a className={`ui button icon circular basic ${BUTTON_POPUP}`}>
            <i className={`plus icon ${block}__icon`}></i>
          </a>

          <div className={`ui popup top left transition hidden ${block}__popup`}>
            <div className='ui action input fluid'>
              <input type='text'
                     value={this.state.plus}
                     onChange={this.handleChange.bind(this)}
                     name='plus'/>
              <button
                className='ui teal mini button'
                onClick={this.handlePlusCount.bind(this)}>
                增加
              </button>
            </div>
          </div>

          <a className={`ui button icon circular basic ${BUTTON_POPUP}`}>
            <i className={`minus icon ${block}__icon`}></i>
          </a>
          <div className={`ui popup top left transition hidden ${block}__popup`}>
            <div className='ui action input fluid'>
              <input type='text'
                     value={this.state.minus}
                     onChange={this.handleChange.bind(this)}
                     name='minus'/>
              <button
                className='ui teal mini button'
                onClick={this.handleMinusCount.bind(this)}>
                减少
              </button>
            </div>
          </div>

        </td>
      </tr>

    )

  }
}


class ProductTable extends Component {


  constructor(props, context) {
    super(props, context);

    let {id, name, features, data} = this.props.product;


    this.state = {
      id: id,
      name: name,
      features: features,
      data: data,

      error: '',
      loading: false
    };
  }

  handleSaveCount({flag, count}) {

    let {id} = this.state;
    let data = {flag, count};

    this.props.actions.updateProductData({
      id, data
    });


  }



  renderRows() {

    let {product} = this.props;
    let rows = [];
    let _this = this;

    function __rows() {
      let indexFeature = arguments[0] ? arguments[0] : 0;
      let indexRecorded = arguments[1] ? arguments[1] : [];
      for(let index = 1; index <= parseInt(product.features[indexFeature].count, 10); index++) {
        if(indexFeature === product.features.length - 1) {
          //最后一个feature的时候
          //最后一个参数是第一个feature的数字，

          let flag = `${indexRecorded.join('_')}_${index}`;


          let data = _.find(product.data, {flag: flag}) || {flag: flag, count: 0};

          rows.push(<ProductTableRow key={`KEY_TR_FEATURE_${flag}`}
                                     data={data}
                                     handleSaveCount={_this.handleSaveCount.bind(_this)}
                                     indexRecorded={indexRecorded}
                                     indexCurrent={index} />);
        } else {
          let indexRecordedClone = _.clone(indexRecorded);
          indexRecordedClone.push(index);
          //如果这里的第二个参数是传递的数组，记录之前的数据 + 现在需要传递的数据
          __rows(indexFeature + 1, indexRecordedClone);
        }
      }
    };

    __rows();

    return rows;
  }


  render() {


    let {product} = this.props;




    return (

      <div className='ui segment basic'>

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

          {this.renderRows()}
          </tbody>
        </table>

      </div>

    );
  }
}


export default ProductTable