import React from 'react'
import CreateinfoView from '../views/dayFast/step2-createCampaign';
import CreateCampaginView from '../views/dayFast/step1-home';
import setSolution from '../views/dayFast/setSolution';
import CreateCombinationView from '../views/dayFast/step4-combination';
import InfoFormView from '../views/dayFast/infoform';
import GeneralCampaginList from '../views/dayFast/generalCampaignList';
import CampaginDetailView from '../views/dayFast/campaginDetail'
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
		component: CampaginDetailView
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