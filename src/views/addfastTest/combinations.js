import React from 'react';
import axios from 'axios';
import { createcombinations } from '../../help/url';
import { Link } from 'react-router-dom';
import Button from 'qnui/lib/button';
import {addfastTestStep4, addfastTestStep5} from '../../help/linkUrl';
import createHistory from 'history/createHashHistory';
import CombinationTable from './combinationTable';
import Feedback from 'qnui/lib/feedback';
const history = createHistory();
const Toast = Feedback.toast;
import NumberPicker from 'qnui/lib/number-picker';
import Pagination from 'qnui/lib/pagination';
class CombinationsView extends React.Component {
  constructor () {
    super()
    this.state={
      combinationData: [],
      combinationItem : [],
      cpmValue: 30,
      CreativesList: [],
      current: 1,
      total: 0,
      newArr: [],
      editCombinations:{},
      editPrice: {}
    }
  }
  isMount=false
  componentWillMount () {
    var combinationdata = this.props.data.combinationdata
  	var combination = combinationdata.combinationObj
    if(combination) {
      this.setState({
        editCombinations: combination
      })
    }
   this.loadDataList(1)
   }
   commonStepData () {
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

     var step = 3
     var type = 'combination'
     this.props.commonData({step, type, combinationData, editList})
     history.push(addfastTestStep5)
   }
   onchangePage (value) {
    this.loadDataList(value)
   }
  loadDataList (page) {
    var AdzonesItem = this.props.data.AdzonesItem
    var creativesItem = this.props.data.creativesItem
    var selectAllArr = this.props.data.combinationItem
    var combinationDatas = this.props.data.combinationdata.combinationData
    var newArr = []
    var zizhuObj = this.props.data.zizhuObj
    var zhongziObj = this.props.data.zhongziObj
    var tongtouObj = this.props.data.tongtouObj
    var peopleObj = this.props.data.peopleObj
    var interestObj = this.props.data.interestObj
    var likemybodyObj = this.props.data.likemybodyObj
    var similarObj = this.props.data.similarObj
    var zhinengObj = this.props.data.zhinengObj
    var checked = this.props.data.checked
    var zhinengchecked = this.props.data.zhinengchecked
    var Row1value = this.props.data.Row1value
    var Row2value = this.props.data.Row2value
    var Row3value = this.props.data.Row3value
    var Row4value = this.props.data.Row4value
    var Row5value = this.props.data.Row5value
    var Row6value = this.props.data.Row6value
    var Row7value = this.props.data.Row7value
    var Row8value = this.props.data.Row8value
    var Row9value = this.props.data.Row9value
    var tiaoguoObj = this.props.data.tiaoguoObj
    var dmpArr = this.props.data.dmpArr
    if(tiaoguoObj.crowd_type == 0) {
      newArr.push(tiaoguoObj)
    }
    if(zizhuObj.crowd_type) {
      newArr.push(zizhuObj)
    }
    if(zhongziObj.crowd_type) {
      newArr.push(zhongziObj)
    }
    if(dmpArr.length > 0) {
    var dmpArrs = newArr.concat(dmpArr)
     newArr = dmpArrs
    }
    if(checked == true) {
     newArr.push(tongtouObj)
    }
    if (peopleObj.crowd_type) {
      newArr.push(peopleObj)
    }
    if (interestObj.crowd_type) {
      newArr.push(interestObj)
    }
    if (likemybodyObj.crowd_type) {
      newArr.push(likemybodyObj)
    }
    if (Row1value.crowd_type) {
      newArr.push(Row1value)
    }
    if (Row2value.crowd_type) {
      newArr.push(Row2value)
    }
    if (Row3value.crowd_type) {
      newArr.push(Row3value)
    }
    if (Row4value.crowd_type) {
      newArr.push(Row4value)
    }
    if (Row5value.crowd_type) {
      newArr.push(Row5value)
    }
    if (Row6value.crowd_type) {
      newArr.push(Row6value)
    }
    if (Row7value.crowd_type) {
      newArr.push(Row7value)
    }
    if (Row8value.crowd_type) {
      newArr.push(Row8value)
    }
    if (Row9value.crowd_type) {
      newArr.push(Row9value)
    }
    if (similarObj.crowd_type) {
      newArr.push(similarObj)
    }
    if (zhinengchecked == true) {
      newArr.push(zhinengObj)
    }
    if (newArr.length <= 0) {
      newArr.push({crowd_type: 0})
    }
    var self = this
    axios.post(createcombinations, {
      creatives: creativesItem,
      adzones: AdzonesItem,
      crowds: newArr,
      page_num: page,
      page_size: 5
    })
    .then(function (response) {
      for(var i=0; i<response.data.Combinations.length; i++) {
         response.data.Combinations[i].id = i
         response.data.Combinations[i].checked_list = []
         for(var k=0; k<response.data.Combinations[i].Crowds.length; k++) {
           if(response.data.Combinations[i].Crowds[k].matrix_price[0].Price == 0) {
             response.data.Combinations[i].Crowds[k].matrix_price[0].Price = 3000
           }
           response.data.Combinations[i].Crowds[k].Crowds_zuanshi_id = k
         }
      }
      if(self.isMount) {
        self.setState({
          combinationData: response.data.Combinations,
          current: page,
					total: response.data.Total
        })

      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  renderPagination () {
 		var pageSize = 5;
    var combinationData = this.state.combinationData
 		var current = this.state.current;
     var total = this.state.total;
 		if(this.state.combinationData === null ) {
 			return
 		} else if(current == 1 && this.state.combinationData.length < pageSize && this.state.combinationData.length <= total){ return null}
 		else if(this.state.combinationData.length > 0) {
 			return (<Pagination current={this.state.current} onChange={this.onchangePage.bind(this)}
 										defaultCurrent={1} total={this.state.total} pageSize={pageSize}
                />)
 		}
 	}

  componentDidMount () {
 	 this.isMount=true
  }
  componentWillUnmount() {
 	 this.isMount=false
  }
  checkedPrice () {
    return false
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
  onNextStep () {
    this.commonStepData ()
  }
  onBeforeStep () {
    this.loadDataList (1)
    history.push(addfastTestStep4)
  }

//修改全部价钱
onChangecpmValue (value) {
  this.setState({
    cpmValue: value * 1
  })
}
//修改全部价钱
onChangecpm () {
  var combinationData = this.state.combinationData
  var cpmValue = this.state.cpmValue
  for (var j=0; j<combinationData.length; j++) {
     for(var i=0; i<combinationData[j].Crowds.length; i++) {
       combinationData[j].Crowds[i].matrix_price[0].Price = cpmValue
    }
   }
 this.setState({
   combinationData: combinationData
 })
}

changeCrowdPrice(crowds, Crowds_zuanshi_id, value) {
  let list = []
  for(let i=0; i<crowds.length; i++){
    let crowd = crowds[i];
    let id = crowd.Crowds_zuanshi_id;
    if (id === Crowds_zuanshi_id) {
        crowd.matrix_price[0].Price = value*100;
      }
    list.push(crowd)
  }
  return list
}

//修改单个定向价钱
  sendcpmData ( Crowds_zuanshi_id, id, record, cpmvalue) {
  var combinationData = this.state.combinationData
  let editList = this.state.editCombinations;
  let combination;
  if (editList[id]) {
    combination = editList[id]
  } else {
    for (var i=0; i< combinationData.length; i++) {
      if(combinationData[i].Key == id) {
        combination ={...combinationData[i]}
        break
      }
    }
  }
  if (combination){
    let crowdsList = this.changeCrowdPrice(combination.Crowds, Crowds_zuanshi_id, cpmvalue)
    combination = {...combination, Crowds: crowdsList};
    this.setState({
      editCombinations: {...this.state.editCombinations, [combination.Key]: combination}
    })
  }

}
//选择创意
SelectCreatives (id, CreativesId, checked) {
  var combinationData = this.state.combinationData
  let editList = this.state.editCombinations;
  let combination;
  if (editList[id]) {
    combination = editList[id]
  } else {
    for (var i=0; i< combinationData.length; i++) {
      if(combinationData[i].Key == id) {
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
      editCombinations: {...this.state.editCombinations, [combination.Key]: combination}
    })
  }


}
renderListData(){
  let origin = this.state.combinationData;
  let editList = this.state.editCombinations;
  let list = []
  for (let i=0; i<origin.length; i++) {
    let tmp = origin[i];
    let editItem = editList[tmp.Key]
    if (editItem){
      list.push(editItem)
    } else{
      list.push(tmp)
    }
  }
  return list
}
  render () {
    let renderList = this.renderListData()
    return (
      <div className='panel panel-default' style={{margin: '10px'}}>
        <div className="panel-heading" style={{overflow: 'hidden'}}>
          <div style={{float: 'left'}}>投放组合</div>
        </div>
        <div className="panel-body" style={{paddingBottom: '50px'}}>
          <CombinationTable data={renderList}
                            cpmData={this.sendcpmData.bind(this)}
                            sendSelectCreatives={this.SelectCreatives.bind(this)}
                            editCombinations={this.state.editCombinations}
                          />
          <div style={{marginTop: '16px', float: 'right'}}>
						 {
							 this.renderPagination ()
						 }
					 </div>
        </div>
        <div className="panel-footer" style={{overflow: 'hidden', backgroundColor: '#fff'}}>
          <div style={{float: 'right'}}>
              <Button type="normal" style={{marginRight: '15px'}} onClick={this.onBeforeStep.bind(this)}>上一步</Button>
              <Button type="normal" onClick={this.onNextStep.bind(this)}>下一步</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default CombinationsView
