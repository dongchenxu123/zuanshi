<<<<<<< HEAD
import React from 'react';
import Button from 'qnui/lib/button';
import Form, {Item as FormItem } from 'qnui/lib/form';
import { Link } from 'react-router-dom';
import Input from 'qnui/lib/input';
import Radio, { Group as RadioGroup } from 'qnui/lib/radio';
import Field from 'qnui/lib/field';
import {addfastcombinations, homeUrl} from '../../help/linkUrl';
import {createForm, createCombinations} from '../../help/url';
import NumberPicker from 'qnui/lib/number-picker';
import DatePicker, { RangePicker } from 'qnui/lib/date-picker';
import Select from 'qnui/lib/select';
import TimePicker from 'qnui/lib/time-picker';
import {Row, Col} from 'qnui/lib/grid';
import axios from 'axios';
import Feedback from 'qnui/lib/feedback';
import createHistory from 'history/createHashHistory'
const history = createHistory()
const Toast = Feedback.toast;
const disabledDate = function (theDate) {
	 var yesterday = new Date(new Date().getTime() - 1 * 24 * 3600 * 1000);
    return theDate && theDate < yesterday.getTime();
};
class MessageFormView extends React.Component {
	constructor(props) {
        super(props);
        this.field = new Field(this);
				this.state={
					value: 1000
				}
    }
	changeValue (value) {
		this.setState({
			value: value
		})
	}
	handleSubmit () {
		this.field.validate((errors, values) => {
        if (errors) {
            console.log('Errors in form!!!');
            return;
        }
        var AdzonesItem = this.props.data.AdzonesItem
				var creativesItem = this.props.data.creativesItem
				var areaIds = this.props.data.step4
				var speed_type = values.type
				var adgroupModal = values.adgroupModal
				var combinationdata = this.props.data.combinationdata
		  	var combinationItem = combinationdata.combinationItem
				var combination = combinationdata.combinationData
				var newstartDates = this.props.data.formData.startDates
				var newstartTime = this.props.data.formData.startTime
				var newendTime = this.props.data.formData.endTime
			 	var sum = 0
			 	var cpm = 0
			 	var value = this.state.value
				var startDate = values.startDate
				var endDate = values.endDate

        if (newstartDates) {
					var startDates = newstartDates
				} else {
					var year = startDate.getFullYear();
					var month = (startDate.getMonth() + 1) < 10 ? '0'+ (startDate.getMonth() + 1) : startDate.getMonth() + 1;
					var day = (startDate.getDate()) < 10 ? '0' + startDate.getDate() : startDate.getDate();
					var startDates = year + '-' + month + '-' + day
				}
				// if (newstartTime) {
				// 	var startTime = newstartTime
				// } else {
				// 	var startTime = values.startTime.toLocaleTimeString('zh-CN', {
	      //               hour12: false
	      //           })
				// }
				// if (newendTime) {
				// 	var endTime = newendTime
				// } else {
				// 	var endTime = values.endTime.toLocaleTimeString('zh-CN', {
	      //               hour12: false
	      //           })
				// }
				var startDataTime = startDates
				var endDateTime = startDates
				var impressions = this.state.value
				var name = values.name
				var newArr = []
		    var zizhuObj = this.props.data.zizhuObj
		    var zhongziObj = this.props.data.zhongziObj
		    var tongtouObj = this.props.data.tongtouObj
		    var peopleObj = this.props.data.peopleObj
		    var interestObj = this.props.data.interestObj
		    var likemybodyObj = this.props.data.likemybodyObj
				var Row1value = this.props.data.Row1value
		    var Row2value = this.props.data.Row2value
		    var Row3value = this.props.data.Row3value
		    var Row4value = this.props.data.Row4value
		    var Row5value = this.props.data.Row5value
		    var Row6value = this.props.data.Row6value
		    var Row7value = this.props.data.Row7value
		    var Row8value = this.props.data.Row8value
		    var Row9value = this.props.data.Row9value
		    var tiaoguoObj = this.props.data.tiaoguoObj
		    var similarObj = this.props.data.similarObj
		    var zhinengObj = this.props.data.zhinengObj
		    var checked = this.props.data.checked
		    var zhinengchecked = this.props.data.zhinengchecked
				var dmpArr = this.props.data.dmpArr
				if(tiaoguoObj.crowd_type) {
		      newArr.push(tiaoguoObj)
		    }
		    if(zizhuObj.crowd_type) {
		      newArr.push(zizhuObj)
		    }
		    if(zhongziObj.crowd_type) {
		      newArr.push(zhongziObj)
		    }
				if(dmpArr.length > 0) {
				var dmpArrs = newArr.concat(dmpArr)
				 newArr = dmpArrs
				}
		    if(checked == true) {
		      newArr.push(tongtouObj)
		    }
		    if (peopleObj.crowd_type) {
		      newArr.push(peopleObj)
		    }
		    if (interestObj.crowd_type) {
		      newArr.push(interestObj)
		    }
		    if (likemybodyObj.crowd_type) {
		      newArr.push(likemybodyObj)
		    }
				if (Row1value.crowd_type) {
		      newArr.push(Row1value)
		    }
		    if (Row2value.crowd_type) {
		      newArr.push(Row2value)
		    }
		    if (Row3value.crowd_type) {
		      newArr.push(Row3value)
		    }
		    if (Row4value.crowd_type) {
		      newArr.push(Row4value)
		    }
		    if (Row5value.crowd_type) {
		      newArr.push(Row5value)
		    }
		    if (Row6value.crowd_type) {
		      newArr.push(Row6value)
		    }
		    if (Row7value.crowd_type) {
		      newArr.push(Row7value)
		    }
		    if (Row8value.crowd_type) {
		      newArr.push(Row8value)
		    }
		    if (Row9value.crowd_type) {
		      newArr.push(Row9value)
		    }
		    if (similarObj.crowd_type) {
		      newArr.push(similarObj)
		    }
		    if (zhinengchecked == true) {
		      newArr.push(zhinengObj)
		    }
				if (newArr.length <= 0) {
					newArr.push({crowd_type: 0})
				}
				var type = 'form'
				var step = 3
				var budget = values.budget
				this.props.commonData({step, type, name, impressions,startDates, speed_type, adgroupModal})
				axios.post(createForm, {
			    adzones: AdzonesItem,
					creatives: creativesItem,
					area_ids: areaIds,
					speed_type: speed_type,
					budget: budget,
					start_time: startDataTime,
					end_time: endDateTime,
					impressions: impressions,
					crowds: newArr,
					title: name,
					adgroup_model: adgroupModal

			  })
			  .then(function (response) {
					var test_id = response.data.test_id
					console.log(response, test_id)
					if(!response.data.err) {
						axios.post(createCombinations, {
					    test_id: test_id,
					    combinations: combination
					  })
					  .then(function (response) {
					    if(response.data.msg == 'ok') {
								history.push(homeUrl)
							} else{
								Toast.error('您填写的信息有误')
							}
					  })
					  .catch(function (error) {
					    console.log(error);
					  });
					} else{
						Toast.error(response.data.err)
					}
		    })
			  .catch(function (error) {
			    console.log(error);
			  });

    });
	}
	toBeforeStep () {
		history.push(addfastcombinations)
	}
	render () {
		const {init, getError, getState } = this.field
    const formItemLayout = {
        labelCol: {
            span: 2
        },
        wrapperCol: {
            span: 14
        }
    }
	 var combinationdata = this.props.data.combinationdata //所有数据
 	 var combinationItem = combinationdata.combinationItem
 	 var combination = combinationdata.combinationData //选择的创意的数据
	 var sum = 0
	 var cpm = 0
	 var value = this.state.value
	 if(combination) {
		 for(var i=0; i<combination.length; i++) {
			 for(var k=0; k<combination[i].Crowds.length; k++) {
				 sum += combination[i].Crowds[k].matrix_price[0].Price *1
				 cpm = sum/1000 * value
			 }
		 }
	}
	 var name = this.props.data.formData.name
	 var impressions = this.props.data.formData.impressions
	 var startDates = this.props.data.formData.startDates
	 var endDates = this.props.data.formData.endDates
	 var startTime = this.props.data.formData.startTime
	 var endTime = this.props.data.formData.endTime
	 var speed_type = this.props.data.formData.speed_type
	 var adgroupModal = this.props.data.formData.adgroupModal
   return (
		 <div className='panel panel-default' style={{margin: '10px'}}>
			 <div className="panel-heading" style={{overflow: 'hidden'}}>
				 <div style={{paddingLeft: '15px', float: 'left'}}>基础信息设置</div>
			 </div>
			 <div className="panel-body" style={{paddingBottom: '50px'}}>
				 <Form field={this.field}>
					 <FormItem
										 label="测试名称"
										 {...formItemLayout}
										 hasFeedback
										 help={getState('name') === 'validating' ? '校验中...' : (getError('name') || []).join(', ')}>
										 <Input maxLength={20} hasLimitHint placeholder="实时校验，输入 frank 看看"
												 {...init('name', {
														 rules: [
																 {required: true, min: 5, message: '用户名至少为 5 个字符'}

														 ],
												 })}
												 style={{width: 200}} defaultValue={name ? name : ''}/>
							 </FormItem>
							 <FormItem
                     label="有效展现次数"
                     {...formItemLayout}>
                     <NumberPicker min={1000}
                         {...init('primeNumber', {
													 rules: [
															 {required: true, message: '请填写有效展现次数'}

													 ]
                         })}
                         inputWidth={'200px'} defaultValue={impressions ? impressions : this.state.value} onChange={this.changeValue.bind(this)}
												 step={1000}
												 />
                 </FormItem>
								 <FormItem
                      label="预算"
                      {...formItemLayout}>
											<p {...init('combination', {

											})}>组合方案：{combination ? combination.length : 0} 个</p>
											<br/>
											<p {...init('cost', {

 											})}>预计测试费用：{cpm} 元</p>
                  </FormItem>
									<FormItem
                       label="测试预算"
                       {...formItemLayout}>
											 <NumberPicker
  												 {...init('budget', {
  														 rules: [
  																 {required: true, message: '请填写预算'}

  														 ],
  												 })}
  												 step={1000} inputWidth={'200px'}/>
                   </FormItem>
									<FormItem
                    label="投放日期"
                    labelCol={{ span: 2 }}
                    required>
                    <Row>
                        <FormItem style={{marginRight: 10}}>
													<DatePicker {...init('startDate',{
														rules: [
 															 {required: true, message: '请填写投放日期'}

 													 ]
													})} disabledDate={disabledDate} defaultValue={startDates ? startDates : ''}/>
												</FormItem>
                    </Row>
                </FormItem>
								{/*<FormItem
			            label="投放时间段:"
			            labelCol={{ span: 2 }}
									required>
									<Row>
				            <FormItem style={{marginRight: 10}}>
											<TimePicker {...init('startTime',{
												rules: [
													 {required: true, message: '请填写投放开始时段'}

											 ]
											})} format='HH:mm:ss' defaultValue={startTime ? startTime : ''}/>
										</FormItem>
										<FormItem>
											<TimePicker {...init('endTime',{
												rules: [
													 {required: true, message: '请填写投放结束时段'}

											 ]
											})} format='HH:mm:ss' defaultValue={endTime ? endTime : ''}/>
										</FormItem>
									</Row>
			        </FormItem>*/}
							<FormItem
		            label="投放方式:"
		            {...formItemLayout}>
		            <RadioGroup {...init('type', {
									rules: [
											{required: true}

									]
								})} defaultValue={speed_type ? speed_type : '2'}>
		                <Radio value="2">均匀投放</Radio>
		                <Radio value="1">尽快投放</Radio>
		            </RadioGroup>
		        </FormItem>
						<FormItem
							label="创意方式:"
							{...formItemLayout}>
							<RadioGroup {...init('adgroupModal', {
								rules: [
										{required: true}
									]}
								)} defaultValue={adgroupModal ? adgroupModal : '2'}>
									<Radio value="2">单元多创意</Radio>
									<Radio value="1">单元单创意</Radio>
							</RadioGroup>
					</FormItem>
						<FormItem
                    wrapperCol={{ span: 12, offset: 12 }}>
										<div style={{float: 'right'}}>
											 <Button type="normal" style={{marginRight: '15px'}} onClick={this.toBeforeStep.bind(this)}>上一步</Button>
											 &nbsp;&nbsp;&nbsp;
											 <Button type="primary" onClick={this.handleSubmit.bind(this)}>完成创建</Button>
						 				</div>
					  </FormItem>
					</Form>
			 </div>
		</div>
				)


	}
}


