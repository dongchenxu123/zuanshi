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
