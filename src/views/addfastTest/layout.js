<<<<<<< HEAD
import React, { PropTypes } from 'react'
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect

 } from 'react-router-dom'
import {routes} from '../../routes/add'
import createHistory from 'history/createHashHistory'
const history = createHistory()

class AddTestPlanLayout extends React.Component {
  constructor (props) {
    super(props)
    this.state={
      step1: [], //添加创意被选中的Id
      step2: [], //添加资源位被选中的Id
      step3: [],
      step4: [],
      step5: [],
      speareas: [],
      areas: [],
      creativesItem: [], //添加创意被选中的item
      AdzonesItem: [], //添加资源位被选中的item
      checked: true,
      zhinengchecked: false,
      tongtoucrowdType: 1,
      zhinengcrowdType: 0,
      sencecrowdType: 0,
      peoplecrowdType: 0,
      uvcrowdType: 0,
      sceneDirection: {},   //营销场景定向数据
      peopleDirection: {},  //群体定向数据
      uvDirection: {}, //访客定向数据
      interestStoreDara: {}, //兴趣点定向数据
      interestTab1: {},
      interestTab2: {},
      interestTab3: {},
      similarDirection: {},
      likeMybobyDirection: {},
      tongtouObj: {},
      zizhuObj: {},
      zhongziObj: {},
      similarObj: {},
      likemybodyObj: {},
      interestObj: {},
      sceneObj: {},
      peopleObj: {},
      zhinengObj: {},
      combinationItem: [],
      combinationdata: {},
      formData: {},
      Row1value: {},     //营销场景
      Row2value: {},
      Row3value: {},
      Row4value: {},
      Row5value: {},
      Row6value: {},
      Row7value: {},
      Row8value: {},
      Row9value: {},
      tiaoguoObj:{},
      uvzizhuObj: {},  //访客自主
      editPriceData: [],
      peopleIsexpandable: false,
      yixiangIsexpandable: false,
      activeIsexpandable: false,
      dmpArr: [],   //dmp定向
      dmpObj: {}
    }
  }

