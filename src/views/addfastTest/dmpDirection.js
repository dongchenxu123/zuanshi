import React from 'react';
import axios from 'axios';
import { getdmp, getdmpcrowds, getdmpTags } from '../../help/url';
import Table from 'qnui/lib/table';
import Loading from 'qnui/lib/loading';
import { Link } from 'react-router-dom';
import {addfastTestStep3} from '../../help/linkUrl';
import Button from 'qnui/lib/button';
import Feedback from 'qnui/lib/feedback';
import createHistory from 'history/createHashHistory';
const history = createHistory()
const Toast = Feedback.toast;
import Pagination from 'qnui/lib/pagination';
import Notice from 'qnui/lib/notice';
import Search from 'qnui/lib/search'
class DmpDirection extends React.Component {
  constructor () {
    super()
    this.state = {
       dmpData: [],
       rowSelection: {
         selectedRowKeys: [],
         onSelect: this.onSelect.bind(this),
         onSelectAll: this.onSelectAll.bind(this)
       },
       dmpItem: [],
       current: 1,
       showloading: true,
       newdmpData: [],
       totalData: [],
       searchObj: null
    }
  }

  onSelect (selected, record, records) {
		var dmpItem = this.state.dmpItem
		let {rowSelection} = this.state;
		if(selected) {
			rowSelection.selectedRowKeys = [...rowSelection.selectedRowKeys, record.Id]
			this.setState({
				dmpItem: [...dmpItem, record],
				rowSelection
			})
		} else {
			var newData=[...dmpItem]
			var idx = rowSelection.selectedRowKeys.indexOf(record.Id)
			rowSelection.selectedRowKeys = [...rowSelection.selectedRowKeys.slice(0, idx), ...rowSelection.selectedRowKeys.slice(idx + 1)]
			for (var m=0; m < dmpItem.length; m++) {
				if(dmpItem[m].Id == record.Id) {
						newData.splice(m, 1)
					}
      }
			this.setState({
				dmpItem: newData,
				rowSelection
			})
		}

	}
	onSelectAll (selected, records) {
		let {rowSelection} = this.state;
		var dmpItem = this.state.dmpItem;
	  if(selected) {
			for(var i=0; i<records.length; i++) {
				if(rowSelection.selectedRowKeys.indexOf(records[i].Id) == -1) {
						rowSelection.selectedRowKeys = [...rowSelection.selectedRowKeys, records[i].Id]
				}
			}
			this.setState({
				rowSelection,
				dmpItem: [...dmpItem, ...records]
			})
		} else {
			var dmpData = this.state.dmpData
			var dmpItem = this.state.dmpItem;
			var newData=[...dmpItem]
			for (var m=0; m < dmpData.length; m++) {
				if (rowSelection.selectedRowKeys.indexOf(dmpData[m].Id) > -1) {
					var idx = rowSelection.selectedRowKeys.indexOf(dmpData[m].Id)
					rowSelection.selectedRowKeys = [...rowSelection.selectedRowKeys.slice(0, idx), ...rowSelection.selectedRowKeys.slice(idx + 1)]
				}
				for (var j=0; j<newData.length; j++) {
					if(dmpData[m].Id == newData[j].Id) {
						newData.splice(j, 1)
					}
				}
		}
		this.setState({
				rowSelection,
        dmpItem: newData
			})

		}
  }
  componentWillMount () {
    this.getdmp(1, null)
    var select = this.props.data.dmpObj.selectId
    var dmpItem = this.props.data.dmpArr
		let {rowSelection} = this.state;
    if(select && dmpItem) {
      rowSelection.selectedRowKeys = select;
  		this.setState({
  			rowSelection,
  			dmpItem: dmpItem
  		 });
    }
  }
  getdmp (page, searchObj) {
    var self = this
    var page_size = 10
    var index = (page-1)*page_size
    var end = index+10
    axios.get(getdmp)
	  .then(function (response) {
      var dmpData= response.data
      var totalData = response.data
      var newdmpData = response.data
      if(dmpData.length <=0) {
        self.setState({
          showloading: false
        })
        return
      }
      if ( searchObj != null ) {
        var key = searchObj.key
        var newData = []
        for(var i=0; i<newdmpData.length; i++) {
          if(newdmpData[i].Name.indexOf(key) > -1) {
            newData.push(newdmpData[i])
          }
        }
        var data = newData.slice(index, end)
        self.setState({
          dmpData: data
        })
      } else {
         var data = dmpData.slice(index, end)
         self.setState({
          dmpData: data
        })
      }
      self.setState({
        current: page,
        showloading: false,
        newdmpData: data,
        totalData: totalData
      })
		})
	  .catch(function (error) {
	    console.log(error);
	  });
  }
  onSure () {
    var select = this.state.rowSelection.selectedRowKeys
    var dmpItem = this.state.dmpItem
    var crowdType = 128
    var step = 3
    var type = 'dmp'
    var dpmArr = []
    if(select.length <= 0) {
      Toast.error('您还没有合适的人群!')
      return
    }
    if(select.length > 10) {
      Toast.error('最多可选10条人群!')
      return
    }
    for(var i=0; i<dmpItem.length; i++) {
      for(var j=0; j<select.length; j++) {
        if(dmpItem[i].Id ==select[j]) {
          dpmArr.push({crowd_type:crowdType, crowd_value: dmpItem[i].Id, crowd_name: dmpItem[i].Name})
        }
      }
    }
    this.props.commonData({step, type, dpmArr, select})
    history.push(addfastTestStep3)
  }
  renderPagination () {
   var total = this.state.totalData.length
   return (
      <Pagination defaultCurrent={1} type="mini" pageSize={5} current={this.state.current}
      onChange={this.onchangePage.bind(this)} total={total}/>
    )
  }
  onchangePage (value) {
    var searchObj = this.state.searchObj
    console.log(searchObj)
    this.getdmp(value, searchObj)
  }
  onSearch(obj) {
    this.getdmp(1, obj)
    this.setState({
      searchObj: obj
    })
  }
 renderTable () {
   var dmpData = this.state.dmpData
   if (dmpData && dmpData.length > 0) {
     return (
       <div>
         <Notice title="最多可选10个人群！" style={{marginBottom: '10px'}}/>
         <Table dataSource={dmpData}
                   rowSelection={this.state.rowSelection}
                   primaryKey='Id'>
          <Table.Column title="人群名称" dataIndex="Name"/>
          <Table.Column title="全网人群数量" dataIndex="Coverage"/>
         </Table>
       </div>
     )
   } else{
     return(<div style={{margin: '20px auto', width: '200px'}}>暂无数据</div>)
   }
  }
  render () {
    var dmpData = this.state.dmpData
    return (
      <div className='panel panel-default' style={{margin: '10px'}}>
        <div className="panel-heading" style={{overflow: 'hidden'}}>
          <span style={{fontSize: '14px', float: 'left', marginRight: '16px'}}>达摩盘定向</span>
          <Search inputWidth={300}
                  onSearch={this.onSearch.bind(this)}
                  style={{float: 'left'}}
                  placeholder='请输入人群名称'
                  searchText=""/>
        </div>
        <div className="panel-body" style={{paddingBottom: '50px'}}>
          {
            this.state.showloading
            ? <div style={{margin: '20px auto', width: '200px'}}><Loading color="#c7c7c7"/></div>
            : this.renderTable()

          }
          <div style={{marginTop: '16px', float: 'right'}}>
              {
                this.renderPagination ()
              }
          </div>
        </div>
        <div className="panel-footer" style={{overflow: 'hidden', backgroundColor: '#fff'}}>
          <div style={{float: 'right'}}>
              <Link to={addfastTestStep3}><Button type="normal" style={{marginRight: '15px'}}>取消</Button></Link>
              <Button type="normal" onClick={this.onSure.bind(this)}>确定</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default DmpDirection
