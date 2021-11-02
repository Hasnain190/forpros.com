import {
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,
    CATEGORY_CREATE_RESET,

    PRODUCT_CATEGORY_REQUEST,
    PRODUCT_CATEGORY_SUCCESS,
    PRODUCT_CATEGORY_FAIL,


    PRODUCT_CATEGORY_LIST_REQUEST,
    PRODUCT_CATEGORY_LIST_SUCCESS,
    PRODUCT_CATEGORY_LIST_FAIL,
    
    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_FAIL,

    CATEGORY_INCLUDE_REQUEST,
    CATEGORY_INCLUDE_SUCCESS,
    CATEGORY_INCLUDE_FAIL,

    CATEGORY_EDIT_REQUEST,
    CATEGORY_EDIT_SUCCESS,
    CATEGORY_EDIT_FAIL,
    CATEGORY_EDIT_RESET,

} from '../constants/categoryConstants'
import axios from 'axios'



export const createCategory = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `JWT ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/category/create/`,
            {},
            config
        )
        dispatch({
            type: CATEGORY_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: CATEGORY_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const editCategory = (product_category,id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_EDIT_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `JWT ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/category/${id}/edit/`,
            product_category,
            config
        )
        dispatch({
            type: CATEGORY_EDIT_SUCCESS,
            payload: data,
        })

        // dispatch({
        //     type: PRODUCT_DETAILS_SUCCESS,
        //     payload: data,
        // })

    } catch (error) {
        dispatch({
            type: CATEGORY_EDIT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const includeCategory = (categoryId,productId) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_INCLUDE_REQUEST })
        
        
        const formDataForCat = new FormData()
        formDataForCat.append('product_id', productId)

        
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.put(`/api/category/update/${categoryId}/`, formDataForCat, config)
        
        console.log(data)
        dispatch({
            type: CATEGORY_INCLUDE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CATEGORY_INCLUDE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const categoryProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_CATEGORY_REQUEST })

        const { data } = await axios.get(`/api/category/categorylist/`)

        dispatch({
            type: PRODUCT_CATEGORY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_CATEGORY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

 

export const categoryListProducts = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_CATEGORY_LIST_REQUEST })

        const { data } = await axios.get(`/api/category/${id}/`)

        dispatch({
            type: PRODUCT_CATEGORY_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_CATEGORY_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteCategory = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: CATEGORY_DELETE_REQUEST })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `JWT ${userInfo.token}`
            }
        }
        const { data } = await axios.delete(`/api/category/delete/${id}/`, config)

        dispatch({
            type: CATEGORY_DELETE_SUCCESS,

        })

    } catch (error) {
        dispatch({
            type: CATEGORY_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