  commonData (step) {
    if(step.step == 1) {
      var select = step.select
      var creativesItem = step.creativesItem
      this.setState({
        step1: select,
        creativesItem: creativesItem
      })
    }
    if(step.step == 2) {
      var selectAdArr = step.selectAd
      var AdzonesItem = step.AdzonesItem
      this.setState({
        step2: selectAdArr,
        AdzonesItem: AdzonesItem
      })
    }
    if(step.step == 3) {
      if (step.type === 'scene') {
        var sceneDirection = {
          selectList: step.selectList,
          value: step.value,
          sencecrowdType: step.scenecrowdType
        }
        var sceneObj = {
          crowdType: step.scenecrowdType,
          crowdValue: step.value,
          subCrowdValue: step.selectList
        }
        var Row1value = step.Row1value
        var Row2value = step.Row2value
        var Row3value = step.Row3value
        var Row4value = step.Row4value
        var Row5value = step.Row5value
        var Row6value = step.Row6value
        var Row7value = step.Row7value
        var Row8value = step.Row8value
        var Row9value = step.Row9value
      }
      if (step.type === 'combination') {
        var combinationdata = {
          combinationData: step.combinationData,
          combinationObj: step.editList
          // data: step.data
        }
        this.setState({
          combinationdata: combinationdata
        })
      }
      if(step.type === 'isexpandvalue') {
        this.setState({
          peopleIsexpandable: step.isexpandvalue
        })
      }
      if(step.type==='yixiangchecked') {
        this.setState({
          yixiangIsexpandable: step.yixiangchecked
        })
      }
      if(step.type==='activeChecked') {
        this.setState({
          activeIsexpandable: step.activeChecked
        })
      }
      if (step.type === 'people') {
        var peopleDirection = {
          selectTagsId: step.selectTagsId,
          selectTagsName: step.selectTagsName,
          peoplecrowdType: step.peoplecrowdType

        }
        var peopleObj = {
          crowd_type: step.peoplecrowdType,
          sub_crowds: step.selectTagsName,
          expandable: this.state.peopleIsexpandable
        }
      }
      if (step.type === 'dmp') {
        var dmpObj = {
          selectId: step.select,
        }
        this.setState({
          dmpObj: dmpObj,
          dmpArr: step.dpmArr
        })
      }
      if (step.type === 'zizhuuv') {
        var uvzizhuObj = {
          crowdValue: step.crowdValue,
          subCrowdName: step.subCrowdName,
          subObj: step.zizhuObj,
          type: step.type
        }
       var zizhuObj = step.zizhuObj
      }
      if (step.type === 'zhongziuv') {
        var uvDirection = {
          crowdValue: step.crowdValue,
          subzhongziName: step.subzhongziName,
          subObj: step.zhongziObj,
          type: step.type
        }
       var zhongziObj = step.zhongziObj
      }
      if(step.type === 'interest') {
        var interestObj = {
            sub_crowds: step.selectName,
            crowd_type: step.crowdType
        }
      }
      if (step.type === 'interest' && step.tab1 == 1) {
        var interestTab1 ={
          subshopCrowdValue: step.subshopCrowdValue,
          crowdType: step.crowdType,
          nickName: step.nickName,
          selectshopName: step.selectshopName
        }
      }
      if (step.type === 'interest' && step.tab2 == 2) {
        var interestTab2 ={
          ids: step.ids,
          crowdType: step.crowdType,
          subidCrowdValue: step.subidCrowdValue,
          selectIdsName: step.selectIdsName
        }
      }
      if (step.type === 'interest' && step.tab3 == 3) {
        var interestTab3 ={
          keyword: step.keyword,
          crowdType: step.crowdType,
          subkeywordValue: step.subkeywordValue,
          selectKeywordName : step.selectKeywordName
        }
      }
      if (step.type === 'interest') {
        this.setState({
          interestObj: interestObj
        })
      }
      if (step.type === 'form') {
        var formData={
          name: step.name,
          impressions: step.impressions,
          startDates: step.startDates,
          startTime: step.startTime,
          endTime: step.endTime,
          speed_type: step.speed_type,
          adgroupModal: step.adgroupModal
        }
        this.setState({
          formData: formData
        })
      }
    if (step.type === 'tiaoguo') {
      var tiaoguoObj ={
        crowdType: step.crowdType
      }
      this.setState({
        tiaoguoObj: tiaoguoObj
      })
    }
      if (step.type === 'interest' && step.tab1 == 1) {
        this.setState({
          interestTab1: interestTab1,
        })
      }
      if (step.type === 'interest' && step.tab2 == 2) {
        this.setState({
          interestTab2: interestTab2,
        })
      }
      if (step.type === 'interest' && step.tab3 == 3) {
        this.setState({
          interestTab3: interestTab3,
        })
      }
    if(step.type === 'similar') {
        var similarDirection ={
          select: step.select,
          crowdType: step.crowdType,
          searchkw: step.searchkw,
          itemname: step.itemname
        }
        var similarObj = {
          crowd_type: step.crowdType,
          sub_crowds: step.itemname
        }
      }
      if(step.type === 'similar') {
        this.setState({
          similarDirection: similarDirection,
          similarObj: similarObj
        })
      }

      if(step.type === 'likemybody') {
        var likeMybobyDirection ={
          select: step.select,
          crowdType: step.crowdType,
          searchkw: step.searchkw,
          itemname: step.itemname
        }
        var likemybodyObj = {
          crowd_type: step.crowdType,
          sub_crowds: step.itemname
        }
      }
      if(step.type === 'likemybody') {
        this.setState({
          likeMybobyDirection: likeMybobyDirection,
          likemybodyObj: likemybodyObj
        })
      }
      if (step.type === 'tongtou') {
        var tongtou = {
            crowd_type: 0
        }
        this.setState({
          checked: step.tongtouchecked,
          tongtoucrowdType: step.crowdType,
          tongtouObj: tongtou
        })
      }
      if(step.type === 'zhineng'){
        var obj = {
          crowd_type: 32768
        }
        this.setState({
          zhinengcrowdType: step.zhinengcrowdType,
          zhinengchecked: step.zhinengchecked,
          zhinengObj: obj
        })
      }
      // if(step.zhinengchecked == true && step.type === 'zhineng') {
      //   var obj = {
      //     crowd_type:32768
      //   }
      //   this.setState({
      //     zhinengObj: obj
      //   })
      // }
      if(step.type === 'scene') {
        this.setState({
          sceneDirection: sceneDirection,
          sceneObj: sceneObj,
          Row1value: Row1value,
          Row2value: Row2value,
          Row3value: Row3value,
          Row4value: Row4value,
          Row5value: Row5value,
          Row6value: Row6value,
          Row7value: Row7value,
          Row8value: Row8value,
          Row9value: Row9value
        })
      }

      if(step.type === 'people') {
        this.setState({
          peopleDirection: peopleDirection,
          peopleObj: peopleObj

        })
      }

      if(step.type === 'zizhuuv') {
        this.setState({
          uvzizhuObj: uvzizhuObj,
          zizhuObj: zizhuObj
        })
      }
     if(step.type === 'zhongziuv') {
       this.setState({
           uvDirection: uvDirection,
           zhongziObj: zhongziObj
      })
    }

    }
    if(step.step == 'editMax_price') {
      this.setState({
        editPriceData: step.editRow
      })
    }
    if(step.step == 4) {
      var selectArea = step.allAreas
      var areas = step.areaItem
      var speAreas = step.specailareas
      this.setState({
        step4: selectArea,
        areas: areas,
        speareas: speAreas
      })
    }
  }
  render () {
    const self = this;
    let browsername = ''
    if(process.env.NODE_ENV === 'production'){
      browsername = '/'
    } else{
      browsername = '_dev/dsp/site'
    }
    return (
	     <div className='home'>
    	            {this.props.routes.map((route, index) => {
                    return (
                      <Route key={index} exact={route.exact} path={route.path} render={props => (
                        <route.component {...props}  commonData={self.commonData.bind(this)}   data={this.state} />
                      )} />
                    )
                  })}
       </div>
		)
  }
}


