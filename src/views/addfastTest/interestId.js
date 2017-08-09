import React from 'react';
import Button from 'qnui/lib/button';
import Input from 'qnui/lib/input';
import {Transfer} from 'antd';
import Loading from 'qnui/lib/loading';
class InteresIdView extends React.Component {
  renderItem = (item) => {
    const customLabel = (
      <span className="custom-item">
        {item.Name}
      </span>
    );
    return {
      label: customLabel,
      value: item.Id
    }
   }
  render () {
    return (
      <div>
        <div style={{padding: '10px'}}>
          <Input size="large" placeholder="输入单品数字ID"
              value={this.props.ids}
              defaultValue={this.props.ids}
              onChange={this.props.onChangeIds.bind(this)}/>
          <Button type="primary" style={{marginLeft: '15px'}} onClick={this.props.onClickbtn}>确定</Button>
        </div>
        {
          this.props.idsData
          ? <Transfer
              dataSource={this.props.idsData}
              listStyle={{
                width: 400,
                height: 400,
              }}
              titles={['店铺推荐兴趣点', '已选择的兴趣点']}
              targetKeys={this.props.targetIdKeys}
              render={item => item.Name}
              operations={['添加', '移除']}
              selectedKeys={this.props.selectedIdKeys}
              rowKey={record => record.Id}
              onChange={this.props.handleIdsChange}
              onSelectChange={this.props.handleSelectIdsChange}
            />

          : <Loading color="#e6e6e6" size="large"  type="basic"/>
        }
      </div>
    )
  }
}

export default InteresIdView
