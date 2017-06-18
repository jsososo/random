import React from 'react';
import InputBox from './inputBox'

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
