import React from 'react';
import Table from 'qnui/lib/table';
import Loading from 'qnui/lib/loading';
import Balloon from 'qnui/lib/balloon';
import Button from 'qnui/lib/button';

const Status = {0:"暂停", 1:"投放中", 9:"投放结束"}
const StatusColor = {0:"#f50", 1:"#87d068", 9: "#2db7f5"}
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
class AdgroupDataView extends React.Component {
    renderStatus (value, index, record) {
    let style = {backgroundColor: StatusColor[record.Adgroup.OnlineStatus],
      width: '80px',
      color: '#fff',
      borderRadius: '6px',
      textAlign: 'center',
      padding: '5px 0'}
    let status = Status[record.Adgroup.OnlineStatus];
    return (
      <div style={style}>
          {status}
      </div>
    )
   }
   renderName (value, index, record) {
     return (
         <div>{record.Adgroup.Name}</div>
     )
   }
   renderCrowds (value, index, record) {
   var Crowds = record.Crowds
   var key = record.zuanshi_key
   return (
       <div>
         { Crowds
        ? Crowds.map((item,index) => {
        return (
            <div key={index} style={{paddingBottom: '8px', lineHeight: '24px'}}>
                <div>
                <span>{item.crowd_name}&nbsp;&nbsp;</span>
                {item.crowd_value && item.crowd_type == 16384  ?  <span>{crowdValue[item.crowd_value]} : &nbsp;&nbsp;</span> : ''}
                {
                    item.crowd_type == 16384
                    ? ( item.sub_crowds ? item.sub_crowds.map((v, i) => {
                return (<span style={{color: '#333'}} key={i}>{subCrowdValue[v.sub_crowd_value]}&nbsp;&nbsp;</span>)
                    }) : null)
                    : ( item.sub_crowds && item.crowd_type != 0 && item.crowd_type != 32768 ? item.sub_crowds.map((v, i) => {
                return (<span style={{color: '#333'}} key={i}>{v.sub_crowd_name}&nbsp;&nbsp;</span>)
                    }) : null)
                }
                </div>
                <div style={{fontSize: '12px', color: '#999'}}>
                    <span>{item.adzonedName}&nbsp;&nbsp;&nbsp;</span>
                    <span>￥ {(item.matrix_price[0].Price/100).toFixed(2)}</span>
                </div>
            </div>
          )
        })
        : <div>暂无定向</div>
         }
       </div>
     )
  }
  renderImg (value, index, record) {
    var Creatives= record.Creatives
    return (
      <div>
         {
           Creatives
           ? Creatives.map((item, index) => {
             const imgsm = <img src={item.ImagePath} style={{width: '100px'}}/>
             return (
               <div style={{marginBottom: '10px'}} key={index}>
                  <Balloon trigger={imgsm} align="lt" alignment="edge" style={{width: 300}}>
                     <img src={item.ImagePath} style={{width: '250px'}}/>
                  </Balloon>
               </div>)
           })
           : <div>loading...</div>
         }
      </div>
    )
   }
 renderTable () {
      var adgroupData= this.props.adgroupData
      if(adgroupData && adgroupData.length > 0) {
          return (
              <Table dataSource={adgroupData}>
                <Table.Column title="状态" cell={this.renderStatus.bind(this)} style={{width: '150px'}}/>
                <Table.Column title="单元信息" cell={this.renderName.bind(this)} />
                <Table.Column title="定向" cell={this.renderCrowds.bind(this)}/>
                <Table.Column title='创意' cell={this.renderImg.bind(this)}/>
             </Table>
          )
      } else {
          return (
              <div style={{margin: '50px auto', textAlign: 'center'}}>暂无数据</div>
          )
      }
        
    }
    render () {
        return (
            <div style={{marginTop: '100px'}}>
               {
                   this.props.show
                   ? <div style={{margin: '50px auto', width: '200px'}}><Loading color="#c7c7c7" show={this.props.show}/></div>
                   : this.renderTable()
               }
            </div>
        )
    }
}

export default AdgroupDataView