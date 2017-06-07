/**
 * Created by CY on 2016/1/25.
 */
import React, {PropTypes} from 'react'
import Button from 'qnui/lib/button';
export default class EditInline extends React.Component {
  constructor () {
    super()
    this.state={
      editcpm: false,
      cpm: 30
    }

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
    var propsCpm = props.cpm ? props.cpm : this.state.cpm
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
   var propsCpm = props.cpm ? props.cpm : this.state.cpm
  return (
      <div>
      <div style={{marginBottom: '10px'}}>出价:<span style={{paddingLeft: '8px'}}>{propsCpm}</span></div>
      { editcpm
        ? this.renderInput()
        : <Button onClick={this.onChange.bind(this)}>修改出价</Button>
      }

      </div>
    )
  }
}
