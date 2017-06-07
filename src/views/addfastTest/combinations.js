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
class CombinationsView extends React.Component {
  constructor () {
    super()
    this.state={
      combinationData: [],
      rowSelections: {
        onSelectAll: this.onSelectAll.bind(this),
        onSelect: this.onSelect.bind(this),
        selectedRowKeys: []
      },
      combinationItem : [],
      cpmValue: 30
    }
  }
  isMount=false
  onSelectAll (selected, records) {
    let {rowSelections, combinationItem} = this.state
    if(selected) {
      for(var i=0; i<records.length; i++) {
				if(rowSelections.selectedRowKeys.indexOf(records[i].id) == -1) {
						rowSelections.selectedRowKeys = [...rowSelections.selectedRowKeys, records[i].id]
          }
			}
			this.setState({
				rowSelections,
				combinationItem: [...records]
			})
    } else {
      rowSelections.selectedRowKeys = []
      this.setState({
        rowSelections,
        combinationItem: []
      })
    }
  }
  componentWillMount () {
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
    var reloadData = this.props.data.combinationdata.data
  if(tiaoguoObj.crowd_type == 0) {
      newArr.push(tiaoguoObj)
    }
    if(zizhuObj.crowd_type) {
      newArr.push(zizhuObj)
    }
    if(zhongziObj.crowd_type) {
      newArr.push(zhongziObj)
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
    let {rowSelections} = this.state;
    rowSelections.selectedRowKeys = selectAllArr;

    this.setState({
      rowSelections
    });
    if(combinationDatas) {
       this.setState({
         combinationItem: combinationDatas
       })
     }

    if(reloadData) {
     this.setState({
        combinationData: reloadData
      })
    } else {
      axios.post(createcombinations, {
        creatives: creativesItem,
        adzones: AdzonesItem,
        crowds: newArr
       })
      .then(function (response) {
        for(var i=0; i<response.data.length; i++) {
           response.data[i].id = i
           response.data[i].cpm = self.state.cpmValue
        }
        if(self.isMount) {
          self.setState({
            combinationData: response.data
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
   }
  onSelect (selected, record, records) {
    var combinationItem = this.state.combinationItem
    let {rowSelections} = this.state;
		if(selected) {
      rowSelections.selectedRowKeys = [...rowSelections.selectedRowKeys, record.id]
			this.setState({
				combinationItem: [...combinationItem.slice(), record],
        rowSelections
			})
		} else {
      var newData=[...combinationItem]
			var idx = rowSelections.selectedRowKeys.indexOf(record.Id)
			rowSelections.selectedRowKeys = [...rowSelections.selectedRowKeys.slice(0, idx), ...rowSelections.selectedRowKeys.slice(idx + 1)]
			for (var m=0; m < combinationItem.length; m++) {
				if(combinationItem[m].Id == record.Id) {
						newData.splice(m, 1)
					}
      }
			this.setState({
				combinationItem: newData,
				rowSelections
			})
    }
  }
  componentDidMount () {
 	 this.isMount=true
  }
  componentWillUnmount() {
 	 this.isMount=false
  }
  onChangeTable(ids, records){
    let {rowSelections} = this.state;
    rowSelections.selectedRowKeys = ids;
  	this.setState({
			rowSelections
		})

  }
  commonStepData () {
    var select = this.state.rowSelections.selectedRowKeys
    var combinationData = this.state.combinationItem
    var data = this.state.combinationData
    var step = 3
    var type = 'combination'
    this.props.commonData({step, type, select, combinationData, data})
  }
  onNextStep () {
    this.commonStepData ()
    var select = this.state.rowSelections.selectedRowKeys
    if(select.length <=0) {
      Toast.error('您还没有选择投放组合')
      return
    }
    history.push(addfastTestStep5)
  }
  onBeforeStep () {
    var AdzonesItem = this.props.data.AdzonesItem
    var creativesItem = this.props.data.creativesItem
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
    var reloadData = this.props.data.combinationdata.data
  if(tiaoguoObj.crowd_type == 0) {
      newArr.push(tiaoguoObj)
    }
    if(zizhuObj.crowd_type) {
      newArr.push(zizhuObj)
    }
    if(zhongziObj.crowd_type) {
      newArr.push(zhongziObj)
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
    axios.post(createcombinations, {
      creatives: creativesItem,
      adzones: AdzonesItem,
      crowds: newArr
     })
    .then(function (response) {
      for(var i=0; i<response.data.length; i++) {
         response.data[i].id = i
         response.data[i].cpm = self.state.cpmValue
      }
      if(self.isMount) {
        self.setState({
          combinationData: response.data
        })
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    history.push(addfastTestStep4)
  }
  sendcpmData (record, cpmvalue) {
    if(cpmvalue == undefined) {
      cpmvalue = 30
    }
   var combinationData = this.state.combinationData
   for (var j=0; j<combinationData.length; j++) {
      if(combinationData[j].id == record.id) {
        combinationData[j].cpm = cpmvalue
      }
    }
  this.setState({
    combinationData: combinationData
  })

  // this.props.commonData({step, type, combinationData})
}
onChangecpmValue (value) {
  this.setState({
    cpmValue: value
  })
}
onChangecpm () {
  var combinationData = this.state.combinationData
  var value = this.state.cpmValue
  for (var j=0; j<combinationData.length; j++) {
     combinationData[j].cpm = value
  }
 this.setState({
   combinationData: combinationData
 })

}
  render () {
    return (
      <div className='panel panel-default' style={{margin: '10px'}}>
        <div className="panel-heading" style={{overflow: 'hidden'}}>
          <div style={{float: 'left'}}>投放组合</div>
          <div style={{float: 'right'}}>
            <span>修改全部出价：</span>
            <NumberPicker inputWidth={'200px'} defaultValue={this.state.cpmValue} onChange={this.onChangecpmValue.bind(this)} step={10}/>
            <Button type="primary" onClick={this.onChangecpm.bind(this)} style={{marginLeft: '15px'}}>确定</Button>
          </div>
        </div>
        <div className="panel-body" style={{paddingBottom: '50px'}}>
          <CombinationTable rowSelection={this.state.rowSelections}
                            data={this.state.combinationData}
                            cpmData={this.sendcpmData.bind(this)}
                          />
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
