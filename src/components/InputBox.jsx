import React, { PropTypes } from 'react';
import { Input } from 'antd';

export default class InputBox extends React.Component {
  constructor (props, context) {
    super(props, context);
  }

  render () {
    return (
      <div className='input-box'>
        <div>
          <div className='input-title'>{this.props.title}</div>
          <div className='input-description'>{this.props.description}</div>
        </div>
        {this.props.type.input.map(item => {
          return <Input size='large' placeholder={item} className={this.props.className} key={`number-${item}`}/>
        })}
      </div>
    )
  }
}
