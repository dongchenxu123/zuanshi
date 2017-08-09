/**
 * Created by CY on 2016/1/25.
 */
import React, {PropTypes} from 'react'
import Button from 'qnui/lib/button';
import axios from 'axios';
import {updateCombinationCpm} from '../../help/url';
import {Icon} from 'antd';
export default class ChangeCharge extends React.Component {
  constructor () {
    super()
    var self = this
    this.state={
      editcpm: false,
      cpm: 30
    }

  }
  componentWillMount () {
    let cpm = this.props.cpm
    this.setState({
      cpm: cpm
    })
  }
  submitHandler () {
    var sendvalue = this.refs.sendEl.value
    var self = this
    this.setState({
      cpm: sendvalue,
      editcpm: false
    })
    this.props.sendcpm(sendvalue)

  }
  // closeEditCpm () {
  //   var self = this
  //   setTimeout(function () {
  //       self.setState({editcpm: false})
  //   }, 200)
  // }
  renderInput () {
    var props = this.props
    var propsCpm = this.state.cpm
    return (
      <div className='text-center ant-input-group' style={{margin: '0 auto', width: '100%'}}>
        <span>
          <input type='text'  ref='sendEl' name='sendEl' style={{height: '27px', width: '50px'}} defaultValue={propsCpm}
                 />
        </span>
        <Button type="primary" onClick={ this.submitHandler.bind(this) } style={{borderBottomLeftRadius: 0, borderTopLeftRadius: 0}}>确定</Button>
      </div>
    )
  }
  onChange () {
    var editcpm = this.state.editcpm
    this.setState({
      editcpm: !editcpm
    })
  }

  render () {
   var props = this.props
   var editcpm = this.state.editcpm
   var propsCpm = this.state.cpm
   var combination = this.props.record
   var online_status = this.props.status
   return (
      <div>
      { editcpm
        ? this.renderInput()
        : <div>
            <span>￥ {propsCpm}</span>
            {
              online_status == 4 || online_status == 5
              ? null
              : <Icon type="edit" onClick={this.onChange.bind(this)}/>
            }
          </div>
      }

      </div>
    )
  }
}
