import React from 'react';
import InputBox from './InputBox';
import { Input } from 'antd';

export default class InputContainer extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      randomNumber: {
        type: 'text',
        className: 'input-number',
        title: 'Add number',
        description: 'Input the number and hint the ENTER to add values. eg: input [2] [8] [3] means add [2, 5, 8] to the pool',
        input: ['start', 'end', 'distance']
      },
      randomLetter: {
        type: 'text',
        className: 'input-letter',
        title: 'Add letter',
        description: 'Input the number and hint the ENTER to add values. eg: input [a] [e] [2] means add [a, c, e] to the pool (ps: Case matters ! If case size is inconsistent, all are handled in lowercase.)',
        input: ['start', 'end', 'distance']
      },
      randomValue: {
        type: 'textarea',
        className: 'input-area',
        title: 'Add value',
        description: 'Input the number and hint the ENTER to add values. (Divide by "--"  ) eg: input [a--1--2--c] means add [a, 1, 2, c] to the pool.',
        input: ['']
      },
      deleteBox: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.deleteValues = this.deleteValues.bind(this);
    this._deleteBox = this._deleteBox.bind(this);
  }

  handleChange(e) {
    let deleteBox = e.target.value.replace('\n', '').split('--');
    this.setState({
      deleteBox: deleteBox
    })
  }

  deleteValues() {
    this.props.deleteValues(this.state.deleteBox);

    this.setState({
      deleteBox: []
    })
  }

  _deleteBox() {
    return (
      <div className={'input-box delete-box'}>
        <div className='input-info'>
          <div className='input-info-title'>Delete values</div>
          <div className='input-info-description'>Input the number and hint the ENTER to add values. (Divide by "--"  ) eg: input [1--3--b] means delete [1, 3, b] from the pool.</div>
        </div>
        <Input
          type='textarea'
          size='large'
          rows='4'
          onPressEnter={this.deleteValues}
          onChange={this.handleChange}
          value={this.state.deleteBox.join('--')}
        />
      </div>
      )
  }

  render () {
    return (
      <div className='input-container'>
        <InputBox type={this.state.randomNumber} add={this.props.add}/>
        <InputBox type={this.state.randomLetter} add={this.props.add}/>
        <InputBox type={this.state.randomValue} add={this.props.add}/>
        {this._deleteBox()}
      </div>
    )
  }
}
