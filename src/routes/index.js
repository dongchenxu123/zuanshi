
import AddTestPlanLayout from '../views/addfastTest/layout.js';
import ZhizuanIndexView from '../components/home';
import FasttestListView from '../components/fasttestList';
import FasttestdetailView from '../components/fastTestdetail';
import WarnHomeView from '../views/dataWarning/warnHome';
export const routes = [
	{
		path: '/',
		exact: true,
		component: ZhizuanIndexView
	},
	{
		path: '/add',
		component: AddTestPlanLayout
	},
	{
		path: '/fast/list',
		component: FasttestListView
	},
	{
		path: '/fast/test/detail/:id/:title',
		component: FasttestdetailView
	},
	{
		path: '/dataWarn',
		component: WarnHomeView
	}

]
