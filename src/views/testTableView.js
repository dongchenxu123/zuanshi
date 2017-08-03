import React from 'react';
import Table from 'qnui/lib/table';
import { Link } from 'react-router-dom';
import Icon from 'qnui/lib/icon';
import Button from 'qnui/lib/button';
import {addfastTestStep1} from '../help/linkUrl';
import {testItem, testStart, testStop, testDiscard} from '../help/url';
import axios from 'axios';
import Feedback from 'qnui/lib/feedback';
import { Tag } from 'antd';
const Toast = Feedback.toast;
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
			discardLoading: false
		}
	}
	componentWillMount() {
		this.gettestsAxios()
	}
	gettestsAxios () {
		var self = this
		axios.post(testItem, {
			online_status: '0,1,3',
			page_size: 1
		})
   .then(function (response) {
	  if (response.data.err) {
         return
	  }
      var tests = response.data.tests
			for(var i=0; i<tests.length; i++) {
				var testId = tests[i].id
			}
			self.setState({
				 testsData: tests,
				 testId: parseInt(testId)
			})
		})
   .catch(function (error) {
     console.log(error);
   });
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
				self.gettestsAxios()
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
	render () {
		 const onChange = function(...args){
	     console.log(...args);
	 }
	var testsData = this.state.testsData
	return (
    <div className='panel panel-default' style={{margin: '10px'}}>
			<div className='panel-body'>
				{
					testsData && testsData.length > 0
					? <div>
					<div className="panel-heading"><Icon type="browse" />&nbsp;&nbsp;<span style={{fontSize: '14px'}}>极速测试</span></div>
					<Table dataSource={testsData} style={{paddingBottom: '30px'}}>
						<Table.Column width={200} title="状态" cell={this.renderStatus.bind(this)}/>
						<Table.Column title="测试名称" width={200} dataIndex='title'/>
						<Table.Column title="测试日期" width={200} cell={this.renderDate.bind(this)}/>
						<Table.Column title="预算" cell={this.renderbudget.bind(this)} width={200}/>
						<Table.Column title="操作" width={300} cell={this.renderbtn.bind(this)}/>
					</Table>
					</div>
					: <div style={{textAlign: 'center', margin: '20px auto', backgroundColor: '#fff', padding: '50px 0'}}>
							<p style={{marginBottom: '10px'}}><Icon type="cry" />&nbsp;&nbsp;<span>暂无测试方案</span></p>
							<Link to={addfastTestStep1}><Button type="primary"><Icon type="add" />&nbsp;&nbsp;创建新测试</Button></Link>
					  </div>
				}
			</div>
    </div>
  )
 }
}

export default TestTableView;
