import React from 'react';
import Button from 'qnui/lib/button';
import Input from 'qnui/lib/input';
import {Transfer} from 'antd';
import Loading from 'qnui/lib/loading';
class InteresKeywordView extends React.Component {
  renderItem = (item) => {
    console.log(item.Name)
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
      <div style={{marginTop: '15px'}}>
       {
          this.props.keywordData
          ? <Transfer
              dataSource={this.props.keywordData}
              listStyle={{
                width: 400,
                height: 400,
              }}
              titles={['店铺推荐兴趣点', '已选择的兴趣点']}
              targetKeys={this.props.targetkeywordkeys}
              render={item => item.Name}
              operations={['添加', '移除']}
              selectedKeys={this.props.selectkeywordKeys}
              rowKey={record => record.Id}
              onChange={this.props.handlekeywordChange}
              onSelectChange={this.props.handleSelectkeywordChange}
            />

          : <Loading color="#e6e6e6" size="large"  type="basic"/>
        }
      </div>
    )
  }
}

export default InteresKeywordView
