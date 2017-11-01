import React from 'react';
import axios from 'axios';
import {compaignList} from '../../help/url';
import {dayTestHome, setSolution} from '../../help/linkUrl';
import Table from 'qnui/lib/table';
import { Link } from 'react-router-dom';
import Button from 'qnui/lib/button';
import createHistory from 'history/createHashHistory';
import Loading from 'qnui/lib/loading';
const history = createHistory()
import Feedback from 'qnui/lib/feedback';
const Toast = Feedback.toast;
class CreateCampaginView extends React.Component {
  constructor () {
    super ()
    this.state={
      campaignData: [],
       rowSelection: {
        selectedRowKeys: [],
        onSelect: this.onSelect.bind(this),
        onSelectAll: this.onSelectAll.bind(this)
      }
    }
  }
  onSelect (selected, record, records) {
		let {rowSelection} = this.state;
    let campaignItem = this.state.campaignItem;
    if(selected) {
			rowSelection.selectedRowKeys = [...rowSelection.selectedRowKeys, record.Id]
			this.setState({
			  rowSelection
      })
		} else {
			var idx = rowSelection.selectedRowKeys.indexOf(record.Id)
      rowSelection.selectedRowKeys = [...rowSelection.selectedRowKeys.slice(0, idx), ...rowSelection.selectedRowKeys.slice(idx + 1)]
      this.setState({
				rowSelection
      })
		}
  }
	onSelectAll (selected, records) {
		let {rowSelection} = this.state;
    if(selected) {
			for(var i=0; i<records.length; i++) {
				if(rowSelection.selectedRowKeys.indexOf(records[i].Id) == -1) {
						rowSelection.selectedRowKeys = [...rowSelection.selectedRowKeys, records[i].Id]
				}
			}
			this.setState({
				rowSelection
      })
		} else {
			var campaignData = this.state.campaignData
      for (var m=0; m < campaignData.length; m++) {
				if (rowSelection.selectedRowKeys.indexOf(campaignData[m].Id) > -1) {
					var idx = rowSelection.selectedRowKeys.indexOf(campaignData[m].Id)
					rowSelection.selectedRowKeys = [...rowSelection.selectedRowKeys.slice(0, idx), ...rowSelection.selectedRowKeys.slice(idx + 1)]
				}
		}
		this.setState({
				rowSelection
     })
    }
  }
  componentWillMount () {
    var createCampaignId = this.props.data.step2.createCampaignId
    let {rowSelection, campaignItem} = this.state;
    if(createCampaignId) {
      rowSelection.selectedRowKeys = createCampaignId
      this.setState({
       rowSelection,
       campaignItem: campaignItem
      })
    }
    var self = this
    axios.post(compaignList, {
      status_list: 1
    })
    .then(function (response) {
      var campaignData = response.data.campaigns
      self.setState({
        campaignData: campaignData
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
 setClick () {
    let {rowSelection} = this.state;
    var keys = rowSelection.selectedRowKeys
    var campaignsIds = []
    for(var i=0; i<keys.length; i++) {
      campaignsIds.push({CampaignId: keys[i]})
    }
    var step = 2
    var createCampaignId = keys
    this.props.commonData({step, createCampaignId, campaignsIds})
    history.push(setSolution)
  }
  render () {
    var campaignData = this.state.campaignData
    return (
      <div className='panel panel-default' style={{margin: '10px'}}>
        <div className="panel-heading" style={{overflow: 'hidden'}}>
            <span>选择计划</span>
        </div>
        <div className="panel-body" style={{paddingBottom: '50px'}}> 
         {
                campaignData && campaignData.length > 0
                ? <Table dataSource={campaignData}
                       rowSelection={this.state.rowSelection}
                       primaryKey='Id'>
                    <Table.Column title="计划名称" dataIndex="Name"/>
                </Table>
                : <div style={{margin: '50px auto', width: '200px'}}><Loading color="#c7c7c7"/></div>
            }
         </div>
        <div className="panel-footer" style={{overflow: 'hidden', backgroundColor: '#fff'}}>
          <div style={{float: 'right'}}>
              <Link to={dayTestHome}><Button type="normal" style={{marginRight: '15px'}}>取消</Button></Link>
              <Button type="normal" onClick={this.setClick.bind(this)}>下一步</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateCampaginView
