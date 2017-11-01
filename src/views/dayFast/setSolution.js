<<<<<<< HEAD
import React from 'react';
import {createCampaign} from '../../help/linkUrl';
import { Link } from 'react-router-dom';
import Button from 'qnui/lib/button';
import NumberPicker from 'qnui/lib/number-picker';
import Select from 'qnui/lib/select';
import Field from 'qnui/lib/field';
import {Row, Col} from 'qnui/lib/grid';
import Icon from 'qnui/lib/icon';
import Form from 'qnui/lib/form';
const FormItem = Form.Item;
class SetsolutionView extends React.Component {
  constructor(props) {
        super(props);
        this.field = new Field(this);
    }
  setClick () {

  }
  render () {
    const {init, getError, getValue } = this.field;
    const formItemLayout = {
        labelCol: {span: 2},
        wrapperCol: {span: 14},
    };
    return (
      <div className='panel panel-default' style={{margin: '10px'}}>
        <div className="panel-heading" style={{overflow: 'hidden'}}>
            <span>选择条件</span>
        </div>
        <div className="panel-body" style={{paddingBottom: '50px'}}>
           <Form field={this.field}>
              <FormItem>
                <div>筛选条件</div>
              </FormItem>
              <FormItem label="展现量："
                    {...formItemLayout}>
                <NumberPicker min={1} {...init('pvtop', {initValue: 300})} inputWidth={100}/>
                <span style={{margin: '0 16px'}}>一></span>
                <NumberPicker min={1} {...init('pvlow', {initValue: 400})} inputWidth={100}/>
              </FormItem>
              <FormItem label="点击量："
                    {...formItemLayout}>
                <NumberPicker min={1} {...init('clicktop', {initValue: 300})} inputWidth={100}/>
                <span style={{margin: '0 16px'}}>一></span>
                <NumberPicker min={1} {...init('clicklow', {initValue: 400})} inputWidth={100}/>
              </FormItem>
              <FormItem label="点击率："
                    {...formItemLayout}>
                <NumberPicker min={1} {...init('ctrtop', {initValue: 300})} inputWidth={100}/>
                <span style={{margin: '0 16px'}}>一></span>
                <NumberPicker min={1} {...init('ctrlow', {initValue: 400})} inputWidth={100}/>
              </FormItem>
              <FormItem label="花费："
                    {...formItemLayout}>
                <NumberPicker min={1} {...init('costtop', {initValue: 300})} inputWidth={100}/>
                <span style={{margin: '0 16px'}}>一></span>
                <NumberPicker min={1} {...init('costlow', {initValue: 400})} inputWidth={100}/>
              </FormItem>
              <FormItem label="eCPC："
                    {...formItemLayout}>
                <NumberPicker min={1} {...init('eCPCtop', {initValue: 300})} inputWidth={100}/>
                <span style={{margin: '0 16px'}}>一></span>
                <NumberPicker min={1} {...init('eCPClow', {initValue: 400})} inputWidth={100}/>
              </FormItem>
              <FormItem label="eCPM："
                    {...formItemLayout}>
                <NumberPicker min={1} {...init('eCPMtop', {initValue: 300})} inputWidth={100}/>
                <span style={{margin: '0 16px'}}>一></span>
                <NumberPicker min={1} {...init('eCPMlow', {initValue: 400})} inputWidth={100}/>
              </FormItem>
              <FormItem>
                <div>优化目标</div>
              </FormItem>
              <FormItem label="优化目标："
                    {...formItemLayout}>
                <Select style={{ width: 200, height: '32px' }}
                    {...init('select')}>
                    <Option value="jack">jack</Option>
                    <Option value="lucy">lucy</Option>
                    <Option value="disabled" disabled>disabled</Option>
                    <Option value="hugohua">hugohua</Option>
                </Select>
                <NumberPicker min={1} {...init('eCPMtop', {initValue: 300})} inputWidth={100} style={{margin: '0 16px'}}/>
                <Select style={{ width: 200, height: '32px' }}
                        {...init('select')}>
                        <Option value="jack">jack</Option>
                        <Option value="lucy">lucy</Option>
                        <Option value="disabled" disabled>disabled</Option>
                        <Option value="hugohua">hugohua</Option>
                    </Select>
              </FormItem>
           </Form>
         </div>
        <div className="panel-footer" style={{overflow: 'hidden', backgroundColor: '#fff'}}>
          <div style={{float: 'right'}}>
              <Link to={createCampaign}><Button type="normal" style={{marginRight: '15px'}}>取消</Button></Link>
              <Button type="normal" onClick={this.setClick.bind(this)}>下一步</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default SetsolutionView
=======
import React from 'react';
import {createCampaign, createcombination} from '../../help/linkUrl';
import { Link } from 'react-router-dom';
import Button from 'qnui/lib/button';
import NumberPicker from 'qnui/lib/number-picker';
import Select from 'qnui/lib/select';
import Field from 'qnui/lib/field';
import {Row, Col} from 'qnui/lib/grid';
import Icon from 'qnui/lib/icon';
import Form from 'qnui/lib/form';
import { Group as RadioGroup } from 'qnui/lib/radio';
import axios from 'axios';

import createHistory from 'history/createHashHistory';
const history = createHistory()
const FormItem = Form.Item;
const list = [
    {
        value: 'roi',
        label: 'Roi'
    }, {
        value: 'col_num',
        label: '收藏'
    }, {
        value: 'CTR',
        label: 'Ctr'
    }
];
class SetsolutionView extends React.Component {
  constructor(props) {
        super(props);
        this.field = new Field(this);
    }
  handleSubmit (e) {
    e.preventDefault();
    this.field.validate((errors, values) => {
        var optimize_field = values.radio
        var limits = [{"Field":"click","Min":values.clicklow,"Max":values.clicktop},
        {"Field":"charge","Min":values.costlow,"Max":values.costtop},
        {"Field":"ctr","Min":values.ctrlow,"Max":values.ctrtop},
        {"Field":"ecpc","Min":values.eCPClow,"Max":values.eCPCtop},
        {"Field":"ecpm","Min":values.eCPMlow,"Max":values.eCPMtop},
        {"Field":"pv","Min":values.pvlow,"Max":values.pvtop}]

        var constraints = [{"Field":"click","Min":values.yh_clicklow,"Max":values.yh_clicktop},
        {"Field":"charge","Min":values.yh_costlow,"Max":values.yh_costtop},
        {"Field":"ctr","Min":values.yh_ctrlow,"Max":values.yh_ctrtop},
        {"Field":"ecpc","Min":values.yh_eCPClow,"Max":values.yh_eCPCtop},
        {"Field":"ecpm","Min":values.yh_eCPMlow,"Max":values.yh_eCPMtop},
        {"Field":"pv","Min":values.yh_pvlow,"Max":values.yh_pvtop}]
        var effect = values.effect
        var step=3
        this.props.commonData({step, effect, optimize_field, limits, constraints})
        
        });
       
       history.push(createcombination)
  }
  changeeffect (rule, value, callback) {
   if (value != null) {
            callback();
        }
  }
  changeradio (rule, value, callback) {
     if (value != null) {
            callback();
        }
  }
  render () {
    const {init, getError, getValue } = this.field;
    const formItemLayout = {
        labelCol: {span: 6}
        
    };
    const formItemLayouts = {
        labelCol: {span: 2}
        
    };
    return (
      <div className='panel panel-default' style={{margin: '10px'}}>
        <div className="panel-heading" style={{overflow: 'hidden'}}>
            <span>选择条件</span>
        </div>
        <div className="panel-body" style={{paddingBottom: '50px'}}>
           <Form field={this.field}>
              <FormItem>
                <div>优化目标</div>
              </FormItem>
              <FormItem label="优化目标："
                    {...formItemLayouts}
                    required>
                <RadioGroup dataSource={list} defaultValue={'roi'} {...init('radio', {
                            rules: [
                                {message: '请选择优化目标'},
                                {validator: this.changeradio.bind(this)}
                            ]
                        })}/>
              </FormItem>
              <FormItem
                    label="优化时间："
                    {...formItemLayouts}
                    required>
                    <Select style={{ width: 200 }}
                        {...init('effect', {
                            rules: [
                                {message: '请选择优化时间'},
                                {validator: this.changeeffect.bind(this)},
                            ],
                        })} defaultValue={'15'}>
                        <Option value="3">3天</Option>
                        <Option value="7">7天</Option>
                        <Option value="15">15天</Option>
                    </Select>
                </FormItem>
              <FormItem>
                <Row>
                  <FormItem>
                    <div style={{marginBottom: '10px'}}>筛选条件</div>
                    <FormItem label="展现量："
                          {...formItemLayout}>
                      <NumberPicker {...init('pvlow', {initValue: 0})} inputWidth={100} step={100}/>
                      <span style={{margin: '0 16px'}}>一</span>
                      <NumberPicker {...init('pvtop', {initValue: 0})} inputWidth={100} step={100}/>
                    </FormItem>
                    <FormItem label="点击量："
                          {...formItemLayout}>
                      <NumberPicker {...init('clicklow', {initValue: 0})} inputWidth={100} step={100}/>
                      <span style={{margin: '0 16px'}}>一</span>
                      <NumberPicker {...init('clicktop', {initValue: 0})} inputWidth={100} step={100}/>
                    </FormItem>
                    <FormItem label="点击率："
                          {...formItemLayout}>
                      <NumberPicker {...init('ctrlow', {initValue: 0})} inputWidth={100} step={100}/>
                      <span style={{margin: '0 16px'}}>一</span>
                      <NumberPicker {...init('ctrtop', {initValue: 0})} inputWidth={100} step={100}/>
                    </FormItem>
                    <FormItem label="花费："
                          {...formItemLayout}>
                      <NumberPicker {...init('costlow', {initValue: 0})} inputWidth={100} step={100}/>
                      <span style={{margin: '0 16px'}}>一</span>
                      <NumberPicker {...init('costtop', {initValue: 0})} inputWidth={100} step={100}/>
                    </FormItem>
                    <FormItem label="eCPC："
                          {...formItemLayout}>
                      <NumberPicker {...init('eCPClow', {initValue: 0})} inputWidth={100} step={100}/>
                      <span style={{margin: '0 16px'}}>一</span>
                      <NumberPicker {...init('eCPCtop', {initValue: 0})} inputWidth={100} step={100}/>
                    </FormItem>
                    <FormItem label="eCPM："
                          {...formItemLayout}>
                      <NumberPicker {...init('eCPMlow', {initValue: 0})} inputWidth={100} step={100}/>
                      <span style={{margin: '0 16px'}}>一</span>
                      <NumberPicker {...init('eCPMtop', {initValue: 0})} inputWidth={100} step={100}/>
                    </FormItem>
                  </FormItem>
                  <FormItem>
                    <div style={{marginBottom: '10px'}}>优化条件</div>
                    <FormItem label="展现量："
                          {...formItemLayout}>
                      <NumberPicker {...init('yh_pvlow', {initValue: 0})} inputWidth={100} step={100}/>
                      <span style={{margin: '0 16px'}}>一</span>
                      <NumberPicker {...init('yh_pvtop', {initValue: 0})} inputWidth={100} step={100}/>
                    </FormItem>
                    <FormItem label="点击量："
                          {...formItemLayout}>
                      <NumberPicker {...init('yh_clicklow', {initValue: 0})} inputWidth={100} step={100}/>
                      <span style={{margin: '0 16px'}}>一</span>
                      <NumberPicker {...init('yh_clicktop', {initValue: 0})} inputWidth={100} step={100}/>
                    </FormItem>
                    <FormItem label="点击率："
                          {...formItemLayout}>
                      <NumberPicker {...init('yh_ctrlow', {initValue: 0})} inputWidth={100} step={100}/>
                      <span style={{margin: '0 16px'}}>一</span>
                      <NumberPicker {...init('yh_ctrtop', {initValue: 0})} inputWidth={100} step={100}/>
                    </FormItem>
                    <FormItem label="花费："
                          {...formItemLayout}>
                      <NumberPicker {...init('yh_costlow', {initValue: 0})} inputWidth={100} step={100}/>
                      <span style={{margin: '0 16px'}}>一</span>
                      <NumberPicker {...init('yh_costtop', {initValue: 0})} inputWidth={100} step={100}/>
                    </FormItem>
                    <FormItem label="eCPC："
                          {...formItemLayout}>
                      <NumberPicker {...init('yh_eCPClow', {initValue: 0})} inputWidth={100} step={100}/>
                      <span style={{margin: '0 16px'}}>一</span>
                      <NumberPicker {...init('yh_eCPCtop', {initValue: 0})} inputWidth={100} step={100}/>
                    </FormItem>
                    <FormItem label="eCPM："
                          {...formItemLayout}>
                      <NumberPicker {...init('yh_eCPMlow', {initValue: 0})} inputWidth={100} step={100}/>
                      <span style={{margin: '0 16px'}}>一</span>
                      <NumberPicker {...init('yh_eCPMtop', {initValue: 0})} inputWidth={100} step={100}/>
                    </FormItem>
                  </FormItem>
                  </Row>
              </FormItem>
              
              <FormItem
                    wrapperCol={{ span: 12, offset: 12 }}>
										<div style={{float: 'right'}}>
											 <Link to={createCampaign}><Button type="normal" style={{marginRight: '15px'}}>上一步</Button></Link>
											 &nbsp;&nbsp;&nbsp;
											 <Button type="primary" onClick={this.handleSubmit.bind(this)}>下一步</Button>
						 				</div>
					  </FormItem>
           </Form>
         </div>
       </div>
    )
  }
}

export default SetsolutionView
>>>>>>> a43b3823b062de6e7da27e692def8042fa1e75a2
