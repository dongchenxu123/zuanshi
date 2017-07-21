import React from 'react';
import {addfastTestStep2, homeUrl} from '../../help/linkUrl';
import { Link } from 'react-router-dom';
import Icon from 'qnui/lib/icon';
import Button from 'qnui/lib/button';
import axios from 'axios';
import {getcreatives} from '../../help/url';
import OriginalityBody from './originalityBody';
import Feedback from 'qnui/lib/feedback';
import Pagination from 'qnui/lib/pagination';
import createHistory from 'history/createHashHistory';
import Loading from 'qnui/lib/loading';
const history = createHistory()
const Toast = Feedback.toast;
const auditStatus = {
	'-4': '待审核',
		'-1' : '待审核',
		'0' : '待审核',
		'1' : '审核通过',
		'-2' : '审核拒绝',
		'-5' : '审核拒绝',
		'-9' : '审核拒绝',
}
const level = {
	 		'1' : '一级',
      '2' : '二级',
      '3' : '三级',
      '4' : '四级',
      '10' : '十级',
      '99' : '未分等级',
}
class AddOriginalityView extends React.Component {
	constructor () {
		super ()
		this.state = {
	      rowSelection: {
	        selectedRowKeys: [],
					onSelect: this.onSelect.bind(this),
					onSelectAll: this.onSelectAll.bind(this)
				},
			 creativesData: [],
			 total: 0,
			 current: 1,
			 creativesItem: [],
			 idsArr: [],
			 showloading: true
    }
	}
	isMount=false
	onSelect (selected, record, records) {
		var creativesItem = this.state.creativesItem
		let {rowSelection} = this.state;
		if(selected) {
			rowSelection.selectedRowKeys = [...rowSelection.selectedRowKeys, record.Id]
			this.setState({
				creativesItem: [...creativesItem, record],
				rowSelection
			})
		} else {
			var newData=[...creativesItem]
			var idx = rowSelection.selectedRowKeys.indexOf(record.Id)
			rowSelection.selectedRowKeys = [...rowSelection.selectedRowKeys.slice(0, idx), ...rowSelection.selectedRowKeys.slice(idx + 1)]
			for (var m=0; m < creativesItem.length; m++) {
				if(creativesItem[m].Id == record.Id) {
						newData.splice(m, 1)
					}
      }
			this.setState({
				creativesItem: newData,
				rowSelection
			})
		}

	}
	onSelectAll (selected, records) {
		let {rowSelection} = this.state;
		var creativesItem = this.state.creativesItem = [];
	  if(selected) {
			for(var i=0; i<records.length; i++) {
				if(rowSelection.selectedRowKeys.indexOf(records[i].Id) == -1) {
						rowSelection.selectedRowKeys = [...rowSelection.selectedRowKeys, records[i].Id]
				}
			}
			this.setState({
				rowSelection,
				creativesItem: [...creativesItem, ...records]
			})
		} else {
			var creativesData = this.state.creativesData
			var creativesItem = this.state.creativesItem;
			var newData=[...creativesItem]
			for (var m=0; m < creativesData.length; m++) {
				if (rowSelection.selectedRowKeys.indexOf(creativesData[m].Id) > -1) {
					var idx = rowSelection.selectedRowKeys.indexOf(creativesData[m].Id)
					rowSelection.selectedRowKeys = [...rowSelection.selectedRowKeys.slice(0, idx), ...rowSelection.selectedRowKeys.slice(idx + 1)]
				}
				for (var j=0; j<newData.length; j++) {
					if(creativesData[m].Id == newData[j].Id) {
						newData.splice(j, 1)
					}
				}
		}
		this.setState({
				rowSelection,
        creativesItem: newData
			})

		}
  }
	componentWillMount () {
		var self = this
		var step1Select= this.props.data.step1
		var creativesItem = this.props.data.creativesItem
		let {rowSelection} = this.state;
    rowSelection.selectedRowKeys = step1Select;
		this.setState({
			rowSelection,
			creativesItem: creativesItem
		 });
   this.loadOrders(1)

	}
 componentDidMount () {
	 this.isMount=true
	}
 componentWillUnmount() {
	 this.isMount=false
 }
	renderStatus (value, index, record) {
		return (<a>{auditStatus[record.AuditStatus]}</a>)
	}

