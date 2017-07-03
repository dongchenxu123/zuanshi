import React from 'react';
import Dialog from 'qnui/lib/dialog';
import Feedback from 'qnui/lib/feedback';
import Loading from 'qnui/lib/loading';
class BindWechatView extends React.Component {
	render () {
    var wechatimgUrl = this.props.wechatimgUrl
		return (
      <Dialog visible = {this.props.visible}
              onOk = {this.props.onSure}
              onCancel = {this.props.onClose}
              onClose = {this.props.onClose} title = "微信微信">
              <Feedback>
                 扫描一下二维码即可绑定!
              </Feedback>
             <div>
              {
                wechatimgUrl
                ? <div style={{textAlign: 'center'}}><img src={wechatimgUrl} style={{width: '50%'}}/></div>
                : <div style={{margin: '20px auto', width: '200px'}}><Loading color="#c7c7c7" /></div>
              }

             </div>
      </Dialog>
    )
  }
}

export default BindWechatView;
