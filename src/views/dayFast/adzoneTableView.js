import React from 'react'
import Loading from 'qnui/lib/loading';
import {rptLabels} from './constValue';
import Table from 'qnui/lib/table';
import tableColumns from './tableRptView';


const rptLabelsKey = Object.keys(rptLabels);
function rptCount (rpt) {
          if(!rpt) {
              rpt = {}
          }
          rptLabelsKey.forEach( prop => {
              if (!(prop in rpt)) {
                  rpt[prop] = 0
              }
              if( 'method' in rptLabels[prop]) {
                  rpt[prop] = rptLabels[prop].method(rpt)
              }
          });
          return rpt
}
class AdzoneTabView extends React.Component {
  
  renderTableCell (rptLabel, record, rptkey) {
    var rpt = record.Rpt
    let val = rpt[rptkey];
    if ("formatter" in rptLabel) {
      val = rptLabel.formatter(val)
    }
    return (<span>{val}</span>)
  }
  renderAdzoneName (val, index, record) {
    return (<span>{record.Adzone.Name}</span>)
  }
  renderTable () {
    let adzoneData = this.props.adzoneData
    if(adzoneData && adzoneData.length > 0) {
       let list = []
      adzoneData.forEach(item => {
        list.push({
          Adzone: item.Adzone,
          Rpt: rptCount(item.Rpt)
        })
      })
      return (
        <Table dataSource={list}>
            <Table.Column title="定向" cell={this.renderAdzoneName.bind(this)} width={300} lock/>
            {
              rptLabelsKey.map(col => {
                  const rptLabel = rptLabels[col];
                  return (
                    <Table.Column 
                      title={rptLabel.title} 
                      dataIndex={col} 
                      key={col}
                      cell={(value, index, record) => this.renderTableCell(rptLabel, record, col)}
                      width={150}
                    />
                  )
              })
            }
        </Table>
      )
    } else {
      return (<div style={{margin: '50px auto', textAlign: 'center'}}>暂无数据</div>)
    }
  }
  render () {
    var adzoneShow = this.props.adzoneShow
    return (
      <div>
        {
          adzoneShow
          ? <div style={{width: '200px', margin: '50px auto'}}><Loading show={adzoneShow}/></div>
          : this.renderTable()
        }
      </div>
    )
  }
}

export default AdzoneTabView
