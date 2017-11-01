import React from 'react';
import {getGeneralCampaigns, getBestcombinationSetup} from '../../help/url';
import axios from 'axios';
import Table from 'qnui/lib/table';
import Loading from 'qnui/lib/loading';
import Pagination from 'qnui/lib/pagination';
import moment from 'moment';
import Button from 'qnui/lib/button';
const history = createHistory()
import createHistory from 'history/createHashHistory';
import Feedback from 'qnui/lib/feedback';
import {dayTestHome} from '../../help/linkUrl';
const Toast = Feedback.toast;
class GeneralCampaginList extends React.Component {
    constructor () {
    super()
    this.state={
      generalCampaignData: [],
      show: true,
      current: '1',
      total: '0',
      rowSelection: {
        onChange: this.onChangeTable.bind(this),
        selectedRowKeys: [],
        mode: 'single'
      }
     }
  }
  isMount=false
  componentWillMount () {
    this.loadCampaigns(1)
  }
  onChangeTable(ids, records){
    let {rowSelection} = this.state;
    rowSelection.selectedRowKeys = ids;
  	this.setState({
			rowSelection
		})
  }
  loadCampaigns (page) {
    var self = this
    axios.post(getGeneralCampaigns,{
      status_list: '0,1',
      page_size: 10,
      page_num: page
    })
    .then(function (response) {
      if(response.data.err || response.data.campaigns.length <=0) {
        self.setState({
          show: false
        })
        return
      }
      var generalCampaignData = response.data.campaigns
      if(self.isMount) {
        self.setState({
          generalCampaignData: generalCampaignData,
          show: false,
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
  renderTable () {
    var generalCampaignData = this.state.generalCampaignData
    if(generalCampaignData && generalCampaignData.length > 0) {
      return (
        <Table dataSource={generalCampaignData} rowSelection={this.state.rowSelection} primaryKey='Id'>
            <Table.Column title="计划信息" dataIndex="Name" />
            <Table.Column title="投放时间" cell={this.renderTime.bind(this)}/>
            <Table.Column cell={this.renderDaybudget.bind(this)} title="日限额"/>
        </Table>
      )
    } else {
      return (
        <div style={{margin: '50px auto', textAlign: 'center'}}>暂无数据</div>
      )
    }
 }
 onchangePage (page) {
   this.loadCampaigns(page)
 }
 renderPagination () {
    var pageSize = 10;
    var current = this.state.current;
    var total = this.state.total;
    if(this.state.generalCampaignData === null) {
        return
    }
    else if(total > 10) {
        return (<Pagination current={this.state.current} onChange={this.onchangePage.bind(this)}
                                    defaultCurrent={1} total={this.state.total} pageSize={pageSize}/>)
    }
   }
   setClick () {
       let {rowSelection} = this.state;
       let idArr = rowSelection.selectedRowKeys
       var self = this
       if(idArr.length <=0) {
           Toast.error('请选择计划！')
       }
       var obj = JSON.parse(localStorage.getItem('combinationDataObj'))
       var settings = obj.combinationData
       idArr.join('')
       axios.post(getBestcombinationSetup,{
             settings: settings,
             campaign: {Id: idArr}
            })
            .then(function (response) {
             var settings = response.data.settings
             if(response.data.err) {
                   Toast.error(response.data.err)
                   return
               }
               if(settings != null) {
                   Toast.success('添加成功！')
                   history.push(dayTestHome)
                  if(obj) {
                       localStorage.removeItem('combinationDataObj')
                   }
               }
            })
            .catch(function (error) {
                console.log(error);
            });
   }
    render () {
        var show = this.state.show
        return (
            <div className='panel panel-default'>
               <div className="panel-heading">
                    常规计划列表
               </div>
               <div className="panel-body" style={{paddingBottom: '50px'}}>
                  {
                    show
                    ? <div style={{width: '200px', margin: '50px auto'}}><Loading color="#c7c7c7" /></div>
                    : this.renderTable()
                    }
                    <div style={{float: 'right', marginTop: '15px'}}>
                    {
                        this.renderPagination()
                    }
                    </div>
               </div>
               <div className="panel-footer" style={{overflow: 'hidden', backgroundColor: '#fff'}}>
                <div style={{float: 'right'}}>
                    <Button type="normal" onClick={this.setClick.bind(this)}>确认添加计划</Button>
                </div>
               </div>
            </div>
        )
    }
}
export default GeneralCampaginList