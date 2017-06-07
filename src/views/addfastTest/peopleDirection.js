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
const Toast = Feedback.toast;
const history = createHistory()
class PeopleDirection extends React.Component {
  constructor () {
    super()
    this.state={
      peopleData: [],
      selectList: [],
      selectName: [],
      allData: []
    }
  }
  isMount=false
  componentWillMount () {
    var self = this;
    var selectTagsId = this.props.data.peopleDirection.selectTagsId
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
    if(selectTagsId.length > 0) {
      for(var i=0; i< peopleData.length; i++) {
        for(var j=0; j< selectTagsId.length; j++) {
          if(peopleData[i].Id == selectTagsId[j]) {
            selectTagsName.push({sub_crowd_name:peopleData[i].Name, sub_crowd_value: selectTagsId[j]})
          }
        }
      }
      this.props.commonData({type, step, selectTagsId, selectTagsName, peoplecrowdType})
      history.push(addfastTestStep3)
    } else {
      this.showError()
    }
  }
  showError  () {Toast.error('您还没有选择人群')}
  render () {
    var peopleData = this.state.peopleData
    var select = this.state.selectList
    return (
      <div className='panel panel-default' style={{margin: '10px'}}>
        <div className="panel-heading" style={{overflow: 'hidden'}}>
          群体定向
        </div>
        <div className="panel-body" style={{paddingBottom: '50px'}}>
          <div>
            <div style={{padding: '10px'}}>标签</div>
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
