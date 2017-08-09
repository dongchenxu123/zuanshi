import React from 'react';
import axios from 'axios';
import MonitorListView from './monitorList';
import { getanomalyzerAlerts } from '../../help/url';
import Dialog from 'qnui/lib/dialog';
import Form from 'qnui/lib/form';
import Field from 'qnui/lib/field';
import Select from 'qnui/lib/select';
import {Row, Col} from 'qnui/lib/grid';
import Button from 'qnui/lib/button';
const FormItem = Form.Item;
import NumberPicker from 'qnui/lib/number-picker';
import Checkbox from 'qnui/lib/checkbox';
import Time24 from './time24';
import {anomalyzerUpdateMetric} from '../../help/url';
import Feedback from 'qnui/lib/feedback';
const Toast = Feedback.toast;
const { Group: CheckboxGroup } = Checkbox;
const list = [
    {
        value: 'sms',
        label: '短信'
    }, {
        value: 'wechat',
        label: '微信'
    }
];
class UpdateFormView extends React.Component {
  constructor(props) {
        super(props);
        this.field = new Field(this);
  }
 onChangeTime (rule, value, callback) {
    if(value == null) {
      callback(new Error('请选择推广时间!'))
    } else {
      callback()
    }
  }
  onChangeChannels (rule, value, callback) {
    if(value == null) {
      callback(new Error('请选择通知方式!'))
    } else {
      callback()
    }
  }
  renderSelect () {
    let editRecord = this.props.editRecord
    if(editRecord.id) {
      var metric_name = editRecord.metric_name.split('.')
      var weidu = metric_name[1]
    }
     if(weidu == 'campaign') {
       return (
           <Select style={{ width: 200 }} disabled={true} defaultValue={editRecord.campaign_id ? editRecord.campaign_id : ''}>
              <Option value={editRecord.campaign_id}>{editRecord.campaign_name}</Option>
           </Select>
         )
     } else if (weidu == 'adgroup') {
        return (
          <Select style={{ width: 300 }} disabled={true} defaultValue={editRecord.adgroup_id ? editRecord.adgroup_id : ''}>
            <Option value={editRecord.adgroup_id}>{editRecord.adgroup_name}</Option>
          </Select>
        )
    } else {
      return null
    }
  }
  onsubmitUpdate (e) {
    e.preventDefault();
    this.field.validate((errors, values) => {
      var self = this
      if (errors) {
         console.log('Errors in form!!!');
         return;
     }
     let editRecord = self.props.editRecord
     if(editRecord.id) {
       var metric_id = editRecord.id
     }
     var intervalnum = values.intervalnum
     var lowernum = values.lowernum
     var topnum = values.topnum
     var warnnum = values.warnnum
     var newHours = values.hours
     var alert_channels = values.alert_channels
     axios.post(anomalyzerUpdateMetric, {
       upper_bound: topnum,
       lower_bound: lowernum,
       check_interval: intervalnum,
       alert_interval: warnnum,
       check_hours: JSON.stringify(newHours),
       alert_channels: alert_channels.join(','),
       metric_id: metric_id
     })
     .then(function (response) {
       if(response.data.msg=='ok') {
         self.props.oneditClose()
         Toast.success('设置成功！')
         self.props.loadwarnlistData()
       } else {
         Toast.error('设置失败！')
       }
     })
     .catch(function (error) {
       console.log(error);
     });
   })
  }
  render () {
    const init = this.field.init;
    const formItemLayout = {
        labelCol: {
            span: 3
        },
        wrapperCol: {
                span: 30
            }
     }
     let editRecord = this.props.editRecord
     if(editRecord.id) {
       var metric_name = editRecord.metric_name.split('.')
       var weidu = metric_name[1]
       var zhibiao = metric_name[2]
       var check_hours = JSON.parse(editRecord.check_hours)
       var alert_channels = editRecord.alert_channels.split(',')
      }

     return (
      <Dialog visible = {this.props.editVisible}
              onOk = {this.props.oneditSure}
              onCancel = {this.props.oneditClose}
              onClose = {this.props.oneditClose} title = "设置监控" style={{width: '60%', height: '80%'}} footer={false}>
              <Form direction="ver" field={this.field}>
                <FormItem label="监控名称：" {...formItemLayout}>
                  <div className="next-form-text-align" {...init('title')}>{editRecord.metric_name}</div>
                </FormItem>
                <FormItem label="监控维度：" labelCol={{ span: 3}} required>
                  <Row>
                    <FormItem style={{marginRight: 10}}>
                      <Select style={{ width: 200 }}
                        defaultValue={weidu ? weidu : 'client'}
                        disabled={true}>
                          <Option value="client">店铺</Option>
                          <Option value="campaign">推广计划</Option>
                          <Option value="adgroup">推广组</Option>
                       </Select>
                     </FormItem>
                     <FormItem>
                         {
                           this.renderSelect()
                         }
                     </FormItem>
                 </Row>
               </FormItem>
               <FormItem
                   label="监控指标："
                   {...formItemLayout}
                   required>
                   <Select style={{ width: 200 }}
                      defaultValue={zhibiao ? zhibiao : 'click'}
                      disabled = {true}
                     >
                       <Option value="impression">impression</Option>
                       <Option value="click">click</Option>
                       <Option value="cost">cost</Option>
                       <Option value="cpc">cpc</Option>
                       <Option value="ctr">ctr</Option>
                       <Option value="cpm">cpm</Option>
                   </Select>
               </FormItem>
               <FormItem
                   label="上阀值："
                   {...formItemLayout}
                   >
                   <NumberPicker step={1} defaultValue={editRecord.upper_bound*1 ? editRecord.upper_bound*1 : 1} min={1}
                     {...init('topnum')} inputWidth={100}/>
               </FormItem>
               <FormItem
                   label="下阀值："
                   {...formItemLayout}
                   >
                   <NumberPicker step={1} defaultValue={editRecord.lower_bound*1 ? editRecord.lower_bound*1 : 1} min={1}
                     {...init('lowernum')} inputWidth={100}/>
               </FormItem>
               <FormItem
                   label="监控间隔："
                   {...formItemLayout}
                   >
                   <NumberPicker step={1} defaultValue={editRecord.check_interval*1 ? editRecord.check_interval*1 : 10} min={10}
                     {...init('intervalnum')} inputWidth={100}/>
                   <span style={{paddingLeft: '10px'}}>秒钟</span>
               </FormItem>
               <FormItem
                   label="告警间隔："
                   {...formItemLayout}
                   >
                   <NumberPicker step={1} defaultValue={editRecord.alert_interval*1 ? editRecord.alert_interval*1 : 10} min={10}
                     {...init('warnnum')} inputWidth={100}/>
               </FormItem>
               <FormItem
                   label="监控时间："
                   {...formItemLayout}
                   required
                   extra='点击‘星期*’可选择一天，如星期二'
                   >
                   <Time24   {...init('hours', {
                        rules: [{required: true, message: '请选择监控时间！'},{validator: this.onChangeTime}],
                    })} defaultValue={check_hours}/>
               </FormItem>
               <FormItem
                   label="通知方式："
                   {...formItemLayout}
                   required
                   >
                   <CheckboxGroup defaultValue={alert_channels} dataSource={list}
                     {...init('alert_channels', {
                          rules: [{required: true, message: '请选择通知方式！'},{validator: this.onChangeChannels}],
                      })}/>
               </FormItem>
               <Row style={{ marginTop: 24 }}>
                   <Col offset="6">
                       <Button type="primary" onClick={this.onsubmitUpdate.bind(this)}>确定</Button>
                   </Col>
               </Row>
              </Form>
      </Dialog>
    )
  }
}

export default UpdateFormView
