<<<<<<< HEAD
import React from 'react';
import {addfastTestStep3, addfastTestStep1} from '../../help/linkUrl';
import { Link } from 'react-router-dom';
import Icon from 'qnui/lib/icon';
import Button from 'qnui/lib/button';
import ResourcesBody from './resourcesbody';
import axios from 'axios';
import {getadzones, getadzoneCondition} from '../../help/url';
import createHistory from 'history/createHashHistory';
import Pagination from 'qnui/lib/pagination';
import Feedback from 'qnui/lib/feedback';
import Loading from 'qnui/lib/loading';
const Toast = Feedback.toast;
const history = createHistory()
const advType = {
	'-1': '不限',
		'1' : '淘宝',
		'2' : '天猫',
		'3' : '天猫和淘宝'
}
const format_list = {
	'2': '图片',
	'5': '文字链',
	'3': 'Flash',
	'9': 'Flash不遮盖',
	'10': '创意模板'
}
class AddResourcesView extends React.Component {
	constructor () {
		super ()
		this.state = {
	      rowSelection: {
	        selectedRowKeys: [],
					onSelect: this.onSelect.bind(this),
					onSelectAll: this.onSelectAll.bind(this)
	      },
				AdzonesData: [],
				total: 0,
				picSizeData: [],
				AdzonesItem: [],
				showloading: true
    }

	}
	isset=false
	onSelect (selected, record, records) {
		var AdzonesItem = this.state.AdzonesItem;
		let {rowSelection} = this.state;
		if(selected) {
			rowSelection.selectedRowKeys = [...rowSelection.selectedRowKeys, record.Id]
			this.setState({
				AdzonesItem: [...AdzonesItem.slice(), record],
				rowSelection
			})
		} else {
			var newData=[...AdzonesItem]
			var idx = rowSelection.selectedRowKeys.indexOf(record.Id)
			rowSelection.selectedRowKeys = [...rowSelection.selectedRowKeys.slice(0, idx), ...rowSelection.selectedRowKeys.slice(idx + 1)]
			for (var m=0; m < AdzonesItem.length; m++) {
				if(AdzonesItem[m].Id == record.Id) {
						newData.splice(m, 1)
					}
      }
			this.setState({
				AdzonesItem: newData,
				rowSelection
			})
    }
	}
	onSelectAll (selected, records) {
		let {rowSelection} = this.state;
		var AdzonesItem = this.state.AdzonesItem;
		if(selected) {
			for(var i=0; i<records.length; i++) {
				if(rowSelection.selectedRowKeys.indexOf(records[i].Id) == -1) {
						rowSelection.selectedRowKeys = [...rowSelection.selectedRowKeys, records[i].Id]
				}
			}
			this.setState({
				rowSelection,
				AdzonesItem: [...AdzonesItem, ...records]
			})
		} else {
			var AdzonesData = this.state.AdzonesData;
			var AdzonesItem = this.state.AdzonesItem;
			var newData=[...AdzonesItem]
			for (var m=0; m < AdzonesData.length; m++) {
				if (rowSelection.selectedRowKeys.indexOf(AdzonesData[m].Id) > -1) {
					var idx = rowSelection.selectedRowKeys.indexOf(AdzonesData[m].Id)
					rowSelection.selectedRowKeys = [...rowSelection.selectedRowKeys.slice(0, idx), ...rowSelection.selectedRowKeys.slice(idx + 1)]
				}
				for (var j=0; j<newData.length; j++) {
					if(AdzonesData[m].Id == newData[j].Id) {
						newData.splice(j, 1)
					}
				}
		}
		this.setState({
				rowSelection,
				AdzonesItem: newData
			})

		}
	}
	componentWillMount () {
		var self = this
		var step2SelectAd = this.props.data.step2
		var AdzonesItem = this.props.data.AdzonesItem
		let {rowSelection} = this.state;
		rowSelection.selectedRowKeys = step2SelectAd;
		this.setState({
			rowSelection,
			AdzonesItem: AdzonesItem
		 });
		axios.get(getadzoneCondition)
	  .then(function (response) {
			if(self.isset) {
	    self.setState({
				picSizeData: response.data.Sizes
			})
			}
		})
	  .catch(function (error) {
	    console.log(error);
	  });
		this.loadOrders(1)
	}
	componentDidMount () {
 	 this.isset=true
  }
  componentWillUnmount() {
 	 this.isset=false

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
	renderAdvType (value, index, record) {
		return (<span>{advType[record.AllowAdvType]}</span>)
	}
	renderMediaType (value, index, record) {
		return (<span>{record.MediaType === 1 ? 'PC' : '无线' }</span>)
	}
	renderadzoneLevel (value, index, record) {
		return (<span>{record.Level} 级</span>)
	}
	renderadFormatList (value, index, record) {
		return (<div>
					{
						record.AllowFormats.map((item,index) => {
							return (<span key={index} style={{paddingLeft: '10px'}}>{format_list[item]}</span>)
						})
					}
			</div>)
	}
	renderadSizes (value, index, record) {
		return (<div>
					{
						record.Sizes.map((item,index) => {
							return (<span key={index} style={{paddingLeft: '10px'}}>{item}</span>)
						})
					}
			</div>)
	}
	setAdClick () {
		var selectAd = this.state.rowSelection.selectedRowKeys
		if(selectAd.length <= 0) {
			this.showError ()
			return
		}
		var AdzonesItem = this.state.AdzonesItem
		var step = 2
		this.props.commonData({step, selectAd, AdzonesItem})
		history.push(addfastTestStep3)

	}
	showError  () {Toast.error('您还没有选择添加创意')}
	renderPagination () {
		var pageSize = 10;
		var current = this.state.current;
    var total = this.state.total;
		if(this.state.AdzonesData === null ) {
			return
		} else if(current == 1 && this.state.AdzonesData.length < pageSize && this.state.AdzonesData.length <= total){ return null}
		else if(this.state.AdzonesData.length > 0) {
			return (<Pagination current={this.state.current} onChange={this.onchangePage.bind(this)}
										defaultCurrent={1} total={this.state.total} pageSize={10}/>)
		}
	}
	loadOrders (page) {
		var self = this;
		var creativesItem = this.props.data.creativesItem
		var newArr = []
		var formatList = []
		var newformatList = []
		for(var i=0; i<creativesItem.length; i++) {
			var width= creativesItem[i].CreativeSize.Width
			var Height = creativesItem[i].CreativeSize.Height
			var sizes = width + 'x' + Height
			newArr.push(sizes)
			var Format = creativesItem[i].Format
			formatList.push(Format)
			for(var j=0; j<formatList.length; j++) {
				if(newformatList.indexOf(formatList[j]) === -1) {
					newformatList.push(formatList[j])
				}
			}
		}
 		axios.post(getadzones, {
	    page_num: page,
			page_size: 10,
			sizes: newArr.join(','),
      format_list: newformatList.join(',')
	  })
	  .then(function (response) {
			var Adzones =  response.data.Adzones;
			var totalnum = response.data.Total;
			if(self.isset) {
				self.setState({
					AdzonesData: Adzones,
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
	onSelectType (value) {
		var self = this
		axios.post(getadzones, {
	    format_list: value,
			page_num: 1,
			page_size: 10
	  })
	  .then(function (response) {
			var Adzones =  response.data.Adzones;
			var totalnum = response.data.Total;
			self.setState({
				AdzonesData: Adzones,
				total: totalnum
			})

	  })
	  .catch(function (error) {
	    console.log(error);
	  });
	}
	onSelectSizes (value) {
		var self = this
		axios.post(getadzones, {
	    sizes: value,
			page_num: 1,
			page_size: 10
		})
	  .then(function (response) {
			var Adzones =  response.data.Adzones;
			var totalnum = response.data.Total;
			self.setState({
				AdzonesData: Adzones,
				total: totalnum
			})
		})
	  .catch(function (error) {
	    console.log(error);
	  });
	}
	render () {
		let {rowSelection} = this.state;
		var selectId = rowSelection.selectedRowKeys;
	 return (
		 <div className='panel panel-default' style={{margin: '10px'}}>
 			<div className="panel-heading" style={{overflow: 'hidden'}}>
 				<div style={{paddingLeft: '15px', float: 'left'}}><Icon type="nav-list" />&nbsp;&nbsp;<span>添加资源位</span></div>
				<div style={{float: 'right', paddingRight: '15px'}}>已选资源位&nbsp;( {selectId.length === 0 ? 0 : selectId.length} )</div>
 			</div>
 			<div className="panel-body" style={{paddingBottom: '50px'}}>
				<div>
					{
						this.state.showloading
						? <div style={{margin: '20px auto', width: '200px'}}><Loading show={this.state.showloading}/></div>
						: <ResourcesBody data={this.state.AdzonesData}
													 rowSelection={this.state.rowSelection}
													 renderAdvType={this.renderAdvType.bind(this)}
													 renderMediaType={this.renderMediaType.bind(this)}
													 renderadzoneLevel={this.renderadzoneLevel.bind(this)}
													 renderadFormatList={this.renderadFormatList.bind(this)}
													 renderadSizes={this.renderadSizes.bind(this)}
													 onSelectType={this.onSelectType.bind(this)}
													 onSelectSizes={this.onSelectSizes.bind(this)}
													 picSizeData={this.state.picSizeData}/>
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
 						<Link to={addfastTestStep1}><Button type="normal" style={{marginRight: '15px'}}>上一步</Button></Link>
 						<Button type="normal" onClick={this.setAdClick.bind(this)}>下一步</Button>
 				</div>
 			</div>
 		</div>
				)


	}
}


export default AddResourcesView;
=======
import React from 'react';
import {addfastTestStep3, addfastTestStep1} from '../../help/linkUrl';
import { Link } from 'react-router-dom';
import Icon from 'qnui/lib/icon';
import Button from 'qnui/lib/button';
import ResourcesBody from './resourcesbody';
import axios from 'axios';
import {getadzones, getadzoneCondition} from '../../help/url';
import createHistory from 'history/createHashHistory';
import Pagination from 'qnui/lib/pagination';
import Feedback from 'qnui/lib/feedback';
import Loading from 'qnui/lib/loading';
const Toast = Feedback.toast;
const history = createHistory()
const advType = {
	'-1': '不限',
		'1' : '淘宝',
		'2' : '天猫',
		'3' : '天猫和淘宝'
}
const format_list = {
	'2': '图片',
	'5': '文字链',
	'3': 'Flash',
	'9': 'Flash不遮盖',
	'10': '创意模板'
}
class AddResourcesView extends React.Component {
	constructor () {
		super ()
		this.state = {
	      rowSelection: {
	        selectedRowKeys: [],
					onSelect: this.onSelect.bind(this),
					onSelectAll: this.onSelectAll.bind(this)
	      },
				AdzonesData: [],
				total: 0,
				picSizeData: [],
				AdzonesItem: [],
				showloading: true
    }

	}
	isset=false
	onSelect (selected, record, records) {
		var AdzonesItem = this.state.AdzonesItem;
		let {rowSelection} = this.state;
		if(selected) {
			rowSelection.selectedRowKeys = [...rowSelection.selectedRowKeys, record.Id]
			this.setState({
				AdzonesItem: [...AdzonesItem.slice(), record],
				rowSelection
			})
		} else {
			var newData=[...AdzonesItem]
			var idx = rowSelection.selectedRowKeys.indexOf(record.Id)
			rowSelection.selectedRowKeys = [...rowSelection.selectedRowKeys.slice(0, idx), ...rowSelection.selectedRowKeys.slice(idx + 1)]
			for (var m=0; m < AdzonesItem.length; m++) {
				if(AdzonesItem[m].Id == record.Id) {
						newData.splice(m, 1)
					}
      }
			this.setState({
				AdzonesItem: newData,
				rowSelection
			})
    }
	}
	onSelectAll (selected, records) {
		let {rowSelection} = this.state;
		var AdzonesItem = this.state.AdzonesItem = [];
		if(selected) {
			for(var i=0; i<records.length; i++) {
				if(rowSelection.selectedRowKeys.indexOf(records[i].Id) == -1) {
						rowSelection.selectedRowKeys = [...rowSelection.selectedRowKeys, records[i].Id]
				}
			}
			this.setState({
				rowSelection,
				AdzonesItem: [...AdzonesItem, ...records]
			})
		} else {
			var AdzonesData = this.state.AdzonesData;
			var AdzonesItem = this.state.AdzonesItem;
			var newData=[...AdzonesItem]
			for (var m=0; m < AdzonesData.length; m++) {
				if (rowSelection.selectedRowKeys.indexOf(AdzonesData[m].Id) > -1) {
					var idx = rowSelection.selectedRowKeys.indexOf(AdzonesData[m].Id)
					rowSelection.selectedRowKeys = [...rowSelection.selectedRowKeys.slice(0, idx), ...rowSelection.selectedRowKeys.slice(idx + 1)]
				}
				for (var j=0; j<newData.length; j++) {
					if(AdzonesData[m].Id == newData[j].Id) {
						newData.splice(j, 1)
					}
				}
		}
		this.setState({
				rowSelection,
				AdzonesItem: newData
			})

		}
	}
	componentWillMount () {
		var self = this
		var step2SelectAd = this.props.data.step2
		var AdzonesItem = this.props.data.AdzonesItem
		let {rowSelection} = this.state;
		rowSelection.selectedRowKeys = step2SelectAd;
		this.setState({
			rowSelection,
			AdzonesItem: AdzonesItem
		 });
		axios.get(getadzoneCondition)
	  .then(function (response) {
			if(self.isset) {
	    self.setState({
				picSizeData: response.data.Sizes
			})
			}
		})
	  .catch(function (error) {
	    console.log(error);
	  });
		this.loadOrders(1)
	}
	componentDidMount () {
 	 this.isset=true
  }
  componentWillUnmount() {
 	 this.isset=false

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
	renderAdvType (value, index, record) {
		return (<span>{advType[record.AllowAdvType]}</span>)
	}
	renderMediaType (value, index, record) {
		return (<span>{record.MediaType === 1 ? 'PC' : '无线' }</span>)
	}
	renderadzoneLevel (value, index, record) {
		return (<span>{record.Level} 级</span>)
	}
	renderadFormatList (value, index, record) {
		return (<div>
					{
						record.AllowFormats.map((item,index) => {
							return (<span key={index} style={{paddingLeft: '10px'}}>{format_list[item]}</span>)
						})
					}
			</div>)
	}
	renderadSizes (value, index, record) {
		return (<div>
					{
						record.Sizes.map((item,index) => {
							return (<span key={index} style={{paddingLeft: '10px'}}>{item}</span>)
						})
					}
			</div>)
	}
	setAdClick () {
		var selectAd = this.state.rowSelection.selectedRowKeys
		if(selectAd.length <= 0) {
			this.showError ()
			return
		}
		var AdzonesItem = this.state.AdzonesItem
		var step = 2
		this.props.commonData({step, selectAd, AdzonesItem})
		history.push(addfastTestStep3)

	}
	showError  () {Toast.error('您还没有选择添加创意')}
	renderPagination () {
		var pageSize = 10;
		var current = this.state.current;
    var total = this.state.total;
		if(this.state.AdzonesData === null ) {
			return
		} else if(current == 1 && this.state.AdzonesData.length < pageSize && this.state.AdzonesData.length <= total){ return null}
		else if(this.state.AdzonesData.length > 0) {
			return (<Pagination current={this.state.current} onChange={this.onchangePage.bind(this)}
										defaultCurrent={1} total={this.state.total} pageSize={10}/>)
		}
	}
	loadOrders (page) {
		var self = this;
		var creativesItem = this.props.data.creativesItem
		var newArr = []
		var formatList = []
		var newformatList = []
		for(var i=0; i<creativesItem.length; i++) {
			var width= creativesItem[i].CreativeSize.Width
			var Height = creativesItem[i].CreativeSize.Height
			var sizes = width + 'x' + Height
			newArr.push(sizes)
			var Format = creativesItem[i].Format
			formatList.push(Format)
			for(var j=0; j<formatList.length; j++) {
				if(newformatList.indexOf(formatList[j]) === -1) {
					newformatList.push(formatList[j])
				}
			}
		}
 		axios.post(getadzones, {
	    page_num: page,
			page_size: 10,
			sizes: newArr.join(','),
      format_list: newformatList.join(',')
	  })
	  .then(function (response) {
			var Adzones =  response.data.Adzones;
			var totalnum = response.data.Total;
			if (response.data.err) {
               self.setState({
				   showloading: false
			   })
			}
			if(self.isset) {
				self.setState({
					AdzonesData: Adzones,
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
	onSelectType (value) {
		var self = this
		axios.post(getadzones, {
	    format_list: value,
			page_num: 1,
			page_size: 10
	  })
	  .then(function (response) {
			var Adzones =  response.data.Adzones;
			var totalnum = response.data.Total;
			self.setState({
				AdzonesData: Adzones,
				total: totalnum
			})

	  })
	  .catch(function (error) {
	    console.log(error);
	  });
	}
	onSelectSizes (value) {
		var self = this
		axios.post(getadzones, {
	    sizes: value,
			page_num: 1,
			page_size: 10
		})
	  .then(function (response) {
			var Adzones =  response.data.Adzones;
			var totalnum = response.data.Total;
			self.setState({
				AdzonesData: Adzones,
				total: totalnum
			})
		})
	  .catch(function (error) {
	    console.log(error);
	  });
	}
	render () {
		let {rowSelection} = this.state;
		var selectId = rowSelection.selectedRowKeys;
	 return (
		 <div className='panel panel-default' style={{margin: '10px'}}>
 			<div className="panel-heading" style={{overflow: 'hidden', fontSize: '14px'}}>
 				<div style={{paddingLeft: '15px', float: 'left'}}><Icon type="nav-list" />&nbsp;&nbsp;<span>添加资源位</span></div>
				<div style={{float: 'right', paddingRight: '15px'}}>已选资源位&nbsp;( {selectId.length === 0 ? 0 : selectId.length} )</div>
 			</div>
 			<div className="panel-body" style={{paddingBottom: '50px'}}>
				<div>
					{
						this.state.showloading
						? <div style={{margin: '20px auto', width: '200px'}}><Loading show={this.state.showloading}/></div>
						: <ResourcesBody data={this.state.AdzonesData}
													 rowSelection={this.state.rowSelection}
													 renderAdvType={this.renderAdvType.bind(this)}
													 renderMediaType={this.renderMediaType.bind(this)}
													 renderadzoneLevel={this.renderadzoneLevel.bind(this)}
													 renderadFormatList={this.renderadFormatList.bind(this)}
													 renderadSizes={this.renderadSizes.bind(this)}
													 onSelectType={this.onSelectType.bind(this)}
													 onSelectSizes={this.onSelectSizes.bind(this)}
													 picSizeData={this.state.picSizeData}/>
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
 						<Link to={addfastTestStep1}><Button type="normal" style={{marginRight: '15px'}}>上一步</Button></Link>
 						<Button type="normal" onClick={this.setAdClick.bind(this)}>下一步</Button>
 				</div>
 			</div>
 		</div>
				)


	}
}


export default AddResourcesView;
>>>>>>> a43b3823b062de6e7da27e692def8042fa1e75a2
