<<<<<<< HEAD
import React from 'react';
import Table from 'qnui/lib/table';
import Loading from 'qnui/lib/loading';
import EditInline from './editInline';
import Button from 'qnui/lib/button';
import Checkbox from 'qnui/lib/checkbox';


const titleDirection = {
	 		'0' : '通投',
      '32768' : '智能定向',
      '16' : '访客定向',
      '131072' : '相似宝贝定向-喜欢相似宝贝的人群',
      '262144' : '相似宝贝定向-喜欢我的宝贝的人群',
      '8192' : '群体定向',
      '64' : '兴趣点定向',
      '16384' : '营销场景定向',
			'128' : '达摩盘定向'
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
class CombinationTable extends React.Component {
	constructor () {
    super()
    this.state={
      cpms: 0,
			CreativesList: []
		}
  }
  renderAdzoneName (record) {
    return (<span>{record.Name}</span>)
  }
	onChangeCreatives (id, CreativesId, checked) {
		this.props.sendSelectCreatives(id, CreativesId, checked)


	}
  rendercreativesName (value, index, record) {
		var Creatives = record.Creatives
		var id = record.Key
		 var checked_list = record.checked_list
		return (
			<div>
					{
						Creatives
						? Creatives.map((item, index) => {
              let checked = (checked_list|| []).indexOf(item.Id)
							return (
								<div style={{overflow: 'hidden'}} key={id + '_' + item.Id} style={{marginRight: '10px'}}>
								  <img src={item.ImagePath} style={{width:'150px', height:'auto', marginRight: '10px', marginBottom: '10px'}}/>
									<Checkbox onChange={this.onChangeCreatives.bind(this, id, item.Id)} checked={checked > -1}/>
								</div>
							)
						})
						: <div>loading...</div>
					}
			</div>
		)

  }
 rendersubCrowds (value, index, record) {
	 var Crowds = record.Crowds
	 var key = record.Key
   return (
       <div>
         { Crowds
					 ? Crowds.map((item,index) => {

             return (
               <div key={index} style={{paddingBottom: '8px', lineHeight: '24px'}}>
							   <div>
									 <span style={{float: 'left'}}>{titleDirection[item.crowd_type]}&nbsp;&nbsp;</span>
									 <EditInline sendcpm={this.sendcpm.bind(this, Crowds, key, item.Crowds_zuanshi_id)} cpm={item.matrix_price[0].Price/100}/>
								 </div>
								 <div style={{clear: 'both'}}>
								 	{item.crowd_value && item.crowd_type != 128 ?  <span>{crowdValue[item.crowd_value]} : &nbsp;&nbsp;</span> : ''}
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
							</div>
             )
            })
						: <div>暂无定向</div>
         }
       </div>
     )
   }
	sendcpm (sendvalue, record, id, Crowds_zuanshi_id) {
		this.props.cpmData(id, record, sendvalue, Crowds_zuanshi_id)
	}
	// rendercpmInput (value, index, record) {
	// 	return (
	// 		<EditInline sendcpm={this.sendcpm.bind(this, record)} cpm={record.cpm}/>
	// 	)
	//  }
	groupHeaderRender (record) {
		return (<div>{record.Adzone.Name}</div>)
	}
	render () {
    var data = this.props.data
		return (
      <div>
        {
          data.length > 0
          ? <Table dataSource={data} primaryKey="Key">
								<Table.Column  title="资源位" dataIndex="Adzone" cell={this.renderAdzoneName.bind(this)}/>
								<Table.Column  cell={this.rendersubCrowds.bind(this)} title="定向"/>
								<Table.Column  cell={this.rendercreativesName.bind(this)} title="创意"/>
						</Table>
          : <div style={{margin: '50px auto', textAlign: 'center'}}><Loading/></div>
        }
      </div>
   )
  }
}

export default CombinationTable
=======
import React from 'react';
import Table from 'qnui/lib/table';
import Loading from 'qnui/lib/loading';
import EditInline from './editInline';
import Button from 'qnui/lib/button';
import Checkbox from 'qnui/lib/checkbox';


const titleDirection = {
	 		'0' : '通投',
      '32768' : '智能定向',
      '16' : '访客定向',
      '131072' : '相似宝贝定向-喜欢相似宝贝的人群',
      '262144' : '相似宝贝定向-喜欢我的宝贝的人群',
      '8192' : '群体定向',
      '524288' : '类目型定向',
      '16384' : '营销场景定向',
			'128' : '达摩盘定向'
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
class CombinationTable extends React.Component {
	constructor () {
    super()
    this.state={
      cpms: 0,
			CreativesList: []
		}
  }
  renderAdzoneName (record) {
    return (<span>{record.Name}</span>)
  }
	onChangeCreatives (id, CreativesId, checked) {
		this.props.sendSelectCreatives(id, CreativesId, checked)


	}
  rendercreativesName (value, index, record) {
		var Creatives = record.Creatives
		var id = record.Key
		 var checked_list = record.checked_list
		return (
			<div>
					{
						Creatives
						? Creatives.map((item, index) => {
              let checked = (checked_list|| []).indexOf(item.Id)
							return (
								<div style={{overflow: 'hidden'}} key={id + '_' + item.Id} style={{marginRight: '10px'}}>
								  <img src={item.ImagePath} style={{width:'150px', height:'auto', marginRight: '10px', marginBottom: '10px'}}/>
									<Checkbox onChange={this.onChangeCreatives.bind(this, id, item.Id)} checked={checked > -1}/>
								</div>
							)
						})
						: <div>loading...</div>
					}
			</div>
		)

  }
 rendersubCrowds (value, index, record) {
	 var Crowds = record.Crowds
	 var key = record.Key
   return (
       <div>
         { Crowds
					 ? Crowds.map((item,index) => {
						return (
               <div key={index} style={{paddingBottom: '8px', lineHeight: '24px'}}>
							   <div>
									 <span style={{float: 'left'}}>{titleDirection[item.crowd_type]}&nbsp;&nbsp;</span>
									 <EditInline sendcpm={this.sendcpm.bind(this, Crowds, key, item.Crowds_zuanshi_id)} cpm={item.matrix_price[0].Price/100}/>
								 </div>
								 <div style={{clear: 'both'}}>
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
							</div>
             )
            })
						: <div>暂无定向</div>
         }
       </div>
     )
   }
	sendcpm (sendvalue, record, id, Crowds_zuanshi_id) {
		this.props.cpmData(id, record, sendvalue, Crowds_zuanshi_id)
	}
	// rendercpmInput (value, index, record) {
	// 	return (
	// 		<EditInline sendcpm={this.sendcpm.bind(this, record)} cpm={record.cpm}/>
	// 	)
	//  }
	groupHeaderRender (record) {
		return (<div>{record.Adzone.Name}</div>)
	}
	render () {
    var data = this.props.data
		return (
      <div>
        {
          data.length > 0
          ? <Table dataSource={data} primaryKey="Key">
								<Table.Column  title="资源位" dataIndex="Adzone" cell={this.renderAdzoneName.bind(this)}/>
								<Table.Column  cell={this.rendersubCrowds.bind(this)} title="定向"/>
								<Table.Column  cell={this.rendercreativesName.bind(this)} title="创意"/>
						</Table>
          : <div style={{margin: '50px auto', width: '200px'}}><Loading/></div>
        }
      </div>
   )
  }
}

export default CombinationTable
>>>>>>> a43b3823b062de6e7da27e692def8042fa1e75a2
