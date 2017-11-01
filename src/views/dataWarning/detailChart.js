<<<<<<< HEAD
import React from 'react';
import axios from 'axios';
import Echarts from '../../components/xbEcharts';
import { Link } from 'react-router-dom';
import { anomalyzerMetricLogs, getanomalyzerMetrics } from '../../help/url';
import moment from 'moment';
const defaultDate = moment().format('YYYY-MM-DD');
const defaultOption = {
    title: {
        text: '指标值/异常概率关系图',
        subtext: '',
        x: 'center'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            animation: false
        }
    },
    legend: {
        data:['指标值','异常概率'],
        x: 'left'
    },
    toolbox: {
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
        }
    },
    axisPointer: {
        link: {xAxisIndex: 'all'}
    },
    grid: [{
        left: 50,
        right: 50,
        height: '35%'
    }, {
        left: 50,
        right: 50,
        top: '55%',
        height: '35%'
    }],
    xAxis: [
        {
            type : 'category',
            boundaryGap : false,
            axisLine: {onZero: true},
            data: []
        },
        {
            gridIndex: 1,
            type : 'category',
            boundaryGap : false,
            axisLine: {onZero: true},
            data: [],
            position: 'top'
        }
    ],
    yAxis : [
        {
            name : '异常概率',
            type : 'value',
            max : 1
        },
        {
            gridIndex: 1,
            name : '指标值',
            type : 'value',
            inverse: true
        }
    ],
    series : [
        {
            name:'异常概率',
            type:'line',
            symbolSize: 8,
            hoverAnimation: false,
            data:[]
        },
        {
            name:'指标值',
            type:'line',
            xAxisIndex: 1,
            yAxisIndex: 1,
            symbolSize: 8,
            hoverAnimation: false,
            data: []
        }
    ]
};
const styleDt={
    float: "left",
    width: 160,
    overflow: "hidden",
    clear: 'left',
    textAlign: 'right',
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: 700,
    lineHeight: 1.5
}
const styleDD = {
        marginLeft: "180px",
        lineHeight: 1.5
}
class DetailChartView extends React.Component {
  constructor(){
        super()
        this.state = {
            metric_id: null,
            startDate: defaultDate + " 00:00:00",
            chartOption: defaultOption,
            metric_id: 0,
            metricList: [],
            metricObj: {}
        }
    }
    timerId = null
    cancelablePromise = null
  componentWillMount () {
    var metric_id = this.props.match.params.id
    var self = this
    axios.post(getanomalyzerMetrics, {
      metric_id: metric_id
    })
    .then(function (response) {
      var metricObj = response.data.metrics[0]
      self.setState({
        metricObj: metricObj
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  getDetail() {
        const self = this;
        const { startDate } = this.state;
        const metric_id = this.props.match.params.id
        // const { match } = this.props;
       let now = moment().format("YYYY-MM-DD HH:mm:ss")
       if (!metric_id) {

       }
       axios.post(anomalyzerMetricLogs, {
         metric_id: metric_id,
         start_time: startDate
       })
       .then(function (response) {
         var metricList = response.data.metric_logs
         self.seralGridData(metricList, now)
         self.setState({
           metricList: response.data.metric_logs,
           metric_id: metric_id
         })
       })
       .catch(function (error) {
         console.log(error);
       });
    }
    seralGridData(data, now) {
      let timeDate = [];
      let metric_val=[];
      let probArr=[];
      if (data.length > 0) {
          data.forEach((item) => {
              let time = moment(item.record_on).format("HH:mm");
              timeDate.push(time)
              metric_val.push(item.metric_val);
              probArr.push(item.prob)
          });
          let oldOpt = this.state.chartOption;
          let chartOption=Object.assign({}, oldOpt,
              {xAxis: [
                  {
                      type : 'category',
                      boundaryGap : false,
                      axisLine: {onZero: true},
                      data: oldOpt.xAxis[0].data.concat(timeDate)
                  },
                  {
                      gridIndex: 1,
                      type : 'category',
                      boundaryGap : false,
                      axisLine: {onZero: true},
                      data:oldOpt.xAxis[1].data.concat(timeDate),
                      position: 'top'
                  }
              ],
              series : [
                  {
                      name:'异常概率',
                      type:'line',
                      symbolSize: 8,
                      hoverAnimation: false,
                      data: oldOpt.series[0].data.concat(probArr)
                  },
                  {
                      name:'指标值',
                      type:'line',
                      xAxisIndex: 1,
                      yAxisIndex: 1,
                      symbolSize: 8,
                      hoverAnimation: false,
                      data: oldOpt.series[1].data.concat(metric_val)
                  }
              ]
          })

          this.setState({
              startDate: now,
              chartOption: chartOption
          })
        }
      }
  componentDidMount() {
    this.getDetail()
    this.timerID = setInterval(() => {
        this.getDetail()
    }, 3000);
  }
  componentWillUnmount() {
        this.setState({
            chartOption: defaultOption
        })
        clearInterval(this.timerID);
    }
  render () {
    let metric_item = this.state.metricObj
    return (
      <div className='panel panel-default' style={{margin: '10px'}}>
        <div className="panel-heading"><Link to='/dataWarn' style={{color: '#333'}}>监控列表</Link>&nbsp; / &nbsp;<span style={{fontWeight: 'bold'}}>监控详情</span></div>
        <div className="panel-body">
          <Echarts style={{height: 600}} option={this.state.chartOption} notMerge={true}/>
           {
             metric_item ? this.renderMetricItem() : null
           }
        </div>
      </div>
    )
  }
  renderMetricItem() {
      let metricList = this.state.metricList
      let metric_item = this.state.metricObj
      return (
          <div style={{marginBottom: 16, paddingBottom: 16, borderBottom:'solid 1px #ececec'}}>
              <h3 style={{marginLeft: 100}}>{metric_item.metric_name}</h3>
              <dl>
                <dt style={styleDt}>监控间隔：</dt><dd style={styleDD}>{metric_item.check_interval} 秒</dd>
                <dt style={styleDt}>创建时间：</dt><dd style={styleDD}>{metric_item.updated_at}</dd>
                <dt style={styleDt}>参数：</dt>
                <dd style={styleDD}>
                    异常阀值: {(metric_item.threshold*1).toFixed(0)} &nbsp;
                    敏感度: {(metric_item.sensitivity*1).toFixed(1)} &nbsp;
                    上阀值: {(metric_item.upper_bound*1).toFixed(0)} &nbsp;
                    下阀值: {(metric_item.lower_bound*1).toFixed(0)}
                </dd>
              </dl>
          </div>
        )
    }
}

export default DetailChartView
=======
import React from 'react';
import axios from 'axios';
import Echarts from '../../components/xbEcharts';
import { Link } from 'react-router-dom';
import { anomalyzerMetricLogs, getanomalyzerMetrics } from '../../help/url';
import moment from 'moment';
const defaultDate = moment().format('YYYY-MM-DD');
const defaultOption = {
    title: {
        text: '指标值/异常概率关系图',
        subtext: '',
        x: 'center'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            animation: false
        }
    },
    legend: {
        data:['指标值','异常概率'],
        x: 'left'
    },
    toolbox: {
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
        }
    },
    axisPointer: {
        link: {xAxisIndex: 'all'}
    },
    grid: [{
        left: 50,
        right: 50,
        height: '35%'
    }, {
        left: 50,
        right: 50,
        top: '55%',
        height: '35%'
    }],
    xAxis: [
        {
            type : 'category',
            boundaryGap : false,
            axisLine: {onZero: true},
            data: []
        },
        {
            gridIndex: 1,
            type : 'category',
            boundaryGap : false,
            axisLine: {onZero: true},
            data: [],
            position: 'top'
        }
    ],
    yAxis : [
        {
            name : '异常概率',
            type : 'value',
            max : 1
        },
        {
            gridIndex: 1,
            name : '指标值',
            type : 'value',
            inverse: true
        }
    ],
    series : [
        {
            name:'异常概率',
            type:'line',
            symbolSize: 8,
            hoverAnimation: false,
            data:[]
        },
        {
            name:'指标值',
            type:'line',
            xAxisIndex: 1,
            yAxisIndex: 1,
            symbolSize: 8,
            hoverAnimation: false,
            data: []
        }
    ]
};
const styleDt={
    float: "left",
    width: 160,
    overflow: "hidden",
    clear: 'left',
    textAlign: 'right',
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: 700,
    lineHeight: 1.5
}
const styleDD = {
        marginLeft: "180px",
        lineHeight: 1.5
}
class DetailChartView extends React.Component {
  constructor(){
        super()
        this.state = {
            metric_id: null,
            startDate: defaultDate + " 00:00:00",
            chartOption: defaultOption,
            metric_id: 0,
            metricList: [],
            metricObj: {}
        }
    }
    timerId = null
    cancelablePromise = null
  componentWillMount () {
    var metric_id = this.props.match.params.id
    var self = this
    axios.post(getanomalyzerMetrics, {
      metric_id: metric_id
    })
    .then(function (response) {
      var metricObj = response.data.metrics[0]
      self.setState({
        metricObj: metricObj
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  getDetail() {
        const self = this;
        const { startDate } = this.state;
        const metric_id = this.props.match.params.id
        // const { match } = this.props;
       let now = moment().format("YYYY-MM-DD HH:mm:ss")
       if (!metric_id) {

       }
       axios.post(anomalyzerMetricLogs, {
         metric_id: metric_id,
         start_time: startDate
       })
       .then(function (response) {
         var metricList = response.data.metric_logs
         self.seralGridData(metricList, now)
         self.setState({
           metricList: response.data.metric_logs,
           metric_id: metric_id
         })
       })
       .catch(function (error) {
         console.log(error);
       });
    }
    seralGridData(data, now) {
      let timeDate = [];
      let metric_val=[];
      let probArr=[];
      if (data.length > 0) {
          data.forEach((item) => {
              let time = moment(item.record_on).format("HH:mm");
              timeDate.push(time)
              metric_val.push(item.metric_val);
              probArr.push(item.prob)
          });
          let oldOpt = this.state.chartOption;
          let chartOption=Object.assign({}, oldOpt,
              {xAxis: [
                  {
                      type : 'category',
                      boundaryGap : false,
                      axisLine: {onZero: true},
                      data: oldOpt.xAxis[0].data.concat(timeDate)
                  },
                  {
                      gridIndex: 1,
                      type : 'category',
                      boundaryGap : false,
                      axisLine: {onZero: true},
                      data:oldOpt.xAxis[1].data.concat(timeDate),
                      position: 'top'
                  }
              ],
              series : [
                  {
                      name:'异常概率',
                      type:'line',
                      symbolSize: 8,
                      hoverAnimation: false,
                      data: oldOpt.series[0].data.concat(probArr)
                  },
                  {
                      name:'指标值',
                      type:'line',
                      xAxisIndex: 1,
                      yAxisIndex: 1,
                      symbolSize: 8,
                      hoverAnimation: false,
                      data: oldOpt.series[1].data.concat(metric_val)
                  }
              ]
          })

          this.setState({
              startDate: now,
              chartOption: chartOption
          })
        }
      }
  componentDidMount() {
    this.getDetail()
    this.timerID = setInterval(() => {
        this.getDetail()
    }, 3000);
  }
  componentWillUnmount() {
        this.setState({
            chartOption: defaultOption
        })
        clearInterval(this.timerID);
    }
  render () {
    let metric_item = this.state.metricObj
    return (
      <div className='panel panel-default' style={{margin: '10px'}}>
        <div className="panel-heading" style={{fontSize: '14px'}}><Link to='/dataWarn' style={{color: '#4d7fff'}}>监控列表</Link>&nbsp; / &nbsp;<span>监控详情</span></div>
        <div className="panel-body">
          <Echarts style={{height: 600}} option={this.state.chartOption} notMerge={true}/>
           {
             metric_item ? this.renderMetricItem() : null
           }
        </div>
      </div>
    )
  }
  renderMetricItem() {
      let metricList = this.state.metricList
      let metric_item = this.state.metricObj
      return (
          <div style={{marginBottom: 16, paddingBottom: 16, borderBottom:'solid 1px #ececec'}}>
              <h3 style={{marginLeft: 100}}>{metric_item.metric_name}</h3>
              <dl>
                <dt style={styleDt}>监控间隔：</dt><dd style={styleDD}>{metric_item.check_interval} 秒</dd>
                <dt style={styleDt}>创建时间：</dt><dd style={styleDD}>{metric_item.updated_at}</dd>
                <dt style={styleDt}>参数：</dt>
                <dd style={styleDD}>
                    异常阀值: {(metric_item.threshold*1).toFixed(0)} &nbsp;
                    敏感度: {(metric_item.sensitivity*1).toFixed(1)} &nbsp;
                    上阀值: {(metric_item.upper_bound*1).toFixed(0)} &nbsp;
                    下阀值: {(metric_item.lower_bound*1).toFixed(0)}
                </dd>
              </dl>
          </div>
        )
    }
}

export default DetailChartView
>>>>>>> a43b3823b062de6e7da27e692def8042fa1e75a2
