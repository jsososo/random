require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import InputContainer from './InputContainer';
import 'antd/lib/date-picker/style/css';
import Pool from './Pool';

export default class AppComponent extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      pool: []
    }

    this.addValues = this.addValues.bind(this);
    this.clearDuplicates = this.clearDuplicates.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }

  clearDuplicates() {
    let [newPool, temp] = [[], []];

    this.state.pool.map(item => {
      if (temp[item] === undefined) {
        temp[item] = true;
        newPool.push(item);
      }
    })

    this.setState({
      pool: newPool
    })
  }

  clearAll() {
    this.setState({
      pool: []
    })
  }

  addValues(arr) {
    // 建立一个新数组，用于筛除空元素
    let a = [];

    arr.map( item => {
      if (item !== '' || item !== undefined) {
        a.push(item);
      }
    })

    a = this.state.pool.concat(a);

    this.setState({
      pool: a
    })
  }

  render() {
    return (
      <div className='index'>
        <InputContainer add={this.addValues}/>
        <Pool value={this.state.pool} clearDuplicates={this.clearDuplicates} clearAll={this.clearAll}/>
      </div>
    );
  }
}
