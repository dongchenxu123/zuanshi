import React from 'react';
import '../styles/App.css';
import {testCombinationReport, updateCombinationCpm} from '../help/url';
import Button from 'qnui/lib/button';
import axios from 'axios';
import Table from 'qnui/lib/table';
import Pagination from 'qnui/lib/pagination';
import {fastList} from '../help/linkUrl';
import { Link } from 'react-router-dom';
import ChangeCharge from '../views/addfastTest/changeChargeinput';
import Checkbox from 'qnui/lib/checkbox';
// import EditInline from '../views/addfastTest/editInline';
import NumberPicker from 'qnui/lib/number-picker';
import Loading from 'qnui/lib/loading';
import Select, {Option} from 'qnui/lib/select';
import Feedback from 'qnui/lib/feedback';
import Balloon from 'qnui/lib/balloon';
import {campaginList} from '../help/linkUrl'
const history = createHistory()
import createHistory from 'history/createHashHistory';
import Icon from 'qnui/lib/icon';
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
		 showloading: true,
		 editArr: [],
		 rowData: {},
		 editCombinations: {}
   }
 }
 isMount=false
 componentWillMount() {
   var obj = JSON.parse(localStorage.getItem('combinationDataObj'))
   if(obj) {
	   this.setState({
         editCombinations: obj.editList
	   })
   }
   this.loadCombinationResults()
 }
 componentDidMount () {
	 this.isMount=true
	}
 componentWillUnmount() {
	 this.isMount=false
 }
 loadCombinationResults () {
   var self = this
	 axios.post(testCombinationReport, {
     test_id: self.props.match.params.id
	 })
   .then(function (response) {
		 if(response.data.length == 0 || response.data.err) {
			 self.setState({
				 showloading: false
			 })
		 } else {
			 var reports = response.data.reports
 			 for (var i=0;i<reports.length;i++) {
				reports[i].checked_list = []
			  const Combination = reports[i].Combination
				for (var j=0; j<Combination.length; j++) {
					reports[i].zuanshi_key = Combination[j].Id
				}
      }
			self.setState({
 				resultData: reports,
 				newResultData: reports,
 				showloading: false
 			})
    	}
     })
    .catch(function (error) {
      console.log(error);
    });
 }
 renderctr (Rpts, Creatives) {
	 var id = ''
	 for(var i=0; i<Creatives.length; i++) {
		 id = Creatives[i].Id
	 }
	 return(
		 <div>
        {
					Rpts && Rpts.length > 0
					? Rpts.map((item, index) => {
						return(
							<div style={{margin: '10px',lineHeight: '40px'}} key={index}>
								{
									<span>{item.Pv > 0 ? (item.Click/item.Pv).toFixed(2) : 0}</span>
								}
							</div>
						)
					})
					: <div>loading...</div>
				}
		 </div>
	 )
 }
 renderAdzoneName (value, index, record) {
   var AdzoneName = record.Combination.Adzone.Name
	 return(<span>{AdzoneName}</span>)
 }
 rendercreativeimg (Creatives, Rpts, record) {
	var id = record.zuanshi_key
	var checked_list = record.checked_list
	 return (
		<div>
			{
				Creatives && Creatives.length > 0
				? Creatives.map((item, index) => {
					const imgsm = <img src={item.ImagePath} style={{width: '100px', margin: '10px'}}/>
					let checked = (checked_list|| []).indexOf(item.Id)
					return(
						<div>
							<Balloon trigger={imgsm} align="lt" alignment="edge" style={{width: 300}}>
								<img src={item.ImagePath} style={{width: '250px'}}/>
							</Balloon>
							<Checkbox onChange={this.SelectCreatives.bind(this, id, item.Id)} checked={checked > -1}/>
						</div>
					)
				})
				: <div>loading...</div>
			}
		 </div>
		)
	}
 renderPv(Rpts, Creatives) {
	 var id = ''
	 for(var i=0; i<Creatives.length; i++) {
		 id = Creatives[i].Id
	 }
	 return(
		 <div>
         {
			Rpts && Rpts.length > 0
			? Rpts.map((item, index) => {
				return(
					<div style={{margin: '10px', lineHeight: '40px'}} key={index}>
						{
							<span>{item.Pv}</span>
						}
					</div>
				)
			})
			: <div>loading...</div>
		}
		 </div>
	 )
 }
 rendercreative (value, index, record) {
   var Creatives = record.Combination.Creatives
	 var Rpts = record.Rpts
	 const styles={
		 titlebox: {
			 float: 'left',
			 width: '14.28%'
		 },
		 contentBox: {
			 display: 'inline-block',
			 backgroundColor: '#ebebeb',
			 width: '100%',
			 padding: '10px'
		 }

	 }
	 return (
		 <div>
		 		<div style={styles.titlebox}><span style={styles.contentBox}>展现量</span><br/>
					{this.renderPv(Rpts, Creatives)}
				</div>
				<div style={styles.titlebox}><span style={styles.contentBox}>点击量</span><br/>
					{this.renderClick(Rpts, Creatives)}
				</div>
				<div style={styles.titlebox}><span style={styles.contentBox}>点击率</span><br/>
					{this.renderctr(Rpts, Creatives)}
				</div>
				<div style={styles.titlebox}><span style={styles.contentBox}>花费</span><br/>
					{this.rendercharge(Rpts, Creatives)}
				</div>
				<div style={styles.titlebox}><span style={styles.contentBox}>eCPC</span><br/>
					{this.renderEcpc(Rpts, Creatives)}
				</div>
				<div style={styles.titlebox}><span style={styles.contentBox}>eCPM</span><br/>
					{this.renderEcpm(Rpts, Creatives)}
				</div>
				<div style={styles.titlebox}><span style={styles.contentBox}>创意图片</span><br/>{this.rendercreativeimg(Creatives, Rpts, record)}</div>
    </div>
	 )
 }
 //修改价钱
 sendcpm (crowds, com_zuanshi_key, key, sendvalue) {
	 var newResultData = this.state.newResultData
	 let newArr
	 var test_id = this.props.match.params.id
	 for(var i=0; i<newResultData.length; i++) {
		 if(newResultData[i].com_zuanshi_key == com_zuanshi_key) {
			 var newcrowds = newResultData[i].Combination.Crowds
			 for(var j=0; j<newcrowds.length; j++) {
				 if(newcrowds[j].Crowds_zuanshi_id == key) {
					 newcrowds[j].matrix_price[0].Price = sendvalue*100
					}
			 }
			 newArr = [...this.state.editArr, newResultData[i].Combination]
		 }
	 }
	 this.setState({
		 newResultData: newResultData
	 })
	 axios.post(updateCombinationCpm, {
		 test_id: parseInt(test_id),
		 combinations: newArr
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
 rendersubCrowds (value, index, record) {
	 var crowds = record.Combination.Crowds
	 var com_zuanshi_key = record.com_zuanshi_key
	 var status = this.props.match.params.status
	 return (
      <div>
				{ crowds && crowds.length > 0
          ? crowds.map((item,index) => {
						let key= item.Crowds_zuanshi_id
						return (
							<div key={index} style={{paddingBottom: '8px', lineHeight: '24px'}}>
								<div>
									<span style={{float: 'left'}}>{titleDirection[item.crowd_type]}&nbsp;&nbsp;</span>
									<ChangeCharge sendcpm={this.sendcpm.bind(this, crowds, com_zuanshi_key, key)}
																cpm={item.matrix_price[0].Price/100}
																status={status}
																/>
								</div>
								<div style={{clear: 'both'}}>
								 {item.crowd_value ?  <span>{crowdValue[item.crowd_value]} : &nbsp;&nbsp;</span> : ''}
								 {
									 item.crowd_type == 16384
									 ? ( item.sub_crowds ? item.sub_crowds.map((v, i) => {
									return (<span style={{color: '#333'}} key={i}>{subCrowdValue[v.sub_crowd_value]}&nbsp;&nbsp;</span>)
									 }) : null)
									 : ( item.sub_crowds ? item.sub_crowds.map((v, i) => {
									return (<span style={{color: '#333'}} key={i}>{v.sub_crowd_name}&nbsp;&nbsp;</span>)
									 }) : null)
								 }
								</div>
						 </div>
						)
           })
           : <div>暂无定向</div>
        }
			</div>
    )
  }

 renderClick (Rpts, Creatives) {
	 var id = ''
 	for(var i=0; i<Creatives.length; i++) {
 		id = Creatives[i].Id
 	}
 	return(
 		<div>
 			 {
 				 Rpts && Rpts.length > 0
 				 ? Rpts.map((item, index) => {
 					 return(
 						 <div style={{margin: '10px',lineHeight: '40px'}}>
 							 <span>{item.Click}</span>
 						 </div>
 					 )
 				 })
 				 : <div>loading...</div>
 			 }
 		</div>
 	)
 }
 rendercharge (Rpts, Creatives) {
	 var id = ''
	 for(var i=0; i<Creatives.length; i++) {
		 id = Creatives[i].Id
	 }
	 return(
		 <div>
				{
					Rpts && Rpts.length > 0
					? Rpts.map((item, index) => {
						return(
							<div style={{margin: '10px',lineHeight: '40px'}}>
								<span>￥ {(item.Charge).toFixed(2)}</span>
							</div>
						)
					})
					: <div>loading...</div>
				}
		 </div>
	 )
 }
 renderEcpc (Rpts, Creatives) {
	 var id = ''
	 for(var i=0; i<Creatives.length; i++) {
		 id = Creatives[i].Id
	 }
	 return(
		 <div>
				{
					Rpts && Rpts.length > 0
					? Rpts.map((item, index) => {
						return(
							<div style={{margin: '10px',lineHeight: '40px'}}>
								<span>￥ {item.Click > 0 ? (item.Charge/item.Click).toFixed(2) : 0}</span>
							</div>
						)
					})
					: <div>loading...</div>
				}
		 </div>
	 )
 }
 renderEcpm (Rpts, Creatives) {
	 var id = ''
	 for(var i=0; i<Creatives.length; i++) {
		 id = Creatives[i].Id
	 }
	 return(
		 <div>
				{
					Rpts && Rpts.length > 0
					? Rpts.map((item, index) => {
						return(
							<div style={{margin: '10px',lineHeight: '40px'}}>
								<span>￥ {(item.Charge/1000*item.Pv).toFixed(2)}</span>
							</div>
						)
					})
					: <div>loading...</div>
				}
		 </div>
	 )
 }
 renderTable () {
	let renderList = this.renderListData()
	if (renderList && renderList.length > 0) {
		 return (
			 <Table dataSource={renderList}>
			     <Table.Column title="资源位" cell={this.renderAdzoneName.bind(this)} width={150}/>
					 <Table.Column title="定向" cell={this.rendersubCrowds.bind(this)} width={200}/>
					 <Table.Column title='创意' cell={this.rendercreative.bind(this)} style={{textAlign: 'center'}}/>
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
		for(var j=0; j<resultData[i].Rpts.length; j++) {
			if (resultData[i].Rpts[j][selectType] - valuenum < 0 && selectRange == 0) {
				newArr.push(resultData[i])
			}
			if (resultData[i].Rpts[j][selectType] - valuenum > 0 && selectRange == 1) {
				newArr.push(resultData[i])
			}
			if (resultData[i].Rpts[j][selectType] - valuenum == 0 && selectRange == 2) {
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
renderListData(){
  let origin = this.state.newResultData;
  let editList = this.state.editCombinations;
  let list = []
  for (let i=0; i<origin.length; i++) {
    let tmp = origin[i];
    let editItem = editList[tmp.zuanshi_key]
    if (editItem){
      list.push(editItem)
    } else{
      list.push(tmp)
    }
  }
  return list
}
//选择创意
  SelectCreatives (id, CreativesId, checked) {
  var combinationData = this.state.newResultData
  let editList = this.state.editCombinations;
  let combination;
  if (editList[id]) {
    combination = editList[id]
  } else {
    for (var i=0; i< combinationData.length; i++) {
      if(combinationData[i].zuanshi_key == id) {
        combination ={...combinationData[i]}
        break
      }
    }
  }
  if (combination) {
    let checked_list = combination.checked_list || []
    var idx = checked_list.indexOf(CreativesId)
    if(checked && idx < 0) {
      checked_list = checked_list.concat([CreativesId])
    }
    if(!checked && idx > -1) {
      checked_list.splice(idx, 1)
    }
    combination = {...combination, checked_list: checked_list};
    this.setState({
      editCombinations: {...this.state.editCombinations, [combination.zuanshi_key]: combination}
    })
  }
}
genCreatives(checked_list, tlist){
    let list = []
    checked_list.forEach(item => {
      for(let i=0; i< tlist.length; i++) {
        let id = tlist[i].Id;
        if (id === item ) {
          list.push(tlist[i])
          break
        }
      }
    })
    return list
  }
 setClick () {
   let editList = this.state.editCombinations;
   let keys = Object.keys(editList)
   if (keys.length === 0){
      Toast.error('您没有选择投放组合！')
      return
    }
   let combinationData = []
   let combinationObj = {}
   let newResultData = this.state.newResultData
    for(let i=0; i<keys.length; i++ ) {
        let combination = editList[keys[i]]
        let checked_list = combination.checked_list;
        if (checked_list.length > 0) {
          let creativs = this.genCreatives(checked_list, combination.Combination.Creatives);
          combinationObj = {...combination.Combination, Creatives: creativs}
          combinationData.push(combinationObj)
      }
	}
	var combinationDataObj = {
		combinationData: combinationData,
		editList: editList,
		id: this.props.match.params.id,
		title: this.props.match.params.title,
		status: this.props.match.params.status
	}
	combinationDataObj = JSON.stringify(combinationDataObj)
	if(combinationData.length > 0) {
      localStorage.setItem("combinationDataObj", combinationDataObj)
	}
	if(combinationData.length <= 0) {
		Toast.error('您没有选择投放组合！')
		return
	}
	history.push('/dayTest/infoForm/'+0)
 }
 campaignList () {
   let editList = this.state.editCombinations;
   let keys = Object.keys(editList)
   if (keys.length === 0){
      Toast.error('您没有选择投放组合！')
      return
    }
   let combinationData = []
   let combinationObj = {}
    for(let i=0; i<keys.length; i++ ) {
        let combination = editList[keys[i]]
        let checked_list = combination.checked_list;
        if (checked_list.length > 0) {
          let creativs = this.genCreatives(checked_list, combination.Combination.Creatives);
          combinationObj = {...combination.Combination, Creatives: creativs}
          combinationData.push(combinationObj)
      }
	}
	var combinationDataObj = {
		combinationData: combinationData,
		editList: editList,
		id: this.props.match.params.id,
		title: this.props.match.params.title,
		status: this.props.match.params.status
	}
	combinationDataObj = JSON.stringify(combinationDataObj)
	console.log(combinationData)
	if(combinationData.length > 0) {
      localStorage.setItem("combinationDataObj", combinationDataObj)
	}
	if(combinationData.length <= 0) {
		Toast.error('您没有选择投放组合！')
		return
	}
   history.push(campaginList)
 }
 render () {
	 var title = decodeURI(this.props.match.params.title)
	//  let renderList = this.renderListData()
	 return (
      <div className='panel panel-default' style={{margin: '10px'}}>
        <div className="panel-heading" style={{overflow: 'hidden'}}>
            <div style={{float: 'left', fontSize: '14px'}}>
			    <Link to={fastList} style={{color: '#4d7fff'}}>返回列表页</Link>&nbsp;&nbsp;
				<Icon type="arrow-right" size='xs'/>&nbsp;&nbsp;
				<span>测试名称：{title}</span>
			</div>
			<div style={{float: 'left', marginLeft: '8px'}}>
				<Select placeholder="选择类型" style={{marginLeft: '8px'}} selectType={this.state.selectType}
							onChange={this.changeSelectType.bind(this)}>
					<Option value="Pv">展现量</Option>
					<Option value="Click">点击量</Option>
					<Option value="Ctr">点击率</Option>
					<Option value="Ecpm">eCPM</Option>
					<Option value="Ecpc">eCPC</Option>
					<Option value="Charge">花费</Option>
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
		</div>
		<div className="panel-body" style={{paddingBottom: '50px'}}>
			{
				this.state.showloading
				? <div style={{margin: '20px auto', width: '200px'}}><Loading show={this.state.showloading}/></div>
				: this.renderTable()
			}
		</div>
		<div className="panel-footer" style={{overflow: 'hidden', backgroundColor: '#fff'}}>
			<div style={{float: 'right'}}>
				<Button type="primary" onClick={this.campaignList.bind(this)} style={{marginRight: '10px'}}>添加到常规计划</Button>
				<Button type="primary" onClick={this.setClick.bind(this)}>去新建计划</Button>
			</div>
		</div>
      </div>
     )
  }
}

export default FasttestdetailView;
