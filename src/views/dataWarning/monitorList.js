import React from 'react';
import Button from 'qnui/lib/button';
import AddMonitorView from './addMonitor';
import { adgroupList, compaignList } from '../../help/url';
import axios from 'axios';
class MonitorListView extends React.Component {
  constructor() {
    super()
    this.state={
      visible: false,
      campaignsData: [],
      campaignsName: [],
      adgroupData: [],
      adgroupName: [],
      campaignsId: []
    }
  }
  loadData (url) {
    var self = this
    axios.get(url, {
      status_list: 1
    })
    .then(function (response) {
      var newArr = []
      var campaignsId = []
      for(var i=0; i<response.data.campaigns.length; i++) {
        newArr.push(response.data.campaigns[i].Name)
        campaignsId.push(response.data.campaigns[i].Id)
      }
      self.setState({
        campaignsData: response.data.campaigns,
        campaignsName: newArr,
        campaignsId: campaignsId
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  loadadgroupData () {
    var self = this
    var newArr = []
    axios.get(adgroupList)
    .then(function (response) {
      var adgroups = response.data.adgroups
      for(var i=0; i<adgroups.length; i++) {
        newArr.push('adgroupid: '+ adgroups[i].Adgroup.Name + ' ———— ' + adgroups[i].Campaign.Name)
      }
      self.setState({
        adgroupName: newArr,
        adgroupData: adgroups
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  onOpen () {
    this.setState({
        visible: true
    })
    this.loadData(compaignList)
    this.loadadgroupData()
 }
 onClose () {
    this.setState({
        visible: false
    })
}
render () {
  return (
      <div>
        <div>
          <Button type="primary" onClick={this.onOpen.bind(this)}>添加监控</Button>
        </div>
        <div style={{padding: '10px 0 50px 0'}}>
          <div style={{textAlign: 'center'}}>暂无数据</div>
        </div>
        <AddMonitorView visible={this.state.visible}
                        onOk = {this.onClose.bind(this)}
                        onCancel = {this.onClose.bind(this)}
                        onClose = {this.onClose.bind(this)}
                        title = "添加监控"
                        campaignsData={this.state.campaignsData}
                        adgroupData={this.state.adgroupData}
                        campaignsId={this.state.campaignsId}/>
      </div>
    )
  }
}

export default MonitorListView
