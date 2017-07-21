import React from 'react';
import { Row, Col } from 'qnui/lib/grid';
class CampaginDataView extends React.Component {
    render () {
        var compaginRpt = this.props.compaginRpt
        return (
            <div style={{marginTop: '15px'}}>
               <Row className="demo-row">
                    <Col span="4">
                        <div>
                            <span style={{color: '#999'}}>展现量</span><br/>
                            <span style={{fontSize: '20px', fontWeight: 700}}>{compaginRpt.length > 0 ? compaginRpt[0].Pv : '-'}</span>
                        </div>
                    </Col>
                   <Col span="4">
                        <div>
                            <span>点击量</span><br/>
                            <span style={{fontSize: '20px', fontWeight: 700}}>{compaginRpt.length > 0 ? compaginRpt[0].Click : '-'}</span>
                        </div>
                    </Col>
                    <Col span="4">
                        <div>
                            <span>点击率</span><br/>
                            <span style={{fontSize: '20px', fontWeight: 700}}>
                                {compaginRpt.length > 0
                                 ? <span>
                                    {(compaginRpt[0].Ctr*100).toFixed(2)}
                                    <span style={{paddingLeft: '5px', fontSize: '12px', fontWeight: 'normal', color: '#999'}}>%</span>
                                   </span>
                                 : '-'
                                }
                            </span>
                        </div>
                    </Col>
                    <Col span="4">
                        <div>
                            <span>千次展现成本</span><br/>
                            <span style={{fontSize: '20px', fontWeight: 700}}>
                            {compaginRpt.length > 0
                                 ? <span>
                                    {(compaginRpt[0].Ecpm).toFixed(2)}
                                    <span style={{paddingLeft: '5px', fontSize: '12px', fontWeight: 'normal', color: '#999'}}>元</span>
                                   </span>
                                 : '-'
                                }
                            </span>
                        </div>
                    </Col>
                    <Col span="4">
                        <div>
                            <span>点击单价</span><br/>
                            <span style={{fontSize: '20px', fontWeight: 700}}>
                            {compaginRpt.length > 0
                                 ? <span>
                                    {(compaginRpt[0].Ecpc).toFixed(2)}
                                    <span style={{paddingLeft: '5px', fontSize: '12px', fontWeight: 'normal', color: '#999'}}>元</span>
                                   </span>
                                 : '-'
                                }
                            </span>
                        </div>
                    </Col>
                    <Col span="4">
                        <div>
                            <span>消耗</span><br/>
                            <span style={{fontSize: '20px', fontWeight: 700}}>
                            {compaginRpt.length > 0
                                 ? <span>
                                    {(compaginRpt[0].Charge).toFixed(2)}
                                    <span style={{paddingLeft: '5px', fontSize: '12px', fontWeight: 'normal', color: '#999'}}>元</span>
                                   </span>
                                 : '-'
                                }
                            </span>
                        </div>
                    </Col>
                </Row>
                <Row className="demo-row" style={{marginTop: '20px'}}>
                    <Col span="4">
                        <div>
                            <span style={{color: '#999'}}>收藏宝贝量</span><br/>
                            <span style={{fontSize: '20px', fontWeight: 700}}>{compaginRpt.length > 0 ? compaginRpt[0].FavItem : '-'}</span>
                        </div>
                    </Col>
                   <Col span="4">
                        <div>
                            <span>收藏店铺量</span><br/>
                            <span style={{fontSize: '20px', fontWeight: 700}}>{compaginRpt.length > 0 ? compaginRpt[0].FavShop : '-'}</span>
                        </div>
                    </Col>
                    <Col span="4">
                        <div>
                            <span>添加购物车量</span><br/>
                            <span style={{fontSize: '20px', fontWeight: 700}}>
                                {compaginRpt.length > 0
                                 ? <span>
                                    {compaginRpt[0].CartNum}
                                   </span>
                                 : '-'
                                }
                            </span>
                        </div>
                    </Col>
                    <Col span="4">
                        <div>
                            <span>成交订单量</span><br/>
                            <span style={{fontSize: '20px', fontWeight: 700}}>
                            {compaginRpt.length > 0
                                 ? <span>
                                    {compaginRpt[0].AlipayNum}
                                   </span>
                                 : '-'
                                }
                            </span>
                        </div>
                    </Col>
                    <Col span="4">
                        <div>
                            <span>成交订单金额</span><br/>
                            <span style={{fontSize: '20px', fontWeight: 700}}>
                            {compaginRpt.length > 0
                                 ? <span>
                                    {(compaginRpt[0].AlipayAmt).toFixed(0)}
                                    <span style={{paddingLeft: '5px', fontSize: '12px', fontWeight: 'normal', color: '#999'}}>元</span>
                                   </span>
                                 : '-'
                                }
                            </span>
                        </div>
                    </Col>
                    <Col span="4">
                        <div>
                            <span>投资回报率</span><br/>
                            <span style={{fontSize: '20px', fontWeight: 700}}>
                            {compaginRpt.length > 0
                                 ? <span>
                                    {(compaginRpt[0].Roi).toFixed(2)}
                                   </span>
                                 : '-'
                                }
                            </span>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CampaginDataView