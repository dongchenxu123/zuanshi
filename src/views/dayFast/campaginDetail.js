import React from 'react';
import { Link } from 'react-router-dom';
import {dayTestHome} from '../../help/linkUrl';
import Icon from 'qnui/lib/icon';
import DatePicker, { MonthPicker, YearPicker, RangePicker } from 'qnui/lib/date-picker';
import Select, {Option} from 'qnui/lib/select';
import CampaginDataView from './campaginData';
import axios from 'axios';
import { getcampaignRptRt, getcampaignRptDay, getadgroupRptDay, getadgroupRptRt, getGeneralAdgroups} from '../../help/url';
import moment from 'moment';
import AdgroupDataView from './adgroupData';
class CampaginDetailView extends React.Component {
    constructor () {
        super()
        this.state={
            fastTime: 'today',
            time: [],
            effect: '7',
            campaginData: [],
            adgroupData: [],
            show: true,
            rpt: []
        }
    }
    changeEffect (value) {
     this.setState({
         effect: value
     })
    }
    componentWillMount () {
        console.log(1)
        var day = moment().format()
        var self = this
        var id = this.props.match.params.id
        var name = this.props.match.params.name
        var status = this.props.match.params.status
        this.loadGetcampaignRptRt(day)
        this.loadAdgroupData().then(function(data) {
          return self.loadGetAdgroupRptRt(day, data)
        })
        
        
    }
    