AddTestPlanLayout.propTypes = {
  children: PropTypes.element
}

export default AddTestPlanLayout
=======
import React, { PropTypes } from 'react'
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect

 } from 'react-router-dom'
import {routes} from '../../routes/add'
import createHistory from 'history/createHashHistory'
const history = createHistory()

class AddTestPlanLayout extends React.Component {
  constructor (props) {
    super(props)
    this.state={
      step1: [], //添加创意被选中的Id
      step2: [], //添加资源位被选中的Id
      step3: [],
      step4: [],
      step5: [],
      speareas: [],
      areas: [],
      creativesItem: [], //添加创意被选中的item
      AdzonesItem: [], //添加资源位被选中的item
      checked: true,
      zhinengchecked: false,
      tongtoucrowdType: 1,
      zhinengcrowdType: 0,
      sencecrowdType: 0,
      peoplecrowdType: 0,
      uvcrowdType: 0,
      sceneDirection: {},   //营销场景定向数据
      peopleDirection: {},  //群体定向数据
      uvDirection: {}, //访客定向数据
      interestStoreDara: {}, //兴趣点定向数据
      interestTab1: {},
      interestTab2: {},
      interestTab3: {},
      similarDirection: {},
      likeMybobyDirection: {},
      tongtouObj: {}, //通投
      zizhuObj: {},  //自主店铺
      zhongziObj: {}, //种子店铺
      similarObj: {}, //相似宝贝
      likemybodyObj: {}, //喜欢相似宝贝
      interestObj: {}, //兴趣定向
      sceneObj: {}, //营销场景
      peopleObj: {}, //人群定向
      zhinengObj: {}, // 智能定向
      combinationItem: [],
      combinationdata: {}, //组合页
      formData: {}, //创建极速测试
      tiaoguoObj:{},
      uvzizhuObj: {},  //访客自主
      editPriceData: [],
      peopleIsexpandable: false,
      yixiangIsexpandable: false,
      activeIsexpandable: false,
      dmpArr: [],   //dmp定向
      dmpObj: {},
      catsObj: {} //类目定向
    }
  }

