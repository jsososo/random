import React from 'react';
import { Card, Button, Modal, Input, Radio, Icon } from 'antd';

const RadioGroup = Radio.Group;

export default class Pool extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
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
      modalVisible: false,
      newStorage: null,
      modalWarning: false,
      modalBtn: 'disable',
      selectRadio: null
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

      storage[this.state.newStorage] = [...this.state.pool].join(',');
      if (this.state.modalWarning) {
        let i = storageName.indexOf(this.state.newStorage);

        storageName.splice(i, 1);
      }

      storageName.unshift(this.state.newStorage);

      // 存为localStorage
      window.localStorage.setItem(this.state.newStorage, [...this.state.pool]);

      this.setState({
        storage: storage,
        modalVisible: false,
        modalWarning: false,
        modalBtn: 'disable',
        newStorage: null,
        storageName: storageName,
        newStorage: null,
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
      if (this.state.storageName.indexOf(e.target.value) >= 0) {
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
        modalBtn: 'disable',
        selectRadio: null,
        pool: this.props.value
      })

    } else {
      window.localStorage.removeItem(value);

      let [storage, storageName, modalBtn, selectRadio] = [window.localStorage, this.state.storageName, this.state.modalBtn, this.state.selectRadio];

      if (selectRadio === value) {
        selectRadio = null;
      }

      let index = storageName.indexOf(value);
      storageName.splice(index, 1);

      if (!storageName.length) {
        modalBtn = 'disable'
      }

      this.setState({
        storage: storage,
        storageName: storageName,
        selectRadio: selectRadio,
        modalBtn: modalBtn
      })
    }
  }

  _showModal() {
    return (
      <Modal
        title={this.state.modalType}
        visible={this.state.modalVisible}
        onCancel={this.handleCancel}
        footer={<Button type='primary' onClick={this.onClickModalBtn} disabled={this.state.modalBtn}>{this.state.modalType === 'Store' ? 'Store' : 'Read'}</Button>}
      >
        {this.state.modalType === 'Store' ?
        // 存储pool
        (<div className='modal-store'>
          <div className='modal-input-row'>
            <span className='modal-input-title'>Name: </span><Input className='modal-input-text' onChange={this.inputStorageName} value={this.state.newStorage} />
          </div>
          <div className='modal-warning'>{this.state.modalWarning && <span><Icon type="exclamation-circle-o" />Warning: This name is duplicate of the existing cache and will replace the original cache</span>}</div>
        </div>):
        // 读取缓存
        (<div>
          {this.state.storageName.length !== 0 &&
            <RadioGroup onChange={this.selectRadio} value={this.state.selectRadio}>
              {this.state.storageName.map(item => {
                return <Radio value={item} key={`radio-${item}`}><span className='radio-value'>{item}</span><a className='radio-delete' onClick={this.clearStorage.bind(this, item)}>delete</a></Radio>
              })}
              <a className='radio-clear-all' onClick={this.clearStorage.bind(this, true)}>clear all</a>
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