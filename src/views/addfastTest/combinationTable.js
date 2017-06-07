import React from 'react';
import Table from 'qnui/lib/table';
import Loading from 'qnui/lib/loading';
import EditInline from './editInline';
import Button from 'qnui/lib/button';
const titleDirection = {
	 		'0' : '通投',
      '32768' : '智能定向',
      '16' : '访客定向',
      '131072' : '相似宝贝定向-喜欢相似宝贝的人群',
      '262144' : '相似宝贝定向-喜欢我的宝贝的人群',
      '8192' : '群体定向',
      '64' : '兴趣点定向',
      '16384' : '营销场景定向'
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
      cpms: 0
    }
  }
  renderAdzoneName (value, index, record) {
    return (<span>{record.Adzone.Name}</span>)
  }
  rendercreativesName (value, index, record) {
    return (<span>{record.Creative.Name}</span>)
  }
  rendercreativesPic (value, index, record) {
    return (<img src={record.Creative.ImagePath} style={{width:300, height: 'auto'}}/>)
  }
  renderCreativeSize (value, index, record) {
		return (<div><span>{record.Creative.CreativeSize.Width}</span> * <span>{record.Creative.CreativeSize.Height}</span></div>)
	}
	rendersubCrowds (value, index, record) {
    return (
       <div>
         { record.Crowds
					 ? record.Crowds.map((item,index) => {
             return (
               <div key={index} style={{paddingBottom: '8px', lineHeight: '24px'}}>
								 <span>{titleDirection[item.crowd_type]}&nbsp;&nbsp;</span>
								 <span>{item.sub_crowds ? ':' : ''}&nbsp;&nbsp;</span>
								 {item.crowd_value ?  <span>{crowdValue[item.crowd_value]} : &nbsp;&nbsp;</span> : ''}
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
						: <div>暂无定向</div>
         }
       </div>
     )
   }
	sendcpm (sendvalue, record) {
		this.props.cpmData(sendvalue, record)
	}
	rendercpmInput (value, index, record) {
		return (
			<EditInline sendcpm={this.sendcpm.bind(this, record)} cpm={record.cpm}/>
		)
	 }
	render () {
    var data = this.props.data
    return (
      <div>
        {
          data.length > 0
          ? <Table dataSource={data}
                     rowSelection={this.props.rowSelection}
                               >
                <Table.ColumnGroup title='资源位'>
                  <Table.Column title="资源位名称" cell={this.renderAdzoneName.bind(this)}/>
                </Table.ColumnGroup>
                <Table.ColumnGroup title='创意'>
                  <Table.Column title="创意名称" cell={this.rendercreativesName.bind(this)}/>
                  <Table.Column title="创意图片" cell={this.rendercreativesPic.bind(this)} width={350}/>
                  <Table.Column title="创意尺寸" cell={this.renderCreativeSize.bind(this)}/>
                </Table.ColumnGroup>
                <Table.Column title="定向设置" cell={this.rendersubCrowds.bind(this)}/>
                <Table.Column title="CPM出价" cell={this.rendercpmInput.bind(this)}/>
            </Table>
          : <div style={{margin: '50px auto', textAlign: 'center'}}>暂无数据</div>
        }
      </div>


    )
  }
}

export default CombinationTable
