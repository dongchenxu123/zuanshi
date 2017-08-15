import React from 'react';
import '../styles/App.css';
import Menu from 'qnui/lib/menu';
import TestListView from '../views/testListView';
import TestTableView from '../views/testTableView';

class ZhizuanIndexView extends React.Component {
  
	render () {
		return (
      <div>
				<TestListView />
				<TestTableView/>
      </div>
    )
  }
}

export default ZhizuanIndexView;
