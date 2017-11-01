import React, { PropTypes } from 'react'
import axios from 'axios';
import {getCats} from '../../help/url';
import Table from 'qnui/lib/table';
import Loading from 'qnui/lib/loading';
import Search from 'qnui/lib/search';
import { Link } from 'react-router-dom';
import createHistory from 'history/createHashHistory';
const history = createHistory()
import {addfastTestStep3} from '../../help/linkUrl';
import Button from 'qnui/lib/button';
import {Transfer} from 'antd';

function converArrToObj(listArr) {
   if (listArr && listArr.length > 0) {
      let obj = listArr.reduce((mergeValue, current) => {
        let id = current.OptionValue;
        mergeValue[id] = current
        return mergeValue
    }, {})
    return obj
    }
    
}
class CatsDiectionView extends React.Component {
  constructor () {
    super () 
      this.state={
        catsData: [],
        showLoading: true,
        keyword: '',
        checkedList: {}
      }
   }
  componentWillMount () {
    let interest_name = ''
    this.loadCatsList(interest_name)
    var defaultvalue = this.props.data.catsObj.selectedRowKeys
    if (defaultvalue != undefined) {
      this.setState({
        checkedList: defaultvalue
      })
    }
 }
  loadCatsList (interest_name) {
    var self = this
    axios.post(getCats,{
      campaign_type: 2,
      interest_name: interest_name
    })
    .then(function (response) {
      let cats = response.data
      if (response.data.msg) {
        self.setState({
          showLoading: false
        })
        return
      }
      self.setState({
        showLoading: false,
        catsData: cats
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  onSure () {
    var step= 3
    var type= 'cats'
    var selectedRowKeys = this.state.checkedList
    var selectCats = []
    for (var i in selectedRowKeys) {
      selectCats.push(selectedRowKeys[i])
    }
    this.props.commonData({step, type, selectCats, selectedRowKeys})
    history.push(addfastTestStep3)
  }
  onSearch (obj) {
    const key = obj.key
    this.loadCatsList(key)
  }
  renderItem(item) {
      const customLabel = (
          <span className="custom-item">
              {item.Name} - {item.OptionName}
          </span>
      );
      return {
          label: customLabel,  // for displayed item
          value: item.title,   // for title and filter matching
      };
  }
  handleChange = (targetKeys, direction, moveKeys) => {
   const crowd_type = 524288
   var catsData = this.state.catsData
   let interestsObj = converArrToObj(catsData);
   let oldChecklist = this.state.checkedList;
   let totalObj = {...interestsObj}
   for(let prop in oldChecklist) {
        let crowd = oldChecklist[prop];
        totalObj[prop] = {
            OptionName: crowd.crowd_name,
            OptionValue: crowd.crowd_value,
            Name: crowd.ui_cat_name,
            Id: crowd.ui_cat_id
        }
    }
    let obj = {}
    targetKeys.forEach(key => {
        let item = totalObj[key]
        obj[key] = {
            crowd_type,
            crowd_name: item.OptionName,
            crowd_value: item.OptionValue,
            ui_cat_name: item.Name,
            ui_cat_id: item.Id
        }
    })
    this.setState({ checkedList: obj});
  }
  render () {
    var catsData = this.state.catsData
    let { checkedList } = this.state;
    let list = catsData;
    let interestsObj = {}
    if (catsData && catsData.length > 0) {
      interestsObj = converArrToObj(list)
    }
    let checkedListKeys = Object.keys(checkedList)
    if (checkedListKeys && checkedListKeys.length > 0) {
        checkedListKeys.forEach(keyId => {
            let crowd = checkedList[keyId]
            let id = crowd.crowd_value
            let isIn = (id in interestsObj)
            if (!isIn) {
                list.push({
                    Id: crowd.ui_cat_id,
                    Name: crowd.ui_cat_name,
                    OptionName: crowd.crowd_name,
                    OptionValue: crowd.crowd_value
                })
            }
        })
    }
    return (
      <div className='panel panel-default' style={{margin: '10px'}}>
        <div className="panel-heading" style={{overflow: 'hidden', fontSize: '14px'}}>
          类目定向
        </div>
        <div className="panel-body" style={{paddingBottom: '50px'}}>
           {
             this.state.showLoading
             ? <div style={{margin: '100px auto', width: '200px'}}><Loading /></div>
             : <div>
                  <Search inputWidth={400}
                    onSearch={this.onSearch.bind(this)}
                    placeholder="这里可以输入兴趣点的关键词进行搜索，如：连衣裙"
                    name="textName"
                    searchText=""/>
                  <Transfer
                    rowKey={record => record.OptionValue}
                    dataSource={list}
                    targetKeys={checkedListKeys}
                    onChange={this.handleChange}
                    render={this.renderItem}
                    listStyle={{
                        width: 400,
                        height: 400,
                        marginTop: '15px'
                    }}
                />
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


export default CatsDiectionView
