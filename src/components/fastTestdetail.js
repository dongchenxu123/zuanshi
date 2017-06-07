import React from 'react';
import '../styles/App.css';
import {testCombinationResults, testCombinationReport, updateCombinationCpm} from '../help/url';
import Button from 'qnui/lib/button';
import axios from 'axios';
import Table from 'qnui/lib/table';
import Pagination from 'qnui/lib/pagination';
import {fastList} from '../help/linkUrl';
import { Link } from 'react-router-dom';
import ChangeCharge from '../views/addfastTest/changeChargeinput';
import NumberPicker from 'qnui/lib/number-picker';
import Loading from 'qnui/lib/loading';
import Select, {Option} from 'qnui/lib/select';
import Feedback from 'qnui/lib/feedback';
const Toast = Feedback.toast;
const titleDirection = {
	 		'0' : '通投',
      '32768' : '智能定向',
      '16' : '访客定向',
      '131072' : '相似宝贝定向-喜欢相似宝贝的人群',
      '262144' : '相似宝贝定向-喜欢我的宝贝的人群',
      '8192' : '群体定向',
      '64' : '兴趣点定向',
      '16384' : '营销场景定向'
}
const crowdValue = {
	    '1' : '自主店铺',
			'2' : '种子店铺',
			'10' : '触达人群',
			'20' : '兴趣人群',
			'30' : '意向人群',
			'40' : '行动人群',
			'50' : '成交人群'
}
const subCrowdValue ={
		1001: '广告展现',
		2001: '广告点击',
		3001: '店铺搜索',
		3002: '店铺浏览',
		4001: '收藏宝贝',
		4002: '收藏店铺',
		4004: '添加购物车',
		4005: '确认订单',
		5001: '购买宝贝'
}
class FasttestdetailView extends React.Component {
 constructor () {
   super()
   this.state={
     resultData: [],
     current: 1,
     total: 0,
		 cpmValue: 0,
		 visible: false,
		 selectType: '',
		 selectRange: '',
		 valuenum: 0,
		 newResultData: [],
		 showloading: true
   }
 }
 componentWillMount() {
   this.loadCombinationResults('ctr', 'DESC')
 }
 loadCombinationResults (ctr, DESC) {
   var self = this
	 axios.post(testCombinationReport, {
     test_id: self.props.match.params.id
	})
   .then(function (response) {
		 axios.post(testCombinationResults, {
       test_id: self.props.match.params.id,
       order_direction: DESC,
			 order_by: ctr
     })
     .then(function (response) {
         self.setState({
           resultData: response.data.combination_results,
					 newResultData: response.data.combination_results,
           total: response.data.total,
					 showloading: false
          })
       })
      .catch(function (error) {
        console.log(error);
      });
     })
    .catch(function (error) {
      console.log(error);
    });
 }
 // onchangePage (page) {
 //   this.loadCombinationResults(page, 'ctr', 'DESC')
 // }
 rendercpc (value, index, record) {
   return (<span>{(record.click == 0 ? 0 : record.charge/record.click).toFixed(2)} 元</span>)
 }
 // renderPagination () {
 //   var pageSize = 10;
 //   var current = this.state.current;
 //   var total = this.state.total;
 //   if(this.state.resultData === null) {
 //     return
 //   } else if(current == 1 && this.state.resultData.length < pageSize && this.state.resultData.length <= total){ return null}
 //   else if(this.state.resultData.length > 0) {
 //     return (<Pagination current={this.state.current} onChange={this.onchangePage.bind(this)}
 //                   defaultCurrent={1} total={total} pageSize={10}/>)
 //   }
 // }
 rendercost (value, index, record) {
   return (<span>{record.charge} 元</span>)
 }

