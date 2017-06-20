import React, { PropTypes } from 'react';
import InputBox from './InputBox';

export default class InputContainer extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      randomNumber: {
        className: 'input-number',
        title: 'Add number',
        description: 'eg: input [2] [8] [3] means add [2, 5, 8] to the pool',

        input: ['start', 'end', 'distance'],
      }
    }
  }

  render () {
    return (
      <div className='input-container'>
        <InputBox type={this.state.randomNumber}/>
      </div>
    )
  }
}
