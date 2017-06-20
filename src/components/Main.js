require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import InputContainer from './InputContainer';
import 'antd/lib/date-picker/style/css';

export default class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <InputContainer/>
      </div>
    );
  }
}
