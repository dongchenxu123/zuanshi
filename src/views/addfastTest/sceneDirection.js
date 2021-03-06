<<<<<<< HEAD
import React from 'react';
import axios from 'axios';
import { getShopitems } from '../../help/url';
import { Link } from 'react-router-dom';
import {addfastTestStep3} from '../../help/linkUrl';
import Button from 'qnui/lib/button';
import { Row, Col } from 'qnui/lib/grid';
import Checkbox from 'qnui/lib/checkbox';
import createHistory from 'history/createHashHistory';
import Feedback from 'qnui/lib/feedback';
const Toast = Feedback.toast;
const history = createHistory();
import Switch from 'qnui/lib/switch';
class SceneDirection extends React.Component {
  constructor () {
    super ()
    this.state={
      areaArrs:[1,2,3,4,5],
      areas:[
        		{
        			name: '触达人群',
        			data:['1001'],
              id: '1'
        		},
            {
        			name: '兴趣人群',
        			data:['2001'],
              id: '2'
        		},
            {
        			name: '意向人群',
        			data:['3001', '3002'],
              id: '3'
        		},
            {
        			name: '行动人群',
        			data:['4001', '4002', '4004', '4005'],
              id: '4'
        		},
            {
        			name: '成交人群',
        			data:['5001'],
              id: '5'
        		}
          ],
      areaobj: {
         "1001": {
           parent: 1,
           name: '广告展现',
           s: false
         },
         "2001": {
           parent: 2,
           name: '广告点击',
           s: false
         },
         "3001": {
           parent: 3,
           name: '店铺搜索',
           s: false
         },
         "3002": {
           parent: 3,
           name: '店铺浏览',
           s: false
         },
         "4001": {
           parent: 4,
           name: '收藏宝贝',
           s: false
         },
         "4002": {
           parent: 4,
           name: '收藏店铺',
           s: false
         },
         "4004": {
           parent: 4,
           name: '添加购物车',
           s: false
         },
         "4005": {
           parent: 4,
           name: '确认订单',
           s: false
         },
         "5001": {
           parent: 5,
           name: '购买宝贝',
           s: false
         }
    },
    selectList: [],
    yixiangchecked: false,
    activeChecked: false

  }
}
componentWillMount () {
  var areas= this.state.areas
  var select = this.props.data.sceneDirection.selectList
  if(select) {
    let obj = {}
    for (let j = 0; j < areas.length; j++) {
      let data = areas[j].data
      for (let i = 0; i < select[i]; i++) {
        if (data.indexOf(select[i]) > -1) {
         obj['r' + areas[j].id] = (obj['r' + areas[j].id] || 0) + 1
        }
      }
    }
    obj.selectList = select
    this.setState(obj)
  }
  var yixiangIsexpandable = this.props.data.yixiangIsexpandable
  var activeIsexpandable = this.props.data.activeIsexpandable
  this.setState({
    yixiangchecked: yixiangIsexpandable,
    activeChecked: activeIsexpandable
  })
}
  allChange (gid, checked) {
    var selectList= this.state.selectList
    var areas= this.state.areas
    var changeItem =  areas.filter((item) => {
      return item.id === gid
    })
    var region = this.state['r' + gid] || 0
    if (checked) {
      let tmparr = []
      for (let j = 0; j < changeItem[0].data.length; j++) {
        if (selectList.indexOf(changeItem[0].data[j]) == -1) {
          tmparr.push(changeItem[0].data[j])
        }
      }
      this.setState({
        selectList: this.state.selectList.concat(tmparr),
        ['r' + gid]: changeItem[0].data.length
      })
    } else {
      let newselect = selectList.slice()
      for (let m = 0; m < changeItem[0].data.length; m++) {
        if (newselect.indexOf(changeItem[0].data[m]) > -1) {
          var index = newselect.indexOf(changeItem[0].data[m])
          newselect.splice(index, 1)
          region = region - 1
        }
      }
      this.setState({
        selectList: newselect,
        ['r' + gid]: 0
      })
    }
  }
  onChange (cityid, gid,checked) {
    var select= this.state.selectList
    var region = this.state['r' + gid] || 0
    if(checked) {
      this.setState({
        selectList: [...select.slice(), cityid],
        ['r' + gid]: region + 1
      })
    } else {
      let index = select.indexOf(cityid)
      this.setState({
        selectList: [...select.slice(0, index), ...select.slice(index + 1)],
        ['r' + gid]: (region - 1) <= 0 ? 0 : region - 1
      })
    }

  }
  onSure () {
    var step= 3;
    var scenecrowdType = 16384
    var type = 'scene'
    var selectList = this.state.selectList;
    var Row1value = {}
    var Row2value = {}
    var Row3value = {}
    var Row4value = {}
    var Row5value = {}
    var Row6value = {}
    var Row7value = {}
    var Row8value = {}
    var Row9value = {}
    var value = []
    if(selectList.indexOf('1001') > -1) {
      var crowdValue1 = 10
      value.push(10)
      for(var i=0; i< selectList.length; i++) {
        if(selectList[i] == '1001') {
          var subCrowdValue = parseInt(selectList[i])
        }
      }
      Row1value={crowd_type: scenecrowdType, crowd_value: crowdValue1, sub_crowds: [{sub_crowd_value: subCrowdValue}]}
    }
    if(selectList.indexOf('2001') > -1) {
      var crowdValue2 = 20
      value.push(20)
      for(var i=0; i< selectList.length; i++) {
        if(selectList[i] == '2001') {
          var subCrowdValue = parseInt(selectList[i])
        }
      }
      Row2value={crowd_type: scenecrowdType, crowd_value: crowdValue2, sub_crowds: [{sub_crowd_value: subCrowdValue}]}
    }
    if(selectList.indexOf('3001') > -1 || selectList.indexOf('3002') > -1) {
      var crowdValue3 = 30
      value.push(30)
      for(var i=0; i< selectList.length; i++) {
        if(selectList[i] == '3001') {
          var subCrowdValue = parseInt(selectList[i])
          Row3value={crowd_type: scenecrowdType, crowd_value: crowdValue3, sub_crowds: [{sub_crowd_value: subCrowdValue}], expandable: this.state.yixiangchecked}
        }
        if (selectList[i] == '3002') {
          var subCrowdValue = parseInt(selectList[i])
          Row6value={crowd_type: scenecrowdType, crowd_value: crowdValue3, sub_crowds: [{sub_crowd_value: subCrowdValue}], expandable: this.state.yixiangchecked}
        }
      }

    }
    if(selectList.indexOf('4001') > -1 || selectList.indexOf('4002') > -1 || selectList.indexOf('4004') > -1 || selectList.indexOf('4005') > -1) {
      var crowdValue4 = 40
      value.push(40)
      for(var i=0; i< selectList.length; i++) {
        if(selectList[i] == '4001') {
          var subCrowdValue = parseInt(selectList[i])
          Row4value={crowd_type: scenecrowdType, crowd_value: crowdValue4, sub_crowds: [{sub_crowd_value: subCrowdValue}], expandable:this.state.activeChecked}
        }
        if (selectList[i] == '4002') {
          var subCrowdValue = parseInt(selectList[i])
          Row7value={crowd_type: scenecrowdType, crowd_value: crowdValue4, sub_crowds: [{sub_crowd_value: subCrowdValue}], expandable:this.state.activeChecked}
        }
        if (selectList[i] == '4004') {
          var subCrowdValue = parseInt(selectList[i])
          Row8value={crowd_type: scenecrowdType, crowd_value: crowdValue4, sub_crowds: [{sub_crowd_value: subCrowdValue}], expandable:this.state.activeChecked}
        }
        if (selectList[i] == '4005') {
          var subCrowdValue = parseInt(selectList[i])
          Row9value={crowd_type: scenecrowdType, crowd_value: crowdValue4, sub_crowds: [{sub_crowd_value: subCrowdValue}], expandable:this.state.activeChecked}
        }
      }

    }
    if(selectList.indexOf('5001') > -1) {
      var crowdValue5 = 50
      value.push(50)
      for(var i=0; i< selectList.length; i++) {
        if(selectList[i] == '5001') {
          var subCrowdValue = parseInt(selectList[i])
        }
      }
      Row5value={crowd_type: scenecrowdType, crowd_value: crowdValue5, sub_crowds: [{sub_crowd_value: subCrowdValue}]}
    }

    if(selectList.length > 0) {
      this.props.commonData({type, step, selectList, value, scenecrowdType, Row1value, Row2value, Row3value, Row4value, Row5value,
      Row6value, Row7value, Row8value, Row9value})
      history.push(addfastTestStep3)
    } else {
      this.showError()
    }

  }
  showError  () {Toast.error('您还没有选择人群')}
  changeyixiang (value) {
    this.setState({
      yixiangchecked: value
    })
    var step=3
    var type='yixiangchecked'
    var yixiangchecked=value
    this.props.commonData({step, type, yixiangchecked})
  }
  changeactive (value) {
    this.setState({
      activeChecked: value
    })
    var step = 3
    var type='activeChecked'
    var activeChecked = value
    this.props.commonData({step, type, activeChecked})
  }
  render () {
    var select= this.state.selectList
    return (
      <div className='panel panel-default' style={{margin: '10px'}}>
        <div className="panel-heading" style={{overflow: 'hidden'}}>
          营销场景定向
        </div>
        <div className="panel-body" style={{paddingBottom: '50px'}}>
          {this.state.areas.length === 0 ? <div>Loading...</div> :
            <div>
              { this.state.areas.map((item, index) => {
                  var items = this.state.areas[index].data
                  var itemId = this.state.areas[index].id
                  return (
                    <Row key={index}>
                      <Col fixedSpan="6">
                        <div className="demo-col-inset" style={{float: 'left', margin: '10px'}}>
                          <Checkbox
                            checked={this.state['r' + itemId] && this.state['r' + itemId] == items.length == true ? true : false}
                            onChange={this.allChange.bind(this, itemId)}
                            >
                            {this.state.areas[index].name}
                           </Checkbox>
                        </div>
                      </Col>
                      <Col><div className="demo-col-inset">
                      {
                        items.map((cityid) => {
                          let city = this.state.areaobj[cityid]
                          return (
                            <div style={{float:'left', margin: '10px'}} key={city.name}>
                              <label>
                                  <Checkbox
                                  checked={select.indexOf(cityid) > -1}
                                  onChange={this.onChange.bind(this, cityid, itemId)}
                                  defaultChecked={select.indexOf(cityid) > -1}
                                  />
                                  <span style={{paddingLeft: '10px', fontWeight: 'normal'}}>{city.name}</span>
                              </label>
                            </div>
                            )
                          })
                      }
                      </div>
                      </Col>
                      <Col>
                        {
                          itemId == 3
                          ? <div><span>是否自由组合: </span>
                              <Switch checkedChildren="开" unCheckedChildren="关"
                                       style={{marginLeft: '10px'}}
                                       disabled={select.indexOf('3001') >-1 && select.indexOf('3002') >-1 ? false : true}
                                       onChange={this.changeyixiang.bind(this)}
                                       checked={this.state.yixiangchecked}/>
                            </div>
                          : null
                        }
                        {
                          itemId == 4
                          ? <div><span>是否自由组合: </span>
                              <Switch checkedChildren="开" unCheckedChildren="关"
                                       style={{marginLeft: '10px'}}
                                       disabled={select.indexOf('4001') >-1 && select.indexOf('4002') >-1 && select.indexOf('4004') >-1 && select.indexOf('4005') >-1 ? false : true}
                                       onChange={this.changeactive.bind(this)}
                                       checked={this.state.activeChecked}/>
                            </div>
                          : null
                        }
                      </Col>
                    </Row>
                  )
                })
              }
             </div>
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

export default SceneDirection
=======
import React from 'react';
import axios from 'axios';
import { getShopitems } from '../../help/url';
import { Link } from 'react-router-dom';
import {addfastTestStep3} from '../../help/linkUrl';
import Button from 'qnui/lib/button';
import { Row, Col } from 'qnui/lib/grid';
import Checkbox from 'qnui/lib/checkbox';
import createHistory from 'history/createHashHistory';
import Feedback from 'qnui/lib/feedback';
const Toast = Feedback.toast;
const history = createHistory();
import Switch from 'qnui/lib/switch';
class SceneDirection extends React.Component {
  constructor () {
    super ()
    this.state={
      areaArrs:[10,20,30,40,50],
      areas:[
        		{
        			name: '触达人群',
        			data:['1001'],
              id: '10'
        		},
            {
        			name: '兴趣人群',
        			data:['2001'],
              id: '20'
        		},
            {
        			name: '意向人群',
        			data:['3001', '3002'],
              id: '30'
        		},
            {
        			name: '行动人群',
        			data:['4001', '4002', '4004', '4005'],
              id: '40'
        		},
            {
        			name: '成交人群',
        			data:['5001'],
              id: '50'
        		}
          ],
      areaobj: {
         "1001": {
           parent: 1,
           name: '广告展现',
           s: false
         },
         "2001": {
           parent: 2,
           name: '广告点击',
           s: false
         },
         "3001": {
           parent: 3,
           name: '店铺搜索',
           s: false
         },
         "3002": {
           parent: 3,
           name: '店铺浏览',
           s: false
         },
         "4001": {
           parent: 4,
           name: '收藏宝贝',
           s: false
         },
         "4002": {
           parent: 4,
           name: '收藏店铺',
           s: false
         },
         "4004": {
           parent: 4,
           name: '添加购物车',
           s: false
         },
         "4005": {
           parent: 4,
           name: '确认订单',
           s: false
         },
         "5001": {
           parent: 5,
           name: '购买宝贝',
           s: false
         }
    },
    selectList: [],
    yixiangchecked: false,
    activeChecked: false,
    activeList: [] //crowd_value=40
  }
}
componentWillMount () {
  var areas= this.state.areas
  var select = this.props.data.sceneObj.selectList
  var activeList = this.props.data.sceneObj.activeList
  if(select) {
    let obj = {}
    for (let j = 0; j < areas.length; j++) {
      let data = areas[j].data
      for (let i = 0; i < select[i]; i++) {
        if (data.indexOf(select[i]) > -1) {
         obj['r' + areas[j].id] = (obj['r' + areas[j].id] || 0) + 1
        }
      }
    }
    obj.selectList = select
    this.setState(obj)
  }
  if (activeList) {
    this.setState({
      activeList: activeList
    })
  }
  var yixiangIsexpandable = this.props.data.yixiangIsexpandable
  var activeIsexpandable = this.props.data.activeIsexpandable
  this.setState({
    yixiangchecked: yixiangIsexpandable,
    activeChecked: activeIsexpandable
  })
}
  allChange (gid, checked) {
    var selectList= this.state.selectList
    var areas= this.state.areas
    var changeItem =  areas.filter((item) => {
      return item.id === gid
    })
    var region = this.state['r' + gid] || 0
    if (checked) {
      let tmparr = []
      for (let j = 0; j < changeItem[0].data.length; j++) {
        if (selectList.indexOf(changeItem[0].data[j]) == -1) {
          tmparr.push(changeItem[0].data[j])
        }
      }
      this.setState({
        selectList: this.state.selectList.concat(tmparr),
        ['r' + gid]: changeItem[0].data.length
      })
    } else {
      let newselect = selectList.slice()
      for (let m = 0; m < changeItem[0].data.length; m++) {
        if (newselect.indexOf(changeItem[0].data[m]) > -1) {
          var index = newselect.indexOf(changeItem[0].data[m])
          newselect.splice(index, 1)
          region = region - 1
        }
      }
      this.setState({
        selectList: newselect,
        ['r' + gid]: 0
      })
    }
  }
  onChange (cityid, gid,checked) {
    var select= this.state.selectList
    var activeList = this.state.activeList
    var region = this.state['r' + gid] || 0
    if(checked) {
      if(cityid.indexOf('40')> -1) {
        this.setState({
          activeList:[...activeList.slice(), cityid]
        })
      }
      this.setState({
        selectList: [...select.slice(), cityid],
        ['r' + gid]: region + 1
      })
    } else {
      let index = select.indexOf(cityid)
      if(cityid.indexOf('40')> -1) {
        let idx = select.indexOf(cityid)
        this.setState({
          activeList: [...activeList.slice(0, idx), ...activeList.slice(idx + 1)],
        })
      }
      this.setState({
        selectList: [...select.slice(0, index), ...select.slice(index + 1)],
        ['r' + gid]: (region - 1) <= 0 ? 0 : region - 1
      })
    }
  }
  onSure () {
    var step= 3;
    var scenecrowdType = 16384
    var type = 'scene'
    var selectList = this.state.selectList;
    var selectRow = []
    var data = this.state.areas
    var activeList = this.state.activeList
    var expandable = false
    if (activeList.length > 1) {
       expandable=true
    }
    if (selectList.indexOf('3001') > -1 && selectList.indexOf('3002') > -1) {
      expandable=true
    }
    for (var i=0; i<data.length; i++) {
      var itemData = data[i].data
      var id = data[i].id
      if (selectList.length > 0) {
        for (var j=0; j<selectList.length; j++) {
          for (var k=0; k<itemData.length; k++) {
            var subCrowdValue = itemData[k]
            if (subCrowdValue ==selectList[j]) {
                selectRow.push({crowd_type: scenecrowdType, crowd_value: id, sub_crowds: [{sub_crowd_value: subCrowdValue}],expandable: expandable})
            }
          }
        }
      }
    }
    this.props.commonData({type, step, selectList, selectRow, activeList})
    history.push(addfastTestStep3)
    // else {
    //   this.showError()
    // }
  }
  showError  () {Toast.error('您还没有选择人群')}
  //意向人群自由组合按钮
  changeyixiang (value) {
    this.setState({
      yixiangchecked: value
    })
    var step=3
    var type='yixiangchecked'
    var yixiangchecked=value
    this.props.commonData({step, type, yixiangchecked})
  }
  //触发行动人群自由组合按钮
  changeactive (value) {
    this.setState({
      activeChecked: value
    })
    var step = 3
    var type='activeChecked'
    var activeChecked = value
    this.props.commonData({step, type, activeChecked})
  }
  render () {
    var select= this.state.selectList
    var activeList = this.state.activeList
    return (
      <div className='panel panel-default' style={{margin: '10px', fontSize: '14px'}}>
        <div className="panel-heading" style={{overflow: 'hidden'}}>
          营销场景定向
        </div>
        <div className="panel-body" style={{paddingBottom: '50px'}}>
          {this.state.areas.length === 0 ? <div>Loading...</div> :
            <div>
              { this.state.areas.map((item, index) => {
                  var items = this.state.areas[index].data
                  var itemId = this.state.areas[index].id
                  return (
                    <Row key={index}>
                      <Col fixedSpan="6">
                        <div className="demo-col-inset" style={{float: 'left', margin: '10px'}}>
                          <Checkbox
                            checked={this.state['r' + itemId] && this.state['r' + itemId] == items.length == true ? true : false}
                            onChange={this.allChange.bind(this, itemId)}
                            >
                            {this.state.areas[index].name}
                           </Checkbox>
                        </div>
                      </Col>
                      <Col><div className="demo-col-inset">

                      {
                        items.map((cityid) => {
                          let city = this.state.areaobj[cityid]
                          return (
                            <div style={{float:'left', margin: '10px'}} key={city.name}>
                              <label>
                                  <Checkbox
                                  checked={select.indexOf(cityid) > -1}
                                  onChange={this.onChange.bind(this, cityid, itemId)}
                                  defaultChecked={select.indexOf(cityid) > -1}
                                  />
                                  <span style={{paddingLeft: '10px', fontWeight: 'normal'}}>{city.name}</span>
                              </label>
                            </div>
                            )
                          })
                      }
                      </div>
                      </Col>
                      <Col>
                        {
                          itemId == 30
                          ? <div><span>是否自由组合: </span>
                              <Switch checkedChildren="开" unCheckedChildren="关"
                                       style={{marginLeft: '10px', verticalAlign: 'middle'}}
                                       disabled={select.indexOf('3001') >-1 && select.indexOf('3002') >-1 ? false : true}
                                       onChange={this.changeyixiang.bind(this)}
                                       checked={this.state.yixiangchecked}/>
                            </div>
                          : null
                        }
                        {
                          itemId == 40
                          ? <div><span>是否自由组合: </span>
                              <Switch checkedChildren="开" unCheckedChildren="关"
                                       style={{marginLeft: '10px', verticalAlign: 'middle'}}
                                       disabled={activeList.length > 1 ? false : true}
                                       onChange={this.changeactive.bind(this)}
                                       checked={this.state.activeChecked}/>
                            </div>
                          : null
                        }
                      </Col>
                    </Row>
                  )
                })
              }
             </div>
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

export default SceneDirection
>>>>>>> a43b3823b062de6e7da27e692def8042fa1e75a2
