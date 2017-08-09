import React from 'react';
import Table from 'qnui/lib/table';
import Loading from 'qnui/lib/loading';
import Balloon from 'qnui/lib/balloon';
import Button from 'qnui/lib/button';
import axios from 'axios';
import {getAdgroupStatus, updateAdgroudCrowdPrice} from '../../help/url';
import ChangeInput from './changeChargeinput'
import moment from 'moment';
import {rptLabels} from './constValue';
import { Link } from 'react-router-dom';
import Icon from 'qnui/lib/icon';
const Status = {0:"暂停", 1:"投放中", 9:"投放结束"}
const StatusColor = {0:"#f50", 1:"#87d068", 9: "#2db7f5"}
const rptLabelsKey = Object.keys(rptLabels);
function rptCount (rpt) {
          if(!rpt) {
              rpt = {}
          }
          rptLabelsKey.forEach( prop => {
              if (!(prop in rpt)) {
                  rpt[prop] = 0
              }
              if( 'method' in rptLabels[prop]) {
                  rpt[prop] = rptLabels[prop].method(rpt)
              }
          });
          return rpt
}
class AdgroupDataView extends React.Component {
    constructor () {
        super()
        this.state={
            expandedRowKeys: []
        }
    }
 changeStatus (record) {
    var status = record.OnlineStatus == 0 ? 1 : 0
    var day = moment().format()
    var self = this
    axios.post(getAdgroupStatus, {
        status: status,
        campaign_id: record.CampaignId,
        adgroup_ids: record.Id
    })
    .then(function (response) {
        if(response.data.msg == 'ok') {
            self.props.loadGetcampaignRptRt(day)
            self.props.loadAdgroupData(day, day)
        }
    })
    .catch(function (error) {
        console.log(error);
    });
 }
 renderStatus (value, index, record) {
    let status = record.OnlineStatus;
    if (status == 1 && record.Name != '定向' && record.Name != '创意') {
        return (<Icon type="play" onClick={this.changeStatus.bind(this, record)} style={{color: '#51A300', marginLeft: '15px'}}/>)
    }
    if (status == 0 && record.Name != '定向' && record.Name != '创意') {
        return (<Icon type="stop" onClick={this.changeStatus.bind(this, record)} style={{color: '#a40100', marginLeft: '15px'}}/>)
    }
   }
   sendcpm (record, item, price) {
    this.props.sendCrowsCpm(record, item, price)
   }
   renderName (value, index, record) {
     var Name = record.Name
     var campagin_id = this.props.campagin_id
     var start_time = this.props.start_time
     var end_time = this.props.end_time
     var effect = this.props.effect
     if(record.CreativeSize) {
        var ImagePath = record.ImagePath
        const imgsm = <img src={ImagePath} style={{width: '100px'}}/>
        return (
              <div style={{margin: '10px 0'}}>
                    <Balloon trigger={imgsm} align="rt" alignment="edge" style={{width: 300}}>
                        <img src={ImagePath} style={{width: '250px'}}/>
                    </Balloon>
                </div>
        )
     } if (record.matrix_price) {
        return (
           <div style={{paddingBottom: '8px', lineHeight: '24px'}}>
             <div>
                <span>{record.crowd_name}</span>
              </div>
             {
                record.matrix_price.map((item, index) => {
                    return (
                        <div style={{fontSize: '12px', color: '#999'}} key={index}>
                            <span>{item.adzonedName}&nbsp;&nbsp;&nbsp;</span>
                            <ChangeInput cpm={(item.Price/100).toFixed(2)} sendcpm={this.sendcpm.bind(this, record, item)}/>
                        </div>
                    )
                })
             }
           </div>
           
       )
     }
     else {
         if (Name == '定向' || Name == '创意') {
             return (<span style={{marginLeft: '10px'}}>{Name}</span>)
         }
         return (
            <Link to={'/dayTest/campagin/detail/adgroupsDetail/'+campagin_id+'/'+record.Id+'/'+start_time+'/'+end_time+'/'+effect+'/'+Name}
               style={{color: '#4d7fff'}}><span style={{marginLeft: '10px'}}>{Name}</span></Link>
        )
     }
   }
renderTableCell (rptLabel, record, rptkey) {
     var rpt = record.Rpt
     if(rpt) {
       let val = rpt[rptkey];
       if ("formatter" in rptLabel) {
            val = rptLabel.formatter(val)
        }
        return (<span>{val}</span>)
     }
     
}
rptDataNum (RptItem) {
        var Charge = 0
        var Click = 0
        var Ctr = 0
        var Ecpc = 0
        var Ecpm = 0
        var Pv = 0
        var rptTotal = []
        var rpt = RptItem
        var AlipayAmt = 0
        var AlipayNum = 0
        var CartNum = 0
        var FavItem = 0
        var FavShop = 0
        var Roi = 0
        if(rpt) {
            // firstlogDate = rpt[rpt.length-1].LogDate
               if (rpt.Charge) {
                  Charge += rpt.Charge
                }
                if (rpt.Click) {
                  Click += rpt.Click
                }
                if (rpt.Pv) {
                  Pv += rpt.Pv
                }
                if(rpt.AlipayAmt) {
                   AlipayAmt +=  rpt.AlipayAmt
                }
                if (rpt.AlipayNum) {
                   AlipayNum += rpt.AlipayNum
                }
                if (rpt.CartNum) {
                    CartNum += rpt.CartNum
                }
                if (rpt.FavItem) {
                    FavItem += rpt.FavItem
                }
                if (rpt.FavShop) {
                    FavShop += rpt.FavShop
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
            return obj
    }
}
onRowOpen (openRowKeys, currentRowKey, opened, currentRecord) {
    const start_time = this.props.start_time
    const end_time = this.props.end_time
    let currentTarget = currentRecord.children[0].children
    let crowdsId = 0
    let creativeId = 0
    if (currentRecord.children[0].Name == '定向' && opened) {
        for (var i=0; i<currentTarget.length; i++) {
            crowdsId = currentTarget[i].id
        if (start_time == end_time) {
            this.props.loadTargetRptRt(start_time, currentRowKey, crowdsId)
       } else {
           this.props.loadTargetRptDay(start_time, end_time, currentRowKey, crowdsId)
       }
     }
    }
    if (currentRecord.Name == '创意' && opened) {
        let currentCreative = currentRecord.children
        if (currentCreative.length > 0) {
            for (var j=0; j<currentCreative.length; j++) {
                creativeId = currentCreative[j].Id
                 if (start_time == end_time) {
                        this.props.loadCreativeRptRt(start_time, openRowKeys[0], creativeId)
                } else {
                    this.props.loadCreativeRptDay(start_time, end_time, openRowKeys[0], creativeId)
                }
            }
        }
    }
}
renderAdgroupTable () {
      var adgroupData= this.props.adgroupData
      var targetRpt = {}
      var rptData = []
      var RptItem = {}
      var creativeItem = {}
      var creativeTotalRpt = {}
      var status = this.props.status
      if(adgroupData && adgroupData.length > 0) {
          adgroupData.forEach(item => {
                item.Rpt=rptCount(item.Rpt)
                var targetData = item.children[0].children
                var creativeData = item.children[1].children
                if (targetData && targetData.length > 0) {
                    targetData.forEach(i => {
                    i.Rpt=rptCount(i.Rpt)
                    RptItem = i.Rpt
                  })
                }
                var rptData = this.rptDataNum(RptItem)
                targetRpt = rptCount(rptData)
                item.children[0].Rpt = targetRpt
                if (creativeData && creativeData.length > 0) {
                    creativeData.forEach(v => {
                    v.Rpt=rptCount(v.Rpt)
                    creativeItem = v.Rpt
                  })
                }
                var creativeRpt = this.rptDataNum(RptItem)
                creativeTotalRpt = rptCount(creativeRpt)
                item.children[1].Rpt = creativeTotalRpt
          })
          
          return (
              <Table dataSource={adgroupData} hasBorder={false}
                isTree
                primaryKey='zuanshi_key'
                onRowOpen={this.onRowOpen.bind(this)}
              >
               <Table.Column title="状态" cell={this.renderStatus.bind(this)} width={150} lock/>
               <Table.Column title="单元名称" cell={this.renderName.bind(this)} width={300} lock/>
               {
                rptLabelsKey.map(col => {
                    const rptLabel = rptLabels[col];
                    return (
                        <Table.Column 
                        title={rptLabel.title} 
                        dataIndex={col} 
                        key={col}
                        cell={(value, index, record) => this.renderTableCell(rptLabel, record, col)}
                        width={150}
                        />
                    )
                })
              }
             </Table>
          )
      } else {
          return (
              <div style={{margin: '50px auto', textAlign: 'center'}}>暂无数据</div>
          )
      }
      
  }
    render () {
        return (
            <div>
               {
                   this.props.show
                   ? <div style={{margin: '50px auto', width: '200px'}}><Loading color="#c7c7c7" show={this.props.show}/></div>
                   : this.renderAdgroupTable()
               }
            </div>
        )
    }
}

export default AdgroupDataView