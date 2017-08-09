import React from 'react';
import { Row, Col } from 'qnui/lib/grid';
import Select, {Option} from 'qnui/lib/select';
import Button from 'qnui/lib/button';
import Table from 'qnui/lib/table';
import Icon from 'qnui/lib/icon';
import Loading from 'qnui/lib/loading';
class ResourcesBody extends React.Component {
	render () {
		return (
		 <div>
       {/*<Row className="demo-row" style={{marginBottom: '8px'}}>
       <Col span="16">
         <Row className="demo-row">
              <Col span="4">
                <div className="demo-col-inset">
                  <Select placeholder="全部类型" size='large' onChange={this.props.onSelectType}>
                    <Option value="">全部类型</Option>
                    <Option value="2">图片</Option>
                    <Option value="3">Flash</Option>
										<Option value="5">文字链</Option>
										<Option value="9">Flash不遮盖</Option>
										<Option value="10">创意模板</Option>
                  </Select>
                </div>
              </Col>
              <Col span="4">
                <div className="demo-col-inset">
									<Select placeholder="选择尺寸" size='large' onChange={this.props.onSelectSizes}>
									{
										this.props.picSizeData
										? this.props.picSizeData.map((item, index) =>{
											return (<Option value={item} key={index}>{item}</Option>)
		                })
										: <Loading color="#e6e6e6" size="large"  type="basic"/>
									}
                  </Select>
                </div>
              </Col>
          </Row>
        </Col>
      </Row>*/}
       {
         this.props.data
         ?
         <Table dataSource={this.props.data}
                      rowSelection={this.props.rowSelection}
											primaryKey='Id'>
           <Table.Column cell={this.props.renderAdvType} width={200} title="资源位"/>
					 <Table.Column cell={this.props.renderMediaType} width={200} title="媒体类型"/>
           <Table.Column title="资源位等级" width={200} cell={this.props.renderadzoneLevel}/>
           <Table.Column title="资源位名称" width={200} dataIndex='Name'/>
           <Table.Column title="创意类型列表" width={200} cell={this.props.renderadFormatList}/>
           <Table.Column title="资源位尺寸列表" width={200} cell={this.props.renderadSizes}/>
        </Table>
         : <div style={{margin: '50px auto', textAlign: 'center', clear: 'both'}}>
             <p>暂获取不到数据</p>
           </div>
       }
		 </div>
				)


	}
}


export default ResourcesBody;
