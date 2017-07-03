import React, { Component } from 'react';
import Time24Item from './time24Item'
import '../../styles/time24.css'
function genArray(length) {
    return  Array.from({length:length}, (v,i) => i)
}
const weekLocal = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
const hours = genArray(24);
const weeks = genArray(7).reduce((prev, cur) => {
    let obj = {
        [`d${cur}`]:{
            data: [...hours],
            select:{},
            title: weekLocal[cur]
        }
    }
    return {...prev, ...obj}
}, {});

class Time24 extends Component{
    constructor(props){
        super(props)
        const value = this.props.defaultValue ? this.props.defaultValue : [];
        let selectWeeks = this.seralSelectHours(value);
        let defaultWeeks = {}
        selectWeeks.weeks.forEach(week => {
            defaultWeeks[week]= {
                ...weeks[week],
                select: selectWeeks.select[week]
            }
        })
        this.state = {
            weeks: {...weeks, ...defaultWeeks}
        }
    }
    seralSelectHours(weeks){
        let weekKeys = Object.keys(weeks);
        let newWeeks = {};
        weekKeys.forEach(week => {
            let weekData = weeks[week];
            let select={}
            for(let i = 0; i < weekData.length; i++) {
                select[weekData[i]] = true
            }
            newWeeks[week] = select
        })
        return {select:newWeeks, weeks: weekKeys}
    }
    componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
            const value = nextProps.value;
            let selectWeeks = this.seralSelectHours(value);
            let defaultWeeks = {}
            selectWeeks.weeks.forEach(week => {
                defaultWeeks[week]= {
                    ...weeks[week],
                    select: selectWeeks.select[week]
                }
            })
            this.setState({
                weeks: {...weeks, ...defaultWeeks}
            })
        }
    }
    handleChange(event, weekday, hourIdx) {
        let isChecked = event.target.checked;
        let weekdayData = this.state.weeks['d' + weekday];
        let select = weekdayData.select;
        //{select: {0: true, 1: true}}
        let newSelect = Object.assign({}, select, {[hourIdx]: isChecked})
        let obj = {
            ['d' + weekday]: Object.assign({}, weekdayData, {select: newSelect})
        }
        let newweeks = Object.assign({}, this.state.weeks, obj)
        this.setState({
            weeks:newweeks
        })
        this.triggerChange(newweeks)
    }
    triggerChange(newweeks) {
        let weekKeys = Object.keys(newweeks);
        let obj = {};
        weekKeys.forEach(week => {
            let select = newweeks[week].select;
            let selectKeys = Object.keys(select);
            let keys = [];
            selectKeys.forEach(skey => {
                if (select[skey]) {
                    keys.push(skey)
                }
            })
            if (keys.length > 0) {
                obj[week] = keys.map(item => parseInt(item, 10))
            }
        })
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(obj)
        }
    }
    weekTitleClick(week) {
        let weekday = 'd' + week;
        let weekData =this.state.weeks[weekday];
        let select = weekData["select"];
        let weekdayData = weekData["data"]

        if (Object.keys(select).length === 24) {
            select = {}
        } else {
            select = {};
            //let weekdata =  this.state.weeks[weekday]["data"];
            weekdayData.forEach(hour => {
                select[hour] = true
            })
        }
        let obj = {
            [weekday]: Object.assign({}, weekData, {select: select})
        }
        let newweeks = Object.assign({}, this.state.weeks, obj)
        this.setState({
            weeks:newweeks
        })
        this.triggerChange(newweeks)
    }
    render(){
        let { weeks } = this.state;
        let weeksArr = Object.keys(weeks);
        let weeksEl = [];
        weeksArr.forEach((week, weekIdx) => {
            let weekdata = weeks[week];
            let hours = weekdata.data;
            let selectHours = weekdata.select;
            weeksEl.push(
                <div className="weekday" key={'week-'+weekIdx}>
                    <span onClick={() => this.weekTitleClick(weekIdx)} style={{whiteSpace: "NOWRAP", cursor:"pointer"}}>{weekdata.title}&nbsp;</span>
                    {
                        hours.map((hour, hourIdx) => {
                            let defaultChecked = false
                            if (selectHours[hour]) {
                                defaultChecked = selectHours[hour]
                            }
                            return (
                                <Time24Item
                                    key={`${weekIdx}-${hourIdx}`}
                                    onChange={(event) => this.handleChange(event, weekIdx, hourIdx)}
                                    defaultChecked={defaultChecked} text={hour}
                                    checked={defaultChecked}
                                />
                            )
                        })
                    }
                </div>
            )
        })
        return(
            <div>
                {weeksEl.slice(0)}
            </div>
        )
    }
}

export default Time24
