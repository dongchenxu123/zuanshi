<<<<<<< HEAD
import React from 'react';
import axios from 'axios';
import Tab from 'qnui/lib/tab';
import MonitorListView from './monitorList';
import AnomalyzerAlertView from './anomalyzerAlert';
import Pagination from 'qnui/lib/pagination';
const TabPane = Tab.TabPane;
import { getanomalyzerMetrics } from '../../help/url';
class WarnHomeView extends React.Component {
  constructor(){
    super()
    this.state={
      metricsData: [],
      total: 0,
      current: 1
    }
  }
  componentWillMount () {
    this.loadwarnlistData(1)
  }
  loadwarnlistData (page) {
    var self = this
    axios.post(getanomalyzerMetrics, {
      page_num: page,
      page_size: 10
    })
    .then(function (response) {
      self.setState({
        metricsData: response.data.metrics,
        current: page,
        total: response.data.total
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  onchangePage (value) {
    this.loadwarnlistData(value)
  }
  renderPagination () {
		var pageSize = 10;
		var current = this.state.current;
		var total = this.state.total;
		if(this.state.metricsData === null) {
			return
		} else if(current == 1 && this.state.metricsData.length < pageSize && this.state.metricsData.length <= total){ return null}
		else if(this.state.metricsData.length > 0) {
			return (<Pagination current={this.state.current} onChange={this.onchangePage.bind(this)}
										defaultCurrent={1} total={this.state.total*1} pageSize={pageSize}/>)
		}
	}
  render () {
    return (
      <div className='panel panel-default' style={{margin: '10px'}}>
        <div className="panel-heading" style={{fontSize: '14px'}}>
          数据预警
        </div>
        <div className="panel-body" style={{paddingBottom: '50px'}}>
          <Tab defaultActiveKey={0} type="wrapped">
            <TabPane key={0} tab={'监控列表'}>
              <MonitorListView metricsData={this.state.metricsData} loadwarnlistData={this.loadwarnlistData.bind(this)}/>
              <div style={{marginTop: '16px', float: 'right'}}>
                  {
                    this.renderPagination ()
                  }
              </div>
            </TabPane>
            <TabPane key={1} tab={'监控异常'}>
              <AnomalyzerAlertView />
            </TabPane>
          </Tab>
        </div>
      </div>
    )
  }
}

export default WarnHomeView
=======
import React from 'react';
import axios from 'axios';
import Tab from 'qnui/lib/tab';
import MonitorListView from './monitorList';
import AnomalyzerAlertView from './anomalyzerAlert';
import Pagination from 'qnui/lib/pagination';
const TabPane = Tab.TabPane;
import { getanomalyzerMetrics } from '../../help/url';
import { Link } from 'react-router-dom';
import {homeUrl} from '../../help/linkUrl';
import Icon from 'qnui/lib/icon';
class WarnHomeView extends React.Component {
  constructor(){
    super()
    this.state={
      metricsData: [],
      total: 0,
      current: 1
    }
  }
  componentWillMount () {
    this.loadwarnlistData(1)
  }
  loadwarnlistData (page) {
    var self = this
    axios.post(getanomalyzerMetrics, {
      page_num: page,
      page_size: 10
    })
    .then(function (response) {
      self.setState({
        metricsData: response.data.metrics,
        current: page,
        total: response.data.total
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  onchangePage (value) {
    this.loadwarnlistData(value)
  }
  renderPagination () {
		var pageSize = 10;
		var current = this.state.current;
		var total = this.state.total;
		if(this.state.metricsData === null) {
			return
		} else if(current == 1 && this.state.metricsData.length < pageSize && this.state.metricsData.length <= total){ return null}
		else if(this.state.metricsData.length > 0) {
			return (<Pagination current={this.state.current} onChange={this.onchangePage.bind(this)}
										defaultCurrent={1} total={this.state.total*1} pageSize={pageSize}/>)
		}
	}
  render () {
    return (
      <div className='panel panel-default' style={{margin: '10px'}}>
        <div className="panel-heading" style={{fontSize: '14px', overflow: 'hidden'}}>
          <div style={{float: 'left'}}>
            <Link to={homeUrl} style={{color: '#4d7fff'}}>首页</Link>&nbsp;&nbsp;
            <Icon type="arrow-right" size='xs'/>&nbsp;&nbsp;
            <span>数据预警</span>
          </div>
        </div>
        <div className="panel-body" style={{paddingBottom: '50px'}}>
          <Tab defaultActiveKey={0}>
            <TabPane key={0} tab={'监控列表'}>
              <MonitorListView metricsData={this.state.metricsData} loadwarnlistData={this.loadwarnlistData.bind(this)}/>
              <div style={{marginTop: '16px', float: 'right'}}>
                  {
                    this.renderPagination ()
                  }
              </div>
            </TabPane>
            <TabPane key={1} tab={'监控异常'}>
              <AnomalyzerAlertView />
            </TabPane>
          </Tab>
        </div>
      </div>
    )
  }
}

export default WarnHomeView
>>>>>>> a43b3823b062de6e7da27e692def8042fa1e75a2
