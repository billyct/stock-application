import React, {Component} from 'react';
import _ from 'lodash';


import ClearFix from '../ClearFix';
import Message from '../Message';

import {uuid} from '../../helpers';


class ProductForm extends Component {

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


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSave(e) {

    e.preventDefault();

    this.setState({
      loading : true,
    });

    let {id, name, features, data} = this.state;
    features = _.filter(features, feature => !!feature.name);
    if(!id) id = uuid();

    this.props.actions.createProductWithGenerate({
      id, name, features, data
    }).then(({id, name, features, data}) => {

      this.props.history.pushState(null, `/dashboard/products/${id}`);

    }).then(() => {
      this.setState({
        loading : false,
      });
    });








  }

  handleCancel(e) {

    e.preventDefault();
    this.props.history.goBack()
  }

  handleChangeFeatures(e) {

    var features = e.target.value;


    features = _(features.split(','))
      //.compact()
      .map((feature) => {
        return {
          id: uuid(),
          name: feature,
          count: 0
        }
      })
      .value();


    this.setState({features: features});
  }

  handleChangeFeatureCount(index) {

    let count = this.refs[`REF_FEATURE${index}`].getDOMNode().value;
    let features = this.state.features;

    features[index].count = count;

    this.setState({
      features : features
    })
  }


  render() {

    let title = '添加新产品';
    if (this.state.id) {
      title = `更新产品——${this.state.name}`;
    }

    return (

      <div>
        <h3 className='ui horizontal divider header'>
          {title}
        </h3>

        <div className='ui segment stacked'>

          <div className={`ui inverted dimmer ${this.state.loading ? 'active' : ''}`}>
            <div className='ui loader'></div>
          </div>

          <form className='ui form'>
            <div className='inline fields'>

              <div className='two wide field'>
                <label htmlFor='name'>名称</label>
              </div>

              <div className='fourteen wide field'>

                <input
                  id='name'
                  type='text'
                  name='name'
                  onChange={this.handleChange.bind(this)}
                  value={this.state.name}
                  placeholder='名称'/>

              </div>

            </div>


            <div className='inline fields'>

              <div className='two wide field'>
                <label htmlFor='features'>属性</label>
              </div>

              <div className='fourteen wide field'>
                

                <input
                  id='features'
                  type='text'
                  name='features'
                  onChange={this.handleChangeFeatures.bind(this)}
                  value={_.pluck(this.state.features, 'name').join(',')}
                  placeholder='属性'/>

              </div>

            </div>


            {this.state.features.map((feature, index) =>


                <div className='inline fields' key={`${feature.id}`}>

                  <div className='two wide field'>
                  </div>

                  <div className='ten wide field'>

                    <div className='ui labeled input'>
                      <div className='ui label tag teal'>
                        {feature.name}
                      </div>
                      <input type='text'
                             ref={`REF_FEATURE${index}`}
                             onChange={this.handleChangeFeatureCount.bind(this, index)}
                             value={feature.count}
                             placeholder='总数'/>
                    </div>
                  </div>
                </div>

            )}


            <div className='ui section divider'></div>

            <input ref='productId' type='hidden' value={this.state.id} />

            <button className='ui positive button left floated'
                    onClick={this.handleSave.bind(this)}
                    disabled={!this.state.name || _.isEmpty(this.state.features)}>保存</button>

            <button className='ui button right floated'
                    onClick={this.handleCancel.bind(this)}>取消</button>


            <ClearFix />

            <Message message={this.state.error} />

          </form>
        </div>

      </div>

    );
  }
}


ProductForm.displayName = 'ProductForm';


export default ProductForm;