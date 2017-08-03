import React from 'react';
import axios from 'axios';
import { getInterestItems } from '../../help/url';
import { Link } from 'react-router-dom';
import {addfastTestStep3} from '../../help/linkUrl';
import Button from 'qnui/lib/button';
import Tab from 'qnui/lib/tab';
import InterestoreView from './interestStore';
const TabPane = Tab.TabPane;
import createHistory from 'history/createHashHistory';
import Feedback from 'qnui/lib/feedback';
import InteresIdView from './interestId';
import InteresKeywordView from './interestKeyword';
const Toast = Feedback.toast;
const history = createHistory()
class InterestDirection extends React.Component {
  constructor () {
    super()
    this.state={
      nickName: '',
      nickNameData: [],
      idsData: [],
      targetKeys: [],
      selectedKeys: [],
      ids: '',
      targetIdKeys: [],
      selectedIdKeys: [],
      keyword: '',
      keywordData: [],
      targetkeywordkeys: [],
      selectkeywordKeys: []
    }
  }
  isMount=false
  componentWillMount () {
    var subshopCrowdValue = this.props.data.interestTab1.subshopCrowdValue
    var nickName = this.props.data.interestTab1.nickName
    var subidCrowdValue = this.props.data.interestTab2.subidCrowdValue
    var ids = this.props.data.interestTab2.ids
    var keyword = this.props.data.interestTab3.keyword
    var subkeywordValue = this.props.data.interestTab3.subkeywordValue


    var self = this
    if(subkeywordValue && keyword != '') {
      self.setState({
          keyword: keyword,
          targetkeywordkeys: subkeywordValue
      })
      axios.post(getInterestItems,{
        keyword: keyword
      })
      .then(function (response) {
        if(self.isMount) {
          self.setState({
            keywordData: response.data
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    }
    if(subidCrowdValue && ids) {
      self.setState({
          ids: ids,
          targetIdKeys: subidCrowdValue
      })
      axios.post(getInterestItems,{
        item_ids: [ids]
      })
      .then(function (response) {
        if(self.isMount) {
          self.setState({
            idsData: response.data
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    }
    if(subshopCrowdValue && nickName != '') {
      self.setState({
          nickName: nickName,
          targetKeys: subshopCrowdValue
      })
      axios.post(getInterestItems,{
        nickname: nickName
      })
      .then(function (response) {
        if(self.isMount) {
          self.setState({
            nickNameData: response.data
          })
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
  onChangeText (value) {
    this.setState({
      nickName: value
    })
  }
  onChangeIds (value) {
    this.setState({
      ids: value
    })
  }
  onChangeKeywords (value) {
    this.setState({
      keyword: value
    })
  }
  sendnickName () {
    var self = this
    axios.post(getInterestItems,{
      nickname: this.state.nickName
    })
    .then(function (response) {
      if(self.isMount) {
      self.setState({
        nickNameData: response.data
      })
     }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  sendids () {
    var self = this
    axios.post(getInterestItems,{
      item_ids: [self.state.ids]
    })
    .then(function (response) {
      if(self.isMount) {
      self.setState({
        idsData: response.data
      })
     }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  sendKeyword () {
    var self = this
    axios.post(getInterestItems,{
      keyword: this.state.keyword
    })
    .then(function (response) {
      if(self.isMount) {
      self.setState({
        keywordData: response.data
      })
     }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  handleChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ targetKeys: nextTargetKeys });
  }
  handleIdsChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ targetIdKeys: nextTargetKeys });
  }
  handleSelectIdsChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({
      selectedIdKeys: [...sourceSelectedKeys, ...targetSelectedKeys]

     });
}
 handlekeywordChange = (nextTargetKeys, direction, moveKeys) => {
   this.setState({ targetkeywordkeys: nextTargetKeys });
}
 handleSelectkeywordChange = (sourceSelectedKeys, targetSelectedKeys) => {
   this.setState({
     selectkeywordKeys: [...sourceSelectedKeys, ...targetSelectedKeys]
    });
  }
  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({
      selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys]

     });
}

  onSure () {
    history.push(addfastTestStep3)
    var step= 3
    var type= 'interest'
    var nickName = this.state.nickName
    var ids = this.state.ids
    var keyword = this.state.keyword
    var crowdType= 64
    var subshopCrowdValue = this.state.targetKeys
    var subidCrowdValue = this.state.targetIdKeys
    var subkeywordValue = this.state.targetkeywordkeys
    var nickNameData = this.state.nickNameData
    var selectshopName = []
    var selectIdsName = []
    var selectKeywordName = []
    var idsData = this.state.idsData
    var keywordData = this.state.keywordData
    for(var i = 0; i< nickNameData.length; i++) {
      for(var j=0; j< subshopCrowdValue.length; j++) {
        if(nickNameData[i].Id == subshopCrowdValue[j]) {
          selectshopName.push({sub_crowd_name: nickNameData[i].Name, sub_crowd_value: subshopCrowdValue[j]})
        }
      }
    }
    for(var m = 0; m< idsData.length; m++) {
      for(var n=0; n< subidCrowdValue.length; n++) {
        if(idsData[m].Id == subidCrowdValue[n]) {
          selectIdsName.push({sub_crowd_name: idsData[m].Name, sub_crowd_value: subidCrowdValue[n]})
        }
      }
    }
    for(var r = 0; r< keywordData.length; r++) {
      for(var s=0; s< subkeywordValue.length; s++) {
        if(keywordData[r].Id == subkeywordValue[s]) {
          selectKeywordName.push({sub_crowd_name: keywordData[r].Name, sub_crowd_value: subkeywordValue[s]})
        }
      }
    }

  var tab1 = 1
  var tab2 = 2
  var tab3 = 3
  var selectName= [...selectshopName, ...selectIdsName, ...selectKeywordName]

  this.props.commonData({step, type, selectName, crowdType})
  if(subshopCrowdValue) {
    this.props.commonData({step, type, subshopCrowdValue, crowdType, nickName,
    selectshopName, tab1, selectName})
  }
  if(subidCrowdValue) {
    this.props.commonData({step, type, crowdType,
    ids, subidCrowdValue, tab2, selectIdsName, selectName})
  }
  if(subkeywordValue) {
    this.props.commonData({step, type, crowdType,
    keyword, subkeywordValue, tab3, selectKeywordName,  selectName})
  }


}
  render () {
    var nickNameData = this.state.nickNameData
    var idsData = this.state.idsData
    var keywordData = this.state.keywordData
    return (
      <div className='panel panel-default' style={{margin: '10px'}}>
        <div className="panel-heading" style={{overflow: 'hidden'}}>
          类目定向
        </div>
        <div className="panel-body" style={{paddingBottom: '50px'}}>
            {/*<Tab defaultActiveKey={0} lazyLoad={true}>
              <TabPane key={0} tab={'店铺推荐兴趣点'}>
                <InterestoreView
                    nickName={this.state.nickName}
                    nickNameData={nickNameData}
                    targetKeys={this.state.targetKeys}
                    selectedKeys={this.state.selectedKeys}
                    onChangeNick={this.handleChange}
                    onSelectChange={this.handleSelectChange}
                    onChangeText={this.onChangeText.bind(this)}
                    onClickbtn={this.sendnickName.bind(this)}
                    />
              </TabPane>
              <TabPane key={1} tab={'单品推荐兴趣点'}>
               <InteresIdView
                  ids={this.state.ids}
                  onChangeIds={this.onChangeIds.bind(this)}
                  onClickbtn={this.sendids.bind(this)}
                  idsData={idsData}
                  targetIdKeys={this.state.targetIdKeys}
                  selectedIdKeys={this.state.selectedIdKeys}
                  handleIdsChange={this.handleIdsChange}
                  handleSelectIdsChange={this.handleSelectIdsChange}/>
              </TabPane>
              <TabPane key={2} tab={'搜索兴趣点'}>*/}
                <InteresKeywordView
                    keyword={this.state.keyword}
                    onChangeKeywords={this.onChangeKeywords.bind(this)}
                    onClickKeyword={this.sendKeyword.bind(this)}
                    keywordData={keywordData}
                    targetkeywordkeys={this.state.targetkeywordkeys}
                    selectkeywordKeys={this.state.selectkeywordKeys}
                    handlekeywordChange={this.handlekeywordChange}
                    handleSelectkeywordChange={this.handleSelectkeywordChange}
                  />
              {/*</TabPane>
            </Tab>*/}
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

export default InterestDirection
