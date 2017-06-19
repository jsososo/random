import React from 'react';
import InputBox from './InputBox'

class InputContent extends React.Component {
  render () {
    return <div>
      hello React
      <InputBox />
      <InputBox type="text" />
    </div>
  }
}

export default InputContent;
