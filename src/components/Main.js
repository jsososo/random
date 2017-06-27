require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import InputContainer from './InputContainer';
import 'antd/dist/antd.css';
import Pool from './Pool';
import { message } from 'antd';
import OutputContainer from './OutputContainer';

export default class AppComponent extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      pool: [],
      remove: false,
      length: 0
    }

    this.addValues = this.addValues.bind(this);
    this.clearDuplicates = this.clearDuplicates.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.getAndRemove = this.getAndRemove.bind(this);
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
      pool: newPool,
      length: newPool.length
    })

    message.success('Clear duplicates success');
  }

  clearAll() {
    this.setState({
      pool: [],
      length: 0
    })

    message.success('Clear all success');
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
      pool: a,
      length: a.length
    })

    message.success('Add success');
  }

  getAndRemove() {
    this.setState((prevState) => ({
      remove: !prevState.remove
    }))
  }

  render() {
    return (
      <div className='index'>
        <InputContainer add={this.addValues}/>
        <div className='display-right'>
          <Pool value={this.state.pool} clearDuplicates={this.clearDuplicates} clearAll={this.clearAll}/>
          <OutputContainer getAndRemove={this.getAndRemove} length={this.state.length}/>
        </div>
      </div>
    );
  }
}
