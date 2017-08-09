import React from 'react';
import Button from 'qnui/lib/button';
import Dialog from 'qnui/lib/dialog';
import Form from 'qnui/lib/form';
import Field from 'qnui/lib/field';
import Select from 'qnui/lib/select';
const FormItem = Form.Item;
const provinceData = ['店铺', '推广计划', '推广组'];
import {Row, Col} from 'qnui/lib/grid';
import NumberPicker from 'qnui/lib/number-picker';
import Checkbox from 'qnui/lib/checkbox';
const { Group: CheckboxGroup } = Checkbox;
import Time24 from './time24';
import {createMetric} from '../../help/url';
import axios from 'axios';
import Feedback from 'qnui/lib/feedback';
const Toast = Feedback.toast;
const list = [
    {
        value: 'sms',
        label: '短信'
    }, {
        value: 'wechat',
        label: '微信'
    }
];

class AddMonitorView extends React.Component {
  constructor(props) {
        super(props);
        this.field = new Field(this);
        this.state = {
            data: [],
            disabled: true,
            zhibiao: '', //监控指标
            campaignsvalue: '' //监控维度
        }
    }
 changezhibiao (value) {
    this.setState({
      zhibiao: value
    })
  }
 handleSubmit(e) {
    e.preventDefault();
    this.field.validate((errors, values) => {
      if (errors) {
         console.log('Errors in form!!!');
         return;
     }
      var campaignsvalue =  this.state.campaignsvalue == '' ? 'client' : this.state.campaignsvalue
      var zhibiao = this.state.zhibiao == '' ? 'click' : this.state.zhibiao
      var intervalnum = values.intervalnum
      var lowernum = values.lowernum
      var topnum = values.topnum
      var warnnum = values.warnnum
      var title = 'zuanshi.' + campaignsvalue + '.' + zhibiao
      var newHours = values.hours
      var alert_channels = values.alert_channels
      var campaignsId = ''
      var campaignName = ''
      if(values.campaign != undefined) {
        campaignsId = values.campaign.substr(0,9)
        campaignName = values.campaign.substr(9)
        var adgroupId = ''
        var adgroupName = ''
      }
      if(values.adgroup != undefined) {
        var adgroupArr = values.adgroup.split(',')
        campaignsId = adgroupArr[2]
        campaignName = adgroupArr[3]
        var adgroupId = adgroupArr[0]
        var adgroupName = adgroupArr[1]
      }
      var self = this
      axios.post(createMetric, {
        campaign_id: campaignsId,
        campaign_name: campaignName,
        adgroup_id: adgroupId,
        adgroup_name: adgroupName,
        metric_name: title,
        check_interval: intervalnum,
        check_hours: JSON.stringify(newHours),
        upper_bound: topnum,
        lower_bound: lowernum,
        alert_interval: warnnum,
        alert_channels: alert_channels.join(',')
      })
      .then(function (response) {
        if(response.data.msg == 'ok') {
          self.props.onOk()
          Toast.success('创建成功！')
          self.props.loadwarnlistData()
        } else {
          Toast.error('请补全带 * 的信息！')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    })

  }
  onChangeTime (rule, value, callback) {
    if(value == null) {
      callback(new Error('请选择推广时间!'))
    } else {
      callback()
    }
  }
  onChangeChannels (rule, value, callback) {
    console.log(value)
    if(value == null) {
      callback(new Error('请选择通知方式!'))
    } else {
      callback()
    }
  }
  changecampaginId (rule, value, callback) {
    if(value == '') {
      callback(new Error('请选择推广计划!'))
    } else {
      callback()
    }
  }
  changeadgroupId (rule, value, callback) {
    if(value == '') {
      callback(new Error('请选择推广组!'))
    } else {
      callback()
    }
  }
  renderSelect () {
    const init = this.field.init;
     if(this.state.campaignsvalue == 'campaign') {
       if(this.props.campaignsData.length > 0) {
         return (
           <Select style={{ width: 200 }}
                {...init('campaign', {
                   rules: [{required: true, message: '请选择计划！'},{validator: this.changecampaginId}],
               })}>
               {
                 this.props.campaignsData.map((item, idx) => {
                     return (
                       <Option value={item.Id + item.Name} key={idx}>{item.Name}</Option>
                    )
                   })
               }
            </Select>
         )

       } else {
         return null
       }
    } else if (this.state.campaignsvalue == 'adgroup') {
      if(this.props.adgroupData.length > 0) {
        return (
          <Select style={{ width: 300 }}
                {...init('adgroup', {
                   rules: [{required: true, message: '请选择推广组！'},{validator: this.changeadgroupId}],
               })}>
              {
            this.props.adgroupData.map((item, idx) => {
                return (
                  <Option value={item.Adgroup.Id + ','  + item.Adgroup.Name+ ',' + item.Campaign.Id + ','+ item.Campaign.Name} key={idx}>{item.Adgroup.Name + ' -- '+ item.Campaign.Name}</Option>
               )
              })
            }
         </Select>
      )
      } else {
        return null
      }
    } else {
      return null
    }
  }
  changeweidu (value) {
    this.setState({
      campaignsvalue: value
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
   var campaignsvalue = this.state.campaignsvalue == '' ? 'client' : this.state.campaignsvalue
   var zhibiao = this.state.zhibiao == '' ? 'click' : this.state.zhibiao
  return (
      <Dialog visible = {this.props.visible}
              onOk = {this.props.onClose}
              onCancel = {this.props.onClose}
              onClose = {this.props.onClose} title = {this.props.title} style={{width: '60%', height: '80%'}} footer={false}>
               <Form direction="ver" field={this.field}>
                 <FormItem label="监控名称：" {...formItemLayout}>
                   <div className="next-form-text-align" {...init('title')}>{'zuanshi.'+ campaignsvalue + '.' + zhibiao}</div>
                 </FormItem>
                 <FormItem label="监控维度：" labelCol={{ span: 3}} required>
                   <Row>
                     <FormItem style={{marginRight: 10}}>
                       <Select style={{ width: 200 }}
                            defaultValue='client'
                            onChange={this.changeweidu.bind(this)}
                         >
                           <Option value="client">店铺</Option>
                           <Option value="campaign">推广计划</Option>
                           <Option value="adgroup">推广组</Option>
                        </Select>
                      </FormItem>
                      {
                        this.state.campaignsvalue == 'client'
                        ? null
                        : <FormItem>
                            {
                              this.renderSelect()
                            }
                         </FormItem>
                      }
                  </Row>
                </FormItem>
                <FormItem
                    label="监控指标："
                    {...formItemLayout}
                    required>
                    <Select style={{ width: 200 }}
                      onChange={this.changezhibiao.bind(this)}
                      defaultValue='click'
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
                    <NumberPicker step={1} defaultValue={1} min={1}
                      {...init('topnum')} inputWidth={100}/>
                </FormItem>
                <FormItem
                    label="下阀值："
                    {...formItemLayout}
                    >
                    <NumberPicker step={1} defaultValue={2} min={1}
                      {...init('lowernum')} inputWidth={100}/>
                </FormItem>
                <FormItem
                    label="监控间隔："
                    {...formItemLayout}
                    >
                    <NumberPicker step={1} defaultValue={10} min={10}
                      {...init('intervalnum')} inputWidth={100}/>
                    <span style={{paddingLeft: '10px'}}>秒钟</span>
                </FormItem>
                <FormItem
                    label="告警间隔："
                    {...formItemLayout}
                    >
                    <NumberPicker step={1} defaultValue={10} min={10}
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
                     })}/>
                </FormItem>
                <FormItem
                    label="通知方式："
                    {...formItemLayout}
                    required
                    >
                    <CheckboxGroup defaultValue={['sms']} dataSource={list}
                      {...init('alert_channels', {
                           rules: [{required: true, message: '请选择通知方式！'},{validator: this.onChangeChannels}],
                       })}/>
                </FormItem>
                <Row style={{ marginTop: 24 }}>
                    <Col offset="6">
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
                    </Col>
                </Row>
               </Form>
      </Dialog>
    )
  }
}

export default AddMonitorView
