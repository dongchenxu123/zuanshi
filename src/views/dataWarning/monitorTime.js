import React from 'react';
import '../../styles/monitor.css';
import Checkbox from 'qnui/lib/checkbox';
class MonitorTimeView extends React.Component {
  render () {
    var html="";
    console.log(this.props.states)
    return (
      <div>
			{this.props.states.map((element,idx) =>{
				return(
					<div key={idx} className="content">
            <Checkbox onChange={this.props.onChangeTime}/>
					  <div>{
					  element.map((element,index) =>{
					  	 return (
					  	 	<p className={element[1]===1?"on":"disable"} onClick={this.props.onClickTime} key={index}></p>
					  	 )
					  })
					}
					</div>
					</div>
				)
			})

			}
			</div>
    )
  }
}

export default MonitorTimeView
