<<<<<<< HEAD
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
      <div>
        <div style={{padding: '10px'}}>
          <Input size="large" placeholder="标签关键词，如大衣"
              value={this.props.keyword}
              defaultValue={this.props.keyword}
              onChange={this.props.onChangeKeywords.bind(this)}/>
          <Button type="primary" style={{marginLeft: '15px'}} onClick={this.props.onClickKeyword}>确定</Button>
        </div>
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
=======
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
>>>>>>> a43b3823b062de6e7da27e692def8042fa1e75a2
