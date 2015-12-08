import React, {Component, PropTypes} from 'react';

import $ from 'jquery';
const BUTTON_POPUP = 'button-popup';

class ProductTableRow extends Component {


  constructor(props, context) {
    super(props, context);

    let {count, flag} = props.data;

    this.state = {
      count: count,
      flag: flag,

      plus: 0,
      minus: 0,

      alias: '',

      error: ''
    };
  }

  componentDidMount() {
    $(`.${BUTTON_POPUP}`)
      .popup({
        on: 'click'
      });
  }



  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  handleSaveCount() {

    let {count, flag} = this.state;
    count = parseInt(count, 10);

    this.props.handleSaveCount({
      flag, count
    });

    $(`.${BUTTON_POPUP}`).popup('hide');
  }

  handlePlusCount() {

    let {count, plus} = this.state;

    this.setState({
      count : parseInt(count, 10) + parseInt(plus, 10)
    }, () => {
      this.handleSaveCount();
    });


  }

  handleMinusCount() {
    let {count, minus} = this.state;

    this.setState({
      count : parseInt(count, 10) - parseInt(minus, 10)
    }, () => {
      this.handleSaveCount();
    });

  }


  handleSaveAlias(alias) {

    alias.name = this.state.alias;

    this.props.handleSaveAlias(alias);

    this.setState({
      alias : ''
    });

    $(`.${BUTTON_POPUP}`).popup('hide');

  }

  render() {

    let {data, aliases} = this.props;

    const block = 'row';


    return (

      <tr>
        {data.flag.split('_').map((indexAlias, indexFeature) =>
            <td key={`${indexFeature}_${indexAlias}`}>


              <a className={`ui button basic mini ${BUTTON_POPUP}`}>{aliases[indexFeature][indexAlias]}</a>

              <div className={`ui popup top left transition hidden ${block}__popup`}>
                <div className='ui action input fluid'>
                  <input type='text'
                         value={this.state.alias}
                         onChange={this.handleChange.bind(this)}
                         name='alias'/>
                  <button
                    className='ui teal mini button'
                    onClick={this.handleSaveAlias.bind(this, {indexFeature, indexAlias})}>
                    保存
                  </button>
                </div>
              </div>

            </td>
        )}

        <td>

          <div className='ui orange horizontal label'>{this.state.count}</div>

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

ProductTableRow.displayName = 'ProductTableRow';

export default ProductTableRow;