import React from 'react';
import { Button, Switch, InputNumber } from 'antd';

export default class OutputContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      remove: false,
      auto: false,
      number: this.props.length
    }

    this.getAndRemove = this.getAndRemove.bind(this);
    this.autoGet = this.autoGet.bind(this);
    this.getNumber = this.getNumber.bind(this);
  }

  getAndRemove() {
    this.setState((prevState) => ({
      remove: !prevState.remove
    }))

    this.props.getAndRemove();
  }

  autoGet() {
    this.setState((prevState) => ({
      auto: !prevState.auto
    }))
  }

  getNumber(value) {
    this.setState({
      number: Number(value)
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
              {this.state.auto && 'Manual'}
              {!this.state.auto && 'Automatical'}
            </span>
          </div>
        </div>
        <div className='get-number'>
          Get
          <InputNumber min={1} max={this.props.length || 1} defaultValue={1} onChange={this.getNumber} />
          value(s)
        </div>
      </div>
      )
  }
}