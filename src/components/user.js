import React from 'react';
import '../styles/App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getuser, getwechat, getwechatStatus, getSMSCode, sendtelephonecode } from '../help/url';
import Button from 'qnui/lib/button';
import BindWechatView from '../views/dataWarning/bindWechat';
import BindTelephoneView from '../views/dataWarning/bindtelephone';
import Feedback from 'qnui/lib/feedback';
const Toast = Feedback.toast;
class UserView extends React.Component {
  constructor () {
    super()
    this.state={
      wechatVisible: false,
      wechatimgUrl: '',
      wechatStatus: false,
      telephoneVisible: false,
      bindtelephone: false,
      Nick: '',
      Telephone:null
    }
  }
  componentWillMount () {
    var self = this
    axios.get(getuser)
    .then(function (response) {
      var nick = response.data.Nick
      var Telephone = response.data.Telephone
      self.setState({
        Nick: nick,
        Telephone: Telephone
      })
    })
    .catch(function (error) {
      console.log(error);
    });
    this.getWechatStatus()
  }
  onWechatOpen () {
    this.setState({
        wechatVisible: true
    })
    var self = this
    axios.get(getwechat)
    .then(function (response) {
      self.setState({
        wechatimgUrl: response.data.pic_url
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onWechatClose () {
    this.setState({
        wechatVisible: false
    })
  }
  onTelephoneClose () {
    this.setState({
      telephoneVisible: false
    })
  }
  onTelephoneOpen () {
    this.setState({
      telephoneVisible: true
    })
  }
  onSure () {
    this.setState({
        wechatVisible: false
    })
    this.getWechatStatus()
  }
  getWechatStatus () {
    var self = this
    axios.get(getwechatStatus)
    .then(function (response) {
      self.setState({
        wechatStatus: response.data.wechat
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  getSMSCode (telephone) {
    var self = this
    axios.post(getSMSCode, {
      telephone: telephone
    })
    .then(function (response) {
      if(response.data.err) {
        Toast.error(response.data.err)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  sendPhone (values) {
    var self = this
    axios.post(sendtelephonecode, {
      telephone: values.telephone,
      code: values.code
    })
    .then(function (response) {
      if(response.data.err) {
        Toast.error(response.data.err)
      }
      if(response.data.msg == '手机号更新成功') {
        self.setState({
          telephoneVisible: false,
          bindtelephone: true
        })
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
	render () {
    var wechatStatus = this.state.wechatStatus
		return (
      <div className='panel panel-default' style={{margin: '10px'}}>
        <div className="panel-heading" style={{fontSize: '14px'}}>
          <Link to='/' style={{color: '#333'}}>首页</Link>&nbsp; / &nbsp;
          <span style={{fontWeight: 'bold'}}>用户中心</span>
        </div>
        <div className="panel-body" style={{paddingBottom: '100px'}}>
          <div className='col-md-1'><span style={{fontSize: '24px', color: '#eee'}}>账户</span></div>
          <div className='col-md-3'>
            <div style={{fontSize: '14px', marginBottom: '10px'}}>登录名</div>
            <div>{this.state.Nick ? this.state.Nick : ''}</div>
          </div>
          <div className='col-md-4'>
            <div style={{fontSize: '14px', marginBottom: '10px'}}>手机号</div>
            {
              this.state.bindtelephone || this.state.Telephone != null
              ? <Button disabled>已绑定的手机号: {this.state.Telephone}</Button>
              : <Button onClick={this.onTelephoneOpen.bind(this)}>绑定手机号</Button>
            }
          </div>
          <div className='col-md-4'>
            <div style={{fontSize: '14px', marginBottom: '10px'}}>微信号</div>
            {
              wechatStatus
              ? <Button disabled>已绑定微信</Button>
              : <Button onClick={this.onWechatOpen.bind(this)}>绑定微信号</Button>
            }
            </div>
        </div>
        <BindWechatView visible={this.state.wechatVisible}
                        onClose={this.onWechatClose.bind(this)}
                        wechatimgUrl={this.state.wechatimgUrl}
                        onSure={this.onSure.bind(this)}/>
        <BindTelephoneView telephoneVisible = {this.state.telephoneVisible}
                           onTelephoneClose={this.onTelephoneClose.bind(this)}
                           getSMSCode = {this.getSMSCode.bind(this)}
                           sendPhone={this.sendPhone.bind(this)}
                           />
      </div>
    )
  }
}

export default UserView;
