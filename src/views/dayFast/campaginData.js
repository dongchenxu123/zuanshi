import React from 'react';
import { Row, Col } from 'qnui/lib/grid';
class CampaginDataView extends React.Component {
    render () {
        return (
            <div>
               <Row className="demo-row">
                    <Col span="4">
                        <div>
                            <span style={{color: '#999'}}>展现量</span><br/>
                            <span></span>
                        </div>
                    </Col>
                   <Col span="4">
                        <div>
                            <span>点击量</span><br/>
                            <span></span>
                        </div>
                    </Col>
                    <Col span="4">
                        <div>
                            <span>点击率</span><br/>
                            <span></span>
                        </div>
                    </Col>
                    <Col span="4">
                        <div>
                            <span>千次展现成本</span><br/>
                            <span></span>
                        </div>
                    </Col>
                    <Col span="4">
                        <div>
                            <span>点击单价</span><br/>
                            <span></span>
                        </div>
                    </Col>
                    <Col span="4">
                        <div>
                            <span>消耗</span><br/>
                            <span></span>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CampaginDataView