import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
 } from 'react-router-dom'
import createHistory from 'history/createHashHistory'
import { homeUrl,fastList,userUrl,loginUrl } from '../help/linkUrl';
import {getUsers} from '../help/url';
import axios from 'axios';
import '../styles/footer.css';
import Button from 'qnui/lib/button';
const history = createHistory()
import {routes} from '../routes/index'
const ButtonGroup = Button.Group;
var url = history.location.search;
var pathname = history.location.pathname
if (url.indexOf('qianniupc') > -1) {
  localStorage.setItem("url", url)
}
if (pathname.indexOf('/add/fast') > -1) {
  history.push('/add/fast/1')
}
if (pathname.indexOf('/dayTest') > -1 && pathname.indexOf('/dayTest/home') < 0) {
  history.push('/dayTest/createCampaign')
}
var newurl = localStorage.getItem('url')
class HomeLayout extends React.Component {
  constructor () {
    super ()
    this.state={
      loginData: {}
    }
  }
  linkchart () {
    QN.application.invoke({
            cmd: 'openChat',
            param: {
                nick: 'tp_喜宝:客户经理7'
            }
        });
  }
//  componentWillMount () {
//     var self = this
//     axios.get(getUsers)
//     .then(function (response) {
//       if(response.data.res == null && newurl != '?source=qianniupc') {
//         location.href='/login'
//       }
//       self.setState({
//         loginData: response.data.res
//       })
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//   }
	render() {
    let browsername = ''
    if(process.env.NODE_ENV === 'production'){
      browsername = '/'
    } else{
      browsername = '_dev/dsp/site'
    }
    var imgUrl = 'https://img.alicdn.com/imgextra/i1/669952568/TB2kH86aZPRfKJjSZFOXXbKEVXa_!!669952568.png'
    return (
	     <div className='home'>
         <Router basename={browsername} history={history}>
            <div>
                <div style={{overflow: 'hidden'}}>
                      <Link to={homeUrl} style={{float: 'left'}}><img src={imgUrl} style={{height: '55px', margin: '20px 15px 5px 15px'}}/></Link>
                      <Link to={userUrl} style={{float: 'right',height: '55px',lineHeight: '55px', margin: '20px 15px 5px 15px'}}><Button>用户中心</Button></Link>
                </div>
               {routes.map((route, index) => (
    	            	<Route key={index} exact={route.exact} path={route.path} render={props => (
                      <route.component {...props} routes={route.routes}/>
                    )} />
    	            ))}
            </div>
         </Router>
         <div className="footer">
            <div className=' text-center'>
              <div className='clearfix text-center'>
                  <a style={{fontSize: '14px', color: '#108ee9',paddingBottom: '10px'}} onClick={this.linkchart.bind(this)}> tp_喜宝:客户经理7</a>
              </div>
              <div className=''>
                <span style={{color: '#333'}}>联系电话: 400-0690170</span>
              </div>
            </div>
          </div>
         </div>

		)
	}
}


export default HomeLayout
