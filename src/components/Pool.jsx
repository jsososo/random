import React from 'react';
import { Card } from 'antd';

export default class Pool extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showAll: false
    }
  }

  render() {
    return (
      <Card title="Card title">
        <p>{this.props.value.join(' | ')}</p>
      </Card>
      )
  }
}