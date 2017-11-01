<<<<<<< HEAD
import React from 'react';
import Button from 'qnui/lib/button';
import Input from 'qnui/lib/input';
import {Transfer} from 'antd';

import Loading from 'qnui/lib/loading';
class InterestoreView extends React.Component {
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
          <Input size="large" placeholder="店铺昵称"
              value={this.props.nickName}
              defaultValue={this.props.nickName}
              onChange={this.props.onChangeText.bind(this)}/>
          <Button type="primary" style={{marginLeft: '15px'}} onClick={this.props.onClickbtn}>确定</Button>
        </div>
        {
          this.props.nickNameData
          ? <Transfer
              dataSource={this.props.nickNameData}
              listStyle={{
                width: 400,
                height: 400,
              }}
              titles={['店铺推荐兴趣点', '已选择的兴趣点']}
              targetKeys={this.props.targetKeys}
              render={item => item.Name}
              operations={['添加', '移除']}
              selectedKeys={this.props.selectedKeys}
              rowKey={record => record.Id}
              onChange={this.props.onChangeNick}
              onSelectChange={this.props.onSelectChange}
            />

          : <Loading color="#e6e6e6" size="large"  type="basic"/>
        }
      </div>
    )
  }
}

export default InterestoreView
=======
import React from 'react';
import Button from 'qnui/lib/button';
import Input from 'qnui/lib/input';
import {Transfer} from 'antd';

import Loading from 'qnui/lib/loading';
class InterestoreView extends React.Component {
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
          <Input size="large" placeholder="店铺昵称"
              value={this.props.nickName}
              defaultValue={this.props.nickName}
              onChange={this.props.onChangeText.bind(this)}/>
          <Button type="primary" style={{marginLeft: '15px'}} onClick={this.props.onClickbtn}>确定</Button>
        </div>
        {
          this.props.nickNameData
          ? <Transfer
              dataSource={this.props.nickNameData}
              listStyle={{
                width: 400,
                height: 400,
              }}
              titles={['店铺推荐兴趣点', '已选择的兴趣点']}
              targetKeys={this.props.targetKeys}
              render={item => item.Name}
              operations={['添加', '移除']}
              selectedKeys={this.props.selectedKeys}
              rowKey={record => record.Id}
              onChange={this.props.onChangeNick}
              onSelectChange={this.props.onSelectChange}
            />

          : <Loading color="#e6e6e6" size="large"  type="basic"/>
        }
      </div>
    )
  }
}

export default InterestoreView
>>>>>>> a43b3823b062de6e7da27e692def8042fa1e75a2