export default MessageFormView;
=======
import React from 'react';
import Button from 'qnui/lib/button';
import Form, {Item as FormItem } from 'qnui/lib/form';
import { Link } from 'react-router-dom';
import Input from 'qnui/lib/input';
import Radio, { Group as RadioGroup } from 'qnui/lib/radio';
import Field from 'qnui/lib/field';
import {addfastcombinations, homeUrl} from '../../help/linkUrl';
import {createForm, createCombinations} from '../../help/url';
import NumberPicker from 'qnui/lib/number-picker';
import DatePicker, { RangePicker } from 'qnui/lib/date-picker';
import Select from 'qnui/lib/select';
import TimePicker from 'qnui/lib/time-picker';
import {Row, Col} from 'qnui/lib/grid';
import axios from 'axios';
import Feedback from 'qnui/lib/feedback';
import createHistory from 'history/createHashHistory'
const history = createHistory()
const Toast = Feedback.toast;
const disabledDate = function (theDate) {
	 var yesterday = new Date(new Date().getTime() - 1 * 24 * 3600 * 1000);
    return theDate && theDate < yesterday.getTime();
};
class MessageFormView extends React.Component {
	constructor(props) {
        super(props);
        this.field = new Field(this);
				this.state={
					value: 1000
				}
    }
	changeValue (value) {
		this.setState({
			value: value
		})
	}
	handleSubmit () {
		this.field.validate((errors, values) => {
        if (errors) {
            console.log('Errors in form!!!');
            return;
        }
        var AdzonesItem = this.props.data.AdzonesItem
				var creativesItem = this.props.data.creativesItem
				var areaIds = this.props.data.step4
				var speed_type = values.type
				var adgroupModal = values.adgroupModal
				var combinationdata = this.props.data.combinationdata
		  	var combinationItem = combinationdata.combinationItem
				var combination = combinationdata.combinationData
				var newstartDates = this.props.data.formData.startDates
				var newstartTime = this.props.data.formData.startTime
				var newendTime = this.props.data.formData.endTime
			 	var sum = 0
			 	var cpm = 0
			 	var value = this.state.value
				var startDate = values.startDate
				var endDate = values.endDate

        if (newstartDates) {
					var startDates = newstartDates
				} else {
					var year = startDate.getFullYear();
					var month = (startDate.getMonth() + 1) < 10 ? '0'+ (startDate.getMonth() + 1) : startDate.getMonth() + 1;
					var day = (startDate.getDate()) < 10 ? '0' + startDate.getDate() : startDate.getDate();
					var startDates = year + '-' + month + '-' + day
				}
				// if (newstartTime) {
				// 	var startTime = newstartTime
				// } else {
				// 	var startTime = values.startTime.toLocaleTimeString('zh-CN', {
	      //               hour12: false
	      //           })
				// }
				// if (newendTime) {
				// 	var endTime = newendTime
				// } else {
				// 	var endTime = values.endTime.toLocaleTimeString('zh-CN', {
	      //               hour12: false
	      //           })
				// }
				var startDataTime = startDates
				var endDateTime = startDates
				var impressions = this.state.value
				var name = values.name
				var newArr = []
		    var zizhuObj = this.props.data.zizhuObj
		    var zhongziObj = this.props.data.zhongziObj
		    var tongtouObj = this.props.data.tongtouObj
		    var peopleObj = this.props.data.peopleObj
		    var interestObj = this.props.data.interestObj
				var likemybodyObj = this.props.data.likemybodyObj
				var selectRow = this.props.data.sceneObj.selectRow //营销场景定向
				var tiaoguoObj = this.props.data.tiaoguoObj
		    var similarObj = this.props.data.similarObj
		    var zhinengObj = this.props.data.zhinengObj
		    var checked = this.props.data.checked
		    var zhinengchecked = this.props.data.zhinengchecked
				var dmpArr = this.props.data.dmpArr
				var selectCats = this.props.data.catsObj.selectCats
				if(tiaoguoObj.crowd_type) {
		      newArr.push(tiaoguoObj)
		    }
		    if(zizhuObj.crowd_type) {
		      newArr.push(zizhuObj)
		    }
		    if(zhongziObj.crowd_type) {
		      newArr.push(zhongziObj)
		    }
				if(dmpArr) {
				var dmpArrs = newArr.concat(dmpArr)
				 newArr = dmpArrs
				}
				if (selectCats) {
					var selectCats = newArr.concat(selectCats)
					newArr = selectCats
				}
		    if(checked == true) {
		      newArr.push(tongtouObj)
		    }
		    if (peopleObj.crowd_type) {
		      newArr.push(peopleObj)
		    }
		    if (interestObj.crowd_type) {
		      newArr.push(interestObj)
		    }
		    if (likemybodyObj.crowd_type) {
		      newArr.push(likemybodyObj)
		    }
				if (selectRow) {
					var selectRow = newArr.concat(selectRow)
					newArr = selectRow
				}
		    if (similarObj.crowd_type) {
		      newArr.push(similarObj)
		    }
		    if (zhinengchecked == true) {
		      newArr.push(zhinengObj)
		    }
				if (newArr.length <= 0) {
					newArr.push({crowd_type: 0})
				}
				var type = 'form'
				var step = 3
				var budget = values.budget
				this.props.commonData({step, type, name, impressions,startDates, speed_type, adgroupModal})
				axios.post(createForm, {
			    adzones: AdzonesItem,
					creatives: creativesItem,
					area_ids: areaIds,
					speed_type: speed_type,
					budget: budget,
					start_time: startDataTime,
					end_time: endDateTime,
					impressions: impressions,
					crowds: newArr,
					title: name,
					adgroup_model: adgroupModal

			  })
			  .then(function (response) {
					var test_id = response.data.test_id
					console.log(response, test_id)
					if(!response.data.err) {
						axios.post(createCombinations, {
					    test_id: test_id,
					    combinations: combination
					  })
					  .then(function (response) {
					    if(response.data.msg == 'ok') {
								history.push(homeUrl)
							} else{
								Toast.error('您填写的信息有误')
							}
					  })
					  .catch(function (error) {
					    console.log(error);
					  });
					} else{
						Toast.error(response.data.err)
					}
		    })
			  .catch(function (error) {
			    console.log(error);
			  });

    });
	}
	toBeforeStep () {
		history.push(addfastcombinations)
	}
	render () {
		const {init, getError, getState } = this.field
    const formItemLayout = {
        labelCol: {
            span: 2
        },
        wrapperCol: {
            span: 14
        }
    }
	 var combinationdata = this.props.data.combinationdata //所有数据
 	 var combinationItem = combinationdata.combinationItem
 	 var combination = combinationdata.combinationObj //选择的创意的数据
	 var sum = 0
	 var cpm = 0
	 var value = this.state.value
	 var combinations = Object.keys(combination).map(key=> combination[key])
	 if(combination) {
		 for(var i=0; i<combinations.length; i++) {
			 for(var k=0; k<combinations[i].Crowds.length; k++) {
				 sum += combinations[i].Crowds[k].matrix_price[0].Price *1
				 cpm = (sum/1000 * value)/100
			 }
		 }
	}
	 var name = this.props.data.formData.name
	 var impressions = this.props.data.formData.impressions
	 var startDates = this.props.data.formData.startDates
	 var endDates = this.props.data.formData.endDates
	 var startTime = this.props.data.formData.startTime
	 var endTime = this.props.data.formData.endTime
	 var speed_type = this.props.data.formData.speed_type
	 var adgroupModal = this.props.data.formData.adgroupModal
   return (
		 <div className='panel panel-default' style={{margin: '10px'}}>
			 <div className="panel-heading" style={{overflow: 'hidden'}}>
				 <div style={{paddingLeft: '15px', float: 'left'}}>基础信息设置</div>
			 </div>
			 <div className="panel-body" style={{paddingBottom: '50px'}}>
				 <Form field={this.field}>
					 <FormItem
										 label="测试名称"
										 {...formItemLayout}
										 hasFeedback
										 help={getState('name') === 'validating' ? '校验中...' : (getError('name') || []).join(', ')}>
										 <Input maxLength={20} hasLimitHint placeholder="实时校验，输入 frank 看看"
												 {...init('name', {
														 rules: [
																 {required: true, min: 5, message: '用户名至少为 5 个字符'}

														 ],
												 })}
												 style={{width: 200}} defaultValue={name ? name : ''}/>
							 </FormItem>
							 <FormItem
                     label="有效展现次数"
                     {...formItemLayout}>
                     <NumberPicker min={1000}
                         {...init('primeNumber', {
													 rules: [
															 {required: true, message: '请填写有效展现次数'}

													 ]
                         })}
                         inputWidth={'200px'} defaultValue={impressions ? impressions : this.state.value} onChange={this.changeValue.bind(this)}
												 step={1000}
												 />
                 </FormItem>
								 <FormItem
                      label="预算"
                      {...formItemLayout}>
											<p {...init('combination', {

											})}>组合方案：{combinations ? combinations.length : 0} 个</p>
											<br/>
											<p {...init('cost', {

 											})}>预计测试费用：{cpm} 元</p>
                  </FormItem>
									<FormItem
                       label="测试预算"
                       {...formItemLayout}>
											 <NumberPicker
  												 {...init('budget', {
  														 rules: [
  																 {required: true, message: '请填写预算'}

  														 ],
  												 })}
  												 step={1000} inputWidth={'200px'}/>
                   </FormItem>
									<FormItem
                    label="投放日期"
                    labelCol={{ span: 2 }}
                    required>
                    <Row>
                        <FormItem style={{marginRight: 10}}>
													<DatePicker {...init('startDate',{
														rules: [
 															 {required: true, message: '请填写投放日期'}

 													 ]
													})} disabledDate={disabledDate} defaultValue={startDates ? startDates : ''}/>
												</FormItem>
                    </Row>
                </FormItem>
								{/*<FormItem
			            label="投放时间段:"
			            labelCol={{ span: 2 }}
									required>
									<Row>
				            <FormItem style={{marginRight: 10}}>
											<TimePicker {...init('startTime',{
												rules: [
													 {required: true, message: '请填写投放开始时段'}

											 ]
											})} format='HH:mm:ss' defaultValue={startTime ? startTime : ''}/>
										</FormItem>
										<FormItem>
											<TimePicker {...init('endTime',{
												rules: [
													 {required: true, message: '请填写投放结束时段'}

											 ]
											})} format='HH:mm:ss' defaultValue={endTime ? endTime : ''}/>
										</FormItem>
									</Row>
			        </FormItem>*/}
							<FormItem
		            label="投放方式:"
		            {...formItemLayout}>
		            <RadioGroup {...init('type', {
									rules: [
											{required: true}

									]
								})} defaultValue={speed_type ? speed_type : '2'}>
		                <Radio value="2">均匀投放</Radio>
		                <Radio value="1">尽快投放</Radio>
		            </RadioGroup>
		        </FormItem>
						<FormItem
							label="创意方式:"
							{...formItemLayout}>
							<RadioGroup {...init('adgroupModal', {
								rules: [
										{required: true}
									]}
								)} defaultValue={adgroupModal ? adgroupModal : '2'}>
									<Radio value="2">单元多创意</Radio>
									<Radio value="1">单元单创意</Radio>
							</RadioGroup>
					</FormItem>
						<FormItem
                    wrapperCol={{ span: 12, offset: 12 }}>
										<div style={{float: 'right'}}>
											 <Button type="normal" style={{marginRight: '15px'}} onClick={this.toBeforeStep.bind(this)}>上一步</Button>
											 &nbsp;&nbsp;&nbsp;
											 <Button type="primary" onClick={this.handleSubmit.bind(this)}>完成创建</Button>
						 				</div>
					  </FormItem>
					</Form>
			 </div>
		</div>
				)


	}
}


export default MessageFormView;
>>>>>>> a43b3823b062de6e7da27e692def8042fa1e75a2
