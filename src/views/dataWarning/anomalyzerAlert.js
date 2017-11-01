<<<<<<< HEAD
import React from 'react';
import axios from 'axios';
import MonitorListView from './monitorList';
import { getanomalyzerAlerts } from '../../help/url';
import Table from 'qnui/lib/table';
import Pagination from 'qnui/lib/pagination';
import Loading from 'qnui/lib/loading';
class AnomalyzerAlertView extends React.Component {
  constructor () {
    super ()
    this.state={
      alertData: [],
      total: 0,
      current: 1,
      showloading: true
    }
  }
  componentWillMount () {
    this.loadOrders(1)
  }
  loadOrders (page) {
    var self = this;
    axios.post(getanomalyzerAlerts, {
      page_num: page,
      page_size: 10
    })
    .then(function (response) {
      var alertData = response.data.alerts
      var total = response.data.total
      self.setState({
        alertData: alertData,
        current: page,
        total: total,
        showloading: false
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  onchangePage (value) {
		this.loadOrders(value)
  }
  renderPagination () {
		var pageSize = 10;
		var current = this.state.current;
		var total = this.state.total;
		if(this.state.alertData === null) {
			return
		} else if(current == 1 && this.state.alertData.length < pageSize && this.state.alertData.length <= total){ return null}
		else if(this.state.alertData.length > 0) {
			return (<Pagination current={this.state.current} onChange={this.onchangePage.bind(this)}
										defaultCurrent={1} total={this.state.total*1} pageSize={10}/>)
		}
	}
  render () {
    var alertData = this.state.alertData
    return (
      <div>
        {this.state.showloading
        ? <div style={{margin: '20px auto', width: '200px'}}><Loading show={this.state.showloading}/></div>
        : <div>
          {
            alertData && alertData.length > 0
            ? <Table dataSource={alertData}>
                <Table.Column title="监控名称" dataIndex="metric_name"/>
                <Table.Column title="监控异常内容" dataIndex="content" />
                <Table.Column title="创建时间" dataIndex="created_at"/>
              </Table>
            : <div style={{margin: '20px auto', width: '200px'}}>暂无数据</div>
          }
          <div style={{marginTop: '16px', float: 'right'}}>
              {
                this.renderPagination ()
              }
          </div>
        </div>
      }
      </div>

    )
  }
}

export default AnomalyzerAlertView
=======
import React from 'react';
import axios from 'axios';
import MonitorListView from './monitorList';
import { getanomalyzerAlerts } from '../../help/url';
import Table from 'qnui/lib/table';
import Pagination from 'qnui/lib/pagination';
import Loading from 'qnui/lib/loading';
class AnomalyzerAlertView extends React.Component {
  constructor () {
    super ()
    this.state={
      alertData: [],
      total: 0,
      current: 1,
      showloading: true
    }
  }
  componentWillMount () {
    this.loadOrders(1)
  }
  loadOrders (page) {
    var self = this;
    axios.post(getanomalyzerAlerts, {
      page_num: page,
      page_size: 10
    })
    .then(function (response) {
      var alertData = response.data.alerts
      var total = response.data.total
      self.setState({
        alertData: alertData,
        current: page,
        total: total,
        showloading: false
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  onchangePage (value) {
		this.loadOrders(value)
  }
  renderPagination () {
		var pageSize = 10;
		var current = this.state.current;
		var total = this.state.total;
		if(this.state.alertData === null) {
			return
		} else if(current == 1 && this.state.alertData.length < pageSize && this.state.alertData.length <= total){ return null}
		else if(this.state.alertData.length > 0) {
			return (<Pagination current={this.state.current} onChange={this.onchangePage.bind(this)}
										defaultCurrent={1} total={this.state.total*1} pageSize={10}/>)
		}
	}
  render () {
    var alertData = this.state.alertData
    return (
      <div>
        {this.state.showloading
        ? <div style={{margin: '20px auto', width: '200px'}}><Loading show={this.state.showloading}/></div>
        : <div>
          {
            alertData && alertData.length > 0
            ? <Table dataSource={alertData}>
                <Table.Column title="监控名称" dataIndex="metric_name"/>
                <Table.Column title="监控异常内容" dataIndex="content" />
                <Table.Column title="创建时间" dataIndex="created_at"/>
              </Table>
            : <div style={{margin: '20px auto', width: '200px'}}>暂无数据</div>
          }
          <div style={{marginTop: '16px', float: 'right'}}>
              {
                this.renderPagination ()
              }
          </div>
        </div>
      }
      </div>

    )
  }
}

export default AnomalyzerAlertView
>>>>>>> a43b3823b062de6e7da27e692def8042fa1e75a2
