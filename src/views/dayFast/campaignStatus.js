import React from 'react';
import Dialog from 'qnui/lib/dialog';
import Radio, { Group as RadioGroup } from 'qnui/lib/radio';
class CampaignStatusView extends React.Component {
   render () {
       var record = this.props.record
       var OnlineStatus = record.OnlineStatus + ''
       return (
           <Dialog visible={this.props.visibleStatus}
                   onCancel={this.props.onClose}
                   onClose={this.props.onClose}
                   title="修改状态"
                   onOk={this.props.onSubmitStatus}>
            <RadioGroup onChange={this.props.onChangeStatus}
                        defaultValue={OnlineStatus}>
                <Radio id="0" value="0">暂停</Radio>
                <Radio id="1" value="1">投放中</Radio>
                <Radio id="9" value="9">投放结束</Radio>
            </RadioGroup>
         </Dialog>
       )
   }
}
export default CampaignStatusView