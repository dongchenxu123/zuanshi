import { handleActions } from 'redux-actions'
const initsetitems = {
	isFetching: false,
	pageSize:3,
	pageNum: 1,
	totalItem: 0,
	wareSearchData:[],
	page: 1,
	is_online: 0,
	getSaleData: {},
	getHourlycost: [],
	getshopCampainReport: []
}
export default handleActions({
	 ['GET_WARE_SEARCH_REQUEST']: (state,) => {
	 	return state
	 },
	 ['GET_WARE_SEARCH_SUCCESS']: (state, { payload }) => {
		 let indexData = state.wareSearchData;
		 let newData = payload.data;
		 let type = state.is_online
		 if(type == payload.query.is_online){
			 return {...state, wareSearchData: [...indexData, ...newData], totalItem: payload.totalItem, is_online: payload.query.is_online, page: 1}
		 } else {
		 		return {...state, wareSearchData: [ ...newData], totalItem: payload.totalItem, is_online: payload.query.is_online, page: 1}
		 }
	 },
	 ['GET_WARE_SEARCH_FAILURE']: (state) => {
	 	return state
	},
	 ['SET_ITEMS_ONLINE_REQUEST']: (state) => {
	 	return state
	 },
	 ['SET_ITEMS_ONLINE_SUCCESS']: (state, { payload }) => {
		let indexData = state.wareSearchData;
		var itemsId = parseInt(payload.query.items);
		for(var i=0; i<indexData.length; i++) {
			if(indexData[i].wareId == itemsId) {
				indexData[i].is_online = 1
			}
		}
		return {...state, wareSearchData: [...indexData]}
	 },
	 ['SET_ITEMS_ONLINE_FAILURE']: (state) => {
	 	return state
	},
	['SET_ITEMS_OFFLINE_REQUEST']: (state) => {
	 return state
	},
	['SET_ITEMS_OFFLINE_SUCCESS']: (state, { payload }) => {
	 let indexData = state.wareSearchData;
	 var itemsId = parseInt(payload.query.items);
	 for(var i=0; i<indexData.length; i++) {
		 if(indexData[i].wareId == itemsId) {
			 indexData[i].is_online = 0
		 }
	 }
	 return {...state, wareSearchData: [...indexData]}
	},
	['SET_ITEMS_OFFLINE_FAILURE']: (state) => {
	 return state
 },
 ['SET_BATCH_ONLINE_REQUEST']: (state) => {
	return state
 },
 ['SET_BATCH_ONLINE_SUCCESS']: (state, { payload }) => {

	let indexData = state.wareSearchData;
	var itemsId = payload.query.items.split(",");

	for(var i=0; i<indexData.length; i++) {
		if(indexData[i].wareId == parseInt(itemsId[i])) {
			indexData[i].is_online = 1
		}
	}
	return {...state, wareSearchData: [...indexData]}
 },
 ['SET_BATCH_ONLINE_FAILURE']: (state) => {
	return state
},
['SET_BATCH_OFFLINE_REQUEST']: (state) => {
 return state
},
['SET_BATCH_OFFLINE_SUCCESS']: (state, { payload }) => {

 let indexData = state.wareSearchData;
 var itemsId = payload.query.items.split(",");

 for(var i=0; i<indexData.length; i++) {
	 if(indexData[i].wareId == parseInt(itemsId[i])) {
		 indexData[i].is_online = 0
	 }
 }
 return {...state, wareSearchData: [...indexData]}
},
['SET_BATCH_OFFLINE_FAILURE']: (state) => {
 return state
},



['GET_SALE_DATA_REQUEST']: (state) => {
 return state
},
['GET_SALE_DATA_SUCCESS']: (state, { payload }) => {
	return Object.assign(
				{},
				state,
				{getSaleData:Object.assign(
							{},
							state.getSaleData,
							payload.data
							)
				}
			)
},
['GET_SALE_DATA_FAILURE']: (state) => {
	return state
},

['GET_HOURLY_COST_REQUEST']: (state) => {
 return state
},
['GET_HOURLY_COST_SUCCESS']: (state, { payload }) => {
	let newData = payload.data;
	return {...state, getHourlycost:newData}
},
['GET_HOURLY_COST_FAILURE']: (state) => {
	return state
},

['GET_SHOP_CAMPAGIN_REPORT_REQUEST']: (state) => {
 return state
},
['GET_SHOP_CAMPAGIN_REPORT_SUCCESS']: (state, { payload }) => {
	let newData = payload.data;
	return {...state, getshopCampainReport:newData}
},
['GET_SHOP_CAMPAGIN_REPORT_FAILURE']: (state) => {
	return state
}
 }, initsetitems)
