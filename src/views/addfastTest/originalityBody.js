import React from 'react';
import Search from 'qnui/lib/search';
import { Row, Col } from 'qnui/lib/grid';
import Select, {Option} from 'qnui/lib/select';
import Button from 'qnui/lib/button';
import Table from 'qnui/lib/table';
import Icon from 'qnui/lib/icon';
import {getcreativeCondition} from '../../help/url';
import axios from 'axios';
class OriginalityBody extends React.Component {
	constructor () {
		super ()
		this.state = {
	    FormatsType: [],
			LevelsType: []
    }
	}
	isMount=false

	componentWillMount () {
		var self = this
		axios.get(getcreativeCondition)
	  .then(function (response) {
			var Formats = response.data.Formats
			var Levels = response.data.Levels
			if(self.isMount) {
				self.setState({
					FormatsType: Formats,
					LevelsType: Levels
				})
			}

		})
	  .catch(function (error) {
	    console.log(error);
	  });
	}
	componentDidMount () {
		this.isMount=true
	}
	componentWillUnmount() {
		this.isMount=false
	}
  renderImg (value, index, record) {
		return (<img src={record.ImagePath} style={{width:300, height: 'auto'}}/>)
	}
	renderTable () {
		var data = this.props.data
		for (var i=0; i< data.length; i++) {
			if(data[i].Format === 2) {
				return (<Table.Column cell={this.renderImg.bind(this)} width={350} title="创意图片"/>)
			} else {
				return null
			}
		}
	}
	render () {
		return (
		 <div>
		   <div>
			 <div className='col-md-9'>
       {/*<div className='col-md-4'>
           <Search placeholder="What are you looking for..."
               onChange={this.props.onChange}
               onSearch={this.props.onSearch}/>
	      </div>*/}
				{
					this.state.FormatsType
					? <div className='col-md-2'>
						<Select placeholder="全部类型" onChange={this.props.onSelectType}>
						    <Option value="">全部类型</Option>
								<Option value="2">图片创意</Option>
								<Option value="3">Flash创意</Option>
								<Option value="4">视频创意</Option>
								<Option value="5">文字链创意</Option>
								<Option value="9">Flash不遮盖创意</Option>
								<Option value="10">模板创意</Option>
						</Select>
	 	      </div>
					: null
				}
				{
					this.state.LevelsType
					? <div className='col-md-2'>
						<Select placeholder="全部等级" onChange={this.props.onSelectLevel}>
							 <Option value="">全部等级</Option>
							 <Option value="1">一级</Option>
							 <Option value="2">二级</Option>
							 <Option value="3">三级</Option>
							 <Option value="4">四级</Option>
							 <Option value="10">十级</Option>
							 <Option value="99">未分等级</Option>
					 </Select>
	 	      </div>
					: null
				}
				{/*<div className='col-md-2'>
					<Select placeholder="选择尺寸" onChange={this.props.onSelectType}>
						 <Option value="small">Small</Option>
						 <Option value="medium">Medium</Option>
						 <Option value="large">Large</Option>
				 </Select>
 	      </div>*/}
				</div>
      </div>
       {
         this.props.data
         ?
         <Table dataSource={this.props.data}
                      rowSelection={this.props.rowSelection} style={{clear: 'both', paddingTop: '8px'}} primaryKey='Id'
											>
           {
						 this.renderTable()
						}
					 <Table.Column width={200} title="创意基本信息" dataIndex='Name'/>
           <Table.Column cell={this.props.status} width={200} title="创意状态"/>
           <Table.Column cell={this.props.level} width={200} title="创意等级"/>
					 <Table.Column cell={this.props.creativeSize} width={200} title="创意尺寸"/>
					 <Table.Column width={200} title="推广链接" dataIndex='ClickUrl'/>
        </Table>
         : <div style={{margin: '50px auto', textAlign: 'center', clear: 'both'}}>
             <p>暂获取不到数据</p>
           </div>
       }
		 </div>
				)


	}
}


export default OriginalityBody;
