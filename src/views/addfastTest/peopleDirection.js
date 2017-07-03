import React from 'react';
import axios from 'axios';
import Checkbox from 'qnui/lib/checkbox';
import { Link } from 'react-router-dom';
import Button from 'qnui/lib/button';
import {getpeopleItems} from '../../help/url';
import Loading from 'qnui/lib/loading';
import {addfastTestStep3} from '../../help/linkUrl';
import createHistory from 'history/createHashHistory';
import Feedback from 'qnui/lib/feedback';
import Switch from 'qnui/lib/switch';
const Toast = Feedback.toast;
const history = createHistory()
class PeopleDirection extends React.Component {
  constructor () {
    super()
    this.state={
      peopleData: [],
      selectList: [],
      selectName: [],
      allData: [],
      isexpandable:false
    }
  }
  isMount=false
  componentWillMount () {
    var self = this;
    var selectTagsId = this.props.data.peopleDirection.selectTagsId
    var peopleIsexpandable = this.props.data.peopleIsexpandable
    this.setState({
        isexpandable: peopleIsexpandable
    })

    if(selectTagsId) {
      this.setState({
        selectList: selectTagsId
      })
    }
    axios.post(getpeopleItems)
    .then(function (response) {
      if(self.isMount) {
        self.setState({
          peopleData: response.data

        })
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  componentDidMount () {
 	 this.isMount=true
  }
  componentWillUnmount() {
 	 this.isMount=false
  }
  changeCheckbox (itemId, checked) {
    var select= this.state.selectList
    let newselect
    if (checked) {
			//let idx = select.indexOf(wareId)
			newselect= [...select, itemId]
    } else {
  		 let idx = select.indexOf(itemId) //返回当前值在数组中的索引
  		 newselect = [...select.slice(0, idx), ...select.slice(idx + 1)]
    }
  	this.setState({
  				selectList: newselect
  	})
  }

  onSure () {
    var step= 3
    var selectTagsId = this.state.selectList
    var peopleData = this.state.peopleData
    var peoplecrowdType = 8192
    var type = 'people'
    var selectTagsName = []
    var isexpandable = this.state.isexpandable
    if(selectTagsId.length > 0) {
      for(var i=0; i< peopleData.length; i++) {
        for(var j=0; j< selectTagsId.length; j++) {
          if(peopleData[i].Id == selectTagsId[j]) {
            selectTagsName.push({sub_crowd_name:peopleData[i].Name, sub_crowd_value: selectTagsId[j]})
          }
        }
      }
      // if(isexpandable == true) {
      //   this.props.commonData({type, step, selectTagsId, selectTagsName, peoplecrowdType, isexpandable})
    	// } else {
    	this.props.commonData({type, step, selectTagsId, selectTagsName, peoplecrowdType})
    	// }
      history.push(addfastTestStep3)
    } else {
      this.showError()
    }
  }
  showError  () {Toast.error('您还没有选择人群')}
  onChangeExpandable(value) {
    this.setState({
      isexpandable: value
    })
    var step = 3
    var type = 'isexpandvalue'
    var isexpandvalue = value
    this.props.commonData({step, type, isexpandvalue})
  }
  render () {
    var peopleData = this.state.peopleData
    var select = this.state.selectList
    return (
      <div className='panel panel-default'>
        <div className="panel-heading">
          <span style={{fontSize: '14px'}}>群体定向</span>
          <span style={{paddingLeft: '30px'}}>是否自由组合:</span>
          <Switch style={{marginLeft: '20px', marginTop: '10px'}}
                  checkedChildren="是"
                  onChange={this.onChangeExpandable.bind(this)}
                  unCheckedChildren="否"
                  disabled={select.length >= 2 ? false : true}
                  checked={this.state.isexpandable}/>
        </div>
        <div className="panel-body" style={{paddingBottom: '50px'}}>
          <div>
            {
              peopleData
                ? peopleData.map((item, index) =>{
                  return (
                    <div key={item.Id}>
                      <div style={{padding: '10px', float: 'left'}}>
                        <div>
                          <Checkbox onChange={this.changeCheckbox.bind(this, item.Id)}
                                    checked={select.indexOf(item.Id) > -1}>
                          {item.Name}
                          </Checkbox>
                        </div>
                      </div>
                    </div>
                  )
                })
                : <Loading color="#e6e6e6" size="large"  type="basic"/>
              }
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

export default PeopleDirection
