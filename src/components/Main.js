require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import InputContent from './input'


class AppComponent extends React.Component {
  render() {
    return (
      <div>
        <InputContent />
        <div>hello world</div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
