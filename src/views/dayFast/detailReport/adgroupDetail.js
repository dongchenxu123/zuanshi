import React, { PropTypes } from 'react'
import axios from 'axios'
import {getAdgroupRptRt, getAdgroupRptDay} from '../../../help/url'
import {dayTestHome} from '../../../help/linkUrl';
import DatePicker, { MonthPicker, YearPicker, RangePicker } from 'qnui/lib/date-picker';
import Select, {Option} from 'qnui/lib/select';
import moment from 'moment';
import CampaginDataView from '../campaginData';
import CampaginChartView from '../campaginChart';
import AdgroupTableView from './adGroupTableView';
import { Link } from 'react-router-dom';
import Icon from 'qnui/lib/icon';
class AdgroupDetailView extends React.Component {
   constructor () {
        super()
        this.state={
            fastTime: 'today', //今天和昨天
            time: [], //段时间
            effect: '7',
            campaginData: [],
            rptData: [],
            firstlogDate: '',
            nextlogDate: '',
            show: true
        }
    }
  componentWillMount () {
    var start_time = this.props.match.params.start_time
    var end_time = this.props.match.params.end_time
    var effect = this.props.match.params.effect
    if (start_time == end_time ) {
      this.loadAdgroupRptRt(start_time)
      this.setState({
        time: [start_time, start_time]
     })
    }
    else {
      this.loadAdgroupRptDay(start_time, end_time, effect)
      this.setState({
        time: [start_time, end_time]
     })
    }
  }
  changeFastTime (value) {
    this.setState({
            fastTime: value
        })
    var yesterday = moment().subtract(1, 'days').format();
    if(value == 'today') {
      var day = moment().format()
      this.loadAdgroupRptRt(day)
      this.setState({
          time: [day,day]
      
      })
    }
    if(value == 'yesterday') {
      this.loadAdgroupRptRt(yesterday)
      this.setState({
          time: [yesterday, yesterday]
       
      })
    }
    if(value == '7') {
      var start_time = moment().subtract(7, 'days').format();
      var effect = this.state.effect
      this.loadAdgroupRptDay(start_time, yesterday, effect)
      this.setState({
          time: [start_time, yesterday]
         
      })
    }
    if(value == '15') {
      var start_time = moment().subtract(15, 'days').format();
      var effect = this.state.effect
      this.loadAdgroupRptDay(start_time, yesterday, effect)
      this.setState({
          time: [start_time, yesterday]
         
      })
    }
    if(value == '30') {
      var start_time = moment().subtract(30, 'days').format();
      var effect = this.state.effect
      this.loadAdgroupRptDay(start_time, yesterday, effect)
      this.setState({
          time: [start_time, yesterday]
         
      })
    }
    if(value == 'month') {
      var start_time = moment().startOf('month').format();
      var end_time = moment().format();
      var effect = this.state.effect
      this.loadAdgroupRptDay(start_time, end_time, effect)
      this.setState({
          time: [start_time, end_time]
        
      })
    }
    if(value == 'lastWeek') {
      var start_time = moment().subtract(7, 'days').format();
      var effect = this.state.effect
      this.loadAdgroupRptDay(start_time, yesterday, effect)
      this.setState({
          time: [start_time, yesterday]
         
      })
    }
    if(value == 'lastMonth') {
      var start_time = moment().subtract(1, 'month').startOf('month').format();
      var end_time = moment().subtract(1, 'month').endOf('month').format();
      var effect = this.state.effect
      this.loadAdgroupRptDay(start_time, end_time, effect)
      this.setState({
          time: [start_time, end_time]
        
      })
    }
  }
  changeTime (value) {
    var start_time = moment(value[0]).format();
    var end_time = moment(value[1]).format();
    this.loadAdgroupRptDay(start_time, end_time)
    this.setState({
        fastTime: '请选择快捷日期',
        time: value
       
    })
  }
  loadDataNum (response) {
        var Charge = 0
        var Click = 0
        var Ctr = 0
        var Ecpc = 0
        var Ecpm = 0
        var Pv = 0
        var rptTotal = []
        var rpt = response.data.rpt
        var AlipayAmt = 0
        var AlipayNum = 0
        var CartNum = 0
        var FavItem = 0
        var FavShop = 0
        var Roi = 0
        if(response.data.err || response.data.length <=0 || rpt.length <=0) {
            rptTotal = []
        }
        if(rpt && rpt.length > 0) {
            // firstlogDate = rpt[rpt.length-1].LogDate
            for(var i=0; i<rpt.length; i++) {
               if (rpt[i].Charge) {
                  Charge += rpt[i].Charge
                }
                if (rpt[i].Click) {
                  Click += rpt[i].Click
                }
                if (rpt[i].Pv) {
                  Pv += rpt[i].Pv
                }
                if(rpt[i].AlipayAmt) {
                   AlipayAmt +=  rpt[i].AlipayAmt
                }
                if (rpt[i].AlipayNum) {
                   AlipayNum += rpt[i].AlipayNum
                }
                if (rpt[i].CartNum) {
                    CartNum += rpt[i].CartNum
                }
                if (rpt[i].FavItem) {
                    FavItem += rpt[i].FavItem
                }
                if (rpt[i].FavShop) {
                    FavShop += rpt[i].FavShop
                }
             }
            if(Pv > 0) {
                Ctr = Click/Pv
                Ecpm = Charge*1000/Pv
            }
            if (Click > 0) {
               Ecpc =  Charge/Click
            }
            if (Charge > 0) {
                Roi = AlipayAmt/Charge
            }
            var obj ={
                Charge: Charge,
                Click: Click,
                Ctr: Ctr,
                Ecpc: Ecpc,
                Ecpm: Ecpm,
                Pv: Pv,
                AlipayAmt: AlipayAmt,
                AlipayNum: AlipayNum,
                CartNum: CartNum,
                FavItem: FavItem,
                FavShop: FavShop,
                Roi: Roi
            }
            rptTotal.push(obj)
        }
        var rptTotalData = rpt
        if (rptTotalData && rptTotalData.length > 0) {
           for(var j=0; j<rptTotalData.length; j++) {
               if (rptTotalData[j].Charge) {
                   rptTotalData[j].Charge = (rptTotalData[j].Charge).toFixed(2)
               }
               if (rptTotalData[j].Pv > 0) {
                   rptTotalData[j].Ctr = (rptTotalData[j].Click/rptTotalData[j].Pv).toFixed(2)
               }
               if (rptTotalData[j].Ecpc && rptTotalData[j].Click > 0) {
                   rptTotalData[j].Ecpc = (rptTotalData[j].Charge/rptTotalData[j].Click).toFixed(2)
               }
               if (rptTotalData[j].Ecpm && rptTotalData[j].Pv > 0) {
                   rptTotalData[j].Ecpm = (rptTotalData[j].Charge*1000/rptTotalData[j].Pv).toFixed(2)
               }
               if (rptTotalData[j].Roi && rptTotalData[j].Charge > 0 && rptTotalData[j].AlipayAmt) {
                   rptTotalData[j].Roi = (rptTotalData[j].AlipayAmt/rptTotalData[j].Charge).toFixed(2)
               }
               if (rptTotalData[j].Cvr && rptTotalData[j].Click > 0 && rptTotalData[j].AlipayNum) {
                   rptTotalData[j].Cvr = (rptTotalData[j].AlipayNum/rptTotalData[j].Click).toFixed(2)
               }
           } 
        }
        var obj={
            campaginData: rptTotal,
            rptData: rptTotalData
        }
        return obj 

    }
  loadAdgroupRptRt (day) {
    var campagin_id = this.props.match.params.campaign_id
    var adgroup_id = this.props.match.params.adgroup_id
    var self = this
    axios.post(getAdgroupRptRt, {
        campaign_id: campagin_id*1,
        adgroup_id: adgroup_id*1,
        log_date: day
    })
    .then(function (response) {
        var rptData = self.loadDataNum(response)
        self.setState({
            campaginData: rptData.campaginData,
            rptData: rptData.rptData,
            show: false
        })
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  loadAdgroupRptDay (start_time, end_time, effect) {
    var campagin_id = this.props.match.params.campaign_id
    var adgroup_id = this.props.match.params.adgroup_id
    var self = this
    axios.post(getAdgroupRptDay, {
        campaign_id: campagin_id*1,
        adgroup_id: adgroup_id*1,
        start_time: start_time,
        end_time: end_time,
        effect: effect
    })
    .then(function (response) {
        var rptData = self.loadDataNum(response)
        self.setState({
            campaginData: rptData.campaginData,
            rptData: rptData.rptData,
            nextlogDate: end_time,
            firstlogDate: start_time,
            show: false
        })
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  changeEffect (value) {
     this.setState({
         effect: value
     })
    }
  render () {
    var day = moment().format()
    var range = [day, day]
    var name = this.props.match.params.name
    return (
      <div className='panel panel-default' style={{margin: '10px'}}>
        <div className="panel-heading" style={{fontSize: '14px'}}>
           <Link to={dayTestHome} style={{color: '#4d7fff'}}>所有全店推广计划</Link>&nbsp;&nbsp;
            <Icon type="arrow-right" size='xs'/>&nbsp;&nbsp;
            <span>计划:&nbsp;&nbsp;{name}</span>
        </div>
        <div className="panel-body" style={{paddingBottom: '50px'}}>
            <div style={{overflow: 'hidden', marginBottom: '20px'}}>
                  <div style={{float: 'left'}}>
                      <span style={{fontSize: '20px'}}>推广单元：&nbsp;&nbsp;{name}</span>
                  </div>
                  <div style={{float: 'right'}}>
                      <span style={{paddingLeft: '15px'}}>快捷日期：</span>
                      <Select style={{position: 'relative', top: '8px'}} onChange={this.changeFastTime.bind(this)} value={this.state.fastTime}>
                          <Option value="today">今天</Option>
                          <Option value="yesterday">昨天</Option>
                          <Option value="7">最近7天</Option>
                          <Option value="15">最近15天</Option>
                          <Option value="30">最近30天</Option>
                          <Option value="lastWeek">上周</Option>
                          <Option value="month">本月</Option>
                          <Option value="lastMonth">上月</Option>
                      </Select>
                      <span style={{paddingLeft: '15px'}}>选择日期：</span>
                      <RangePicker value={this.state.time.length<=0 ? range : this.state.time} onChange={this.changeTime.bind(this)}/>
                      <span style={{paddingLeft: '15px'}}>效果转化周期：</span>
                      <Select style={{position: 'relative', top: '8px'}} onChange={this.changeEffect.bind(this)} value={this.state.effect}>
                          <Option value="3">3天</Option>
                          <Option value="7">7天</Option>
                          <Option value="15">15天</Option>
                      </Select>
                  </div>
              </div>
              <CampaginDataView style={{clear: 'both'}} compaginRpt={this.state.campaginData}
                                />
              <CampaginChartView dataSource={this.state.rptData} firstlogDate={this.state.firstlogDate} nextlogDate={this.state.nextlogDate}/>
              <AdgroupTableView dataSource={this.state.rptData} firstlogDate={this.state.firstlogDate} nextlogDate={this.state.nextlogDate} show={this.state.show}/>
        </div>
      </div>
    )
  }
}
export default AdgroupDetailView
