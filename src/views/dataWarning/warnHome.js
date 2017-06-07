import React from 'react';
import axios from 'axios';
import Tab from 'qnui/lib/tab';
import MonitorListView from './monitorList';
const TabPane = Tab.TabPane;

class WarnHomeView extends React.Component {
  render () {
    return (
      <div className='panel panel-default' style={{margin: '10px'}}>
        <div className="panel-heading" style={{overflow: 'hidden'}}>
          数据预警
        </div>
        <div className="panel-body" style={{paddingBottom: '50px'}}>
          <Tab defaultActiveKey={0} type="wrapped">
            <TabPane key={0} tab={'监控列表'}>
              <MonitorListView />
            </TabPane>
            <TabPane key={1} tab={'监控异常'}>对方回复给机房环境规划</TabPane>
          </Tab>
        </div>
      </div>
    )
  }
}

export default WarnHomeView
