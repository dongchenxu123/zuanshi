import React from 'react';
import Table from 'qnui/lib/table';
import Dialog from 'qnui/lib/dialog';
import { Group as RadioGroup } from 'qnui/lib/radio';
import {anomalyzesetstatus} from '../../help/url';
import axios from 'axios';
import UpdateFormView from './updateForm';
import { Link } from 'react-router-dom';
import {dataWarnDetail} from '../../help/linkUrl';
const metricStatus = {0:"在用", 1:"暂停", 3:"测试"}
const metricStatusColor = {0:"#d73435", 1:"#802800", 2:"#919191", 3: "#b5b5b5", 4: "#991b00"}
const metricCircle = {
    width: 8,
    height: 8,
    borderRadius: '50%',
    display: "inline-block"
}
class MonitorListTable extends React.Component {
  constructor () {
    super ();
    this.state={
        statusVisible: false,
        status: '',
        record: {},
        editVisible: false,
        editRecord: {}
      }
    }
  renderStatus (value, index, record) {
    let style = {...metricCircle, backgroundColor: metricStatusColor[record.status]}
    let status = metricStatus[record.status];
    if (!status) {
        status = "未知"
    }
    return (
        <div>
           <span style={style}> </span> {status}
        </div>
    )
  }
  setStatus (record) {
    this.setState({
          statusVisible: true,
          record: record
      })
  }
  onSure () {
    var record = this.state.record
    var id = record.id
    var status = this.state.status
    var self = this
    axios.post(anomalyzesetstatus, {
      metric_id: id,
      status: status
    })
    .then(function (response) {
      self.props.loadwarnlistData()
    })
    .catch(function (error) {
      console.log(error);
    });
    this.setState({
        statusVisible: false
    })
  }
  onClose () {
    this.setState({
        statusVisible: false
    })
  }
  oneditForm (record) {
    this.setState({
      editVisible: true,
      editRecord: record
    })
  }
  oneditClose () {
    this.setState({
      editVisible: false
    })
  }
  renderwork (value, index, record) {
    return (
      <div style={{cursor: 'pointer'}}>
        <span style={{color: '#3089dc'}} onClick={this.oneditForm.bind(this, record)}>编辑</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span style={{color: '#3089dc'}} onClick={this.setStatus.bind(this, record)}>设置状态</span>&nbsp;&nbsp;|&nbsp;&nbsp;<Link to={dataWarnDetail+record.id}><span style={{color: '#3089dc'}}>查看详情</span></Link>
      </div>
    )
  }
  changeRadio (values) {
    this.setState({
      status: values
    })
  }
  oneditSure () {

  }
  render () {
    var record = this.state.record
    const list = [
      {
        value: '0',
        label: '在用'
      },{
        value: '1',
        label: '暂停'
      }
    ]
    return (
      <div>
      {
        this.props.metricsData && this.props.metricsData.length > 0
        ? <Table dataSource={this.props.metricsData}>
              <Table.Column title="监控指标" dataIndex="metric_name"/>
              <Table.Column title="监控间隔(秒)" dataIndex="check_interval"/>
              <Table.Column title="告警间隔(分钟)" dataIndex="alert_interval"/>
              <Table.Column title="敏感度" dataIndex="sensitivity"/>
              <Table.Column title="异常阀值" dataIndex="threshold"/>
              <Table.Column title="状态" dataIndex="status" cell={this.renderStatus.bind(this)}/>
              <Table.Column title="创建时间" dataIndex="updated_at"/>
              <Table.Column title="操作" cell={this.renderwork.bind(this)} width={300}/>
          </Table>
      : <div style={{textAlign: 'center'}}>暂无数据</div>
      }
      <Dialog visible = {this.state.statusVisible}
            onOk = {this.onSure.bind(this)}
            onCancel = {this.onClose.bind(this)}
            onClose = {this.onClose.bind(this)} title = "设置状态" style={{width: 300}}>
            <RadioGroup dataSource={list} defaultValue={record.status} onChange={this.changeRadio.bind(this)}/>
      </Dialog>
      <UpdateFormView editVisible={this.state.editVisible}
                      editRecord={this.state.editRecord}
                      oneditClose={this.oneditClose.bind(this)}
                      oneditSure={this.oneditSure.bind(this)}
                      loadwarnlistData={this.props.loadwarnlistData}/>
    </div>
    )
  }
}

export default MonitorListTable
