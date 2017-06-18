import React from 'react'

class InputBox extends React.Component {
  render () {
    return (
      <div className="input-box">
        <input type="text" placeholder={this.props.placeholder}/>
        <div>type {this.props.type}</div>
      </div>
    )
  }
}

InputBox.defaultProps = {
  type: '',
  length: 100,
  placeholder: 'input value',
};

export default InputBox;
