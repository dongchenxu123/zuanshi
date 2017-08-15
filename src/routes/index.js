
import AddTestPlanLayout from '../views/addfastTest/layout.js';
import ZhizuanIndexView from '../components/home';
import FasttestListView from '../components/fasttestList';
import FasttestdetailView from '../components/fastTestdetail';
import WarnHomeView from '../views/dataWarning/warnHome';
import DetailChartView from '../views/dataWarning/detailChart';
import { AddTestRoutes } from './add';
import { AddDayTestRoutes } from './addCampaign';
import UserView from '../components/user';
import LoginView from '../components/login';
import dayLayout from '../views/dayFast/layout'
export const routes = [
	{
		path: '/',
		exact: true,
		component: ZhizuanIndexView
	},
	{
		path: '/add',
		component: AddTestPlanLayout,
		routes: AddTestRoutes
	},
	{
		path: '/fast/list',
		component: FasttestListView
	},
	{
		path: '/fast/test/detail/:id/:title/:status',
		component: FasttestdetailView
	},
	{
		path: '/dataWarn',
		exact: true,
		component: WarnHomeView
	},
	{
		path: '/dataWarn/detail/:id',
		exact: false,
		component: DetailChartView
	},
	{
		path: '/user',
		component: UserView
	},
	{
		path: '/dayTest',
		component: dayLayout,
		routes: AddDayTestRoutes
	},
	{
		path: '/login',
		component: LoginView
	}

]
