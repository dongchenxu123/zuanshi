import React from 'react';
import Dialog from 'qnui/lib/dialog';
import Input from 'qnui/lib/input';
import Button from 'qnui/lib/button';
import Form from 'qnui/lib/form';
import Field from 'qnui/lib/field';
import Feedback from 'qnui/lib/feedback';
import {Row, Col} from 'qnui/lib/grid';
const Toast = Feedback.toast;
const FormItem = Form.Item;
let Timer = null
class BindTelephoneView extends React.Component {
  constructor (props) {
    super(props)
    this.field = new Field(this);
    this.state={
      cmsloading: false,
      btnNumber: 60,

    }
  }
  renderGetCodeBtnTxt () {
    const self = this
    Timer = setInterval(() => {
      if (self.state.btnNumber === 0) {
        clearInterval(Timer)
        self.setState({
          btnNumber: 60
        })
        return
      }
      self.setState({
        btnNumber: self.state.btnNumber - 1
      })
    }, 1000)
  }
  handleGetSMSCode (e) {
    e.preventDefault()
    const self = this
    const values = this.field.getValues()
    console.log(values)
    if (!values.telephone) {
      Toast.error('请填写手机号！')
      return
    }
    this.setState({
      cmsloading: true
    })
    setTimeout(function () {
      self.setState({
        cmsloading: false
      })
    }, 60000)
    this.props.getSMSCode(values.telephone)
    this.renderGetCodeBtnTxt()
  }
  handleOk () {
    const values = this.field.getValues()
    if (!values.telephone || !values.code) {
      Toast.error('请填写手机号和验证码！')
      return
    }
    this.props.sendPhone(values)
  }
	render () {
    const {init, getError, getState } = this.field;
    const formItemLayout = {
        labelCol: {
            span: 6
        }
    };
    return (
      <Dialog visible = {this.props.telephoneVisible}
              onOk = {this.handleOk.bind(this)}
              onCancel = {this.props.onTelephoneClose}
              onClose = {this.props.onTelephoneClose} title = "绑定手机号" style={{width: '500px'}}>
            <Form field={this.field}>
              <FormItem label="手机号：" {...formItemLayout}>
                <Row>
                <Input {...init('telephone', {
                            rules: [
                                {required: true, message: '请输入手机号！'}

                            ],
                        })} placeholder="请输入手机号"/>
                <Button
                  type='primary'
                  loading={this.state.cmsloading}
                  onClick={this.handleGetSMSCode.bind(this)}
                >
                {this.state.cmsloading ? <span>&nbsp; {this.state.btnNumber}</span> : '获取验证码'}
                </Button>
                </Row>
              </FormItem>
              <FormItem label="验证码：" {...formItemLayout}>
                <Input {...init('code', {
                            rules: [
                                {message: '请输入验证码！'}
                              ],
                        })} placeholder="请输入验证码"/>
              </FormItem>
            </Form>
      </Dialog>
    )
  }
}

export default BindTelephoneView;
