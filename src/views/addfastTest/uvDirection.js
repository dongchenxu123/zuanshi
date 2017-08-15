import React from 'react';
import axios from 'axios';
import Checkbox from 'qnui/lib/checkbox';
import Input from 'qnui/lib/input';
import Button from 'qnui/lib/button';
import { Link } from 'react-router-dom';
import {addfastTestStep3} from '../../help/linkUrl';
import createHistory from 'history/createHashHistory';
import Feedback from 'qnui/lib/feedback';
const Toast = Feedback.toast;
const history = createHistory()
class UvDirection extends React.Component {
  constructor () {
    super()
    this.state={
      value: '',
      selectList: [],
      zhongzivalue: ''
    }
  }
  componentWillMount () {
    var subCrowdName = this.props.data.uvzizhuObj.subCrowdName
    var zhongzicrowdValue = this.props.data.uvDirection.crowdValue
    var zizhucrowdValue = this.props.data.uvzizhuObj.crowdValue
    var subzhongziName = this.props.data.uvDirection.subzhongziName
    var zhizhuType = this.props.data.uvDirection.type
    var zhongziType = this.props.data.uvDirection.type
    this.setState({
      value: subCrowdName,
      zhongzivalue: subzhongziName
    })
    if(zhongzicrowdValue) {
      this.setState({
        selectList: zhongzicrowdValue
      })
    }
    if(zizhucrowdValue) {
      this.setState({
        selectList: zizhucrowdValue
      })
    }
  }
  onChangeText (value) {
    this.setState({
      value: value
    })
  }
  onChangezhongziText (value) {
    this.setState({
      zhongzivalue: value
    })
  }
 clickShop (id, checked) {
   var select= this.state.selectList
	 let newselect
	 if (checked) {
			//let idx = select.indexOf(wareId)
			newselect= [...select, id]

	 } else {
		 let idx = select.indexOf(id) //返回当前值在数组中的索引
		 newselect = [...select.slice(0, idx), ...select.slice(idx + 1)]
	 }
	this.setState({
				selectList: newselect
		})
 }
 checkStore (id, checked) {
  var select= this.state.selectList
  let newselect
  if (checked) {
     //let idx = select.indexOf(wareId)
     newselect= [...select, id]

  } else {
    let idx = select.indexOf(id) //返回当前值在数组中的索引
    newselect = [...select.slice(0, idx), ...select.slice(idx + 1)]
  }
   this.setState({
         selectList: newselect
     })
  }
  onSure () {
    var step= 3
    var uvcrowdType = 16
    var crowdValue = this.state.selectList
    var subCrowdName = this.state.value
    var subzhongziName = this.state.zhongzivalue
    var layoutData = this.props.data.crowdValue
    var subCrowds = []
    var zizhuObj = {}
    var zhongziObj = {}
    // if(crowdValue.length <= 0) {
    //   this.showError()
    //   return
    // }
    for(var i=0; i<crowdValue.length; i++) {
      if (crowdValue[i] == 1) {
        if (subCrowdName == undefined) {
           Toast.error('请填写自主店铺名称!')
           return
        }
         
      }
      if (crowdValue[i] == 2) {
        if (subzhongziName == undefined) {
          Toast.error('请填写种子店铺名称!')
          return
        }
      }
      
      if(crowdValue[i] == 1) {
        var type = 'zizhuuv'
        zizhuObj={crowd_type: uvcrowdType, crowd_value: '1', sub_crowds: [{sub_crowd_name: subCrowdName}]}
        this.props.commonData({type, step, crowdValue, subCrowdName, zizhuObj})
      }
      if (crowdValue[i] == 2) {
        var zhongziType = 'zhongziuv'
        zhongziObj={crowd_type: uvcrowdType, crowd_value: '2', sub_crowds: [{sub_crowd_name: subzhongziName}]}
        this.props.commonData({zhongziType, step, crowdValue, subzhongziName, zhongziObj})
      }
    }
   history.push(addfastTestStep3)
  }
  showError  () {Toast.error('您还没有选择店铺和填写店铺名称!')}
  render () {
    var select=this.state.selectList
    return (
      <div className='panel panel-default' style={{margin: '10px', fontSize: '14px'}}>
        <div className="panel-heading" style={{overflow: 'hidden'}}>
          访客定向
        </div>
        <div className="panel-body" style={{paddingBottom: '50px'}}>
          <div>
            <div style={{marginBottom: '10px'}}>
              <Checkbox onChange={this.clickShop.bind(this, 1)} checked={select.indexOf(1) > -1}>自主店铺</Checkbox>
            </div>
            <div style={{marginBottom: '10px'}}>
              <Input placeholder="自己或相似店铺名称"
              onChange={this.onChangeText.bind(this)}
              value={this.state.value}
              disabled={select.indexOf(1) <= -1}
              />
            </div>
            <div>
              <div style={{marginBottom: '10px'}}>
                <Checkbox
                  onChange={this.checkStore.bind(this, 2)}
                  checked={select.indexOf(2) > -1}>
                  种子店铺
                </Checkbox>
              </div>
              <div style={{marginBottom: '10px'}}>
                <Input placeholder="自己或相似店铺名称"
                onChange={this.onChangezhongziText.bind(this)}
                value={this.state.zhongzivalue}
                disabled={select.indexOf(2) <= -1}
                />
              </div>
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

export default UvDirection
