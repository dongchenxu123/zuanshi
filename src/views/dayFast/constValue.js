function isNumber(number) {
    return number ==='-' || isNaN(number)
}

function moneyFormatter(number) {
    if(isNumber(number)) {
        return '0'
    }
    if (number % 1 === 0) {
        return number
    } else {
        return number.toFixed(2)
    }
}

function percentFormatter(number) {
    if(isNumber(number)) {
        return '0'
    }
    let num = (number * 100).toFixed(2, 10);
    return num + '%'
}
export const rptLabels = {
    Charge: {
        title: '花费',
        extend: "(元)",
        type: '消耗',
        formatter: (number) => moneyFormatter(number),
        desc: '所有创意在钻石展位资源上被展现/点击后所产生的费用'
    },
    Pv:{
        title: "展现量",
        type: '触达',
        desc: '所有创意在钻石展位资源上被买家看到的次数。注意，虚假展现会被反作弊体系过滤，该数据为反作弊系统过滤后的数据。'
    },
    Click: {
        title: '点击量',
        type: '兴趣',
        desc: '所有创意在钻石展位资源上被买家点击的次数。'
    },
    FavItem: {
        title: "收藏宝贝量",
        type: '行动',
        desc: '通过展现/点击钻石展位创意之后，一段时间周期内，带来的宝贝收藏次数。提供区分3天|7天|15天时间周期的效果。'
    } ,
    FavShop:{
        title: "收藏店铺量",
        type: '行动',
        desc: '通过展现/点击钻石展位创意之后，一段时间周期内，带来的店铺收藏次数。提供区分3天|7天|15天时间周期的效果。'
    }  ,
    CartNum: {
        title: '添加购物车量',
        type: '行动',
        desc: '通过展现/点击钻石展位创意之后，一段时间周期内，带来的添加购物车次数。提供区分3天|7天|15天时间周期的效果。'
    },
    AlipayNum: {
        title: "成交订单量",
        type: '成交',
        desc: '通过展现/点击钻石展位创意之后，一段时间周期内，带来的支付宝成交总订单量。提供区分3天|7天|15天时间周期的效果。'
    },
    AlipayAmt: {
        title: "成交订单金额",
        type: '成交',
        extend: "(元)",
        formatter: (number) => moneyFormatter(number),
        desc: '通过展现/点击钻石展位创意之后，一段时间周期内，带来的支付宝成交总金额。提供区分3天|7天|15天时间周期的效果。'
    },
    Ecpm: {
        title: "千次展现成本",
        type: '衍生指标',
        extend: "(元)",
        formatter: (number) => moneyFormatter(number),
        method:  (obj) => {
            if(!obj.Charge || !obj.Pv) {
                return 0
            }
            return 1000 * obj.Charge / obj.Pv
        },
        desc: '千次展现成本=消耗/（展现/1000），表示创意在每获得1000次展现后所产生的平均费用。'
    },
    Ctr: {
        title: "点击率",
        type: '衍生指标',
        desc: '点击率=点击/展现，可直观表示创意对买家的吸引程度，点击率越高说明创意对买家的吸引程度越大。',
        formatter: (number) => percentFormatter(number),
        method:  (obj) => {
            if(!obj.Click || !obj.Pv) {
                return 0
            }
            return obj.Click / obj.Pv
        },
    },
    Ecpc: {
        title: "点击成本", //点击单价
        type: '衍生指标',
        formatter: (number) => moneyFormatter(number),
        method:  (obj) => {
            if(!obj.Click || !obj.Charge) {
                return 0
            }
            return obj.Charge / obj.Click
        },
        desc: '点击单价=消耗/点击，表示创意在每获得1次点击后所产生的平均费用。'
    },
    Roi: {
        title: "投资回报率",
        type: '衍生指标',
        method: function (obj) {
            if(!obj.Charge || !obj.AlipayAmt) {
                return 0
            }
            return obj.AlipayAmt / obj.Charge
        },
        formatter: (number) => moneyFormatter(number),
        desc: '投资回报率=支付宝总成交金额/消耗，反映有展现/点击行为的用户，在一段时间周期内，带来的累计投入产出比。提供区分3天|7天|15天时间周期的效果。'
    },
    AvgAccessPageNum: {
        title: '访问页面数',
        type: '行动',
    },
    AvgAccessTime: {
        title: '访问时长',
        type: '行动',
    },
    Cvr:{
        title: "点击转化率",
        type: '衍生指标',
        method: function (obj) {
            if(!obj.AlipayNum || !obj.Click) {
                return 0
            }
            return obj.AlipayNum / obj.Click
        },
        formatter: (number) => moneyFormatter(number)
    },
    DeepUv: {
        title: "深度进店量",
        type: '行动',
    },
    GMVAmt: {
        title: "拍下订单金额",
        type: '成交',
    },
    GMVNum: {
        title: "拍下订单量",
        type: '成交',
    },
    Uv: {
        title: "访客数",
        type: '行动',
    },
}