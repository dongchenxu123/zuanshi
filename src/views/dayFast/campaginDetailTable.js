import React from 'react';
import { Link } from 'react-router-dom';
import {dayTestHome} from '../../help/linkUrl';
import Icon from 'qnui/lib/icon';
import DatePicker, { MonthPicker, YearPicker, RangePicker } from 'qnui/lib/date-picker';
import Select, {Option} from 'qnui/lib/select';
import CampaginDataView from './campaginData';
import axios from 'axios';
import { getcampaignRptRt, getcampaignRptDay, getGeneralAdgroups, updateAdgroudCrowdPrice, getGeneralCreatives, getGeneralTargets, getGeneralAdzone,
    getTargetRptRt, getTargetRptDay, getCreativeRptRt, getCreativeRptDay} from '../../help/url';
import moment from 'moment';
import AdgroupDataView from './adgroupData';
import CampaginChartView from './campaginChart';
import Tab from 'qnui/lib/tab';
import Feedback from 'qnui/lib/feedback';
import CreativeTabView from './creativeTabView';
import CrowdsTabView from './crowdsTableView';
import AdzoneTabView from './adzoneTableView'
import loadDataNum from './sumData'
const Toast = Feedback.toast;
const TabPane = Tab.TabPane;
class CampaginDetailView extends React.Component {
    constructor () {
        super()
        this.state={
            fastTime: 'today', //今天和昨天
            time: [], //段时间
            effect: '7',
            campaginData: [],
            adgroupData: [],
            show: true,
            rpt: [],
            rptData: [],
            creativeData: [],
            creativeShow: true,
            crowdsData: [],
            crowdsShow: true,
            adzoneData: [],
            adzoneShow: true,
            start_time: '',
            end_time: '',
            currentKey: '',
            firstlogDate: '',
            nextlogDate: '',
            targetTotalData: [],
            targetData: [],
            creativeData: []
        }
    }
    changeEffect (value) {
     this.setState({
         effect: value
     })
    }
    componentWillMount () {
        var day = moment().format()
        var self = this
        var id = this.props.match.params.id
        var name = this.props.match.params.name
        var status = this.props.match.params.status
        var adgroupsKey = localStorage.getItem('adgroupsKey')
        if (adgroupsKey == null) {localStorage.setItem('adgroupsKey', 'adgroups')}
        this.loadAdgroupData(day, day)
        this.loadGetcampaignRptRt(day)
        var newAdgroups = JSON.parse(localStorage.getItem('newAdgroups'))
        if(newAdgroups != null) {localStorage.removeItem('newAdgroups')}
        var newCeatives = JSON.parse(localStorage.getItem('newCeatives'))
        if(newCeatives != null) {localStorage.removeItem('newCeatives')}
        var newCrowds = JSON.parse(localStorage.getItem('newCrowds'))
        if(newCrowds != null) {localStorage.removeItem('newCrowds')}
        var newAdzones = JSON.parse(localStorage.getItem('newAdzones'))
        if(newAdzones != null) {localStorage.removeItem('newAdzones')}
        var crowdsKey = localStorage.getItem('crowdsKey')
        if(crowdsKey != null) {
            localStorage.removeItem('crowdsKey')
        }
        var adzonesKey = localStorage.getItem('adzonesKey')
        if(adzonesKey != null) {
            localStorage.removeItem('adzonesKey')
        }
        var CeativesKey = localStorage.getItem('CeativesKey')
        if(CeativesKey != null) {
            localStorage.removeItem('CeativesKey')
        }
    }
    changeFastTime (value) {
        var newAdgroups = JSON.parse(localStorage.getItem('newAdgroups'))
        if(newAdgroups != null) {localStorage.removeItem('newAdgroups')}
        var newCeatives = JSON.parse(localStorage.getItem('newCeatives'))
        if(newCeatives != null) {localStorage.removeItem('newCeatives')}
        var newCrowds = JSON.parse(localStorage.getItem('newCrowds'))
        if(newCrowds != null) {localStorage.removeItem('newCrowds')}
        var newAdzones = JSON.parse(localStorage.getItem('newAdzones'))
        if(newAdzones != null) {localStorage.removeItem('newAdzones')}
        var CeativesKey = localStorage.getItem('CeativesKey')
        var crowdsKey = localStorage.getItem('crowdsKey')
        var adzonesKey = localStorage.getItem('adzonesKey')
        var adgroupsKey = localStorage.getItem('adgroupsKey')
        this.setState({
            fastTime: value
        })
        var yesterday = moment().subtract(1, 'days').format();
        if(value == 'today') {
          var day = moment().format()
          var self = this
          this.loadGetcampaignRptRt(day)
          if (adgroupsKey == 'adgroups') {
            this.loadAdgroupData(day, day)
          }
          if(CeativesKey == 'creatives') {
              this.loadCeativesData(day, day)
          }
          if(crowdsKey == 'crowds') {
              this.loadCrowdsData(day, day)
          }
          if(adzonesKey == 'adzones') {
              this.loadAdzoneData(day, day)
          }
          this.setState({
              time: [day,day],
              start_time: day,
              end_time: day
          })
       }
        if(value == 'yesterday') {
          this.loadGetcampaignRptRt(yesterday)
          if (adgroupsKey == 'adgroups') {
             this.loadAdgroupData(yesterday, yesterday)
          }
          if(CeativesKey == 'creatives') {
              this.loadCeativesData(yesterday, yesterday)
          }
          if(crowdsKey == 'crowds') {
              this.loadCrowdsData(yesterday, yesterday)
          }
          if(adzonesKey == 'adzones') {
              this.loadAdzoneData(yesterday, yesterday)
          }
          this.setState({
              time: [yesterday, yesterday],
              start_time: yesterday,
              end_time: yesterday
          })
        }
        if(value == '7') {
          var start_time = moment().subtract(7, 'days').format();
          this.loadGetcampaignRptDay(start_time, yesterday)
          if (adgroupsKey == 'adgroups') {
             this.loadAdgroupData(start_time, yesterday)
          }
          if(CeativesKey == 'creatives') {
              this.loadCeativesData(start_time, yesterday)
          }
          if(crowdsKey == 'crowds') {
              this.loadCrowdsData(start_time, yesterday)
          }
          if(adzonesKey == 'adzones') {
              this.loadAdzoneData(start_time, yesterday)
          }
          this.setState({
              time: [start_time, yesterday],
              start_time: start_time,
              end_time: yesterday
          })
        }
        if(value == '15') {
          var start_time = moment().subtract(15, 'days').format();
          this.loadGetcampaignRptDay(start_time, yesterday)
          if (adgroupsKey == 'adgroups') {
             this.loadAdgroupData(start_time, yesterday)
          }
          if(CeativesKey == 'creatives') {
              this.loadCeativesData(start_time, yesterday)
          }
          if(crowdsKey == 'crowds') {
              this.loadCrowdsData(start_time, yesterday)
          }
          if(adzonesKey == 'adzones') {
              this.loadAdzoneData(start_time, yesterday)
          }
          this.setState({
              time: [start_time, yesterday],
              start_time: start_time,
              end_time: yesterday
          })
        }
        if(value == '30') {
          var start_time = moment().subtract(30, 'days').format();
          this.loadGetcampaignRptDay(start_time, yesterday)
          if (adgroupsKey == 'adgroups') {
             this.loadAdgroupData(start_time, yesterday)
          }
          if(CeativesKey == 'creatives') {
              this.loadCeativesData(start_time, yesterday)
          }
          if(crowdsKey == 'crowds') {
              this.loadCrowdsData(start_time, yesterday)
          }
          if(adzonesKey == 'adzones') {
              this.loadAdzoneData(start_time, yesterday)
          }
          this.setState({
              time: [start_time, yesterday],
              start_time: start_time,
              end_time: yesterday
          })
        }
        if(value == 'month') {
          var start_time = moment().startOf('month').format();
          var end_time = moment().format();
          this.loadGetcampaignRptDay(start_time, end_time)
          if (adgroupsKey == 'adgroups') {
             this.loadAdgroupData(start_time, end_time)
          }
          if(CeativesKey == 'creatives') {
              this.loadCeativesData(start_time, end_time)
          }
          if(crowdsKey == 'crowds') {
              this.loadCrowdsData(start_time, end_time)
          }
          if(adzonesKey == 'adzones') {
              this.loadAdzoneData(start_time, end_time)
          }
          this.setState({
              time: [start_time, end_time],
              start_time: start_time,
              end_time: end_time
          })
        }
        if(value == 'lastWeek') {
          var start_time = moment().subtract(7, 'days').format();
          this.loadGetcampaignRptDay(start_time, yesterday)
          if (adgroupsKey == 'adgroups') {
             this.loadAdgroupData(start_time, yesterday)
          }
          if(CeativesKey == 'creatives') {
              this.loadCeativesData(start_time, yesterday)
          }
          if(crowdsKey == 'crowds') {
              this.loadCrowdsData(start_time, yesterday)
          }
          if(adzonesKey == 'adzones') {
              this.loadAdzoneData(start_time, yesterday)
          }
          this.setState({
              time: [start_time, yesterday],
              start_time: start_time,
              end_time: yesterday
          })
        }
        if(value == 'lastMonth') {
          var start_time = moment().subtract(1, 'month').startOf('month').format();
          var end_time = moment().subtract(1, 'month').endOf('month').format();
          this.loadGetcampaignRptDay(start_time, end_time)
         if (adgroupsKey == 'adgroups') {
             this.loadAdgroupData(start_time, end_time)
          }
          if(CeativesKey == 'creatives') {
              this.loadCeativesData(start_time, end_time)
          }
          if(crowdsKey == 'crowds') {
              this.loadCrowdsData(start_time, end_time)
          }
          if(adzonesKey == 'adzones') {
              this.loadAdzoneData(start_time, end_time)
          }
          this.setState({
              time: [start_time, end_time],
              start_time: start_time,
              end_time: end_time
          })
        }
    }
    changeTime (value) {
      var newAdgroups = JSON.parse(localStorage.getItem('newAdgroups'))
     if(newAdgroups != null) {localStorage.removeItem('newAdgroups')}
     var newCeatives = JSON.parse(localStorage.getItem('newCeatives'))
     if(newCeatives != null) {localStorage.removeItem('newCeatives')}
     var newCrowds = JSON.parse(localStorage.getItem('newCrowds'))
     if(newCrowds != null) {localStorage.removeItem('newCrowds')}
     var newAdzones = JSON.parse(localStorage.getItem('newAdzones'))
     if(newAdzones != null) {localStorage.removeItem('newAdzones')}
     var CeativesKey = localStorage.getItem('CeativesKey')
     var crowdsKey = localStorage.getItem('crowdsKey')
     var adzonesKey = localStorage.getItem('adzonesKey')
     var adgroupsKey = localStorage.getItem('adgroupsKey')
      var start_time = moment(value[0]).format();
      var end_time = moment(value[1]).format();
      this.loadGetcampaignRptDay(start_time, end_time)
      if (adgroupsKey == 'adgroups') {
        this.loadAdgroupData(start_time, end_time)
      }
      if(CeativesKey == 'creatives') {
        this.loadCeativesData(start_time, end_time)
      }
      if(crowdsKey == 'crowds') {
        this.loadCrowdsData(start_time, end_time)
      }
      if(adzonesKey == 'adzones') {
        this.loadAdzoneData(start_time, end_time)
      }
      this.setState({
          fastTime: '请选择快捷日期',
          time: value,
          start_time: start_time,
          end_time: end_time
      })
    }
    loadCeativesData (start_time, end_time) {
       var id = this.props.match.params.id
       var self = this
       var day = moment().format()
       var effect = this.state.effect
       axios.post(getGeneralCreatives, {
            campaign_id: id,
            status: 2,
            start_time: start_time,
            end_time: end_time,
            effect: effect
        })
        .then(function (response) {
            var Creatives = response.data.creatives.Creatives
            if(response.data.err || Creatives == null) {
              self.setState({
                creativeShow: false
              })
            }
            self.setState({
              creativeData: Creatives,
              creativeShow: false
            })
             var newCeatives = JSON.stringify(Creatives)
             localStorage.setItem("newCeatives", newCeatives)
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    loadCrowdsData (start_time, end_time) {
       var id = this.props.match.params.id
       var self = this
       var day = moment().format()
       var effect = this.state.effect
       axios.post(getGeneralTargets, {
            campaign_id: id,
            status: 2,
            start_time: start_time,
            end_time: end_time,
            effect: effect
        })
        .then(function (response) {
            var Crowds = response.data.targets.Crowds
            if(response.data.err || Crowds == null) {
              self.setState({
                creativeShow: false
              })
            }
            self.setState({
              crowdsData: Crowds,
              crowdsShow: false
            })
            var newCrowds = JSON.stringify(Crowds)
            localStorage.setItem("newCrowds", newCrowds)
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    loadAdzoneData (start_time, end_time) {
       var id = this.props.match.params.id
       var self = this
       var day = moment().format()
       var effect = this.state.effect
       axios.post(getGeneralAdzone, {
            campaign_id: id,
            status: 2,
            start_time: start_time,
            end_time: end_time,
            effect: effect
        })
        .then(function (response) {
            var adzones = response.data.adzones.Adzones
            if(response.data.err || adzones == null) {
              self.setState({
                adzoneShow: false
              })
            }
            self.setState({
              adzoneData: adzones,
              adzoneShow: false
            })
            var newAdzones = JSON.stringify(adzones)
            localStorage.setItem("newAdzones", newAdzones)
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    loadGetcampaignRptRt (day) {
        var id = this.props.match.params.id
        var self = this
        axios.post(getcampaignRptRt, {
            campaign_id: id,
            log_date: day
        })
        .then(function (response) {
            var rptData = loadDataNum(response)
            self.setState({
                campaginData: rptData.campaginData,
                rptData: rptData.rptData
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    loadTargetRptRt (day, AdgroupId, CrowdsId) {
       var id = this.props.match.params.id
       var self = this
       var adgroupData = this.state.adgroupData
       axios.post(getTargetRptRt, {
            campaign_id: id*1,
            log_date: day,
            target_id: CrowdsId,
            adgroup_id: AdgroupId
        })
      .then(function (response) {
            var rptData = loadDataNum(response)
            var targetData = {
                CrowdsId: CrowdsId,
                AdgroupId: AdgroupId,
                Rpt: rptData.campaginData
            }
            self.setState({
                targetTotalData: targetData
               
            })
        })
        .catch(function (error) {
            console.log(error);
        }); 
    }
    loadTargetRptDay (start_time, end_time, AdgroupId, CrowdsId) {
       var id = this.props.match.params.id
       var self = this
       var adgroupData = this.state.adgroupData
       var effect = this.state.effect
       axios.post(getTargetRptDay, {
            campaign_id: id*1,
            start_time: start_time,
            end_time: end_time,
            effect: effect,
            target_id: CrowdsId,
            adgroup_id: AdgroupId
        })
      .then(function (response) {
            var rptData = loadDataNum(response)
            var targetData = {
                CrowdsId: CrowdsId,
                AdgroupId: AdgroupId,
                Rpt: rptData.campaginData
            }
            self.setState({
                targetTotalData: targetData
               
            })
        })
        .catch(function (error) {
            console.log(error);
        }); 
    }
    loadCreativeRptRt (day, AdgroupId, CreativesId) {
       var id = this.props.match.params.id
       var self = this
       var adgroupData = this.state.adgroupData
       axios.post(getCreativeRptRt, {
            campaign_id: id*1,
            log_date: day,
            creative_id: CreativesId,
            adgroup_id: AdgroupId
        })
      .then(function (response) {
            var rptData = loadDataNum(response)
            var creativeData = {
                CreativesId: CreativesId,
                AdgroupId: AdgroupId,
                Rpt: rptData.campaginData
            }
            self.setState({
                creativeData: creativeData
               
            })
        })
        .catch(function (error) {
            console.log(error);
        }); 
    }
    loadCreativeRptDay (start_time, end_time, AdgroupId, CreativesId) {
       var id = this.props.match.params.id
       var self = this
       var adgroupData = this.state.adgroupData
       var effect = this.state.effect
       axios.post(getCreativeRptDay, {
            campaign_id: id*1,
            start_time: start_time,
            end_time: end_time,
            creative_id: CreativesId,
            adgroup_id: AdgroupId,
            effect: effect
        })
      .then(function (response) {
            var rptData = loadDataNum(response)
            var creativeData = {
                CreativesId: CreativesId,
                AdgroupId: AdgroupId,
                Rpt: rptData.campaginData
            }
            self.setState({
                creativeData: creativeData
               
            })
        })
        .catch(function (error) {
            console.log(error);
        }); 
    }
    loadAdgroupData (start_time, end_time) {
        var id = this.props.match.params.id
        var self = this
        var day = moment().format()
        var effect = this.state.effect
        var AdgroupId = 0
        var CrowdsId = 0
        axios.post(getGeneralAdgroups, {
            campaign_id: id*1,
            status: 2,
            start_time: start_time,
            end_time: end_time,
            effect: effect
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
                AdgroupId = adgroups[i].Adgroup.Id
                var Adzones = adgroups[i].Adzones
                var Crowds = adgroups[i].Crowds
                var Adgroup = adgroups[i].Adgroup
                var Creatives = adgroups[i].Creatives
                var Rpt = adgroups[i].Rpt
                var children = []
                for(var m=0; m<Crowds.length; m++) {
                     for(var j=0; j<Adzones.length; j++) {
                        var matrix_price = Crowds[m].matrix_price
                        Crowds[m].zuanshi_key= adgroups[i].Adgroup.Id+'_'+Crowds[m].id
                        Crowds[m].status = adgroups[i].Adgroup.OnlineStatus
                        Crowds[m].AdzoneId = Adzones[j].Id
                        CrowdsId = Crowds[m].id
                        for(var n=0; n<matrix_price.length; n++) {
                           if(Adzones[j].Id == matrix_price[n].AdzoneId) {
                            matrix_price[n] = Object.assign({}, matrix_price[n], {adzonedName: Adzones[j].Name})
                         }
                        }
                     }
                }
                if (Creatives != null) {
                 for(var k=0; k<Creatives.length; k++) {
                    Creatives[k].zuanshi_key = adgroups[i].Adgroup.Id+'_'+Creatives[k].Id
                    var CreativesId = Creatives[k].Id
                  }
                }
                var CrowsObj = {Name: '定向', children: Crowds, OnlineStatus: '', zuanshi_key: adgroups[i].Adgroup.Id+'_定向'}
                var createObj ={Name: '创意', children: Creatives, OnlineStatus: '', zuanshi_key: adgroups[i].Adgroup.Id+'_创意'}
                children=[CrowsObj, createObj]
                adgroups[i]= Object.assign({}, Adgroup, {Rpt: Rpt}, {children: children},{zuanshi_key: adgroups[i].zuanshi_key})
             }
            self.setState({
                adgroupData: adgroups,
                show: false
           })
           var newAdgroups = JSON.stringify(adgroups)
           localStorage.setItem("newAdgroups", newAdgroups)
           })
        .catch(function (error) {
            console.log(error);
        });
    }
    sendCrowsCpm (record, item, price) {
        var matrix_price = record.matrix_price
        var AdzoneId = record.AdzoneId
        var day = moment().format()
        var adgroupData = this.state.adgroupData
        let crowdsData
        var recordMatrix_price = record.matrix_price
        for (var i=0; i<adgroupData.length; i++) {
            if(record.adgroup_id == adgroupData[i].Id) {
                crowdsData = adgroupData[i].children[0].children
                for (var j=0; j<crowdsData.length; j++) {
                   var matrix_price = crowdsData[j].matrix_price
                   if(crowdsData[j].id == record.id){
                    for (var m=0; m<matrix_price.length; m++) {
                      if(matrix_price[m].AdzoneId == item.AdzoneId) {
                         matrix_price[m].Price = price*100
                       }
                     } 
                  }
               }
          }
        }
        axios.post(updateAdgroudCrowdPrice, {
            status: record.status,
            campaign_id: record.campaign_id,
            adgroup_id: record.adgroup_id,
            crowds: crowdsData
        })
        .then(function (response) {
            if(response.data.err) {
                Toast.error(response.data.err)
            }
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
            var rptData = loadDataNum(response)
            self.setState({
                nextlogDate: end_time,
                firstlogDate: start_time,
                campaginData: rptData.campaginData,
                rptData: rptData.rptData
            })
            
        })
        .catch(function (error) {
            console.log(error);
        });
     }
     handleChange (key) {
         var start_time = this.state.start_time
         var end_time = this.state.end_time
         var day = moment().format()
         var newAdgroups = JSON.parse(localStorage.getItem('newAdgroups'))
         if (key == 'adgroups') {
            if (newAdgroups == null) {
                this.loadAdgroupData(start_time, end_time)
            }
            var crowdsKey = localStorage.getItem('crowdsKey')
            if(crowdsKey != null) {
                localStorage.removeItem('crowdsKey')
            }
            var adzonesKey = localStorage.getItem('adzonesKey')
            if(adzonesKey != null) {
                localStorage.removeItem('adzonesKey')
            }
            var CeativesKey = localStorage.getItem('CeativesKey')
            if(CeativesKey != null) {
                localStorage.removeItem('CeativesKey')
            }
            localStorage.setItem("adgroupsKey", key)
         }
         if (key == 'creatives') {
            if(start_time == '') {start_time = day}
            if(end_time == '') {end_time = day}
            var newCeatives = JSON.parse(localStorage.getItem('newCeatives'))
            if (newCeatives == null) {
                this.loadCeativesData(start_time, end_time)
            }
            var crowdsKey = localStorage.getItem('crowdsKey')
            if(crowdsKey != null) {
                localStorage.removeItem('crowdsKey')
            }
            var adzonesKey = localStorage.getItem('adzonesKey')
            if(adzonesKey != null) {
                localStorage.removeItem('adzonesKey')
            }
            var adgroupsKey = localStorage.getItem('adgroupsKey')
            if(adgroupsKey != null) {
                localStorage.removeItem('adgroupsKey')
            }
            localStorage.setItem("CeativesKey", key)
        }
        if (key == 'crowds') {
            if(start_time == '') {start_time = day}
            if(end_time == '') {end_time = day}
            var newCrowds = JSON.parse(localStorage.getItem('newCrowds'))
            if (newCrowds == null) {
                this.loadCrowdsData(start_time, end_time)
            }
            var CeativesKey = localStorage.getItem('CeativesKey')
            if(CeativesKey != null) {
                localStorage.removeItem('CeativesKey')
            }
            var adzonesKey = localStorage.getItem('adzonesKey')
            if(adzonesKey != null) {
                localStorage.removeItem('adzonesKey')
            }
            var adgroupsKey = localStorage.getItem('adgroupsKey')
            if(adgroupsKey != null) {
                localStorage.removeItem('adgroupsKey')
            }
             localStorage.setItem("crowdsKey", key)
        }
        if (key == 'adzones') {
            if(start_time == '') {start_time = day}
            if(end_time == '') {end_time = day}
            var newAdzones = JSON.parse(localStorage.getItem('newAdzones'))
            if (newAdzones == null) {
                this.loadAdzoneData(start_time, end_time)
            }
            var CeativesKey = localStorage.getItem('CeativesKey')
            if(CeativesKey != null) {
                localStorage.removeItem('CeativesKey')
            }
            var crowdsKey = localStorage.getItem('crowdsKey')
            if(crowdsKey != null) {
                localStorage.removeItem('crowdsKey')
            }
            var adgroupsKey = localStorage.getItem('adgroupsKey')
            if(adgroupsKey != null) {
                localStorage.removeItem('adgroupsKey')
            }
             localStorage.setItem("adzonesKey", key)
        }
     }
     render () {
        var campaginName = this.props.match.params.name
        var DayBudget = this.props.match.params.cost
        var day = moment().format()
        var range = [day, day]
        var tabStyle = {
            fontSize: '14px',
            color: '#4d7fff'
        }
        var id = this.props.match.params.id
        var adgroupData = this.state.adgroupData
        var targetData = []
        targetData.push(this.state.targetTotalData)
        var creativeData = []
        creativeData.push(this.state.creativeData)
        for (var i=0; i<adgroupData.length; i++) {
            var childrenTotal = adgroupData[i].children[0].children //定向
            var childrenCreative = adgroupData[i].children[1].children //创意
            for (var m=0; m<targetData.length; m++) {
                if(targetData[m].AdgroupId == adgroupData[i].Id) {
                    for (var j=0; j<childrenTotal.length; j++) {
                        if (childrenTotal[j].id == targetData[m].CrowdsId) {
                            var Rpt = targetData[m].Rpt ?  targetData[m].Rpt[0] : []
                            childrenTotal[j]= Object.assign({}, childrenTotal[j], {Rpt: Rpt})
                        }
                   }
                }
            }
           for (var k=0; k<creativeData.length; k++) {
               if(creativeData[k].AdgroupId == adgroupData[i].Id) {
                   for (var t=0; t<childrenCreative.length; t++) {
                       if(childrenCreative[t].Id == creativeData[k].CreativesId) {
                           var Rpt = creativeData[k].Rpt[0] ? creativeData[k].Rpt[0] : {}
                           childrenCreative[t]= Object.assign({}, childrenCreative[t], {Rpt: Rpt})
                       }
                   }
               }
           }
           
        }
        return (
            <div className='panel panel-default' style={{margin: '10px'}}>
                <div className="panel-heading" style={{fontSize: '14px'}}>
                    <Link to={dayTestHome} style={{color: '#4d7fff'}}>所有全店推广计划</Link>&nbsp;&nbsp;
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
                    <Tab defaultActiveKey="adgroups" size="small" navStyle={tabStyle} onChange={this.handleChange.bind(this)}>
                        <TabPane tab="单元" key="adgroups">
                            <AdgroupDataView adgroupData={this.state.adgroupData} show={this.state.show}
                                loadGetcampaignRptRt={this.loadGetcampaignRptRt.bind(this)}
                                loadAdgroupData={this.loadAdgroupData.bind(this)}
                                sendCrowsCpm={this.sendCrowsCpm.bind(this)}
                                start_time={this.state.start_time == '' ? day : this.state.start_time}
                                end_time={this.state.end_time == '' ? day : this.state.end_time}
                                effect={this.state.effect}
                                campagin_id={id}
                                loadTargetRptRt={this.loadTargetRptRt.bind(this)}
                                loadTargetRptDay={this.loadTargetRptDay.bind(this)}
                                loadCreativeRptRt={this.loadCreativeRptRt.bind(this)}
                                loadCreativeRptDay={this.loadCreativeRptDay.bind(this)}
                                />
                        </TabPane>
                        <TabPane tab="创意" key="creatives">
                            <CreativeTabView creativeShow={this.state.creativeShow} creativeData={this.state.creativeData}/>
                        </TabPane>
                        <TabPane tab="定向" key="crowds">
                            <CrowdsTabView crowdsData={this.state.crowdsData} crowdsShow={this.state.crowdsShow}/>
                        </TabPane>
                        <TabPane tab="资源位" key="adzones">
                            <AdzoneTabView adzoneData={this.state.adzoneData} adzoneShow={this.state.adzoneShow}/>
                        </TabPane>
                    </Tab>
                </div>
            </div>
        )
    }
}
export default CampaginDetailView