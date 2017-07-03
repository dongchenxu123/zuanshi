import React from 'react';
import {addfastTestStep3, addfastcombinations} from '../../help/linkUrl';
import { Link } from 'react-router-dom';
import Checkbox from 'qnui/lib/checkbox';
import Loading from 'qnui/lib/loading';
class SetlocationView extends React.Component {
	
	// toStep5 () {
	// 	var areaItem = this.state.selectList; //常用城市
	// 	var specailareas = this.state.specailSelect; //非常用城市
	// 	var allAreas= areaItem.concat(specailareas)
	// 	if (allAreas.length <= 0) {
	// 		this.showError()
	// 		return
	// 	}
	// 	this.props.commonData({step, allAreas, areaItem, specailareas})
	// }
	
   changeArea (cityid, value) {
     this.props.setchangeArea(cityid, value)
   }
   changeSpecailArea (citysid, value) {
     this.props.setchangeSpecailArea(citysid, value)
   }
	render () {
	var select= this.props.selectList
	var specailSelect = this.props.specailSelect;
	return (
		 <div>
 			<div className="panel-body" style={{paddingBottom: '50px'}}>
 				<div><Checkbox onChange={this.props.changeAllArea}
											 defaultChecked={this.props.allChecked}
											 checked={this.props.allChecked}>全选-常用地区</Checkbox></div>
				<div>
        	{this.props.areaArr.length === 0 ? <div style={{margin: '20px auto', width: '200px'}}><Loading /></div> :
        		<div>
          		{ this.props.areaArrs.map((item, index) => {
          				var items = this.props.areas[item].data
									return (
          					<div className='col-md-6' key={index}>
          						<div style={{float: 'left', margin: '10px'}}> {this.props.areas[item].name} </div>
          						{
          							items.map((cityid) => {
          								let city = this.props.areaobj[cityid]
          								return (
          									<div style={{float:'left', margin: '10px'}} key={city.name}>
	                    				<Checkbox
											defaultChecked={select.indexOf(cityid) > -1}
											onChange={this.changeArea.bind(this, cityid)}
											checked={select.indexOf(cityid) > -1}>
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
		<div><Checkbox onChange={this.props.changeAllSpecailArea}
					defaultChecked={this.props.allCheckedspecail}
					checked={this.props.allCheckedspecail}>全选-非常用地区</Checkbox></div>
		<div>
        	{this.props.specailArr.length === 0 ? <div style={{margin: '20px auto', width: '200px'}}><Loading /></div> :
        		<div>
          		{ this.props.specailareaArrs.map((item, index) => {
          				var items = this.props.specailareas[item].data
									return (
          					<div className='col-md-6' key={index}>
          						{
          							items.map((citysid) => {
          								let city = this.props.specailareasObj[citysid]
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
 </div>
)
}
}


export default SetlocationView;
