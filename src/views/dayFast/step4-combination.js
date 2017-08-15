import React from 'react'
import ReactDOM from 'react-dom'
import Table from 'qnui/lib/table';
import Loading from 'qnui/lib/loading';
import axios from 'axios';
import Checkbox from 'qnui/lib/checkbox';
import {getBestcombinationSolution} from '../../help/url';
import {setSolution, infoFormUrl} from '../../help/linkUrl';
import { Link } from 'react-router-dom';
import Button from 'qnui/lib/button';
const history = createHistory()
import createHistory from 'history/createHashHistory';
import Feedback from 'qnui/lib/feedback';
import Balloon from 'qnui/lib/balloon';
const Toast = Feedback.toast;
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
class CreateCombinationView extends React.Component {
  constructor () {
    super ()
    this.state={
      settingsData: [],
      showloading: true,
      editCombinations: {}
    }
  }
  isMount=false
  componentWillMount () {
    var step3Data = this.props.data.step3Data
    var campaigns = this.props.data.step2.campaignItem
    var self = this
    var step4Data = this.props.data.step4Data.editList
    if(step4Data) {
      this.setState({
        editCombinations: step4Data
      })
    }
    if(step3Data != null) {
      axios.post(getBestcombinationSolution, {
      effect: step3Data.effect,
      optimize_field: step3Data.optimize_field,
      limits: step3Data.limits,
      campaigns: campaigns,
      constraints: step3Data.constraints
      })
      .then(function (response) {
        var settingsData = response.data.settings
        if(response.data.length <= 0 || response.data.err) {
          self.setState({
            showloading: false
          })
        } else {
          for(var i=0; i<settingsData.length; i++) {
            settingsData[i].checked_list = []
            settingsData[i].zuanshi_key = i
            for(var j=0; j<settingsData[i].Adzones.length; j++) {
              for(var m=0; m<settingsData[i].Crowds.length; m++) {
                if(settingsData[i].Adzones[j].Id == settingsData[i].Crowds[m].matrix_price[0].AdzoneId) {
                  settingsData[i].Crowds[m] = Object.assign({}, settingsData[i].Crowds[m], {adzonedName: settingsData[i].Adzones[j].Name})
                }
              }
            }
          }
          if(self.isMount) {
          self.setState({
            settingsData: settingsData,
            showloading: false
          })
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
  }
  componentDidMount () {
	 this.isMount=true
	}
 componentWillUnmount() {
	 this.isMount=false
 }
  renderImg (value, index, record) {
    var Creatives= record.Creatives
    var id = record.zuanshi_key
    var checked_list = record.checked_list
    return (
      <div>
         {
           Creatives
           ? Creatives.map((item, index) => {
             let checked = (checked_list|| []).indexOf(item.Id)
             const imgsm = <img src={item.ImagePath} style={{width: '100px'}}/>
             return (
               <div style={{marginBottom: '10px'}} key={index}>
                  <Balloon trigger={imgsm} align="lt" alignment="edge" style={{width: 300}}>
                     <img src={item.ImagePath} style={{width: '250px'}}/>
                  </Balloon>
                  <Checkbox style={{marginLeft: '16px'}}
                            onChange={this.SelectCreatives.bind(this, id, item.Id)}
                            checked={checked > -1}/>
             </div>)
           })
           : <div>loading...</div>
         }
      </div>
    )
  }
  renderCrowds (value, index, record) {
   var Crowds = record.Crowds
   var key = record.id
   return (
       <div>
         { Crowds
					 ? Crowds.map((item,index) => {
              return (
               <div key={key} style={{paddingBottom: '8px', lineHeight: '24px'}}>
                   <div>
							     <span>{item.crowd_name}&nbsp;&nbsp;</span>
                   {item.crowd_value && item.crowd_type == 16384  ?  <span>{crowdValue[item.crowd_value]} : &nbsp;&nbsp;</span> : ''}
                    {
                      item.crowd_type == 16384
                      ? ( item.sub_crowds ? item.sub_crowds.map((v, i) => {
                    return (<span style={{color: '#333'}} key={i}>{subCrowdValue[v.sub_crowd_value]}&nbsp;&nbsp;</span>)
                      }) : null)
                      : ( item.sub_crowds && item.crowd_type != 0 && item.crowd_type != 32768 ? item.sub_crowds.map((v, i) => {
                    return (<span style={{color: '#333'}} key={i}>{v.sub_crowd_name}&nbsp;&nbsp;</span>)
                      }) : null)
                    }
                  </div>
                  <div style={{fontSize: '12px', color: '#999'}}>
                     <span>{item.adzonedName}&nbsp;&nbsp;&nbsp;</span>
                     <span>￥ {(item.matrix_price[0].Price/100).toFixed(2)}</span>
                  </div>
							</div>
             )
            })
						: <div>暂无定向</div>
         }
       </div>
     )
  }
  //选择创意
  SelectCreatives (id, CreativesId, checked) {
  var combinationData = this.state.settingsData
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
  if (combination){
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
renderListData(){
  let origin = this.state.settingsData;
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
renderecpm (value, index, record) {
   var rpt = record.Rpt
   return (
     <span>{rpt.Pv == 0 ? 0 : (rpt.Charge*1000/rpt.Pv).toFixed(2)}</span>
   )
}
renderClick (value, index, record) {
   var rpt = record.Rpt
   return (
     <span>{rpt.Click == 0 ? 0 : (rpt.Charge/rpt.Click).toFixed(2)}</span>
   )
}
renderctr (value, index, record) {
   var rpt = record.Rpt
   return (
     <span>{rpt.Pv == 0 ? 0 : (rpt.Click/rpt.Pv).toFixed(2)}</span>
   )
}
renderFav (value, index, record) {
   var rpt = record.Rpt
   var FavItem = rpt.FavItem ? rpt.FavItem : 0
   var FavShop = rpt.FavShop ? rpt.FavShop : 0
   return (
     <span>{FavItem + FavShop}</span>
   )
}
renderAlipayAmt (value, index, record) {
  var rpt = record.Rpt
   return (
     <span>{rpt.AlipayAmt ? rpt.AlipayAmt : 0}</span>
   )
}
renderAlipayNum (value, index, record) {
  var rpt = record.Rpt
   return (
     <span>{rpt.AlipayNum ? rpt.AlipayNum : 0}</span>
   )
}
renderCharge (value, index, record) {
  var rpt = record.Rpt
   return (
     <span>{rpt.Charge ? rpt.Charge : 0}</span>
   )
}
renderClick (value, index, record) {
   var rpt = record.Rpt
   return (
     <span>{rpt.Click ? rpt.Click : 0}</span>
   )
}
renderPv (value, index, record) {
   var rpt = record.Rpt
   return (
     <span>{rpt.Pv ? rpt.Pv : 0}</span>
   )
}
renderTable () {
      let renderList = this.renderListData()
      if(renderList && renderList.length > 0) {
        return (
          <Table dataSource={renderList}>
            <Table.Column title="定向" cell={this.renderCrowds.bind(this)} />
            <Table.Column title="创意图" cell={this.renderImg.bind(this)}/>
            <Table.Column title="展现" width={100} cell={this.renderPv.bind(this)}/>
            <Table.Column title="点击量" width={100} cell={this.renderClick.bind(this)}/>
            <Table.Column title="点击率" cell={this.renderctr.bind(this)} width={100}/>
            <Table.Column title="消耗" cell={this.renderCharge.bind(this)} width={100}/>
            <Table.Column title="eCPM" cell={this.renderecpm.bind(this)} width={100}/>
            <Table.Column title="eCPC" cell={this.renderClick.bind(this)} width={100}/>
            <Table.Column title="收藏" cell={this.renderFav.bind(this)} width={100}/>
            <Table.Column title="成交金额" cell={this.renderAlipayAmt.bind(this)} width={100}/>
            <Table.Column title="成交量" cell={this.renderAlipayNum.bind(this)} width={100}/>
         </Table>
        )
      } else {
         return (<div style={{margin: '50px auto', textAlign: 'center'}}>暂无数据</div>)
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
    for(let i=0; i<keys.length; i++ ) {
        let combination = editList[keys[i]]
        let checked_list = combination.checked_list;
        if (checked_list.length > 0) {
          let creativs = this.genCreatives(checked_list, combination.Creatives);
          combinationObj = {...combination, Creatives: creativs}
          combinationData.push(combinationObj)
      }
    }
    if(combinationData.length <= 0) {
      Toast.error('您没有选择投放组合！')
      return
    }
    var step = 4
    this.props.commonData({step, editList, combinationData})
    history.push('/dayTest/infoForm/'+0)

  }
   render () {
     return (
       <div className='panel panel-default' style={{margin: '10px'}}>
         <div className="panel-heading" style={{overflow: 'hidden'}}>
            <span>最佳投放组合</span>
         </div>
         <div className="panel-body" style={{paddingBottom: '50px'}}>
         {
           this.state.showloading
           ? <div style={{margin: '50px auto', width: '200px'}}><Loading color="#c7c7c7" show={this.state.showloading}/></div>
           : this.renderTable()
         }
         </div>
         <div className="panel-footer" style={{overflow: 'hidden', backgroundColor: '#fff'}}>
          <div style={{float: 'right'}}>
              <Link to={setSolution}><Button type="normal" style={{marginRight: '15px'}}>上一步</Button></Link>
              <Button type="normal" onClick={this.setClick.bind(this)}>下一步</Button>
          </div>
        </div>
       </div>
     )
   }
}
export default CreateCombinationView