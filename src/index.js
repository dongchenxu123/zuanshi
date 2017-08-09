import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './redux/configureStore';

import Root from './containers/Root';
//const initialState = window.__INITIAL_STATE__

const store = configureStore()
// Render the main component into the dom
ReactDOM.render(
	<Root store={store} />, document.getElementById('root')
);
