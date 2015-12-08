import React, {Component} from 'react';

class Loader extends Component {
  render() {

    const {loading} = this.props;

    return (

      <div className={`ui inverted dimmer ${loading ? 'active' : ''}`}>
        <div className='ui loader'></div>
      </div>

    )
  }
}

export default Loader;