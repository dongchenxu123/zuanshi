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
          data: 123,
          step2: {},
          step3Data: {},
          step4Data: {},
          step5Data: {}
      }
    }
    step2Data (data) {
      if(data.step == 2) {
        var step2={
            createCampaignId: data.createCampaignId,
            campaignItem: data.campaignsIds
        }
        this.setState({
           step2: step2
        })
      }
      
    }
    solutionData (data) {
       if(data.step == 3) {
         var step3Data={
             effect: data.effect,
             optimize_field: data.optimize_field,
             limits: data.limits,
             constraints: data.constraints
         }
          this.setState({
              step3Data: step3Data
          })
       }
    }
    step4Data (data) {
     if(data.step == 4) {
         var step4Data ={
             editList: data.editList,
             combinationData: data.combinationData
         }
         this.setState({
             step4Data: step4Data
         })
     }
    }
    step5Data (data) {
     if(data.step == 5) {
         var step5Data={
             selectWeedays: data.selectWeedays
         }
         this.setState({
             step5Data: step5Data
         })
     }
    }
    commonData (data) {
      this.step2Data(data)
      this.solutionData(data)
      this.step4Data(data)
      this.step5Data(data)
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
export default AddDaytestLayout