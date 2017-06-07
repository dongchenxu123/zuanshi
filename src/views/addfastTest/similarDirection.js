import React from 'react';
import axios from 'axios';
import { getShopitems } from '../../help/url';
import { Link } from 'react-router-dom';
import Input from 'qnui/lib/input';
import {addfastTestStep3} from '../../help/linkUrl';
import Button from 'qnui/lib/button';
import Table from 'qnui/lib/table';
import Icon from 'qnui/lib/icon';
import createHistory from 'history/createHashHistory';
const history = createHistory()
import Pagination from 'qnui/lib/pagination';
import Feedback from 'qnui/lib/feedback';
const Toast = Feedback.toast;
class SimilarDirection extends React.Component {
  constructor () {
    super()
    this.state={
      searchkw: '',
      itemData: [],
      rowSelection: {
        onChange: this.onChangeTable.bind(this),
        selectedRowKeys: [],
        mode: 'single'
      },
      total: 0,
      current: 1
    }
  }
  isMount=false
  componentWillMount () {
    var select = this.props.data.similarDirection.select
    var searchkw = this.props.data.similarDirection.searchkw
    if(select && searchkw != '') {
      let {rowSelection} = this.state;
      rowSelection.selectedRowKeys = select;
      this.setState({ rowSelection,  searchkw: searchkw});
      this.loadOrders(searchkw, 1)
    }
  }
  componentDidMount () {
 	 this.isMount=true
  }
  componentWillUnmount() {
 	 this.isMount=false
  }
  loadOrders (kw, page) {
		var self = this;
    axios.post(getShopitems,{
      kw: kw,
      page_num: page,
      page_size: 10
    })
    .then(function (response) {
      if(self.isMount) {
      self.setState({
        itemData: response.data.Items,
        current: page,
        total: response.data.Total
      })
     }
    })
    .catch(function (error) {
      console.log(error);
    });
	}
  onchangePage (value) {
		var self = this;
    var kw = this.state.searchkw
		self.loadOrders(kw, value)

	}
  renderPagination () {
		var pageSize = 10;
		var current = this.state.current;
		var total = this.state.total;
		if(this.state.itemData === null) {
			return
		} else if(current == 1 && this.state.itemData.length < pageSize && this.state.itemData.length <= total){ return null}
		else if(this.state.itemData.length > 0) {
			return (<Pagination current={this.state.current} onChange={this.onchangePage.bind(this)}
										defaultCurrent={1} total={this.state.total} pageSize={10}/>)
		}
	}
  onChangeTable(ids, records){
    let {rowSelection} = this.state;
    rowSelection.selectedRowKeys = ids;
  	this.setState({
			rowSelection
		})
  }
  onChangekw (value) {
    this.setState({
      searchkw: value
    })
  }
  onClickbtn () {
    var self = this
    var keyword = this.state.searchkw
    var page = 1
    this.loadOrders(keyword, page)

  }
  renderImg (value, index, record) {
    if(record.PicUrl.indexOf('nopicture.gif') > -1) {
      return (<span>暂无图片</span>)
    } else {
      return (<img src={record.PicUrl} style={{width: 80, height: 80}}/>)
    }
  }
  onSure () {
    var select = this.state.rowSelection.selectedRowKeys
    if(select.length <= 0) {
      this.showError()
      return
    }
    var step = 3
    var type = 'similar'
    var crowdType = 131072
    var searchkw = this.state.searchkw
    var itemData = this.state.itemData
    var itemname = []
    for(var i=0; i<itemData.length;i++) {
      for(var j=0; j<select.length;j++) {
        if(itemData[i].Id == select[j]) {
          itemname.push({sub_crowd_name: itemData[i].Name, sub_crowd_value: select[j]})
        }
      }
    }
		this.props.commonData({step, select, type, crowdType, searchkw, itemname})
		history.push(addfastTestStep3)
  }
  showError  () {Toast.error('您还没有选择相似宝贝人群')}
  render () {
    return (
      <div className='panel panel-default' style={{margin: '10px'}}>
        <div className="panel-heading" style={{overflow: 'hidden'}}>
          相似宝贝定向
        </div>
        <div className="panel-body" style={{paddingBottom: '50px'}}>
          <div style={{padding: '10px'}}>
            <Input size="large" placeholder="标签关键词，如大衣"
                value={this.state.searchkw}
                defaultValue={this.state.searchkw}
                onChange={this.onChangekw.bind(this)}/>
            <Button type="primary" style={{marginLeft: '15px'}} onClick={this.onClickbtn.bind(this)}>确定</Button>
          </div>
          <div>
          {
            this.state.itemData
            ? <Table dataSource={this.state.itemData}
                         rowSelection={this.state.rowSelection} style={{clear: 'both', paddingTop: '8px'}} primaryKey='Id'>
             <Table.Column cell={this.renderImg.bind(this)} title="宝贝图片"/>
   					 <Table.Column title="宝贝名称" dataIndex='Name'/>
             <Table.Column title="宝贝链接" dataIndex='LandingPage'/>
           </Table>
           : <div style={{textAlign: 'center', margin: '20px auto', backgroundColor: '#fff', padding: '50px 0', clear: 'both'}}>
               <p><Icon type="cry" />&nbsp;&nbsp;<span>暂无测试方案</span></p>
             </div>
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
              <Link to={addfastTestStep3}><Button type="normal" style={{marginRight: '15px'}}>取消</Button></Link>
              <Button type="normal" onClick={this.onSure.bind(this)}>确定</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default SimilarDirection
