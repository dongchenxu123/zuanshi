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

const pageSize = 10

class DmpDirection extends React.Component {
  constructor () {
    super()
    this.state = {
       dmpData: [],
       rowSelection: {
         onChange: this.onChange.bind(this)
       },
       dmpItem: [],
       current: 1,
       showloading: true,
       newdmpData: [],
       totalData: [],
       searchObj: null
    }
  }
 onChange (ids, records) {
    let {rowSelection} = this.state;
    rowSelection.selectedRowKeys = ids;
    this.setState({ rowSelection });
 }
 componentWillMount () {
    this.getdmp()
    var select = this.props.data.dmpObj.selectId
    var newDpmArr = this.props.data.dmpObj.dmpItem 
    let {rowSelection} = this.state;
    if(select) {
      rowSelection.selectedRowKeys = select;
  		this.setState({
  			rowSelection
  		});
    }
 }
  getdmp () {
    var self = this
    axios.get(getdmp)
	  .then(function (response) {
      var dmpData= response.data
      var totalData = response.data
      if(dmpData.length <=0) {
        self.setState({
          showloading: false
        })
        return
      }
      self.setState({
        showloading: false,
        totalData: totalData
      })
		})
	  .catch(function (error) {
	    console.log(error);
	  });
  }
  onSure () {
    var select = this.state.rowSelection.selectedRowKeys
    var totalData = this.state.totalData
    var crowdType = 128
    var step = 3
    var type = 'dmp'
    var dpmArr = []
    for (var i=0; i<totalData.length; i++) {
      for (var j=0; j<select.length; j++) {
        if (select[j] == totalData[i].Id) {
          dpmArr.push({crowd_type:crowdType, crowd_value: (totalData[i].Id).toString(), crowd_name: totalData[i].Name})
        }
      }
    }
    this.props.commonData({step, type, dpmArr, select})
    history.push(addfastTestStep3)
  }
  renderPagination (total) {
   return (
      <Pagination 
        defaultCurrent={1} 
        pageSize={pageSize} 
        current={this.state.current}
        onChange={this.onchangePage.bind(this)} total={total}
      />
    )
  }
  onchangePage (value) {
    var searchObj = this.state.searchObj
    this.setState({
      current: value
    })
  }
  onSearch(obj) {
    this.setState({
      searchObj: obj,
      current:1
    })
  }
  filterData(){
    let totaldata = this.state.totalData
    let searchObj = this.state.searchObj;
    if ( searchObj != null ) {
      var newData = []
        var key = searchObj.key        
        for(var i=0; i<totaldata.length; i++) {
          if(totaldata[i].Name.indexOf(key) > -1) {
            newData.push(totaldata[i])
          }
        }
        return newData
    } else {
      return totaldata
    }

  }
 renderTable () {
   var dmpData = this.state.totalData
   let page = this.state.current;
   if (dmpData && dmpData.length > 0) {
    let filterData = this.filterData() 
    let start = (page -1) * pageSize
    let end = start + pageSize
    let list = filterData.slice(start, end)
     return (
       <div>
         <Notice title="最多可选10个人群！" style={{marginBottom: '10px'}}/>
         <Table dataSource={list}
                rowSelection={this.state.rowSelection}
                primaryKey='Id'>
          <Table.Column title="人群名称" dataIndex="Name"/>
          <Table.Column title="全网人群数量" dataIndex="Coverage"/>
         </Table>
         <div style={{marginTop: '16px', float: 'right'}}>
            {
              this.renderPagination (filterData.length)
            }
          </div>
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
