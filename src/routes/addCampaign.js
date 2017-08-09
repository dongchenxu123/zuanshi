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
