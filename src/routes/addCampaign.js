<<<<<<< HEAD
import CreateinfoView from '../views/dayFast/step2';
import CreateCampaginView from '../views/dayFast/step1-createCampaign';
export const AddDayTestRoutes = [
  {
		path: '/dayfast/createCampaign',
		component: CreateCampaginView
	},
  {
		path: '/dayfast/createinfo',
		component: CreateinfoView
	},
]
=======
import React from 'react'
import CreateinfoView from '../views/dayFast/step2-createCampaign';
import CreateCampaginView from '../views/dayFast/step1-home';
import setSolution from '../views/dayFast/setSolution';
import CreateCombinationView from '../views/dayFast/step4-combination';
import InfoFormView from '../views/dayFast/infoform';
import GeneralCampaginList from '../views/dayFast/generalCampaignList';
import CampaginDetailView from '../views/dayFast/campaginDetailTable';
import AdgroupDetailView from '../views/dayFast/detailReport/adgroupDetail';
export const AddDayTestRoutes = [
  {
		path: '/dayTest/home',
		component: CreateCampaginView
	},{
		path: '/dayTest/createCampaign',
		component: CreateinfoView
	},
	{
		path: '/dayTest/setSolution',
		component: setSolution
	},
	{
		path: '/dayTest/CreateCombination',
		component: CreateCombinationView
	},
	{
		path: '/dayTest/infoForm/:id',
		component: InfoFormView
	},
	{
		path: '/dayTest/campaginList',
		component: GeneralCampaginList
	},
	{
		path: '/dayTest/campagin/detail/:id/:name/:cost/:status',
		exact: true,
		component: CampaginDetailView
	},
	{
		path: '/dayTest/campagin/detail/adgroupsDetail/:campaign_id/:adgroup_id/:start_time/:end_time/:effect/:name',
		exact: false,
		component: AdgroupDetailView
	}
 
]
/* {
		path: '/dayTest/createCampaign',
		component: CreateinfoView
	},
	{
		path: '/dayTest/setSolution',
		component: setSolution
	},
	{
		path: '/dayTest/CreateCombination',
		component: CreateCombinationView
	},
	{
		path: '/dayTest/infoForm/:id',
		component: InfoFormView
	}*/
>>>>>>> a43b3823b062de6e7da27e692def8042fa1e75a2