    changeFastTime (value) {
        this.setState({
            fastTime: value
        })
        var yesterday = moment().subtract(1, 'days').format();
        if(value == 'today') {
          var day = moment().format() 
          this.loadGetcampaignRptRt(day)
          this.loadGetAdgroupRptRt(day, this.state.adgroupData)
          this.setState({
              time: [day,day]
          })
       }
        if(value == 'yesterday') {
          this.loadGetcampaignRptRt(yesterday)
          this.loadGetAdgroupRptRt(yesterday, this.state.adgroupData)
          this.setState({
              time: [yesterday, yesterday]
          })
        }
        if(value == '7') {
          var start_time = moment().subtract(7, 'days').format();
          this.loadGetcampaignRptDay(start_time, yesterday)
          this.loadGetAdgroupRptDay(start_time, yesterday)
          this.setState({
              time: [start_time, yesterday]
          })
        }
        if(value == '15') {
          var start_time = moment().subtract(15, 'days').format();
          this.loadGetcampaignRptDay(start_time, yesterday)
          this.loadGetAdgroupRptDay(start_time, yesterday)
          this.setState({
              time: [start_time, yesterday]
          })
        }
        if(value == '30') {
          var start_time = moment().subtract(30, 'days').format();
          this.loadGetcampaignRptDay(start_time, yesterday)
          this.loadGetAdgroupRptDay(start_time, yesterday)
          this.setState({
              time: [start_time, yesterday]
          })
        }
        if(value == 'month') {
          var start_time = moment().startOf('month').format();
          var end_time = moment().format();
          this.loadGetcampaignRptDay(start_time, end_time)
          this.loadGetAdgroupRptDay(start_time, end_time)
          this.setState({
              time: [start_time, end_time]
          })
        }
        if(value == 'lastWeek') {
          var start_time = moment().subtract(7, 'days').format();
          this.loadGetcampaignRptDay(start_time, yesterday)
          this.loadGetAdgroupRptDay(start_time, yesterday)
          this.setState({
              time: [start_time, yesterday]
          })
        }
        if(value == 'lastMonth') {
          var start_time = moment().subtract(1, 'month').startOf('month').format();
          var end_time = moment().subtract(1, 'month').endOf('month').format();
          this.loadGetcampaignRptDay(start_time, end_time)
          this.loadGetAdgroupRptDay(start_time, end_time)
          this.setState({
              time: [start_time, end_time]
          })
        }
    }
    changeTime (value) {
      var start_time = moment(value[0]).format();
      var end_time = moment(value[1]).format();
      this.loadGetcampaignRptDay(start_time, end_time)
      this.loadGetAdgroupRptDay(start_time, end_time)
      this.setState({
          fastTime: '请选择快捷日期',
          time: value
      })
    }
    loadGetcampaignRptRt (day) {
        var id = this.props.match.params.id
        var self = this
        axios.post(getcampaignRptRt, {
            campaign_id: id,
            log_date: day
        })
        .then(function (response) {
            self.setState({
                campaginData: response.data
            })
        })
        .catch(function (error) {
            console.log(error);
        });
       }
    loadAdgroupData () {
        var id = this.props.match.params.id
        var self = this
        var day = moment().format()
         console.log(2)
        return axios.post(getGeneralAdgroups, {
            campaign_id: id*1,
            status: 1
        })
        .then(function (response) {
            var adgroups = response.data.adgroups.Adgroups
            if(response.data.err || adgroups == null) {
                self.setState({
                    show: false
                })
           }
           for(var i=0; i<adgroups.length; i++) {
                adgroups[i].zuanshi_key= adgroups[i].Adgroup.Id
                var Adzones = adgroups[i].Adzones
                var Crowds = adgroups[i].Crowds
                for(var j=0; j<Adzones.length; j++) {
                    for(var m=0; m<Crowds.length; m++) {
                        if(Adzones[j].Id == Crowds[m].matrix_price[0].AdzoneId) {
                            Crowds[m] = Object.assign({}, Crowds[m], {adzonedName: Adzones[j].Name})
                        }
                    }
                }
            }
            self.setState({
                adgroupData: adgroups,
                show: false
            })
            return adgroups
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    loadGetcampaignRptDay (start_time, end_time) {
        var id = this.props.match.params.id
        var self = this
        var effect = this.state.effect
        axios.post(getcampaignRptDay, {
            campaign_id: id*1,
            start_time: start_time,
            end_time: end_time,
            effect: effect
        })
        .then(function (response) {
            self.setState({
                campaginData: response.data
            })
        })
        .catch(function (error) {
            console.log(error);
        });
       }
    loadGetAdgroupRptDay (start_time, end_time) {
        var id = this.props.match.params.id
        var self = this
        var effect = this.state.effect
        var adgroupData = this.state.adgroupData
        if(adgroupData.length > 0) {
            for(var i=0; i<adgroupData.length; i++) {
              axios.post(getadgroupRptDay, {
                campaign_id: id*1,
                start_time: start_time,
                end_time: end_time,
                effect: effect,
                adgroup_id: adgroupData[i].Adgroup.Id
            })
            .then(function (response) {
              console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            });
         }
        }
    }
    loadGetAdgroupRptRt (day, data) {
        var id = this.props.match.params.id
        var self = this
        var adgroupData = data
        console.log(adgroupData)
       for(var i=0; i<adgroupData.length; i++) {
            axios.post(getadgroupRptRt, {
            campaign_id: id,
            log_date: day,
            adgroup_id: adgroupData[i].Adgroup.Id
            })
            .then(function (response) {
              var rpt = response.data.rpt
            //   if(rpt.length > 0) {
            //       for(var j=0; j<rpt.length; j++) {
            //           console.log(adgroupData[i].Adgroup.CampaignId)
                    //   if(rpt[j].CampaignId == adgroupData[i].Adgroup.CampaignId) {
                    //       console.log(1)
                    //       adgroupData[i].Adgroup = Object.assign({}, adgroupData[i].Adgroup, rpt[j])
                    //   }
                //   }
            //   } 
            //   else {
            //       adgroupData[i].Adgroup = Object.assign({}, adgroupData[i].Adgroup, rpt)
            //   }
            //   self.setState({
            //       adgroupData: adgroupData
            //   })
            //   console.log(adgroupData)
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
    render () {
        var campaginName = this.props.match.params.name
        var DayBudget = this.props.match.params.cost
        var day = moment().format()
        var range = [day, day]
        return (
            <div className='panel panel-default' style={{margin: '10px'}}>
                <div className="panel-heading" style={{fontSize: '14px'}}>
                    <Link to={dayTestHome}>所有全店推广计划</Link>&nbsp;&nbsp;
                    <Icon type="arrow-right" size='xs'/>&nbsp;&nbsp;
                    <span>计划:&nbsp;&nbsp;{campaginName}</span>
                </div>
                <div className="panel-body" style={{paddingBottom: '50px'}}>
                    <div style={{overflow: 'hidden', marginBottom: '20px'}}>
                        <div style={{float: 'left'}}>
                            <span style={{fontSize: '20px'}}>计划：&nbsp;&nbsp;{campaginName}</span>
                            <span style={{color: '#999', paddingLeft: '15px'}}>今日预算</span>&nbsp;&nbsp;<strong style={{fontSize: '20px'}}>{DayBudget/100}</strong>
                        </div>
                        <div style={{float: 'right'}}>
                            <span style={{paddingLeft: '15px'}}>选择日期：</span>
                            <RangePicker value={this.state.time.length<=0 ? range : this.state.time} onChange={this.changeTime.bind(this)}/>
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
                            <span style={{paddingLeft: '15px'}}>效果转化周期：</span>
                            <Select style={{position: 'relative', top: '8px'}} onChange={this.changeEffect.bind(this)} value={this.state.effect}>
                                <Option value="3">3天</Option>
                                <Option value="7">7天</Option>
                                <Option value="15">15天</Option>
                            </Select>
                        </div>
                    </div>
                    <CampaginDataView style={{clear: 'both'}} campaginData={this.state.campaginData}/>
                    <AdgroupDataView adgroupData={this.state.adgroupData} show={this.state.show}/>
                </div>
            </div>
        )
    }
}
export default CampaginDetailView