import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'qnui/lib/button';
import {getGeneralCampaigns, getCampaignStatus} from '../../help/url';
import {createCampaign, infoFormUrl} from '../../help/linkUrl';
import createHistory from 'history/createHashHistory';
import Table from 'qnui/lib/table';
import moment from 'moment';
import Loading from 'qnui/lib/loading';
import CampaignStatusView from './campaignStatus';
import Select, {Option} from 'qnui/lib/select';
import Feedback from 'qnui/lib/feedback';
import Pagination from 'qnui/lib/pagination';
const history = createHistory()
const Status = {0:"暂停", 1:"投放中", 9:"投放结束"}
const StatusColor = {0:"#f56a00", 1:"green", 9: "#2db7f5"}
const metricCircle = {
    width: 8,
    height: 8,
    borderRadius: '50%',
    display: "inline-block"
}
const Toast = Feedback.toast;
class DayTesthomeView extends React.Component {
  constructor () {
    super()
    this.state={
      generalCampaignData: [],
      show: false,
      visibleStatus: false,
      record: {},
      status: '0',
      current: '1',
      total: '0'
     }
  }
  isMount=false
  componentWillMount () {
    this.loadCampaigns('', 1)
  }
  loadCampaigns (value, page) {
    var self = this
    var selectStatus = value ? value : '0,1'
    axios.post(getGeneralCampaigns,{
      status_list: selectStatus,
      page_size: 2,
      page_num: page
    })
    .then(function (response) {
      if(response.data.err || response.data.campaigns.length <=0) {
        self.setState({
          show: false
        })
      }
      var generalCampaignData = response.data.campaigns
      if(self.isMount) {
        self.setState({
          generalCampaignData: generalCampaignData,
          show: true,
          current: page,
          total: response.data.total
        })
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  componentDidMount () {
	 this.isMount=true
	}
  componentWillUnmount() {
    this.isMount=false
  }
  addCampagin () {
    history.push(createCampaign)
  }
  renderStatus (value, index, record) {
    let style = {backgroundColor: StatusColor[record.OnlineStatus],
      width: '30%',
      color: '#fff',
      borderRadius: '4px',
      textAlign: 'center',
      padding: '5px 0'}
    let status = Status[record.OnlineStatus];
    return (
      <div style={style}>
          {status}
      </div>
    )
  }
  renderTime (value, index, record) {
   var StartTime =  moment(record.StartTime).format('YYYY-MM-DD')
	 var EndTime =  moment(record.EndTime).format('YYYY-MM-DD')
   return (
     <div>
        <p style={{marginBottom: '10px'}}>起：<span>{StartTime}</span></p>
        <p>止：<span>{EndTime}</span></p>
     </div>
   )
  }
  renderDaybudget (value, index, record) {
    return (
      <span>￥ {record.DayBudget/100}</span>
    )
  }
  onOpen (record) {
        this.setState({
            visibleStatus: true,
            record: record
        });
  };
  onClose () {
        this.setState({
            visibleStatus: false
        });
    }
  onChangeStatus (value) {
    this.setState({
      status: value
    })
  }
  onSubmitStatus () {
    var record = this.state.record
    var id = record != null ? record.Id : 0
    var self = this
    axios.post(getCampaignStatus, {
      status: this.state.status,
      campaign_ids: id
    })
    .then(function (response) {
      if(response.data.msg == 'ok') {
        self.loadCampaigns('', 1)
        Toast.success('设置成功！')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    this.setState({
        visibleStatus: false
    });
  }
  editinfo (record) {
    history.push('/dayTest/infoForm/'+record.Id)
  }
  renderWork (value, index, record) {
    return (
      <div>
        {
          record.OnlineStatus == 9
          ? null
          : <div>
               <Button onClick={this.onOpen.bind(this, record)} type="secondary" style={{marginRight: '10px'}}>修改状态</Button>
               <Button type="secondary" onClick={this.editinfo.bind(this, record)}>修改计划信息</Button>
            </div>
        }
      </div>
    )
  }
  renderTable () {
    var generalCampaignData = this.state.generalCampaignData
    if(generalCampaignData && generalCampaignData.length > 0) {
      return (
        <Table dataSource={generalCampaignData}>
            <Table.Column title="计划状态" cell={this.renderStatus.bind(this)}/>
            <Table.Column title="计划信息" dataIndex="Name" />
            <Table.Column title="投放时间" cell={this.renderTime.bind(this)}/>
            <Table.Column cell={this.renderDaybudget.bind(this)} title="日限额"/>
            <Table.Column cell={this.renderWork.bind(this)} title="操作"/>
        </Table>
      )
    } else {
      return (
        <div style={{margin: '50px auto', textAlign: 'center'}}>暂无数据</div>
      )
    }
 }
 onSelect (value) {
   this.loadCampaigns(value, 1)
 }
 onchangePage (page) {
   this.loadCampaigns('', page)
 }
 renderPagination () {
		var pageSize = 2;
		var current = this.state.current;
		var total = this.state.total;
		if(this.state.generalCampaignData === null) {
			return
		} else if(current == 1 && this.state.generalCampaignData.length < pageSize && this.state.generalCampaignData.length <= total){ return null}
		else if(this.state.generalCampaignData.length > 0) {
			return (<Pagination current={this.state.current} onChange={this.onchangePage.bind(this)}
										defaultCurrent={1} total={this.state.total} pageSize={pageSize}/>)
		}
	}
  render () {
    var show = this.state.show
    return (
      <div className='panel panel-default' style={{margin: '10px'}}>
         <div className="panel-heading" style={{overflow: 'hidden'}}>
            <div style={{float: 'left'}}>
              <span>全部计划</span>
              <Button onClick={this.addCampagin.bind(this)} type="primary" style={{marginLeft: '16px'}}>新建计划</Button>
            </div>
            <Select placeholder='请选择计划状态' onChange={this.onSelect.bind(this)} style={{float: 'right'}}>
                <Option value="0,1,9">全部计划</Option>
                <Option value="0">暂停的计划</Option>
                <Option value="1">投放中的计划</Option>
                <Option value="9">结束的计划</Option>
            </Select>
         </div>
         <div className="panel-body" style={{paddingBottom: '50px'}}>
            {
              show
              ? this.renderTable()
              : <div style={{width: '200px', margin: '50px auto'}}><Loading color="#c7c7c7" /></div>
            }
            <div style={{float: 'right', marginTop: '15px'}}>
              {
                this.renderPagination()
              }
            </div>
         </div>
         <CampaignStatusView onClose={this.onClose.bind(this)}
                             visibleStatus={this.state.visibleStatus}
                             status={this.state.status}
                             record={this.state.record}
                             onChangeStatus={this.onChangeStatus.bind(this)}
                             onSubmitStatus={this.onSubmitStatus.bind(this)}
                             OnlineStatus={this.state.OnlineStatus}/>
      </div>
    )
  }
}

export default DayTesthomeView
