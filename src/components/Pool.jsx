import React from 'react';
import { Card, Button } from 'antd';

export default class Pool extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showAll: false
    }
  }

  render() {
    return (
      <Card title='Random Value'>
        <p className='card-content'>{this.props.value.join(' | ')}</p>
        <div className='btn-box'>
          <Button onClick={this.props.clearDuplicates}>Clear Duplicates</Button>
          <Button type='danger' onClick={this.props.clearAll}>Clear All</Button>
        </div>
      </Card>
      )
  }
}