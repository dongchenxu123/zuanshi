import React, { PropTypes } from 'react'
import Table from 'qnui/lib/table';
import moment from 'moment';
import { rptLabels } from '../constValue';
import Loading from 'qnui/lib/loading';
const formaterDate="YYYY-MM-DD";
const rptLabelsKey = Object.keys(rptLabels);
class AdgroupTableView extends React.Component {
  renderTime (val, index, record) {
    if ( 'HourId' in record) {
      return (<span>{record.HourId} : 00</span>)
    } else {
      return (<span>{moment(record.LogDate).format(formaterDate)}</span>)
    }
  }
  renderTableCell (rptLabel, record, col) {
    if (!record[col]) {
      return (<span>0</span>)
    }
    else {
      return (<span>{record[col]}</span>)
    }
  }
  renderTable (time, rpt) {
    const { dataSource } = this.props;
    if(dataSource && dataSource.length > 0) {
      return (
        <Table dataSource={dataSource}>
          <Table.Column title="时间" cell={this.renderTime.bind(this)} width={200} lock/>
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
      return (<div style={{textAlign: 'center', margin: '50px auto'}}>暂无数据</div>)
    }

  }
  render () {
    const { show } = this.props;
    return (
      <div>
        {
          show
          ? <Loading color="#cccccc" size="small" show={show}/>
          : this.renderTable()
        }
      </div>
    )
  }
}

export default AdgroupTableView
