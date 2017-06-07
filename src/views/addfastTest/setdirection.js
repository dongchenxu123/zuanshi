/*设置定向，通投和智能定向在里面*/
import React from 'react';
import {addfastTestStep4, addfastTestStep2} from '../../help/linkUrl';
import { Link } from 'react-router-dom';
import Button from 'qnui/lib/button';
import { Row, Col } from 'qnui/lib/grid';
import Checkbox from 'qnui/lib/checkbox';
import createHistory from 'history/createHashHistory';
const history = createHistory();
import axios from 'axios';
import {gettargetings} from '../../help/url';
import Switch from 'qnui/lib/switch';
import SelectDirection from './selectDirection';

class SetdirectionView extends React.Component {
	constructor () {
		super()
		this.state={
			tongtouchecked: true,
			zhinengchecked: false,
			directionData: [],
			showloading: true,
			uvDirectionArr: []
		}
	}
	isMount=false
	componentWillMount () {
		var self = this
		axios.get(gettargetings)
	  .then(function (response) {
			if(self.isMount) {
				self.setState({
				 directionData: response.data,
				 showloading: false
			 })
			}
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
	  var newchecked = this.props.data.checked
		if(newchecked != undefined) {
			this.setState({
				tongtouchecked: newchecked
			})
		} else if (newchecked == undefined) {
			newchecked = this.state.tongtouchecked
		}
		var zhinengchecked = this.props.data.zhinengchecked
			this.setState({
				tongtouchecked: newchecked,
				zhinengchecked: zhinengchecked
			})
  }
	componentDidMount () {
 	 this.isMount=true
  }
  componentWillUnmount() {
 	 this.isMount=false
  }
	onChange (checked) {
		this.setState({
			tongtouchecked: checked
		})
	}
	changezhineng (value) {
		this.setState({
			zhinengchecked: value
		})
	}
  tostep4() {
		history.push(addfastTestStep4)
		var step = 3
		var type = 'zhineng'
		var crowdType = 0
		var zhinengcrowdType = 32768
		var tongtouchecked = this.state.tongtouchecked
		var zhinengchecked = this.state.zhinengchecked
  if(tongtouchecked == true) {
				var crowdType = 0
				var type = 'tongtou'
				this.props.commonData({step, crowdType, tongtouchecked, type})
		} else {
				var type = 'tongtou'
				this.props.commonData({step, tongtouchecked, type})
		}

		if (zhinengchecked == true) {
			var zhinengcrowdType = 32768
			var type = 'zhineng'
			this.props.commonData({step, zhinengchecked, zhinengcrowdType, type})
		} else {
			var type = 'zhineng'
			this.props.commonData({step, zhinengchecked, type, zhinengcrowdType})
		}

}
	renderlinkBtn (item) {
		if (item.Type == 0) {
			return (<Switch checked={this.state.tongtouchecked} onChange={this.onChange.bind(this)}/>)
		} else if (item.Type == 32768) {
			return (<Switch checked={this.state.zhinengchecked} onChange={this.changezhineng.bind(this)}/>)
		} else if (item.Type == 128 || item.Type == 64) {
			return null
		}
		else {
			return(<Link to={'/add/Type='+ item.Type}><Button>设置定向</Button></Link>)
		}
	}
	tonext () {
		history.push(addfastTestStep4)
		var step = 3
		var type = 'tiaoguo'
		var crowdType = 0
		this.props.commonData({step, type, crowdType})
	}
	renderdirectionData () {
		if(directionData && directionData.length > 0) {
			return (
				<Row className="demo-row" key={item.Type} style={{marginBottom: '8px'}}>
				 {
					 item.Type == 128 || item.Type == 64
					 ? null
					 : <Col fixedSpan="8"><div className="demo-col-inset">{item.Name}</div></Col>

					}
					<Col fixedSpan="8"></Col>
					<Col fixedSpan="8">
						<div className="demo-col-inset">
						{
							this.renderlinkBtn(item)
						}
						</div>
					</Col>
				</Row>
			)
		} else {
			return (<div style={{margin: '50px auto', textAlign: 'center'}}>暂获取不到数据</div>)
		}
	}
	render () {
	 var directionData = this.state.directionData
	 return (
		 <div className='panel panel-default' style={{margin: '10px'}}>
			 <div className="panel-heading" style={{overflow: 'hidden'}}>
				 <div style={{paddingLeft: '15px', float: 'left'}}>定向设置</div>
			</div>
			 <div className="panel-body" style={{paddingBottom: '50px'}}>
				 <div>
				 		{
							directionData ? directionData.map((item, index) =>{
								return (
									<Row className="demo-row" key={item.Type} style={{marginBottom: '8px'}}>
									 {
										 item.Type == 128 || item.Type == 64
										 ? null
										 : <Col fixedSpan="8"><div className="demo-col-inset">{item.Name}</div></Col>

									 	}
										<Col fixedSpan="8"></Col>
										<Col fixedSpan="8">
											<div className="demo-col-inset">
											{
												this.renderlinkBtn(item)
											}
											</div>
										</Col>
									</Row>
								)
							})
							: <div>暂获取不到数据</div>
						}
					</div>
			</div>
			<SelectDirection
			      zhinengchecked={this.state.zhinengchecked}
					  tongtouchecked={this.state.tongtouchecked}
						peopleObj={this.props.data.peopleObj}
						zizhuObj={this.props.data.zizhuObj}
						zhongziObj={this.props.data.zhongziObj}
						similarObj={this.props.data.similarObj}
						likemybodyObj={this.props.data.likemybodyObj}
						sceneObj={this.props.data.sceneObj}
						Row1value={this.props.data.Row1value}
						Row2value={this.props.data.Row2value}
						Row3value={this.props.data.Row3value}
						Row4value={this.props.data.Row4value}
						Row5value={this.props.data.Row5value}
						Row6value={this.props.data.Row6value}
						Row7value={this.props.data.Row7value}
						Row8value={this.props.data.Row8value}
						Row9value={this.props.data.Row9value}
						checked={this.props.data.checked}
						tongtouObj={this.props.data.tongtouObj}
						zhinengObj={this.props.data.zhinengObj}
						/>
			 <div className="panel-footer" style={{overflow: 'hidden', backgroundColor: '#fff'}}>
				 <div style={{float: 'right'}}>
						 <Link to={addfastTestStep2}><Button type="normal" style={{marginRight: '15px'}}>上一步</Button></Link>
						 {/*<Button type="normal" style={{marginRight: '15px'}} onClick={this.tonext.bind(this)}>跳过此步骤</Button>*/}
						 <Button type="normal" onClick={this.tostep4.bind(this)}>下一步</Button>
				 </div>
			 </div>
		 </div>
		)

  }
}


export default SetdirectionView;