  commonData (step) {
    if(step.step == 1) {
      var select = step.select
      var creativesItem = step.creativesItem
      this.setState({
        step1: select,
        creativesItem: creativesItem
      })
    }
    if(step.step == 2) {
      var selectAdArr = step.selectAd
      var AdzonesItem = step.AdzonesItem
      this.setState({
        step2: selectAdArr,
        AdzonesItem: AdzonesItem
      })
    }
    if(step.step == 3) {
      if (step.type === 'scene') {
        var sceneObj = {
          selectList: step.selectList,
          selectRow: step.selectRow,
          activeList: step.activeList
        }
        this.setState({
          sceneObj: sceneObj
        })
      }
      if (step.type === 'combination') {
        var combinationdata = {
          combinationData: step.combinationData,
          combinationObj: step.editList
          // data: step.data
        }
        this.setState({
          combinationdata: combinationdata
        })
      }
      if(step.type === 'isexpandvalue') {
        this.setState({
          peopleIsexpandable: step.isexpandvalue
        })
      }
      if(step.type==='yixiangchecked') {
        this.setState({
          yixiangIsexpandable: step.yixiangchecked
        })
      }
      if(step.type==='activeChecked') {
        this.setState({
          activeIsexpandable: step.activeChecked
        })
      }
      if (step.type === 'people') {
        var peopleDirection = {
          selectTagsId: step.selectTagsId,
          selectTagsName: step.selectTagsName,
          peoplecrowdType: step.peoplecrowdType

        }
        var peopleObj = step.peopleObj
        this.setState({
          peopleDirection: peopleDirection,
          peopleObj: peopleObj

        })
      }
      if (step.type === 'dmp') {
        var dmpObj = {
          selectId: step.select,
          dmpItem: step.dmpItem
        }
        this.setState({
          dmpObj: dmpObj,
          dmpArr: step.dpmArr
        })
      }
      if (step.type === 'cats') {
        var catsObj = {
          selectCats: step.selectCats,
          selectedRowKeys: step.selectedRowKeys
        }
        this.setState({
          catsObj: catsObj
        })
      }
      if (step.type === 'zizhuuv') {
        var uvzizhuObj = {
          crowdValue: step.crowdValue,
          subCrowdName: step.subCrowdName,
          subObj: step.zizhuObj,
          type: step.type
        }
       var zizhuObj = step.zizhuObj
       this.setState({
          uvzizhuObj: uvzizhuObj,
          zizhuObj: zizhuObj
        })
      }
      if (step.zhongziType === 'zhongziuv') {
        var uvDirection = {
          crowdValue: step.crowdValue,
          subzhongziName: step.subzhongziName,
          subObj: step.zhongziObj,
          type: step.zhongziType
        }
       var zhongziObj = step.zhongziObj
       this.setState({
           uvDirection: uvDirection,
           zhongziObj: zhongziObj
      })
      }
      if(step.type === 'interest') {
        var interestObj = {
            sub_crowds: step.selectName,
            crowd_type: step.crowdType
        }
      }
      if (step.type === 'interest' && step.tab1 == 1) {
        var interestTab1 ={
          subshopCrowdValue: step.subshopCrowdValue,
          crowdType: step.crowdType,
          nickName: step.nickName,
          selectshopName: step.selectshopName
        }
      }
      if (step.type === 'interest' && step.tab2 == 2) {
        var interestTab2 ={
          ids: step.ids,
          crowdType: step.crowdType,
          subidCrowdValue: step.subidCrowdValue,
          selectIdsName: step.selectIdsName
        }
      }
      if (step.type === 'interest' && step.tab3 == 3) {
        var interestTab3 ={
          keyword: step.keyword,
          crowdType: step.crowdType,
          subkeywordValue: step.subkeywordValue,
          selectKeywordName : step.selectKeywordName
        }
      }
      if (step.type === 'interest') {
        this.setState({
          interestObj: interestObj
        })
      }
      if (step.type === 'form') {
        var formData={
          name: step.name,
          impressions: step.impressions,
          startDates: step.startDates,
          startTime: step.startTime,
          endTime: step.endTime,
          speed_type: step.speed_type,
          adgroupModal: step.adgroupModal
        }
        this.setState({
          formData: formData
        })
      }
    if (step.type === 'tiaoguo') {
      var tiaoguoObj ={
        crowdType: step.crowdType
      }
      this.setState({
        tiaoguoObj: tiaoguoObj
      })
    }
      if (step.type === 'interest' && step.tab1 == 1) {
        this.setState({
          interestTab1: interestTab1,
        })
      }
      if (step.type === 'interest' && step.tab2 == 2) {
        this.setState({
          interestTab2: interestTab2,
        })
      }
      if (step.type === 'interest' && step.tab3 == 3) {
        this.setState({
          interestTab3: interestTab3,
        })
      }
      if(step.type === 'similar') {
        var similarDirection ={
          select: step.select,
          crowdType: step.crowdType,
          searchkw: step.searchkw,
          itemname: step.itemname
        }
        var similarObj = {
          crowd_type: step.crowdType,
          sub_crowds: step.itemname
        }
        this.setState({
          similarDirection: similarDirection,
          similarObj: similarObj
        })
      }
      if(step.type === 'likemybody') {
        var likeMybobyDirection ={
          select: step.select,
          crowdType: step.crowdType,
          searchkw: step.searchkw,
          itemname: step.itemname
        }
        var likemybodyObj = {
          crowd_type: step.crowdType,
          sub_crowds: step.itemname
        }
        this.setState({
          likeMybobyDirection: likeMybobyDirection,
          likemybodyObj: likemybodyObj
        })
      }
      if (step.type === 'tongtou') {
        var tongtou = {
            crowd_type: 0
        }
        this.setState({
          checked: step.tongtouchecked,
          tongtoucrowdType: step.crowdType,
          tongtouObj: tongtou
        })
      }
      if(step.type === 'zhineng'){
        var obj = {
          crowd_type: 32768
        }
        this.setState({
          zhinengcrowdType: step.zhinengcrowdType,
          zhinengchecked: step.zhinengchecked,
          zhinengObj: obj
        })
      }
      // if(step.zhinengchecked == true && step.type === 'zhineng') {
      //   var obj = {
      //     crowd_type:32768
      //   }
      //   this.setState({
      //     zhinengObj: obj
      //   })
      // }
    }
    if(step.step == 'editMax_price') {
      this.setState({
        editPriceData: step.editRow
      })
    }
    if(step.step == 4) {
      var selectArea = step.allAreas
      var areas = step.areaItem
      var speAreas = step.specailareas
      this.setState({
        step4: selectArea,
        areas: areas,
        speareas: speAreas
      })
    }
  }
  render () {
    const self = this;
    let browsername = ''
    if(process.env.NODE_ENV === 'production'){
      browsername = '/'
    } else{
      browsername = '_dev/dsp/site'
    }
    return (
	     <div className='home'>
    	            {this.props.routes.map((route, index) => {
                    return (
                      <Route key={index} exact={route.exact} path={route.path} render={props => (
                        <route.component {...props}  commonData={self.commonData.bind(this)}   data={this.state} />
                      )} />
                    )
                  })}
       </div>
		)
  }
}


AddTestPlanLayout.propTypes = {
  children: PropTypes.element
}

export default AddTestPlanLayout
>>>>>>> a43b3823b062de6e7da27e692def8042fa1e75a2
