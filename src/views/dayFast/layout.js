import React, { PropTypes } from 'react'
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect

 } from 'react-router-dom'
import {routes} from '../../routes/addCampaign'
class AddDaytestLayout extends React.Component {
    constructor () {
      super()
      this.state={
          data: 123
      }
    }
    commonData () {

    }
    render () {
        const self = this;
        return (
            <div className='home'>
                {this.props.routes.map((route, index) => {
                return (
                    <Route key={index} exact={route.exact} path={route.path} render={props => (
                    <route.component {...props}  commonData={self.commonData.bind(this)}   data={this.state} />
                    )} />
                )
                })}
            </div>
        )
    }
}