 renderctr (value, index, record) {
  return (<span>{(record.pv == 0 ? 0 : record.click/record.pv*100).toFixed(2)} %</span>)
 }
 rendercpm (value, index, record) {
   return (<span>{(record.cpm/100/1000*record.pv).toFixed(2)} 元</span>)
 }
 rendercreativeName (value, index, record) {
   var creative =JSON.parse(record.creative)
	 var adzone =JSON.parse(record.adzone)
   return(<div>
		        <div><img style={{width:250, height: 'auto', marginRight: '10px', marginBottom: '10px'}} src={creative.ImagePath}/></div>
		 			</div>)
 }
 // rendercreativepic (value, index, record) {
 //   var creative =JSON.parse(record.creative)
 //   return(<img style={{width:300, height: 'auto'}} src={creative.ImagePath}/>)
 // }
 // renderadzone (value, index, record) {
 //   var adzone =JSON.parse(record.adzone)
 //   return(<span>{adzone.Name}</span>)
 // }
 rendersubCrowds (value, index, record) {
   var crowds = JSON.parse(record.crowds)
	 var creative =JSON.parse(record.creative)
	 var adzone =JSON.parse(record.adzone)
   return (
      <div>
				<div style={{paddingBottom: '8px'}}><span style={{lineHeight: '20px', fontSize: '12px'}}>资源位名称：{adzone.Name}</span></div>
				<div style={{paddingBottom: '8px'}}><span style={{lineHeight: '20px', fontSize: '12px'}}>创意名称：{creative.Name}</span></div>
        { crowds && crowds.length > 0
          ? crowds.map((item,index) => {
            return (
              <div style={{paddingBottom: '8px', lineHeight: '20px',fontSize: '12px'}} key={item.crowd_type}>
                <span>{titleDirection[item.crowd_type]}&nbsp;&nbsp;</span>
                <span>{item.sub_crowds ? ':' : ''}&nbsp;&nbsp;</span>
                {item.crowd_value ?  <span>{crowdValue[item.crowd_value]} : &nbsp;&nbsp;</span> : ''}
                {
                  item.crowd_type == 16384
                  ? ( item.sub_crowds ? item.sub_crowds.map((v, i) => {
                 return (<span style={{color: '#333'}} key={v.sub_crowd_value}>{subCrowdValue[v.sub_crowd_value]}&nbsp;&nbsp;</span>)
                  }) : null)
                  : ( item.sub_crowds ? item.sub_crowds.map((v, i) => {
                 return (<span style={{color: '#333'}} key={v.sub_crowd_value}>{v.sub_crowd_name}&nbsp;&nbsp;</span>)
                  }) : null)
                }
              </div>
            )
           })
           : <div>暂无定向</div>
        }
			</div>
    )
  }
 onChangecpm (value) {
	 this.setState({
		 cpmValue: value
	 })
 }
 onsubmitcpm () {
	 axios.post(updateCombinationCpm, {
		 test_id: parseInt(this.props.match.params.id)
	 })
	 .then(function (response) {
	})
		.catch(function (error) {
			console.log(error);
		});
 }
 changecpm (record, sendvalue) {
	 var resultData = this.state.resultData
   for (var j=0; j<resultData.length; j++) {
      if(resultData[j].id == record.id) {
        var sendvalue = sendvalue
        resultData[j].cpm = sendvalue*100
      }
    }
	  this.setState({
	    resultData: resultData
	  })
 }
 rendercharge (value, index, record) {
	 return(
		 <ChangeCharge changeCharge={record.cpm/100} sendcpm={this.changecpm.bind(this, record)} id={record.test_id} record={record}/>
	 )
 }
 onSort (dataIndex, order, sort) {
	 console.log(dataIndex, order, sort)
	 var newResultData = this.state.newResultData.sort(function(a, b) {
		 let result = a[dataIndex] - b[dataIndex]
		 return  (order == 'asc') ? (result > 0 ? 1 : -1) : (result > 0 ? -1 : 1)
	 })
   this.setState({
		 newResultData
	 })
 }

