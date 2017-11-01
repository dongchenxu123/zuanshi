<<<<<<< HEAD
import React from 'react';
//import '../styles/index.css';
import { Row, Col } from 'qnui/lib/grid';
import Button from 'qnui/lib/button';
import { Link } from 'react-router-dom';
import { fastList, dataWarnHome } from '../help/linkUrl';
import Dialog from 'qnui/lib/dialog'
const picData = [{
	id: 1,
	pic: 'https://img.alicdn.com/imgextra/i3/669952568/TB21j4dutRopuFjSZFtXXcanpXa-669952568.jpg',
	title: '极速测试',
	content: '优质创意筛选，一键协助运营快速寻找出创意在不同人群标签中的表现',
	link: fastList
},{
	id: 2,
	pic: 'https://img.alicdn.com/imgextra/i3/669952568/TB2P64dutRopuFjSZFtXXcanpXa-669952568.jpg',
	title: '数据预警',
	content: '针对优质创意、人群进行深度测试，协助运营找出最优质ROI组合',
	link: dataWarnHome
},{
	id: 3,
	pic: 'https://img.alicdn.com/imgextra/i1/669952568/TB2Cj4dutRopuFjSZFtXXcanpXa-669952568.jpg',
	title: '日常投放',
	content: '让优质的推广组合持续贡献店铺优质流量来源，实时监控数据让效果无限接近最优值',
	link:''
}]


class TestListView extends React.Component {
	constructor () {
		super()
		this.state={
			visible: false
		}
	}
	componentWillMount() {

	}
	onOpen () {
      this.setState({
          visible: true
      })
  }

  onClose() {
      this.setState({
          visible: false
      })
  }
renderLinkBtn (item) {
    if(item.id != 2) {
		return(<div><Link to={item.link}><Button type="primary">我要测试</Button></Link></div>)
	}
	if (item.id == 2) {
		return(<div><Link to={item.link}><Button type="primary">添加监控</Button></Link></div>)
	}
}
 render () {
		return (
      <div className='panel panel-default' style={{margin: '10px'}}>
				<div className='panel-body'>
						<Row className="demo-row">
							{
								picData.map((item, index) =>{
									return (
										<Col span="8" key={item.id} style={{textAlign: 'center'}}>
											<div><img src={item.pic} style={{width: '25%'}}/></div>
											<div style={{padding: '16px 0', fontSize: '16px'}}>{item.title}</div>
											<div style={{color: 'rgb(111, 111, 111)', width: '250px', margin: '0 auto 32px'}}>{item.content}</div>
											{
												this.renderLinkBtn(item)
											}
										</Col>
									)
								})
							}
							</Row>
							<Dialog visible = {this.state.visible}
                    onOk = {this.onClose.bind(this)}
                    onCancel = {this.onClose.bind(this)}
                    onClose = {this.onClose.bind(this)}>
                     <h3>该功能暂不开放！</h3>
                     <ul>
                        <li>如有需求请或疑问请联系客服</li>
                    </ul>
            </Dialog>
				</div>
      </div>
    )
  }
}

export default TestListView;
=======
import React from 'react';
//import '../styles/index.css';
import { Row, Col } from 'qnui/lib/grid';
import Button from 'qnui/lib/button';
import { Link } from 'react-router-dom';
import { fastList, dataWarnHome, dayTestHome } from '../help/linkUrl';
import Dialog from 'qnui/lib/dialog'
const picData = [{
	id: 1,
	pic: 'https://img.alicdn.com/imgextra/i3/669952568/TB21j4dutRopuFjSZFtXXcanpXa-669952568.jpg',
	title: '极速测试',
	content: '优质创意筛选，一键协助运营快速寻找出创意在不同人群标签中的表现',
	link: fastList,
	btnTilte: '我要测试'
},{
	id: 2,
	pic: 'https://img.alicdn.com/imgextra/i1/669952568/TB2Cj4dutRopuFjSZFtXXcanpXa-669952568.jpg',
	title: '数据预警',
	content: '针对优质创意、人群进行深度测试，协助运营找出最优质ROI组合',
	link: dataWarnHome,
	btnTilte: '添加监控'
},{
	id: 3,
	pic: 'https://img.alicdn.com/imgextra/i3/669952568/TB2P64dutRopuFjSZFtXXcanpXa-669952568.jpg',
	title: '日常投放',
	content: '让优质的推广组合持续贡献店铺优质流量来源，实时监控数据让效果无限接近最优值',
	link: dayTestHome,
	btnTilte: '我要投放'
}]


class TestListView extends React.Component {
	constructor () {
		super()
		this.state={
			visible: false
		}
	}
	componentWillMount() {

	}
	onOpen () {
      this.setState({
          visible: true
      })
  }

  onClose() {
      this.setState({
          visible: false
      })
  }
renderLinkBtn (item) {
	return(<div><Link to={item.link}><Button type="primary">{item.btnTilte}</Button></Link></div>)
}
 render () {
		return (
      <div className='panel panel-default' style={{margin: '10px'}}>
				<div className='panel-body'>
					<Row className="demo-row">
						{
							picData.map((item, index) =>{
								return (
									<Col span="8" key={item.id} style={{textAlign: 'center'}}>
										<div><img src={item.pic} style={{width: '25%'}}/></div>
										<div style={{padding: '16px 0', fontSize: '16px'}}>{item.title}</div>
										<div style={{color: 'rgb(111, 111, 111)', width: '250px', margin: '0 auto 32px'}}>{item.content}</div>
										{
											this.renderLinkBtn(item)
										}
									</Col>
								)
							})
						}
					</Row>
				</div>
      </div>
    )
  }
}

export default TestListView;
>>>>>>> a43b3823b062de6e7da27e692def8042fa1e75a2
