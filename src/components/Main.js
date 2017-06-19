require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import Input from './Input'

export default class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <Input/>
      </div>
    );
  }
}
