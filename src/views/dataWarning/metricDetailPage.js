import React, { Component } from 'react';
import Echarts from '../../components/xbEcharts';

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
