/**
 * Created by CY on 2016/1/22.
 */
import React, {PropTypes} from 'react'
import Form from 'qnui/lib/form';
import Input from 'qnui/lib/input';
import axios from 'axios';
import {login, getUsers} from '../help/url';
import Button from 'qnui/lib/button';
import Field from 'qnui/lib/field';
const FormItem = Form.Item;

export class LoginView extends React.Component {
  field = new Field(this);
  constructor () {
    super()
  }
  
  handleSubmit (e) {
    e.preventDefault();
    this.field.validate((errors, values) => {
        if (errors) {
            console.log('Errors in form!!!');
            return;
        }
        var self = this
        axios.post(login, {
          uname: values.userName,
          passwd: values.passwd
        })
        .then(function (response) {
          console.log(response);
        })
        console.log('Submit!!!');
        console.log(values);
    });
  }
  render () {
    const init = this.field.init;
    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };
    var imgUrl = 'https://img.alicdn.com/imgextra/i1/669952568/TB2kH86aZPRfKJjSZFOXXbKEVXa_!!669952568.png'
    return (
      <div className='container' style={{paddingTop: '100px'}}>
        <div style={{textAlign: 'center', paddingBottom: 50}}>
           <img src={imgUrl} style={{margin: '100px 0 20px 0'}}/>
           <Form field={this.field}>
            <FormItem {...formItemLayout} label="用户名: ">
              <Input placeholder="请输入账户名" id="userName" name="userName" {...init('userName', {
                            rules: [
                                {required: true, message: '请填写用户名'}
                            ],
                        })}/>
            </FormItem>
            <FormItem {...formItemLayout} label="密码: ">
              <Input placeholder="请输入密码" id="userName" name="userName" htmlType="password" {...init('passwd', {
                            rules: [
                                {required: true, message: '请填写密码'}
                            ],
                        })}/>
            </FormItem>
            <FormItem
                wrapperCol={{ span: 16}}>
                <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
            </FormItem>
           </Form>
        </div>
      </div>
    )
  }
}
/*LoginView.propType = {
  loginAction: PropTypes.func.isRequired
}*/



export default LoginView
