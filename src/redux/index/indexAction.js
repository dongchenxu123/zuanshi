import axios from 'axios';
import { createAction } from 'redux-actions';
//import { GetTopics, GetTopicDetail, GetUserDetail } from '../../help/url'
//import { GET_TOPIC_REQUEST, GET_TOPIC_SUCCESS, GET_TOPIC_FAILURE, GET_TOPIC_DETAIL_REQUEST, GET_TOPIC_DETAIL_SUCCESS, GET_TOPIC_DETAIL_FAILURE, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_DETAIL_FAILURE, HASNOT_READ_REQUEST, HASNOT_READ_SUCCESS, HASNOT_READ_FAILURE} from '../const'
import { GetwareSearch, setItemsOnline, setItemsOffline, getSaleData, getHourlyCost,
getShopCampaginReport } from '../../help/url';
import { GET_WARE_SEARCH_REQUEST, GET_WARE_SEARCH_SUCCESS, GET_WARE_SEARCH_FAILURE, SET_ITEMS_ONLINE_REQUEST,
SET_ITEMS_ONLINE_SUCCESS, SET_ITEMS_ONLINE_FAILURE, SET_ITEMS_OFFLINE_REQUEST, SET_ITEMS_OFFLINE_SUCCESS,
SET_ITEMS_OFFLINE_FAILURE, SET_BATCH_ONLINE_REQUEST, SET_BATCH_ONLINE_SUCCESS, SET_BATCH_ONLINE_FAILURE,
SET_BATCH_OFFLINE_REQUEST, SET_BATCH_OFFLINE_SUCCESS, SET_BATCH_OFFLINE_FAILURE,SET_FILTER_ITEMS_REQUEST,
SET_FILTER_ITEMS_SUCCESS, SET_FILTER_ITEMS_FAILURE,GET_SALE_DATA_REQUEST,GET_SALE_DATA_SUCCESS,GET_SALE_DATA_FAILURE,
GET_HOURLY_COST_REQUEST, GET_HOURLY_COST_SUCCESS, GET_HOURLY_COST_FAILURE, GET_SHOP_CAMPAGIN_REPORT_REQUEST,
GET_SHOP_CAMPAGIN_REPORT_SUCCESS, GET_SHOP_CAMPAGIN_REPORT_FAILURE} from '../const';
import { today } from '../../components/date';
export const getwareSearchRequest = createAction(GET_WARE_SEARCH_REQUEST, (items) => items)
export const getwareSearchSuccess = createAction(GET_WARE_SEARCH_SUCCESS, (payload) => {
	return payload
})
export const getwareSearchFailure = createAction(GET_WARE_SEARCH_FAILURE, (items) => items)
function dispactchAction (dispatch, type, data) {
  var tmpFunction = createAction(type, (data) => data)
  dispatch(tmpFunction(data))
}
export function loadWareSearchItem (obj) {
	return (dispatch) => {
		dispatch(getwareSearchRequest())
		return axios.get(GetwareSearch, {params: obj})
		 .then(function (response) {
			return response.data
		})
		 .then(function (res) {
			if (res.msg) {
			 		dispatch(getwareSearchFailure())
			 		return
			 	} else {
					dispactchAction(dispatch, GET_WARE_SEARCH_SUCCESS, {
						data: res.data.data,
						totalItem: res.data.totalItem,
						query: obj
					})
			 	}
				return res

    }).catch(function(err){
		 	console.log(err)
		 })

	}
}
export const setFilterItemsRequest = createAction(SET_FILTER_ITEMS_REQUEST, (items) => items)
export const setFilterItemsSuccess = createAction(SET_FILTER_ITEMS_SUCCESS, (payload) => {
	return payload
})
export const setFilterItemsFailure = createAction(SET_FILTER_ITEMS_FAILURE, (items) => items)
function dispactchAction (dispatch, type, data) {
  var tmpFunction = createAction(type, (data) => data)
  dispatch(tmpFunction(data))
}
export function loadFilterItemsItem (obj) {
	return (dispatch) => {
		dispatch(setFilterItemsRequest())
		return axios.get(GetwareSearch, {params: obj})
		 .then(function (response) {
			return response.data
		})
		 .then(function (res) {
			if (res.msg) {
			 		dispatch(setFilterItemsFailure())
			 		return
			 	} else {
					dispactchAction(dispatch, SET_FILTER_ITEMS_SUCCESS, {
						data: res.data.data,
						totalItem: res.data.totalItem,
						query: obj
					})
			 	}
				return res

    }).catch(function(err){
		 	console.log(err)
		 })

	}
}
export const setOnlineRequest = createAction(SET_ITEMS_ONLINE_REQUEST, (items) => items)
export const setOnlineSuccess = createAction(SET_ITEMS_ONLINE_SUCCESS, (payload) => {
	return payload
})
export const setOnlineFailure = createAction(SET_ITEMS_ONLINE_FAILURE, (items) => items)
function dispactchAction (dispatch, type, data) {
  var tmpFunction = createAction(type, (data) => data)
  dispatch(tmpFunction(data))
}
export function loadsetItemsOnlineItem (obj) {
	return (dispatch) => {
		dispatch(setOnlineRequest())
		return axios.post(setItemsOnline, {
			user_id: obj.user_id,
			items: obj.items
		})
		 .then(function (response) {
			 return response.data
		})
		 .then(function (res) {
			if (res.msg) {
			 		dispatch(setOnlineFailure())
			 		return
			 	} else {
					dispactchAction(dispatch, SET_ITEMS_ONLINE_SUCCESS, {
						data: res.data,
						query: {user_id: obj.user_id,
						items: obj.items}
					})
			 	}
				return res

    }).catch(function(err){
		 	console.log(err)
		 })

	}
}
export const setOfflineRequest = createAction(SET_ITEMS_OFFLINE_REQUEST, (items) => items)
export const setOfflineSuccess = createAction(SET_ITEMS_OFFLINE_SUCCESS, (payload) => {
	return payload
})
export const setOfflineFailure = createAction(SET_ITEMS_OFFLINE_FAILURE, (items) => items)
function dispactchAction (dispatch, type, data) {
  var tmpFunction = createAction(type, (data) => data)
  dispatch(tmpFunction(data))
}
export function loadsetItemsOfflineItem (obj) {
	return (dispatch) => {
		dispatch(setOfflineRequest())
		return axios.post(setItemsOffline, {
			user_id: obj.user_id,
			items: obj.items
		})
		 .then(function (response) {
			 return response.data
		})
		 .then(function (res) {
			if (res.msg) {
			 		dispatch(setOfflineFailure())
			 		return
			 	} else {
					dispactchAction(dispatch, SET_ITEMS_OFFLINE_SUCCESS, {
						data: res.data,
						query: {user_id: obj.user_id,
						items: obj.items}
					})
			 	}
				return res

    }).catch(function(err){
		 	console.log(err)
		 })

	}
}
export const setBatchOnlineRequest = createAction(SET_BATCH_ONLINE_REQUEST, (items) => items)
export const setBatchOnlineSuccess = createAction(SET_BATCH_ONLINE_SUCCESS, (payload) => {
	return payload
})
export const setBatchOnlineFailure = createAction(SET_BATCH_ONLINE_FAILURE, (items) => items)
function dispactchAction (dispatch, type, data) {
  var tmpFunction = createAction(type, (data) => data)
  dispatch(tmpFunction(data))
}
export function loadsetBatchOnlineItem (obj) {
	return (dispatch) => {
		dispatch(setBatchOnlineRequest())
		return axios.post(setItemsOnline, {
			user_id: obj.user_id,
			items: obj.items
		})
		 .then(function (response) {
			 return response.data
		})
		 .then(function (res) {
			if (res.msg) {
			 		dispatch(setBatchOnlineFailure())
			 		return
			 	} else {
					dispactchAction(dispatch, SET_BATCH_ONLINE_SUCCESS, {
						data: res.data,
						query: {user_id: obj.user_id,
						items: obj.items}
					})
			 	}
				return res

    }).catch(function(err){
		 	console.log(err)
		 })

	}
}
export const setBatchOfflineRequest = createAction(SET_BATCH_OFFLINE_REQUEST, (items) => items)
export const setBatchOfflineSuccess = createAction(SET_BATCH_OFFLINE_SUCCESS, (payload) => {
	return payload
})
export const setBatchOfflineFailure = createAction(SET_BATCH_OFFLINE_FAILURE, (items) => items)
function dispactchAction (dispatch, type, data) {
  var tmpFunction = createAction(type, (data) => data)
  dispatch(tmpFunction(data))
}
export function loadsetBatchOfflineItem (obj) {
	return (dispatch) => {
		dispatch(setBatchOfflineRequest())
		return axios.post(setItemsOffline, {
			user_id: obj.user_id,
			items: obj.items
		})
		 .then(function (response) {
			 return response.data
		})
		 .then(function (res) {
			if (res.msg) {
			 		dispatch(setBatchOfflineFailure())
			 		return
			 	} else {
					dispactchAction(dispatch, SET_BATCH_OFFLINE_SUCCESS, {
						data: res.data,
						query: {user_id: obj.user_id,
						items: obj.items}
					})
			 	}
				return res

    }).catch(function(err){
		 	console.log(err)
		 })

	}
}

