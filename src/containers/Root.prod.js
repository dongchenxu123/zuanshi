import React, { Component } from 'react';
import { Provider } from 'react-redux'
import HomeLayout from '../layouts/HomeLayout'


// Render the main component into the dom
export default class Root extends Component {
	render() {
		return (
			<Provider store={this.props.store}>
			    <div>
			      <HomeLayout />
			    </div>
	  		</Provider>
  		)
	}
}