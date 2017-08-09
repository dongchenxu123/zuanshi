import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
 } from 'react-router-dom'
import createHistory from 'history/createHashHistory'
import { homeUrl,fastList,userUrl } from '../help/linkUrl';
import '../styles/footer.css';
import Button from 'qnui/lib/button';
const history = createHistory()
import {routes} from '../routes/index'
const ButtonGroup = Button.Group;
var url = history.location.search
if (url.indexOf('qianniupc') > -1) {
  localStorage.setItem("url", url)
}

class HomeLayout extends React.Component {
  linkchart () {
    QN.application.invoke({
            cmd: 'openChat',
            param: {
                nick: 'tp_喜宝:客户经理7'
            }
        });
  }
  goback () {
    history.go(-1)
  }
	render() {
    let browsername = ''
    if(process.env.NODE_ENV === 'production'){
      browsername = '/'
    } else{
      browsername = '_dev/dsp/site'
    }
    var newurl = localStorage.getItem('url')
    var imgUrl = 'https://img.alicdn.com/imgextra/i1/669952568/TB2kH86aZPRfKJjSZFOXXbKEVXa_!!669952568.png'
    return (
	     <div className='home'>
          {
            /*newurl == '?source=qianniupc'
            ? <div></div>*/
            /*: <div style={{backgroundColor: '#108ee9', width: '100%', height: '55px'}}>
                <span style={{paddingLeft: '20px', color: '#fff', fontSize: '24px',lineHeight: '55px'}}>超 级 钻</span>
              </div>*/
          }
          <Router basename={browsername} history={history}>
            <div>
                <div style={{overflow: 'hidden'}}>
                  <Link to={homeUrl} style={{float: 'left'}}><img src={imgUrl} style={{height: '55px', margin: '20px 15px 5px 15px'}}/></Link>
                  <Link to={userUrl} style={{float: 'right',height: '55px',lineHeight: '55px', margin: '20px 15px 5px 15px'}}><Button>用户中心</Button></Link>
                </div>
                  {
                    newurl == '?source=qianniupc'
                    ? <ButtonGroup style={{ margin: '20px 15px 5px 25px'}}>
                        <Link to={homeUrl}><Button type="secondary">首页</Button></Link>
                        <Link to={fastList}><Button type="secondary">列表页</Button></Link>
                      </ButtonGroup>
                    : null
                  }
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
               {
                 newurl == '?source=qianniupc'
                 ? <a style={{fontSize: '14px', color: '#108ee9',paddingBottom: '10px'}} onClick={this.linkchart.bind(this)}> tp_喜宝:客户经理7</a>
                 : <a style={{fontSize: '14px', color: '#108ee9',paddingBottom: '10px'}}> tp_喜宝:客户经理7</a>
               }
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