export const getSaledataRequest = createAction(GET_SALE_DATA_REQUEST, (items) => items)
export const getSaledataSuccess = createAction(GET_SALE_DATA_SUCCESS, (payload) => {
	return payload
})
export const getSaledataFailure = createAction(GET_SALE_DATA_FAILURE, (items) => items)
function dispactchAction (dispatch, type, data) {
  var tmpFunction = createAction(type, (data) => data)
  dispatch(tmpFunction(data))
}
function getSaleDataFunc(obj, dispatch) {
	return axios.get(getSaleData, {params: obj})
	 .then(function (response) {
		return response.data
	}).then(function (res) {
	 if (res.msg) {
			 dispatch(getSaledataFailure())
			 return
		 } else {
			 localStorage.setItem("saleData",JSON.stringify(res));
	 		 localStorage.setItem('day', today);
			 dispactchAction(dispatch, GET_SALE_DATA_SUCCESS, {
				 data: res,
				 query: obj
			 })
		 }
		 return res
 }).catch(function(err){
	 console.log(err)
	})
}
function getSaleFormLocal(dispatch){
	return new Promise((resolve, reject) => {
		var data = localStorage.getItem('saleData')
		dispactchAction(dispatch, GET_SALE_DATA_SUCCESS, {
			data: JSON.parse(data)
		})
		resolve(data)
	})
}
export function loadGetSaleData (obj) {
	return (dispatch) => {
		dispatch(getSaledataRequest())
		var date = localStorage.getItem('day');
		if( date === today ) {
			return getSaleFormLocal(dispatch)
		} else {
			return getSaleDataFunc(obj, dispatch)
		}
	}
}

