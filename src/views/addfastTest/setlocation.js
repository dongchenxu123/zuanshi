import React from 'react';
import {addfastTestStep3, addfastcombinations} from '../../help/linkUrl';
import { Link } from 'react-router-dom';
import Icon from 'qnui/lib/icon';
import Button from 'qnui/lib/button';
import createHistory from 'history/createHashHistory';
import {getArea} from '../../help/url';
import axios from 'axios';
import Checkbox from 'qnui/lib/checkbox';
import Loading from 'qnui/lib/loading';
const history = createHistory();
import Feedback from 'qnui/lib/feedback';
const Toast = Feedback.toast;
class SetlocationView extends React.Component {
	constructor () {
		super()
		this.state={
			areaArrs:[1,2,3,4,5,6,7,8,9,10,11,12,13,14],
			specailareaArrs:[1],
			specailareas: {
				1:{
					name: 'specail',
					data: ['471', '463', '577', '599', '576', '531']
				}
			},
			specailareasObj: {
				"471": {
					parent: 1,
					name: '新疆',
					s: false
				},
				"463": {
					parent: 1,
					name: '西藏',
					s: false
				},
				"577": {
					parent: 1,
					name: '台湾',
					s: false
				},
				"599": {
					parent: 1,
					name: '香港',
					s: false
				},
				"576": {
					parent: 1,
					name: '澳门',
					s: false
				},
				"531": {
					parent: 1,
					name: '中国其他',
					s: false
				}
			},
			areas:{
        		1:{
        			name: 'A',
        			data:['1']
        		},
        		2:{
        			name: 'B',
        			data:['19']
        		},
        		3:{
        			name: 'C',
        			data:['532']
        		},
        		4:{
        			name: 'F',
        			data:['39']
        		},
        		5:{
        			name: 'G',
        			data:['68', '92', '109']
        		},
        		6:{
        			name: 'H',
        			data:['165', '125', '145', '184', '212', '120']
        		},
        		7:{
        			name: 'J',
        			data:['234', '255', '279']
        		},
        		8:{
        			name: 'L',
        			data:['294']
        		},
						9:{
        			name: 'N',
        			data:['333', '351']
        		},
						10:{
        			name: 'Q',
        			data:['357']
        		},
						11:{
        			name: 'S',
        			data:['393','406','368','417','438']
        		},
						12:{
        			name: 'T',
        			data:['461']
        		},
						13:{
        			name: 'Y',
        			data:['488']
        		},
						14:{
        			name: 'Z',
        			data:['508']
        		}
        	},
			areaobj: {
						"1": {
							parent: 1,
							name: '安徽',
							s: false
						},
        		"19": {
        			parent: 2,
        			name: '北京',
        			s: false
        		},
        		"532": {
        			parent: 3,
        			name: '重庆',
        			s:false
        		},
        		"39": {
        			parent: 4,
        			name: '福建',
        			s:false
        		},
        		"68": {
        			parent: 5,
        			name: '广东',
        			s:false
        		},
        		"92": {
        			parent: 5,
        			name: '广西',
        			s:false
        		},
        		"109": {
        			parent: 5,
        			name: '贵州',
        			s:false
        		},
        		"165": {
        			parent: 6,
        			name: '黑龙江',
        			s:false
        		},
        		"125": {
        			parent: 6,
        			name: '河北',
        			s:false
        		},
        		"145": {
        			parent: 6,
        			name: '河南',
        			s:false
        		},
        		"184": {
        			parent: 6,
        			name: '湖北',
        			s:false
        		},
        		"212": {
        			parent: 6,
        			name: '湖南',
        			s:false
        		},
        		"120": {
        			parent: 6,
        			name: '海南',
        			s:false
        		},
        		"234": {
        			parent: 7,
        			name: '吉林',
        			s:false
        		},
        		"255": {
        			parent: 7,
        			name: '江苏',
        			s:false
        		},
        		"279": {
        			parent: 7,
        			name: '江西',
        			s:false
        		},
        		"294": {
        			parent: 8,
        			name: '辽宁',
        			s:false
        		},
        		"333": {
        			parent: 9,
        			name: '内蒙古',
        			s:false
        		},
        		"351": {
        			parent: 9,
        			name: '宁夏',
        			s:false
        		},
        		"357": {
        			parent: 10,
        			name: '青海',
        			s:false
        		},
        		"393": {
        			parent: 11,
        			name: '山西',
        			s:false
        		},
        		"406": {
        			parent: 11,
        			name: '陕西',
        			s:false
        		},
        		"368": {
        			parent: 11,
        			name: '山东',
        			s:false
        		},
        		"417": {
        			parent: 11,
        			name: '上海',
        			s:false
        		},
        		"438": {
        			parent: 11,
        			name: '四川',
        			s:false
        		},
        		"461": {
        			parent: 12,
        			name: '天津',
        			s:false
        		},
        		"488": {
        			parent: 13,
        			name: '云南',
        			s:false
        		},
        		"508": {
        			parent: 14,
        			name: '浙江',
        			s:false
        		}
        	},
					areaArr: [],
					specailArr: [],
					selectList: [],
					allChecked: false,
					specailSelect: [],
					allCheckedspecail: false,
		}
	}
	toStep5 () {
		var areaItem = this.state.selectList; //常用城市
		var specailareas = this.state.specailSelect; //非常用城市
		var allAreas= areaItem.concat(specailareas)
		if (allAreas.length <= 0) {
			this.showError()
			return
		}
		var step= 4
		this.props.commonData({step, allAreas, areaItem, specailareas})
		history.push(addfastcombinations)
	}
	showError  () {Toast.error('您还没有选择地域')}
	isMount=false
	componentWillMount () {
		var self= this
		axios.get(getArea)
	  .then(function (response) {
			var area= response.data;
			var areaCode= [], newareaCode= [], specailCode= []
			for(var i=0; i<area.length; i++) {
				areaCode.push(area[i].Code)
			}
			newareaCode= areaCode.slice(6)
			specailCode= areaCode.slice(0,6)
			if(self.isMount) {
				self.setState({
	    		areaArr: newareaCode,
	    		specailArr: specailCode
	    	})
			}
	   })
	  .catch(function (error) {
	    console.log(error);
	  });
		var areas = this.props.data.areas
		if (areas) {
			this.setState({
				selectList: areas
			})
		}
	 var speareas = this.props.data.speareas
	 if(speareas) {
		 this.setState({
			 specailSelect: speareas
		 })
	 }
	}
	componentDidMount () {
 	 this.isMount=true
  }
  componentWillUnmount() {
 	 this.isMount=false
  }
	changeArea (id, value) {
		var select= this.state.selectList
		if(value) {
			this.setState({
				selectList: [...select.slice(), id]
			})
		} else {
			let index = select.indexOf(id)
			this.setState({
				selectList: [...select.slice(0, index), ...select.slice(index + 1)]
			})
		}
   }
	changeSpecailArea (id, value) {
		var select = this.state.specailSelect;
		if(value) {
			this.setState({
				specailSelect: [...select.slice(), id]
			})
		} else {
			let index = select.indexOf(id)
			this.setState({
				specailSelect: [...select.slice(0, index), ...select.slice(index + 1)]
			})
		}
	}
	changeAllSpecailArea (value) {
		var specailareasObj = this.state.specailareasObj;
		if(value) {
			let newarr = []
			for(var i in specailareasObj) {
				newarr.push(i)
			}
			this.setState({
				allCheckedspecail: true,
				specailSelect: newarr
			})
		} else{
			this.setState({
				allCheckedspecail: false,
				specailSelect: []
			})
		}
  }
	changeAllArea (value) {
		var areaobj = this.state.areaobj;
		if(value) {
			let newarr = []
			for(var i in areaobj) {
				newarr.push(i)
			}
			this.setState({
				allChecked: true,
				selectList: newarr
			})
		} else{
			this.setState({
				allChecked: false,
				selectList: []
			})
		}

	}
	render () {
		var select= this.state.selectList
		var specailSelect = this.state.specailSelect;
	 return (
		 <div className='panel panel-default' style={{margin: '10px'}}>
 			<div className="panel-heading" style={{overflow: 'hidden'}}>
 				<div style={{paddingLeft: '15px', float: 'left'}}><Icon type="similar-product" />&nbsp;&nbsp;<span>地域设置</span></div>
 			</div>
 			<div className="panel-body" style={{paddingBottom: '50px'}}>
 				<div><Checkbox onChange={this.changeAllArea.bind(this)}
											 defaultChecked={this.state.allChecked}
											 checked={this.state.allChecked}>全选-常用地区</Checkbox></div>
				<div>
        	{this.state.areaArr.length === 0 ? <div style={{margin: '20px auto', width: '200px'}}><Loading /></div> :
        		<div>
          		{ this.state.areaArrs.map((item, index) => {
          				var items = this.state.areas[item].data
									return (
          					<div className='col-md-6' key={index}>
          						<div style={{float: 'left', margin: '10px'}}> {this.state.areas[item].name} </div>
          						{
          							items.map((cityid) => {
          								let city = this.state.areaobj[cityid]
          								return (
          									<div style={{float:'left', margin: '10px'}} key={city.name}>
	                    				<Checkbox
																defaultChecked={select.indexOf(cityid) > -1}
																onChange={this.changeArea.bind(this, cityid)}
																checked={select.indexOf(cityid) > -1}
	                   					>
																{city.name}
															</Checkbox>
			                    	</div>
          									)
          								})
          						}
          					</div>
          				)
          			})
          		}
        	</div>
        	}
      	</div>
				<div><Checkbox onChange={this.changeAllSpecailArea.bind(this)}
											 defaultChecked={this.state.allCheckedspecail}
											 checked={this.state.allCheckedspecail}>全选-非常用地区</Checkbox></div>
				<div>
        	{this.state.specailArr.length === 0 ? <div style={{margin: '20px auto', width: '200px'}}><Loading /></div> :
        		<div>
          		{ this.state.specailareaArrs.map((item, index) => {
          				var items = this.state.specailareas[item].data
									return (
          					<div className='col-md-6' key={index}>
          						{
          							items.map((citysid) => {
          								let city = this.state.specailareasObj[citysid]
          								return (
          									<div style={{float:'left', margin: '10px'}} key={city.name}>
	                    				<Checkbox
	                    					defaultChecked={specailSelect.indexOf(citysid) > -1}
																onChange={this.changeSpecailArea.bind(this, citysid)}
																checked={specailSelect.indexOf(citysid) > -1}
	                   					>
																{city.name}
															</Checkbox>
			                    	</div>
          									)
          								})
          						}
          					</div>
          				)
          			})
          		}
        	</div>
        	}
      	</div>
 			</div>
 			<div className="panel-footer" style={{overflow: 'hidden', backgroundColor: '#fff'}}>
 				<div style={{float: 'right'}}>
 						<Link to={addfastTestStep3}><Button type="normal" style={{marginRight: '15px'}}>上一步</Button></Link>
 						<Button type="normal" onClick={this.toStep5.bind(this)}>下一步</Button>
 				</div>
 			</div>
 		</div>
				)


	}
}


export default SetlocationView;
