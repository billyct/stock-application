import React, {Component, PropTypes} from 'react';

import {IndexLink} from 'react-router';

import Icon from '../components/Icon';
import ClearFix from '../components/ClearFix';

import './styles/app.scss';

import 'semantic-transition';
import 'semantic-popup';

class App extends Component {
  render() {

    const block = 'app';

    return (
      <div className={`${block}`}>

        <div className='ui menu stackable'>

          <div className='ui text container'>

            <IndexLink to='/' className='header item'>
              <Icon name='flower' size='m' className={`${block}__logo`}/>
               STOCK
            </IndexLink>


          </div>

        </div>


        <div className='ui text container'>

          {this.props.children}

        </div>
      </div>

    );
  }
}



export default App;