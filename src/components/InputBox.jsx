import React from 'react';
import { Input } from 'antd';

export default class InputBox extends React.Component {
  constructor (props, context) {
    super(props, context);

    this.pressEnter = this.pressEnter.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // 输入，正则匹配并修改
  handleChange() {
    let [info] = [this.props.type];

    // 数字类型
    if (info.className === 'input-number') {
      info.input.map(item => {
        let element = this.refs[`${info.className}-${item}`].refs.input;

        element.value = element.value.match(/\d+/);
      })
    }

    // 字母类型
    if (info.className === 'input-letter') {
      info.input.map(item => {
       let element = this.refs[`${info.className}-${item}`].refs.input;

       if (item === 'distance') {
        // 匹配两位
        element.value = element.value.match(/[0-9]{0,2}/);
        // 不能大于25
        if (element.value > 25) {
          element.value = element.value.match(/./);
        }
       } else {
        element.value = element.value.match(/[a-zA-Z]/);
       }
      })
    }
  }

  pressEnter() {
    let [info, value, empty, randomArray] = [this.props.type, [], false, []];

    // 循环获取每一个input的值
    info.input.map(item => {
      // 如果存在空输入则跳过
      if (!empty) {

        let element = this.refs[`${info.className}-${item}`].refs.input;

        // 空输入
        if (element.value === undefined) {
          empty = true;
        } else {
          value.push(element.value);
        }
      }
    })

    // 数字类型
    if (info.className === 'input-number') {
      value.map((item, index) => {
        value[index] = Number(item);
      })
      // 全部都存在输入,且end大于start
      if (!empty && value[1] > value[0]) {
        for (let i = value[0]; i <= value[1]; i += value[2]) {
          randomArray.push(i);
        }

        info.input.map(item => {
          this.refs[`${info.className}-${item}`].refs.input.value = '';
        });
      }
    }

    // 字母类型
    if (!empty) {
      value.map((item, index) => {
        value[index] = item.charCodeAt();
      })

      console.log(value);
    }

    // teatarea
    if (info.className === 'input-area') {
      if (!empty) {
        // 切割
        randomArray = value[0].split('--');

        this.refs[`${info.className}-${info.input[0]}`].refs.input.value = '';
      }
    }

    // 传递数组给main
    if (randomArray.length) {
      this.props.add(randomArray);
    }
  }

  render () {
    let info = this.props.type;
    return (
      <div className={`input-box ${info.className}`}>
        <div className='input-info'>
          <div className='input-info-title'>{info.title}</div>
          <div className='input-info-description'>{info.description}</div>
        </div>
        {info.input.map(item => {
          return (
          <Input
            type={info.type}
            size='large'
            placeholder={item}
            key={`${info.className}-${item}`}
            ref={`${info.className}-${item}`}
            rows={(info.type === 'textarea') ? 4 : null}
            onPressEnter={this.pressEnter}
            onChange={this.handleChange}
          />)
        })}
      </div>
    )
  }
}
