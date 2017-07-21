/**
 * Created by CY on 2017/7/5.
 */
import React from 'react'
import { rptLabels } from './constValue'

const rptLabelsKeys = Object.keys(rptLabels);

const  tableColumns = rptLabelsKeys.reduce((merge, current, index) => {
    let opt = rptLabels[current];
    let obj = {
        width: 80,
        key: opt.title + (opt.extend || ''),
        title: opt.title + (opt.extend || ''),
        dataIndex: `Rpt.${current}`,
        sorter: (a, b) => {
            let av = 'Rpt' in a && current in a['Rpt'] ? a['Rpt'][current] : 0;
            let bv = 'Rpt' in b && current in b['Rpt'] ? b['Rpt'][current] : 0;
            return av - bv
        }
    };
    /*if (index < 2) {
        obj = {...obj, fixed: 'left'}
    }*/
    if ('formatter' in opt){
        obj.render = (text, record) => {
            let show = opt.formatter(record['Rpt'] && record['Rpt'][current]);
            return(
                <span> {show}</span>
            )
        }
    } else {
        obj.render = (text, record) => {
            if (!record['Rpt'] || !record['Rpt'][current]){
                return <span>0</span>
            } else {
                return <span> { record['Rpt'][current] }</span>
            }
        }
    }
    merge.push(obj);
    return merge
}, []);

export default tableColumns
