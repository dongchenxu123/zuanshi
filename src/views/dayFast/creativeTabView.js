import React from 'react'
import Loading from 'qnui/lib/loading';
import {rptLabels} from './constValue';
import Table from 'qnui/lib/table';
import tableColumns from './tableRptView';
import Balloon from 'qnui/lib/balloon';
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


class CreativeTabView extends React.Component {
  renderCreativeImg (val, index, record) {
    var ImagePath = record.Creative.ImagePath
    const imgsm = <img src={ImagePath} style={{width: '200px'}}/>
    return (
          <Balloon trigger={imgsm} align="rt" alignment="edge" style={{width: 300}}>
                <img src={ImagePath} style={{width: '100%'}}/>
          </Balloon>
        )
  }
  renderTableCell (rptLabel, record, rptkey) {
    var rpt = record.Rpt
    let val = rpt[rptkey];
    if ("formatter" in rptLabel) {
      val = rptLabel.formatter(val)
    }
    return (<span>{val}</span>)
  }
  renderTable () {
    let creativeData = this.props.creativeData;
    if(creativeData && creativeData.length > 0) {
      let list = []
      creativeData.forEach(item => {
        list.push({
          Creative: item.Creative,
          Rpt: rptCount(item.Rpt)
        })
      })
      return (
        <Table dataSource={list}>
            <Table.Column title="创意" cell={this.renderCreativeImg.bind(this)} width={300} lock/>
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
    var creativeShow = this.props.creativeShow
    return (
      <div>
        {
          creativeShow
          ? <div style={{width: '200px', margin: '50px auto'}}><Loading show={creativeShow}/></div>
          : this.renderTable()
        }
      </div>
    )
  }
}

export default CreativeTabView
