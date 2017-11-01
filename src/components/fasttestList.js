<<<<<<< HEAD
import React from 'react';
import Table from 'qnui/lib/table';
import { Link } from 'react-router-dom';
import Icon from 'qnui/lib/icon';
import Button from 'qnui/lib/button';
import {addfastTestStep1, homeUrl} from '../help/linkUrl';
import {testItem, testStart, testStop, testDiscard} from '../help/url';
import axios from 'axios';
import Feedback from 'qnui/lib/feedback';
const Toast = Feedback.toast;
import Pagination from 'qnui/lib/pagination';
import { Tag } from 'antd';
import Loading from 'qnui/lib/loading';
let status =  {
	'0' : '等待配置',
	'1' : '测试中',
	'2' : '配置失败',
	'3' : '测试暂停',
	'4' : '测试完成',
	'5' : '弃用'
}
const ButtonGroup = Button.Group;
class TestTableView extends React.Component {
	constructor () {
		super()
		this.state={
			testsData: [],
			testId: 0,
			loading: false,
			iconLoading: false,
			discardLoading: false,
      current: 1,
			total: 0,
			showloading: true
		}
	}
	componentWillMount() {
		this.gettestsAxios(1)
	}
  onchangePage (page) {
    this.gettestsAxios(page)
  }
	gettestsAxios (page) {
		var self = this
		axios.post(testItem, {
			page_num: page,
      page_size: 10
		})
   .then(function (response) {
      var tests = response.data.tests
			var total = response.data.total
			if (response.data.err) {
				self.setState({
					showloading: false
				})
				return
			}
			for (var i=0; i<tests.length; i++) {
				var testId = tests[i].id
			}
			 self.setState({
				 testsData: tests,
				 testId: parseInt(testId),
         current: page,
				 total: total,
				 showloading: false
			})
		})
   .catch(function (error) {
     console.log(error);
   });
	}
  renderPagination () {
    var pageSize = 10;
    var current = this.state.current;
    var total = this.state.total;
    if(this.state.testsData === null) {
      return
    } else if(current == 1 && this.state.testsData.length < pageSize && this.state.testsData.length <= total){ return null}
    else if(this.state.testsData.length > 0) {
      return (<Pagination current={this.state.current} onChange={this.onchangePage.bind(this)}
                    defaultCurrent={1} total={total*1} pageSize={10}/>)
    }
  }
	renderbudget (value, index, record) {
		return (<span>{record.budget/100} 元</span>)
	}
	renderStatus (value, index, record) {
		if(record.online_status == '1') {
			var today = new Date()
			var start_Data = new Date(Date.parse(record.start_time.replace(/-/g,   "/")))
			if(start_Data > today) {
				return (<Tag color="#ccc">等待测试</Tag>)
			}
			return (<Tag color="#87d068">{status[record.online_status]}</Tag>)
			} else if (record.online_status == '2') {
				return (<Tag color="#f50">{status[record.online_status]}</Tag>)
			} else if(record.online_status == '4') {
				return (<Tag color="#2db7f5">{status[record.online_status]}</Tag>)
			} else if(record.online_status == '0') {
				return (<Tag color="#108ee9">{status[record.online_status]}</Tag>)
			} else if(record.online_status == '3') {
				return (<Tag color='orange'>{status[record.online_status]}</Tag>)
			} else {
				return (<Tag color='#333'>{status[record.online_status]}</Tag>)
			}
  }
	renderDate (value, index, record) {
		return (<span>{record.start_time.substr(0,10)}</span>)
	}
	startBtn (id) {
		this.commonAxios(testStart, id)
		this.setState({
			loading: true
		})
	}
	commonAxios (test, id) {
		var self = this
		axios.post(test, {
			test_id: id
		})
   .then(function (response) {
		  self.setState({
				loading: false,
				iconLoading: false,
				discardLoading: false
			})
      if(response.data.msg == 'ok') {
				self.gettestsAxios(1)
			} else {
				if(response.data.err) {
					var err = JSON.parse(response.data.err)
					for(var i=0; i<err.length; i++) {
						Toast.error(err[i].reason)
					}
				}
			}
		})
   .catch(function (error) {
     console.log(error);
   });
	}
	stopBtn (id) {
		this.commonAxios(testStop, id)
		this.setState({
			iconLoading: true
		})
	}
	discardBtn (id) {
		this.commonAxios(testDiscard, id)
		this.setState({
			discardLoading: true
		})
	}

