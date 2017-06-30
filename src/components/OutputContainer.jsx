import React from 'react';
import { Button, Switch, InputNumber } from 'antd';

export default class OutputContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      remove: false,
      auto: true,
      length: this.props.length,
      number: 0,
      manualStart: false,
      btnType: 'primary',
      output: [],
      history: [],
      clearHistory: false
    }

    this.getAndRemove = this.getAndRemove.bind(this);
    this.autoGet = this.autoGet.bind(this);
    this.getNumber = this.getNumber.bind(this);
    this.getRandom = this.getRandom.bind(this);
    this.onClickGet = this.onClickGet.bind(this);
    this.clearHistory = this.clearHistory.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      length: nextProps.length,
      number: Math.min(nextProps.length, this.state.number)
    })
  }

  getAndRemove() {
    // 删除pool中的值，更新给main
    this.setState((prevState) => ({
      remove: !prevState.remove
    }))

    this.props.getAndRemove();
  }

  autoGet() {
    // 自动获取
    this.setState((prevState) => ({
      auto: !prevState.auto,
      btnType: 'primary',
      manualStart: false,
      output: [],
      outputIndex: []
    }))
  }

  getNumber(value) {
    this.setState({
      number: Number(value)
    })
  }

  getRandom() {
    let [arr, arrIndex, pool, length, number, remove] = [[], [], [...this.props.pool], this.state.length, this.state.number, this.state.remove];

      for (let i = number; i > 0; i--) {
        let r = parseInt(Math.random() * (length - number + i));

        arr.push(pool[r]);
        arrIndex.push(r);

        if (remove) {
          pool.splice(r, 1);
        }
      }
      // 自动获取
      if (!this.state.manualStart) {
        this.props.changePool(pool);
        this.setState((prevState) => ({
          output: arr,
          outputIndex: arrIndex,
          history: [...prevState.history, ...arr],
          clearHistory: true
        }))
      } else {
        // 手动，开始获取
        this.setState({
          output: arr,
          outputIndex: arrIndex
        })
      }
  }

  onClickGet() {
    // 自动获取
    if (this.state.auto) {
      this.getRandom();
    }

    // 手动，开始获取
    if (!this.state.auto && !this.state.manualStart) {
      this.setState({
        manualStart: true,
        btnType: 'danger'
      })

      this.manualGetRandom = setInterval(() => this.getRandom(), 20);
    }

    // 手动，结束获取
    if (!this.state.auto && this.state.manualStart) {
      this.setState((prevState) => ({
        manualStart: false,
        btnType: 'primary',
        history: [...prevState.history, ...prevState.output]
      }))
      clearInterval(this.manualGetRandom);

      // 如果需要清除
      if (this.state.remove) {
        let pool = [...this.props.pool];
        this.state.outputIndex.map(index => {
          pool.splice(index, 1);
        })
        this.props.changePool(pool);
      }
    }
  }

  clearHistory() {
    this.setState({
      history: [],
      clearHistory: false
    })
  }

  render() {
    return (
      <div className='output-container'>
        <div className='switch-container'>
          <div className='switch-box'>
            <Switch onChange={this.getAndRemove}/>
            <span className='switch-describtion'>
              {this.state.remove && 'Get and Remove'}
              {!this.state.remove && 'Get and Put Back'}
            </span>
          </div>
          <div className='switch-box'>
            <Switch onChange={this.autoGet}/>
            <span className='switch-describtion'>
              {this.state.auto && 'Automatical'}
              {!this.state.auto && 'Manual'}
            </span>
          </div>
        </div>
        <div className='get-number'>
          Get&nbsp;&nbsp;
          <InputNumber min={0} max={this.props.length} defaultValue={0} onChange={this.getNumber} value={this.state.number} />
          &nbsp;&nbsp;value(s)
        </div>
        <Button type={this.state.btnType} onClick={this.onClickGet} disabled={!this.state.number && 'disabled'}>
          {this.state.auto && 'GET'}
          {!this.state.auto && !this.state.manualStart && 'START'}
          {!this.state.auto && this.state.manualStart && 'STOP'}
        </Button>
        <div className='output-display'>
          <div>Output: </div>
          {this.state.output.map((item, index) => {
            return (<div key={index} className='output-item'>{item}</div>)
          })}
        </div>
        <div className='ouput-history'><div>History: {this.state.clearHistory && <a className='history-clear' onClick={this.clearHistory}>clear all</a>}</div>{this.state.history.join(' | ')}</div>
      </div>
      )
  }
}