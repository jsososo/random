import React from 'react';
import { Card, Button, Modal, Input, Radio } from 'antd';

const RadioGroup = Radio.Group;

export default class Pool extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showAll: false,
      modalVisible: false,
      modalType: 'Store',
      storage: {},
      storageName: [],
      newStorage: null,
      modalWarning: false,
      modalBtn: 'disable',
      selectRadio: null,
      pool: this.props.value
    }

    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this._showModal = this._showModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.onClickModalBtn = this.onClickModalBtn.bind(this);
    this.inputStorageName = this.inputStorageName.bind(this);
    this.selectRadio = this.selectRadio.bind(this);
  }

  componentWillMount() {
    let [storage, storageName, obj] = [window.localStorage, [], {}];

    if (storage.length) {
      for (let i = 0; i < storage.length; i++) {
        storageName.push(storage.key(i));
        obj[storage.key(i)] = storage.getItem(storage.key(i));
      }
      this.setState({
        storage: obj,
        storageName: storageName
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      pool: nextProps.value
    })
  }

  handleCancel() {
    this.setState({
      modalVisible: false
    })
  }

  handleOk() {
    this.setState({
      modalVisible: false
    })
  }

  showModal(type) {
    if (type === 'store') {
      this.setState({
        modalType: 'Store',
        modalVisible: true
      })
    } else {
      this.setState({
        modalType: 'Read cache',
        modalVisible: true
      })
    }
  }

  onClickModalBtn() {
    // 存储
    if (this.state.modalType === 'Store') {
      let [storage, storageName] = [{...this.state.storage}, [...this.state.storageName]];

      storage[this.state.newStorage] = [...this.state.pool];
      storageName.push(this.state.newStorage);

      // 存为localStorage
      window.localStorage.setItem(this.state.newStorage, [...this.state.pool]);

      this.setState({
        storage: storage,
        modalVisible: false,
        modalWarning: false,
        modalBtn: 'disable',
        newStorage: null,
        storageName: storageName
      })
    } else {
      // 读取
      let pool = this.state.storage[this.state.selectRadio].split(',');

      this.setState({
        pool: pool,
        modalVisible: false,
        modalBtn: 'disable',
        selectRadio: null
      })

      this.props.changePool(pool);
    }
  }

  inputStorageName(e) {
    let [modalWarning, modalBtn] = [false, 'disable'];

    // 存在输入
    if (e.target.value !== '') {
      modalBtn = '';

      // 存在重名
      if (this.state.storage[e.target.value]) {
        modalWarning = true;
      }
    }
    this.setState({
      newStorage: e.target.value,
      modalWarning: modalWarning,
      modalBtn: modalBtn
    })
  }

  selectRadio(e) {
    this.setState({
      selectRadio: e.target.value,
      modalBtn: ''
    })
  }

  clearStorage(value) {
    if (value === true) {

      window.localStorage.clear();

      this.setState({
        storage: {},
        storageName: [],
        newStorage: null,
        modalBtn: 'disable',
        selectRadio: null,
        pool: this.props.value
      })

    }
  }

  _showModal() {
    return (
      <Modal
        title={this.state.modalType}
        visible={this.state.modalVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={<Button type='primary' onClick={this.onClickModalBtn} disabled={this.state.modalBtn}>{this.state.modalType === 'Store' ? 'Store' : 'Read'}</Button>}
      >
        {this.state.modalType === 'Store' ?
        // 存储pool
        (<div className='modal-store'>
          <div className='modal-input-row'>
            <span className='modal-input-title'>Name: </span><Input className='modal-input-text' onChange={this.inputStorageName} />
          </div>
          <div className='modal-warning'>{this.state.modalWarning && 'Warnning'}</div>
        </div>):
        // 读取缓存
        (<div>
          {this.state.storageName.length !== 0 &&
            <RadioGroup onChange={this.selectRadio} value={this.state.selectRadio}>
              {this.state.storageName.map(item => {
                return <Radio value={item} key={`radio-${item}`}>{item}</Radio>
              })}
              <a onClick={this.clearStorage.bind(this, true)}>clear all</a>
            </RadioGroup>
          }
          {this.state.storageName.length === 0 && <div>no cache</div>}
        </div>)}
      </Modal>
    )
  }



  render() {
    return (
      <Card
        title='Random Value'
        extra={<span><a onClick={this.showModal.bind(this, 'store')}>store</a><a onClick={this.showModal.bind(this, 'read')} style={{margin: '0 10px'}}>Read cache</a></span>}
      >
        <p className='card-content'>{this.state.pool.join(' | ')}</p>
        <div className='btn-box'>
          <Button onClick={this.props.clearDuplicates}>Clear Duplicates</Button>
          <Button type='danger' onClick={this.props.clearAll}>Clear All</Button>
        </div>
        {this._showModal()}
      </Card>
      )
  }
}