	renderbtn (value, index, record) {
		if(record.online_status == 3) {
			return (<ButtonGroup>
				<Button onClick={this.startBtn.bind(this, record.id)} loading={this.state.loading} type="secondary">
					开始测试
				 </Button>
				 <Button onClick={this.discardBtn.bind(this, record.id)} loading={this.state.discardLoading}
			   type="secondary">放弃测试</Button>
				 <Link to={'/fast/test/detail/'+ record.id +'/'+ record.title+ '/' +record.online_status}>
						<Button>测试结果</Button>
					</Link>
			</ButtonGroup>)
		}
		if(record.online_status == 1) {
			return (
				<ButtonGroup>
				<Button onClick={this.stopBtn.bind(this, record.id)} loading={this.state.iconLoading}
			type="secondary">暂停测试</Button>
			<Button onClick={this.discardBtn.bind(this, record.id)} loading={this.state.discardLoading}
			type="secondary">放弃测试</Button>
			<Link to={'/fast/test/detail/'+ record.id +'/'+ record.title+ '/'+ record.online_status}>
				<Button>测试结果</Button>
			</Link>
			</ButtonGroup>
		 )
		}
		if(record.online_status != 2) {
			return (
				<ButtonGroup>
					<Link to={'/fast/test/detail/'+ record.id +'/'+ record.title+ '/' +record.online_status}>
						<Button>测试结果</Button>
					</Link>
				</ButtonGroup>
			)
		}
	}
	rendernewcreate (testsData) {
		for(var i=0; i<testsData.length; i++) {
			if(testsData[i].online_status == 0 || testsData[i].online_status == 1 || testsData[i].online_status == 3) {
				return null
			}
		}
		return (<div style={{marginLeft: '15px'}}>
				 <Link to={addfastTestStep1}><Button type="primary"><Icon type="add" />&nbsp;&nbsp;创建新测试</Button></Link>
			</div>)
	}
	renderTable () {
		var testsData = this.state.testsData
		if(testsData && testsData.length > 0) {
			return (<div>
				<Table dataSource={testsData}>
				<Table.Column width={200} title="状态" cell={this.renderStatus.bind(this)}/>
				<Table.Column title="测试名称" width={200} dataIndex='title'/>
				<Table.Column title="测试日期" width={200} cell={this.renderDate.bind(this)}/>
				<Table.Column title="预算" cell={this.renderbudget.bind(this)} width={200}/>
				<Table.Column title="操作" width={300} cell={this.renderbtn.bind(this)}/>
			</Table>
			</div>)
		} else {
			return (<div style={{margin: '50px auto', textAlign: 'center'}}>暂获取不到数据</div>)
		}
	}
	render () {
	var testsData = this.state.testsData
	return (
    <div className='panel panel-default' style={{margin: '10px'}}>
			<div className='panel-body'>
				<div className="panel-heading" style={{overflow: 'hidden'}}>
					<div style={{float: 'left'}}><Link to={homeUrl} style={{color: '#4d7fff', fontSize: '14px'}}>首页</Link>&nbsp;&nbsp;<Icon type="arrow-right" size='xs'/>&nbsp;&nbsp;<span style={{fontSize: '14px'}}>极速测试列表</span></div>
					<div style={{float: 'left'}}>
						{
							testsData && testsData.length > 0
							? this.rendernewcreate(testsData)
							: <div style={{marginLeft: '15px'}}>
									 <Link to={addfastTestStep1}><Button type="primary"><Icon type="add" />&nbsp;&nbsp;创建新测试</Button></Link>
								</div>
						}
					</div>
				</div>
				{
					this.state.showloading
					? <div style={{margin: '20px auto', width: '200px'}}><Loading show={this.state.showloading}/></div>
					: this.renderTable()
				}
				<div style={{marginTop: '16px', float: 'right'}}>
          {
            this.renderPagination ()
          }
        </div>
      </div>
    </div>
  )
 }
}

