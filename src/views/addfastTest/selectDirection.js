import React from 'react';
import axios from 'axios';
import Notice from 'qnui/lib/notice';
const titleDirection = {
	 		'0' : '通投',
      '32768' : '智能定向',
      '16' : '访客定向',
      '131072' : '相似宝贝定向-喜欢相似宝贝的人群',
      '262144' : '相似宝贝定向-喜欢我的宝贝的人群',
      '8192' : '群体定向',
      '64' : '兴趣点定向',
      '16384' : '营销场景定向',
      '128': '达摩盘定向',
      '524288': '类目定向'
}
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

class SelectDirection extends React.Component {
  constructor() {
    super()
    this.state={
      selectData: []
    }
  }
  componentWillMount () {
    var newArr = []
    var zizhuObj = this.props.zizhuObj
    var zhongziObj = this.props.zhongziObj
    var peopleObj = this.props.peopleObj
    var likemybodyObj = this.props.likemybodyObj
    var similarObj = this.props.similarObj
    var selectRow = this.props.selectRow
    var checked = this.props.checked
    var zhinengchecked = this.props.zhinengchecked
    var tongtouObj = this.props.tongtouObj
    var zhinengObj = this.props.zhinengObj
    var dmpArr = this.props.dmpArr
    var selectCats = this.props.selectCats
    if(zizhuObj.crowd_type) {
      newArr.push(zizhuObj)
    }
		if(dmpArr) {
     var dmpArrs = newArr.concat(dmpArr)
     newArr = dmpArrs
    }
    if (selectCats) {
      var selectCats = newArr.concat(selectCats)
      newArr = selectCats
    }
    if (selectRow) {
      var selectRow = newArr.concat(selectRow)
      newArr = selectRow
    }
    if(zhongziObj.crowd_type) {
      newArr.push(zhongziObj)
    }
		if (peopleObj.crowd_type) {
      newArr.push(peopleObj)
    }
    if (likemybodyObj.crowd_type) {
      newArr.push(likemybodyObj)
    }
    if (similarObj.crowd_type) {
      newArr.push(similarObj)
    }
    this.setState({
      selectData: newArr
    })
  }
  rendersubCrowds () {
    var selectData = this.state.selectData
    return (
       <div>
			  {
					 this.props.zhinengchecked == true
					 ? <div style={{lineHeight: '20px', paddingBottom: '8px'}}>智能定向-店铺</div>
					 : null
				 }
				 {
					 this.props.tongtouchecked == true
					 ? <div style={{lineHeight: '20px', paddingBottom: '8px'}}>通投</div>
					 : null
				 }
			 	{selectData.length > 0
           ? selectData.map((item,index) => {
             return (
               <div key={index} style={{paddingBottom: '8px', lineHeight: '20px'}}>
                 <span>{titleDirection[item.crowd_type]}&nbsp;&nbsp;</span>
                 {item.crowd_value && item.crowd_type != 128 ?  <span>{crowdValue[item.crowd_value]}&nbsp;&nbsp;</span> : ''}
                 {item.crowd_name ?  <span>{item.crowd_name}&nbsp;</span> : ''}
								 {
                   item.crowd_type == 16384
                   ? ( item.sub_crowds ? item.sub_crowds.map((v, i) => {
                  return (<span style={{color: '#333'}} key={i}>{subCrowdValue[v.sub_crowd_value]}&nbsp;&nbsp;</span>)
                   }) : null)
                   : ( item.sub_crowds ? item.sub_crowds.map((v, i) => {
                  return (<span style={{color: '#333'}} key={i}>{v.sub_crowd_name}&nbsp;&nbsp;</span>)
                   }) : null)
                 }
               </div>
             )
            })
            : <div style={{margin: '50px auto', textAlign: 'center'}}>
                {
									this.props.zhinengchecked == false && this.props.tongtouchecked == false
									? <div style={{margin: '50px auto', textAlign: 'center'}}>暂无数据</div>
									: ''
								}
						  </div>
         }
       </div>
     )
   }
  render () {
    return (
      <div className='panel panel-default' style={{minHeight: '350px'}}>
        <div className="panel-heading" style={{overflow: 'hidden'}}>
          <span>您选择的定向</span>
				</div>
        <div className="panel-body">
				  <Notice title="如果您没有选择任何定向，默认为通投！" style={{marginBottom: '10px'}}/>
          {this.rendersubCrowds()}
        </div>
      </div>
    )
  }
}

export default SelectDirection