	renderLevel (value, index, record) {
		return (<span>{level[record.Level]}</span>)
	}
	renderCreativeSize (value, index, record) {
		return (<div><span>{record.CreativeSize.Width}</span> * <span>{record.CreativeSize.Height}</span></div>)
	}
	//筛选类型
	onSelectType (value) {
		var self = this
		axios.post(getcreatives, {
	    format_list: value,
			page_num: 1,
			page_size: 10
	  })
	  .then(function (response) {
			var Creatives = response.data.Creatives
			var totalnum = response.data.Total;
			self.setState({
				creativesData: Creatives,
				total: totalnum
			})
		})
	  .catch(function (error) {
	    console.log(error);
	  });
	}
	//筛选等级
	onSelectLevel (value) {
		var self = this
		axios.post(getcreatives, {
	    creative_level: value,
			page_num: 1,
			page_size: 10
	  })
	  .then(function (response) {
			var Creatives = response.data.Creatives
			var totalnum = response.data.Total;
	    self.setState({
				creativesData: Creatives,
				total: totalnum
			})
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
	}
	onSearch(value) {
        console.log(value);
  }
	onChange(value) {
		console.log('input is:' + value);
			this.setState({
            value: value
        });
  }
	setClick () {
		var select = this.state.rowSelection.selectedRowKeys
		var creativesItem = this.state.creativesItem
		if(select.length <= 0) {
			this.showError ()
			return
		}
    var step = 1
		this.props.commonData({step, select, creativesItem})
		history.push(addfastTestStep2)
	}
	showError  () {Toast.error('您还没有选择添加创意')}

	loadOrders (page) {
		var self = this;
		axios.post(getcreatives, {
	    page_num: page,
			page_size: 10
	  })
	  .then(function (response) {
			var Creatives = response.data.Creatives;
			var totalnum = response.data.Total;
			var select = self.state.rowSelection.selectedRowKeys
			if(response.data.err) {
        self.setState({
					showloading: false
				})
			}
			if(self.isMount) {
				self.setState({
					creativesData: Creatives,
					current: page,
					total: totalnum,
					showloading: false
				})
			}
  })
	  .catch(function (error) {
	    console.log(error);
	  });
	}
  onchangePage (value) {
		var self = this;
		self.loadOrders(value)
  }
	renderPagination () {
		var pageSize = 10;
		var current = this.state.current;
		var total = this.state.total;
		if(this.state.creativesData === null) {
			return
		}
		else if(total && total.length> 10) {
			return (<Pagination current={this.state.current} onChange={this.onchangePage.bind(this)}
										defaultCurrent={1} total={this.state.total} pageSize={10}/>)
		}
	}
	render () {
		let {rowSelection} = this.state;
		var selectId = rowSelection.selectedRowKeys;
		return (
		 			<div className='panel panel-default' style={{margin: '10px'}}>
						<div className="panel-heading" style={{overflow: 'hidden'}}>
							<div style={{paddingLeft: '15px', float: 'left'}}><Icon type="picture" />&nbsp;&nbsp;<span>添加创意</span></div>
							<div style={{float: 'right', paddingRight: '15px'}}>已选创意条数&nbsp;( {selectId.length === 0 ? 0 : selectId.length} )</div>
						</div>
						<div className="panel-body" style={{paddingBottom: '50px'}}>
							<div>
								{
									this.state.showloading
									? <div style={{margin: '20px auto', width: '200px'}}><Loading show={this.state.showloading}/></div>
									: <OriginalityBody onChange={this.onChange.bind(this)}
																	 onSearch={this.onSearch.bind(this)}
																	 data={this.state.creativesData}
																	 rowSelection={this.state.rowSelection}
																	 status={this.renderStatus.bind(this)}
																	 level={this.renderLevel.bind(this)}
																	 creativeSize={this.renderCreativeSize.bind(this)}
																	 onSelectType={this.onSelectType.bind(this)}
																	 onSelectLevel={this.onSelectLevel.bind(this)}
																	 />
								 }
								<div style={{marginTop: '16px', float: 'right'}}>
										{
											this.renderPagination ()
										}
								</div>
							</div>
						</div>
						<div className="panel-footer" style={{overflow: 'hidden', backgroundColor: '#fff'}}>
							<div style={{float: 'right'}}>
									<Link to={homeUrl}><Button type="normal" style={{marginRight: '15px'}}>取消创建</Button></Link>
									<Button type="normal" onClick={this.setClick.bind(this)}>下一步</Button>
							</div>
						</div>
					</div>
				)
			}
		}


export default AddOriginalityView;