export default TestTableView;
=======
import React from 'react';
import Table from 'qnui/lib/table';
import { Link } from 'react-router-dom';
import Icon from 'qnui/lib/icon';
import Button from 'qnui/lib/button';
import {addfastTestStep1, homeUrl} from '../help/linkUrl';
import {testItem, testStart, testStop, testDiscard} from '../help/url';
import axios from 'axios';
import Feedback from 'qnui/lib/feedback';
const Toast = Feedback.toast;
import Pagination from 'qnui/lib/pagination';
import { Tag } from 'antd';
import Loading from 'qnui/lib/loading';
let status =  {
	'0' : '等待配置',
	'1' : '测试中',
	'2' : '配置失败',
	'3' : '测试暂停',
	'4' : '测试完成',
	'5' : '弃用'
}
const ButtonGroup = Button.Group;
class TestTableView extends React.Component {
	constructor () {
		super()
		this.state={
			testsData: [],
			testId: 0,
			loading: false,
			iconLoading: false,
			discardLoading: false,
      current: 1,
			total: 0,
			showloading: true
		}
	}
	componentWillMount() {
		this.gettestsAxios(1)
	}
  onchangePage (page) {
    this.gettestsAxios(page)
  }
	gettestsAxios (page) {
		var self = this
		axios.post(testItem, {
			page_num: page,
      page_size: 10
		})
   .then(function (response) {
      var tests = response.data.tests
			var total = response.data.total
			if (response.data.err) {
				self.setState({
					showloading: false
				})
				return
			}
			for (var i=0; i<tests.length; i++) {
				var testId = tests[i].id
			}
			 self.setState({
				 testsData: tests,
				 testId: parseInt(testId),
         current: page,
				 total: total,
				 showloading: false
			})
		})
   .catch(function (error) {
     console.log(error);
   });
	}
  renderPagination () {
    var pageSize = 10;
    var current = this.state.current;
    var total = this.state.total;
    if(this.state.testsData === null) {
      return
    } else if(current == 1 && this.state.testsData.length < pageSize && this.state.testsData.length <= total){ return null}
    else if(this.state.testsData.length > 0) {
      return (<Pagination current={this.state.current} onChange={this.onchangePage.bind(this)}
                    defaultCurrent={1} total={total*1} pageSize={10}/>)
    }
  }
	renderbudget (value, index, record) {
		return (<span>{record.budget/100} 元</span>)
	}
	renderStatus (value, index, record) {
		if(record.online_status == '1') {
			var today = new Date()
			var start_Data = new Date(Date.parse(record.start_time.replace(/-/g,   "/")))
			if(start_Data > today) {
				return (<Tag color="#ccc">等待测试</Tag>)
			}
			return (<Tag color="#87d068">{status[record.online_status]}</Tag>)
			} else if (record.online_status == '2') {
				return (<Tag color="#f50">{status[record.online_status]}</Tag>)
			} else if(record.online_status == '4') {
				return (<Tag color="#2db7f5">{status[record.online_status]}</Tag>)
			} else if(record.online_status == '0') {
				return (<Tag color="#108ee9">{status[record.online_status]}</Tag>)
			} else if(record.online_status == '3') {
				return (<Tag color='orange'>{status[record.online_status]}</Tag>)
			} else {
				return (<Tag color='#333'>{status[record.online_status]}</Tag>)
			}
  }
	renderDate (value, index, record) {
		return (<span>{record.start_time.substr(0,10)}</span>)
	}
	startBtn (id) {
		this.commonAxios(testStart, id)
		this.setState({
			loading: true
		})
	}
	commonAxios (test, id) {
		var self = this
		axios.post(test, {
			test_id: id
		})
   .then(function (response) {
		  self.setState({
				loading: false,
				iconLoading: false,
				discardLoading: false
			})
      if(response.data.msg == 'ok') {
				self.gettestsAxios(1)
			} else {
				if(response.data.err) {
					var err = JSON.parse(response.data.err)
					for(var i=0; i<err.length; i++) {
						Toast.error(err[i].reason)
					}
				}
			}
		})
   .catch(function (error) {
     console.log(error);
   });
	}
	stopBtn (id) {
		this.commonAxios(testStop, id)
		this.setState({
			iconLoading: true
		})
	}
	discardBtn (id) {
		this.commonAxios(testDiscard, id)
		this.setState({
			discardLoading: true
		})
	}

