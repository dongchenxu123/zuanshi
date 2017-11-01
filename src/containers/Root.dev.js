<<<<<<< HEAD
import React, { Component } from 'react';
import { Provider } from 'react-redux'
import HomeLayout from '../layouts/HomeLayout'
//import DevTools from '../containers/DevTools'

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
=======
import React, { Component } from 'react';
import { Provider } from 'react-redux'
import HomeLayout from '../layouts/HomeLayout'
//import DevTools from '../containers/DevTools'

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
>>>>>>> a43b3823b062de6e7da27e692def8042fa1e75a2