 renderTable () {
	//  var resultData = this.state.resultData
	 var newResultData = this.state.newResultData
	 if (newResultData && newResultData.length > 0) {
		 return (
			 <Table dataSource={newResultData} onSort = {this.onSort.bind(this)}>
					 <Table.Column title="创意图" cell={this.rendercreativeName.bind(this)} style={{width: '300px'}}/>
					 <Table.Column title="创意 && 资源位 && 定向" cell={this.rendersubCrowds.bind(this)}/>
					 <Table.Column title="展现量" dataIndex="pv" sortable />
					 <Table.Column title="点击量" dataIndex="click" sortable/>
					 <Table.Column title="点击率" dataIndex="ctr" cell={this.renderctr.bind(this)} sortable/>
					 <Table.Column title="花费" dataIndex="charge" cell={this.rendercost.bind(this)} sortable/>
					 <Table.Column title="eCPC" dataIndex="ecpc" cell={this.rendercpc.bind(this)} sortable/>
					 <Table.Column title="eCPM" dataIndex="ecpm" cell={this.rendercpm.bind(this)} sortable/>
					 <Table.Column title="出价" cell={this.rendercharge.bind(this)}/>
				 </Table>
		 )
	 } else {
		return (<div style={{margin: '50px auto', textAlign: 'center'}}><span>暂获取不到数据</span></div>)
	}
 }

changeSelectType (value) {
	this.setState({
		selectType: value
	})
}
changeSelectRange (value) {
	this.setState({
		selectRange: value
	})
}
changevaluenum (value) {
	this.setState({
		valuenum: value
	})
}
filterFun (resultData, newArr, selectType, selectRange, valuenum) {
	for (var i=0; i<resultData.length; i++) {
		if (selectType == 'ecpm') {
			if (resultData[i][selectType]/100 - valuenum < 0 && selectRange == 0) {
				newArr.push(resultData[i])
			}
		} else {
			if (resultData[i][selectType] - valuenum < 0 && selectRange == 0) {
				newArr.push(resultData[i])
			}
		}
		if (selectType == 'ctr') {
			if (resultData[i][selectType]*100 - valuenum < 0 && selectRange == 0) {
				newArr.push(resultData[i])
			}
		} else {
			if (resultData[i][selectType] - valuenum < 0 && selectRange == 0) {
				newArr.push(resultData[i])
			}
		}
		if (selectType == 'ecpm') {
			if (resultData[i][selectType]/100 - valuenum > 0 && selectRange == 1) {
				newArr.push(resultData[i])
			}
		} else {
			if (resultData[i][selectType] - valuenum > 0 && selectRange == 1) {
				newArr.push(resultData[i])
			}
		}
		if (selectType == 'ctr') {
			if (resultData[i][selectType]*100 - valuenum > 0 && selectRange == 1) {
				newArr.push(resultData[i])
			}
		} else {
			if (resultData[i][selectType] - valuenum > 0 && selectRange == 1) {
				newArr.push(resultData[i])
			}
		}
		if (selectType == 'ecpm') {
			if (resultData[i][selectType]/100 - valuenum == 0 && selectRange == 2) {
				newArr.push(resultData[i])
			}
		} else {
			if (resultData[i][selectType] - valuenum == 0 && selectRange == 2) {
				newArr.push(resultData[i])
			}
		}
		if (selectType == 'ctr') {
			if (resultData[i][selectType]*100 - valuenum == 0 && selectRange == 2) {
				newArr.push(resultData[i])
			}
		} else {
			if (resultData[i][selectType] - valuenum == 0 && selectRange == 2) {
				newArr.push(resultData[i])
			}
		}
  }
}
onSubmit () {
	var selectType = this.state.selectType
	var selectRange = this.state.selectRange
	var valuenum = this.state.valuenum
	var resultData = this.state.resultData
	var newResultData = this.state.newResultData
	var newArr = []
	if (!selectType) {
		Toast.error('您还没有选择查找类型')
		return
	}
	if (!selectRange) {
		Toast.error('您还没有选择查找条件')
		return
	}
  this.filterFun(resultData, newArr, selectType, selectRange, valuenum)
	var newData = Array.from(new Set(newArr))
	this.setState({
		newResultData: newData
	})
}
 render () {
	 var title = decodeURI(this.props.match.params.title)
	 return (
      <div className='panel panel-default' style={{margin: '10px'}}>
        <div className="panel-heading" style={{overflow: 'hidden'}}>
          <div style={{float: 'left'}}><span style={{fontSize: '14px'}}>测试名称：{title}</span></div>
					<div style={{float: 'left', marginLeft: '8px'}}>
						<Select placeholder="选择类型" style={{marginLeft: '8px'}} selectType={this.state.selectType}
									onChange={this.changeSelectType.bind(this)}>
							<Option value="pv">展现量</Option>
							<Option value="click">点击量</Option>
							<Option value="ctr">点击率</Option>
							<Option value="ecpm">eCPM</Option>
							<Option value="ecpc">eCPC</Option>
							<Option value="charge">花费</Option>
						</Select>
						<Select placeholder="选择条件" style={{marginLeft: '8px'}} selectRange={this.state.selectRange}
						    onChange={this.changeSelectRange.bind(this)}>
							<Option value="0">小于</Option>
							<Option value="1">大于</Option>
							<Option value="2">等于</Option>
						</Select>
						<NumberPicker style={{marginLeft: '8px', position: 'relative', top: '-10px'}} inputWidth={100}
										defaultValue={this.state.valuenum*1} onChange={this.changevaluenum.bind(this)}/>
						<Button type="primary" style={{marginLeft: '8px', position: 'relative', top: '-10px'}}
								onClick={this.onSubmit.bind(this)}>查找</Button>
					</div>
					<div style={{float: 'right'}}><Link to={fastList}><Button type="normal" style={{marginRight: '15px'}}>返回列表页</Button></Link></div>
        </div>
        <div className="panel-body">
				  {
						this.state.showloading
						? <div style={{margin: '20px auto', width: '200px'}}><Loading show={this.state.showloading}/></div>
						: this.renderTable()
					}
				  <div style={{marginTop: '16px', float: 'right'}}>
	          {
	            /*this.renderPagination ()*/
	          }
	        </div>
				</div>
      </div>
     )
  }
}

export default FasttestdetailView;