	renderbtn (value, index, record) {
		if(record.online_status == 3) {
			return (<ButtonGroup>
				<Button onClick={this.startBtn.bind(this, record.id)} loading={this.state.loading} type="secondary">
					开始测试
				 </Button>
				 <Button onClick={this.discardBtn.bind(this, record.id)} loading={this.state.discardLoading}
			   type="secondary">放弃测试</Button>
				 <Link to={'/fast/test/detail/'+ record.id +'/'+ record.title+ '/' +record.online_status}>
						<Button>测试结果</Button>
					</Link>
			</ButtonGroup>)
		}
		if(record.online_status == 1) {
			return (
				<ButtonGroup>
				<Button onClick={this.stopBtn.bind(this, record.id)} loading={this.state.iconLoading}
			type="secondary">暂停测试</Button>
			<Button onClick={this.discardBtn.bind(this, record.id)} loading={this.state.discardLoading}
			type="secondary">放弃测试</Button>
			<Link to={'/fast/test/detail/'+ record.id +'/'+ record.title+ '/'+ record.online_status}>
				<Button>测试结果</Button>
			</Link>
			</ButtonGroup>
		 )
		}
		if(record.online_status != 2) {
			return (
				<ButtonGroup>
					<Link to={'/fast/test/detail/'+ record.id +'/'+ record.title+ '/' +record.online_status}>
						<Button>测试结果</Button>
					</Link>
				</ButtonGroup>
			)
		}
	}
	rendernewcreate (testsData) {
		for(var i=0; i<testsData.length; i++) {
			if(testsData[i].online_status == 0 || testsData[i].online_status == 1 || testsData[i].online_status == 3) {
				return null
			}
		}
		return (<div style={{marginLeft: '15px'}}>
				 <Link to={addfastTestStep1}><Button type="primary"><Icon type="add" />&nbsp;&nbsp;创建新测试</Button></Link>
			</div>)
	}
	renderTable () {
		var testsData = this.state.testsData
		if(testsData && testsData.length > 0) {
			return (<div>
				<Table dataSource={testsData}>
				<Table.Column width={200} title="状态" cell={this.renderStatus.bind(this)}/>
				<Table.Column title="测试名称" width={200} dataIndex='title'/>
				<Table.Column title="测试日期" width={200} cell={this.renderDate.bind(this)}/>
				<Table.Column title="预算" cell={this.renderbudget.bind(this)} width={200}/>
				<Table.Column title="操作" width={300} cell={this.renderbtn.bind(this)}/>
			</Table>
			</div>)
		} else {
			return (<div style={{margin: '50px auto', textAlign: 'center'}}>暂获取不到数据</div>)
		}
	}
	render () {
	var testsData = this.state.testsData
	return (
    <div className='panel panel-default' style={{margin: '10px'}}>
			<div className='panel-body'>
				<div className="panel-heading" style={{overflow: 'hidden'}}>
					<div style={{float: 'left'}}><Link to={homeUrl} style={{color: '#4d7fff', fontSize: '14px'}}>首页</Link>&nbsp;&nbsp;<Icon type="arrow-right" size='xs'/>&nbsp;&nbsp;<span style={{fontSize: '14px'}}>极速测试列表</span></div>
					<div style={{float: 'left'}}>
						{
							testsData && testsData.length > 0
							? this.rendernewcreate(testsData)
							: <div style={{marginLeft: '15px'}}>
									 <Link to={addfastTestStep1}><Button type="primary"><Icon type="add" />&nbsp;&nbsp;创建新测试</Button></Link>
								</div>
						}
					</div>
				</div>
				{
					this.state.showloading
					? <div style={{margin: '20px auto', width: '200px'}}><Loading show={this.state.showloading}/></div>
					: this.renderTable()
				}
				<div style={{marginTop: '16px', float: 'right'}}>
          {
            this.renderPagination ()
          }
        </div>
      </div>
    </div>
  )
 }
}

export default TestTableView;
>>>>>>> a43b3823b062de6e7da27e692def8042fa1e75a2
