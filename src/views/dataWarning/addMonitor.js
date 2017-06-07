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
import Time24 from './time24';
import {createMetric} from '../../help/url';
import axios from 'axios';
class AddMonitorView extends React.Component {
  constructor(props) {
        super(props);
        this.field = new Field(this);
        this.state = {
            data: [],
            disabled: true,
            zhibiao: '', //监控指标
            states:[],
            newHours: [],
            campaignsvalue: '',
            campaignsId: '',
            adgroupId: ''
        }
    }

  onSelect(value) {
    console.log(value)
    this.setState({
      campaignsvalue: value
    })
  }
  changezhibiao (value) {
    this.setState({
      zhibiao: value
    })
  }
  onChange(value) {
    var campaignId = this.props.campaignsId
    this.setState({city: value});
    console.log(value)
  }

  handleSubmit(e) {
    e.preventDefault();
    this.field.validate((errors, values) => {
      console.log(values)
      var intervalnum = values.intervalnum
      var lowernum = values.lowernum
      var topnum = values.topnum
      var warnnum = values.warnnum
      var title = 'zuanshi'+ '.' + this.state.campaignsvalue + '.' + this.state.zhibiao
      var newHours = this.state.newHours
      var campaignsId = this.state.campaignsId
      var adgroupId = this.state.adgroupId
      axios.post(createMetric, {
        campaign_id: campaignsId,
        adgroup_id: adgroupId,
        metric_name: title,
        check_interval: intervalnum,
        check_hours: JSON.stringify(newHours),
        upper_bound: topnum,
        lower_bound: lowernum,
        alert_interval: warnnum
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    })

  }
  onChangeTime (obj) {
    this.setState({
      newHours: obj
    })
  }
  changecampaginId (value) {
    this.setState({
      campaignsId: value
    })
  }
  changeadgroupId (value) {
    this.setState({
      adgroupId: value
    })
  }
  renderSelect () {
     if(this.state.campaignsvalue == 'campaign') {
       if(this.props.campaignsData.length > 0) {
         return (
           <Select style={{ width: 200 }} onChange={this.changecampaginId.bind(this)}>
               {
                 this.props.campaignsData.map((item, idx) => {
                     return (
                       <Option value={item.Id} key={idx}>{item.Name}</Option>
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
          <Select style={{ width: 300 }} onChange={this.changeadgroupId.bind(this)}>
              {
            this.props.adgroupData.map((item, idx) => {
                return (
                  <Option value={item.Adgroup.Id} key={idx}>{item.Adgroup.Name + ' -- '+ item.Campaign.Name}</Option>
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
  render () {
    const init = this.field.init;
    const formItemLayout = {
        labelCol: {
            span: 3
        },
        wrapperCol: {
                span: 25
            }
     }


    return (
      <Dialog visible = {this.props.visible}
              onOk = {this.props.onClose}
              onCancel = {this.props.onClose}
              onClose = {this.props.onClose} title = {this.props.title} style={{width: '60%', height: '80%'}} footer={false}>
               <Form direction="ver" field={this.field}>
                 <FormItem label="监控名称：" {...formItemLayout}>
                   <div className="next-form-text-align" {...init('title')}>{'zuanshi'+ this.state.campaignsvalue + '.' +this.state.zhibiao}</div>
                 </FormItem>
                 <FormItem label="监控维度：" required labelCol={{ span: 3}} >
                   <Row>
                     <FormItem style={{marginRight: 10}}>
                       <Select style={{ width: 200 }}
                           {...init('select3')}
                           onChange={this.onSelect.bind(this)}>
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
                        {...init('select3')}
                        onChange={this.changezhibiao.bind(this)}>
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
                    <NumberPicker step={1} defaultValue={-1}
                      {...init('topnum')} inputWidth={100}/>
                </FormItem>
                <FormItem
                    label="下阀值："
                    {...formItemLayout}
                    >
                    <NumberPicker step={1} defaultValue={-2}
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
                    >
                    <Time24 onChange={this.onChangeTime.bind(this)}/>
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
