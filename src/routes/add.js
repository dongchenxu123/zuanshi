import AddOriginalityView from '../views/addfastTest/addOriginality';
import AddResourcesView from '../views/addfastTest/addResources';
import SetdirectionView from '../views/addfastTest/setdirection';
import SetlocationView from '../views/addfastTest/setlocation';
import MessageFormView from '../views/addfastTest/messageForm';
import UvDirection from '../views/addfastTest/uvDirection';
import InterestDirection from '../views/addfastTest/interestDirection';
import SceneDirection from '../views/addfastTest/sceneDirection';
import DmpDirection from '../views/addfastTest/dmpDirection';
import PeopleDirection from '../views/addfastTest/peopleDirection';
import SimilarDirection from '../views/addfastTest/similarDirection';
import LikeMyDirection from '../views/addfastTest/likemybabyDirection';
import CombinationsView from '../views/addfastTest/combinations';
import CatsDiectionView from '../views/addfastTest/catsDirection';
export const AddTestRoutes = [
	{
		path: '/add/fast/1',
		component: AddOriginalityView
	},
	{
		path: '/add/fast/2',
		component: AddResourcesView
	},
	{
		path: '/add/fast/3',
		component: SetdirectionView
	},
	{
	  path: '/add/fast/combinations',
		component: CombinationsView
	},
	{
		path: '/add/fast/4',
		component: SetlocationView
	},
	{
		path: '/add/fast/5',
		component: MessageFormView
	},
	{
		path: '/add/Type=16',
		component: UvDirection
	},
	{
		path: '/add/Type=64',
		component: InterestDirection
	},
	{
		path: '/add/Type=16384',
		component: SceneDirection
	},
	{
		path: '/add/Type=128',
		component: DmpDirection
	},
	{
		path: '/add/Type=8192',
		component: PeopleDirection
	},
	{
		path: '/add/Type=524288',
		component: CatsDiectionView
	},
	{
		path: '/add/Type=131072',
		component: SimilarDirection
	},
	{
		path: '/add/Type=262144',
		component: LikeMyDirection
	}
]
