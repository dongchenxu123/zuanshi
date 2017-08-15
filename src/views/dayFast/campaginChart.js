import React from 'react';
import axios from 'axios';
import Echarts from '../../components/xbEcharts';
import moment from 'moment';
import Select, {Option} from 'qnui/lib/select';
import { rptLabels } from './constValue';
const formaterDate="YYYY-MM-DD";
const Hours = Array.from({length:24},(v,i) => i + '点')
const defaultOption  = {
    /*title: {
        text: '报表'
    },*/
    tooltip: {
        trigger: 'axis'
    },

    xAxis:  {
        type: 'category',
        boundaryGap: false,
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: [
    ]
};

class CampaginChartView extends React.Component {
  constructor () {
    super()
    this.state={
      chartType: 'Pv'
    }
  }
  handleChartsChange = (chartType) => {
      this.setState({
          chartType
        })
    }
   render() {
        const { dataSource } = this.props;
        let obj = {};
        let xAxis=[];
        let hourlyData={}
        if(dataSource == null) {
           return null
        }
        if( dataSource && dataSource.length > 0 ) {
          hourlyData = 'HourId' in dataSource[0];
        }
        if (hourlyData) {
          for (let i=0; i< 24; i++) {
                xAxis.push(i + '点');
                for(let prop in rptLabels) {
                    if (!obj[prop]) {
                        obj[prop] = []
                    }
                    obj[prop].push(0);
                }
            }
            for(let i=0; i < dataSource.length; i++) {
                let item = dataSource[i];
                for(let prop in item) {
                        if (prop in obj) {
                            obj[prop][item.HourId] = item[prop]
                        }
                }
            }
        }else{
            let days = [];
            let logdays = moment(this.props.firstlogDate).format(formaterDate);
            let toDays = moment(this.props.nextlogDate).format(formaterDate);
            let curday = logdays;
            obj = {};
            while(true) {
                days.push(curday);
                curday = moment(curday).add(1, 'days').format(formaterDate);
                if(curday === toDays) {
                    days.push(curday);
                    break
                }
            }
            let mapData = {}
            for(let i=0; i < dataSource.length; i++) {
                let item = dataSource[i];
                for(let prop in item) {
                    let day = moment(item.LogDate).format(formaterDate);
                    if (!mapData[prop]) {
                        mapData[prop] = {};
                    }
                    mapData[prop][day] = item[prop]
                }
            }
            for(let j = 0; j<days.length; j++) {
                for(let prop in rptLabels) {
                    if (!obj[prop]) {
                        obj[prop] = []
                    }
                    if (prop in mapData && days[j] in mapData[prop]) {
                        let data = mapData[prop][days[j]];
                        obj[prop].push(data);
                    }else{
                        obj[prop].push(0);
                    }
                }
            }
           xAxis = days;
        }
        let selectType = null;
        if(hourlyData) {
            selectType = ['兴趣', '消耗', "触达"]
        }
        let selectData = [];
        for(let prop in rptLabels) {
            if (selectType && selectType.indexOf(rptLabels[prop].type) > -1 || !selectType) {
                selectData.push({...rptLabels[prop], key: prop})
            }
        }
        const chartOption = {
            ...defaultOption,
            xAxis: {...defaultOption.xAxis, data: xAxis},
            series: [
                {
                    name: rptLabels[this.state.chartType]['title'],
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        normal : {
                            color:'#4d7fff',
                            lineStyle:{
                                color:'#4d7fff'
                            }
                        }
                    },
                    data: obj[this.state.chartType]
                }
            ]
        };
        return(
            <div>
                <div style={{marginTop: '30px'}}>
                    <Select
                        defaultValue={this.state.chartType}
                        style={{ width: "200px" }}
                        onChange={this.handleChartsChange}
                    >
                        {
                            selectData.map(sel => {
                                return (
                                    <Option key={sel.key} value={sel.key}> {sel.title} </Option>
                                )
                            })
                        }
                    </Select>
                </div>
                <Echarts style={{height: 300}} option={chartOption} notMerge={true}/>
            </div>
        )
    }
}

export default CampaginChartView
