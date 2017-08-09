import React from 'react';
import {getcampaign, getArea, getBestcombinationSetup, getGeneralCampaignModify} from '../../help/url';
import createHistory from 'history/createHashHistory';
import moment from 'moment';
import Form from 'qnui/lib/form';
import Input from 'qnui/lib/input';
import Checkbox from 'qnui/lib/checkbox';
import DatePicker, { MonthPicker, YearPicker, RangePicker } from 'qnui/lib/date-picker';
import Field from 'qnui/lib/field';
import NumberPicker from 'qnui/lib/number-picker';
import Icon from 'qnui/lib/icon';
import SetlocationView from './setlocation';
import axios from 'axios';
import Radio, { Group as RadioGroup } from 'qnui/lib/radio';
import { Link } from 'react-router-dom';
import {dayTestHome, createcombination} from '../../help/linkUrl';
import Button from 'qnui/lib/button';
import Feedback from 'qnui/lib/feedback';
import Notice from 'qnui/lib/notice';

const history = createHistory()
function genArray(length) {
    return  Array.from({length:length}, (v,i) => i)
}
const hours = genArray(24);
const FormItem = Form.Item;
const Toast = Feedback.toast;
class InfoFromView extends React.Component {
    field = new Field(this);
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
            selectWeekDays: [],
            allWeekDays: false,
            allWeekends: false,
            selectWeekends: [],
            editcampaigns: {}
		}
    }
    isMount=false
	componentWillMount () {
        var selectList = this.state.selectList
        var allWeekDays = this.state.allWeekDays
        var allChecked = this.state.allChecked
        var areaobj = this.state.areaobj
        var selectWeekDays = this.state.selectWeekDays
        var allWeekends = this.state.allWeekends
        var selectWeekends = this.state.selectWeekends
        var id = this.props.match.params.id
        var self= this
        if (id == 0) {
            if(allChecked == false && selectList.length <=0) {
                let newarr = []
                for(var i in areaobj) {
                    newarr.push(i)
                }
                this.setState({
                allChecked: true,
                selectList: newarr
                })
            }
            if(allWeekends == false && selectWeekends.length<=0) {
                this.setState({
                allWeekends: true,
                selectWeekends: hours
                })
            }
            if(allWeekDays == false && selectWeekDays.length<=0) {
                this.setState({
                allWeekDays: true,
                selectWeekDays: hours
                })
            }
        } else {
           axios.post(getcampaign, {
               id: id
           })
            .then(function (response) {
               var newWeekends = []
               var newWeekdays = []
               var campagin = response.data.campaign
               var Weekends = campagin.BannerTime.Weekends
               var Workdays = campagin.BannerTime.Workdays
               var AreaIdList = campagin.AreaIdList
               var Areas = []
               for(var k=0; k<AreaIdList.length; k++) {
                  Areas.push(AreaIdList[k]+ '')

               }
               for(var j=0; j<Weekends.length; j++) {
                    if(Weekends[j] == true) {
                        newWeekends.push(j)
                    }
                }
                for(var m=0; m<Workdays.length; m++) {
                    if(Workdays[m] == true) {
                        newWeekdays.push(m)
                    }
                }
                self.setState({
                    editcampaigns: campagin,
                    selectWeekends: newWeekends,
                    selectWeekDays: newWeekdays,
                    selectList: Areas
                })
               
            })
            .catch(function (error) {
                console.log(error);
            });
        }
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
    changeWeekDay (item, value) {
      var selectWeekDays = this.state.selectWeekDays
      if(value) {
        this.setState({
            selectWeekDays: [...selectWeekDays.slice(), item]
        })
      } else {
        let index = selectWeekDays.indexOf(item)
        this.setState({
            selectWeekDays: [...selectWeekDays.slice(0, index), ...selectWeekDays.slice(index + 1)]
        })
      }
    }
    changeAllweekdays (value) {
       if(value) {
			this.setState({
				allWeekDays: true,
				selectWeekDays: hours
			})
		} else{
			this.setState({
				allWeekDays: false,
				selectWeekDays: []
			})
		}
    }
    changeWeekends (item, value) {
        var selectWeekends = this.state.selectWeekends
        if(value) {
        this.setState({
            selectWeekends: [...selectWeekends.slice(), item]
        })
        } else {
        let index = selectWeekends.indexOf(item)
        this.setState({
            selectWeekends: [...selectWeekends.slice(0, index), ...selectWeekends.slice(index + 1)]
        })
        }
    }
    changeAllweekends (value) {
      if(value) {
        this.setState({
            allWeekends: true,
            selectWeekends: hours
        })
        } else{
            this.setState({
                allWeekends: false,
                selectWeekends: []
            })
        }
    }
    setClick () {
       this.field.validate((errors, values) => {
            if (errors) {
                return;
            }
            var step4Data = this.props.data.step4Data
            var combinationData = step4Data.combinationData
            var areaItem = this.state.selectList; //常用城市
            var specailareas = this.state.specailSelect; //非常用城市
            var allAreas= areaItem.concat(specailareas)
            var selectWeekDays = this.state.selectWeekDays
            var selectWeekends = this.state.selectWeekends
            var Name = values.campaignName
            var daycost = values.daycost*100
            var startTime = moment(values.rangeDate[0]).format()
            var endTime = moment(values.rangeDate[1]).format()
            var type = values.type
            var editcampaigns = this.state.editcampaigns
            var id = this.props.match.params.id
            var WeekDaysArr = []
            var WeekendsArr = []
            if(selectWeekDays.length <= 0 && selectWeekends.length <= 0) {
                Toast.error('请选择投放时段！')
                return
            }
            if(allAreas.length <= 0) {
                Toast.error('请选择投放地域！')
                return
            }
            for(var i=0; i<hours.length; i++) {
                var isIn =selectWeekDays.indexOf(hours[i]) > -1
                WeekDaysArr.push(isIn)
                var isbool = selectWeekends.indexOf(hours[i]) > -1
                WeekendsArr.push(isbool)
            }
            
        if(editcampaigns.Id) {
             axios.post(getGeneralCampaignModify,{
               work_day: WeekDaysArr,
               week_end: WeekendsArr,
               type: 2,
               name: Name,
               speed_type: type,
               day_budget: values.daycost,
               start_time: startTime,
               end_time: endTime,
               area_id_list: allAreas.join(","),
               campaign_id: id
            })
            .then(function (response) {
              var campaign = response.data.campaign
               if(response.data.err) {
                   Toast.error(response.data.err)
                   return
               }
               if(campaign != null) {
                   history.push(dayTestHome)
                   Toast.success('修改成功！')
               }
            })
            .catch(function (error) {
                console.log(error);
            });
         } else {
           var campagin = {
              Name: Name,
              SpeedType: type,
              StartTime: startTime,
              EndTime: endTime,
              DayBudget: daycost,
              BannerTime:{
                  Workdays: WeekDaysArr,
                  Weekends: WeekendsArr
              },
              AreaIdList: allAreas
          }
            axios.post(getBestcombinationSetup,{
             settings: combinationData,
             campaign: campagin
            })
            .then(function (response) {
               var settings = response.data.settings
               if(response.data.err) {
                   Toast.error(response.data.err)
                   return
               }
               if(settings != null) {
                   history.push(dayTestHome)
               }
            })
            .catch(function (error) {
                console.log(error);
            });
         }
         

        });
    }
    render () { 
        const init = this.field.init;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
        const defaultStyle ={
            width: '24px',
            height: '24px',
            backgroundColor: '#eee',
            display: 'inline-block',
            textAlign: 'center',
            cursor: 'pointer'
        }
        const onLineStyle ={
            width: '24px',
            height: '24px',
            backgroundColor: '#4d7fff',
            display: 'inline-block',
            textAlign: 'center',
            color: '#fff',
            cursor: 'pointer'
        }
        var selectWeekDays = this.state.selectWeekDays
        var selectWeekends = this.state.selectWeekends
        var editcampaigns = this.state.editcampaigns
        var campaignName = editcampaigns.Name
        var SpeedType = editcampaigns.SpeedType == '1' ? '1' : '2'
        if(editcampaigns.DayBudget){
            var DayBudget = editcampaigns.DayBudget/100
        }
        if(editcampaigns.StartTime && editcampaigns.EndTime) {
            var startTime = moment(editcampaigns.StartTime).format()
            var endTime = moment(editcampaigns.EndTime).format()
            var rangeDate = [startTime, endTime]
        }
        return (
          <div className='panel panel-default' style={{margin: '10px'}}>
            <div className="panel-heading" style={{overflow: 'hidden'}}>
                <Icon type="form" />&nbsp;&nbsp;<span>基本信息</span>
            </div>
            <div className="panel-body" style={{paddingBottom: '50px'}}>
                <Form field={this.field}>
                    <FormItem
                        label="计划名称："
                        {...formItemLayout}>
                        <Input {...init('campaignName',{
                                    rules: [
                                        {required: true, message: '请填写计划名称'}
                                    ],
                                    initValue: campaignName
                                })} style={{width: '500px'}}/>
                    </FormItem>
                    <FormItem
                        label="每日预算："
                        {...formItemLayout}>
                        <NumberPicker {...init('daycost', {
                                    rules: [
                                        {required: true, message: '请填写每日预算'}
                                    ],
                                    initValue: DayBudget
                                })} min={300} defaultValue={300} step={10} inputWidth={200}/>
                    </FormItem>
                    <FormItem
                        label="RangePicker 范围选择框："
                        {...formItemLayout}
                        required>
                        <RangePicker {...init('rangeDate', {
                                    rules: [
                                        {required: true, message: '请选择投放时间'}
                                    ],
                                    initValue: rangeDate
                                })}/>
                    </FormItem>
                    <FormItem
                        label="投放方式："
                        {...formItemLayout}>
                        <RadioGroup {...init('type', {
                                    rules: [
                                        {required: true, message: '请选择投放方式'}
                                    ],
                                    initValue: SpeedType
                                })} defaultValue='2'>
                            <Radio value="2">均匀投放</Radio>
                            <Radio value="1">尽快投放</Radio>
                        </RadioGroup>
                    </FormItem>
                </Form>
            </div>
           <div className="panel-heading" style={{overflow: 'hidden'}}>
                <Icon type="similar-product" />&nbsp;&nbsp;<span>投放地域</span>
           </div>
           <SetlocationView changeAllArea={this.changeAllArea.bind(this)}
                            allChecked={this.state.allChecked}
                            selectList={this.state.selectList}
                            specailSelect={this.state.specailSelect}
                            areaArr={this.state.areaArr}
                            areaArrs={this.state.areaArrs}
                            areas={this.state.areas}
                            areaobj={this.state.areaobj}
                            setchangeArea={this.changeArea.bind(this)}
                            changeAllSpecailArea={this.changeAllSpecailArea.bind(this)}
                            allCheckedspecail={this.state.allCheckedspecail}
                            specailArr={this.state.specailArr}
                            specailareaArrs={this.state.specailareaArrs}
                            specailareas={this.state.specailareas}
                            specailareasObj={this.state.specailareasObj}
                            setchangeSpecailArea={this.changeSpecailArea.bind(this)}/>
             <div className="panel-heading" style={{overflow: 'hidden'}}>
                <Icon type="clock" />&nbsp;&nbsp;<span>投放时段</span>
            </div>
            <div className="panel-body" style={{paddingBottom: '50px'}}>
                <div style={{marginBottom: '15px'}}>
                    <label style={{marginRight: '10px'}}>
                        <Checkbox style={{opacity: 0}} checked={this.state.allWeekDays} onChange={this.changeAllweekdays.bind(this)}/>
                        <span style={{padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer'}}>周一至周五</span>
                    </label>
                    {
                    hours.map((item, index) => {
                        return (
                            <label key={index}>
                                <Checkbox onChange={this.changeWeekDay.bind(this, item)} style={{opacity: 0}} checked={selectWeekDays.indexOf(item) > -1}
                                defaultChecked={selectWeekDays.indexOf(item) > -1}/>
                                <span style={selectWeekDays.indexOf(item) > -1 ? onLineStyle: defaultStyle}>{item}</span>
                            </label>
                            )
                    })
                }
                </div>
                <div>
                    <label style={{marginRight: '10px'}}>
                        <Checkbox style={{opacity: 0}} checked={this.state.allWeekends} onChange={this.changeAllweekends.bind(this)}/>
                        <span style={{padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer'}}>周六至周日</span>
                    </label>
                    {
                    hours.map((item, index) => {
                        return (
                            <label key={index}>
                                <Checkbox onChange={this.changeWeekends.bind(this, item)} style={{opacity: 0}} checked={selectWeekends.indexOf(item) > -1}
                                defaultChecked={selectWeekends.indexOf(item) > -1}/>
                                <span style={selectWeekends.indexOf(item) > -1 ? onLineStyle: defaultStyle}>{item}</span>
                            </label>
                            )
                    })
                }
                </div>
            </div>
            <div className="panel-footer" style={{overflow: 'hidden', backgroundColor: '#fff'}}>
                <div style={{float: 'right'}}>
                    {
                        editcampaigns.Id
                        ? null
                        : <Link to={createcombination}><Button type="normal" style={{marginRight: '15px'}}>上一步</Button></Link>
                    }
                    <Button type="primary" onClick={this.setClick.bind(this)}>创建计划</Button>
                </div>
            </div>
         </div>
        )
    }
}
export default InfoFromView