export const getHourlycostRequest = createAction(GET_HOURLY_COST_REQUEST, (items) => items)
export const getHourlycostSuccess = createAction(GET_HOURLY_COST_SUCCESS, (payload) => {
	return payload
})
export const getHourlycostFailure = createAction(GET_HOURLY_COST_FAILURE, (items) => items)
function dispactchAction (dispatch, type, data) {
  var tmpFunction = createAction(type, (data) => data)
  dispatch(tmpFunction(data))
}
export function loadgetHourlycost () {
	return (dispatch) => {
		dispatch(getHourlycostRequest())
		return axios.get(getHourlyCost)
		 .then(function (response) {
			 return response.data
		})
		 .then(function (res) {
			if (res.msg) {
			 		dispatch(getHourlycostFailure())
			 		return
			 	} else {
					dispactchAction(dispatch, GET_HOURLY_COST_SUCCESS, {
						data: res

					})
			 	}
				return res

    }).catch(function(err){
		 	console.log(err)
		 })

	}
}

export const getShopReportRequest = createAction(GET_SHOP_CAMPAGIN_REPORT_REQUEST, (items) => items)
export const getShopReportSuccess = createAction(GET_SHOP_CAMPAGIN_REPORT_SUCCESS, (payload) => {
	return payload
})
export const getShopReportFailure = createAction(GET_SHOP_CAMPAGIN_REPORT_FAILURE, (items) => items)
function dispactchAction (dispatch, type, data) {
  var tmpFunction = createAction(type, (data) => data)
  dispatch(tmpFunction(data))
}
export function loadgetShopCampaignReport (obj) {
	return (dispatch) => {
		dispatch(getShopReportRequest())
		return axios.get(getShopCampaginReport, {params: obj})
		.then(function (response) {
			 return response.data
		})
		 .then(function (res) {
			if (res.msg) {
			 		dispatch(getShopReportFailure())
			 		return
			 	} else {
					dispactchAction(dispatch, GET_SHOP_CAMPAGIN_REPORT_SUCCESS, {
						data: res,
						query: obj

					})
			 	}
				return res

    }).catch(function(err){
		 	console.log(err)
		 })

	}
}
export const actions = {
	// loadTopicItem,
	// loadTopicDetailItem,
	// loadUserDetailItem
	loadWareSearchItem,
	loadsetItemsOnlineItem,
	loadsetItemsOfflineItem,
	loadsetBatchOnlineItem,
	loadsetBatchOfflineItem,
	loadFilterItemsItem,
	loadGetSaleData,
	loadgetHourlycost,
	loadgetShopCampaignReport
}
