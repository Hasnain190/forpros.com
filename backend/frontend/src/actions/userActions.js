import axios from 'axios'

import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_ACTIVATE_REQUEST,
    USER_ACTIVATE_SUCCESS,
    USER_ACTIVATE_FAIL,

    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,

    USER_PASSWORD_RESET_REQUEST,
    USER_PASSWORD_RESET_SUCCESS,
    USER_PASSWORD_RESET_FAIL,

    USER_PASSWORD_RESET_CONFIRM_REQUEST,
    USER_PASSWORD_RESET_CONFIRM_SUCCESS,
    USER_PASSWORD_RESET_CONFIRM_FAIL,


    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,


    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,


    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,


    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,


} from '../constants/userConstants'
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        //  '/auth/jwt/create/',

        const { data } = await axios.post(
            `/api/users/login/`,
            { 'email': email, 'password': password },
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: ORDER_LIST_MY_RESET })
    dispatch({ type: USER_LIST_RESET })



}


export const register = (username, email, password, re_password) => async (dispatch) => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }


    const { data } = await axios.post(
        '/auth/users/',
        { 'username': username, 'email': email, 'password': password, 're_password': re_password },
        config
    )




    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })


        // const { data } = await axios.post(
        //     '/api/users/register/',
        //     { 'name': name, 'email': email, 'password': password },
        //     config
        // )


        // const body = JSON.stringify({ username, email, password });


        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
//  I  commented out this  so that I can test the user log in and sign up faster ... I will uncomment this later InshaAllah
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}

export const activate = (uid, token) => async (dispatch) => {
    try {
        dispatch({
            type: USER_ACTIVATE_REQUEST
        })

        // const {
        //     userLogin: { userInfo },
        // } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                // 'Authorization': `JWT ${userInfo.token}`
            }
        }
        const body = JSON.stringify({ uid, token });

        const { data } = await axios.post(`/auth/users/activation/`, body,
            config
        )

        dispatch({
            type: USER_ACTIVATE_SUCCESS,
            payload: data
        })
        // dispatch(login())

        localStorage.setItem('userInfo', JSON.stringify(data))


    } catch (error) {
        dispatch({
            type: USER_ACTIVATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
// && !localStorage.getItem('userInfo')

export const googleAuthenticate = (state, code) => async dispatch => {
    if (state && code ) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const details = {
            'state': state,
            'code': code
        };

        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {
            const { data } = await axios.post(`http://127.0.0.1:8000/auth/o/google-oauth2/?${formBody}`, config);

            dispatch({
                type: GOOGLE_AUTH_SUCCESS,
                payload: data
            });
            console.log('it have reached up to here')
            dispatch(getUserDetails());
        } catch (error) {
            dispatch({
                type: GOOGLE_AUTH_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
            });
        }
    }
};

export const getUserDetails = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${userInfo.token ? userInfo.access_token : userInfo.access }`
            }
        }
        //  `/api/users/${id}/`
        const { data } = await axios.get('/auth/users/me/',
            config
        )

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/users/profile/update/`,
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/users/`,

            config
        )

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/users/delete/${id}/`,

            config
        )

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/users/update/${user._id}/`,
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_SUCCESS,
        })

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const resetUserPassword = (email) => async (dispatch) => {
    try {
        dispatch({
            type: USER_PASSWORD_RESET_REQUEST
        })


        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }

        const { data } = await axios.post(
            `/auth/users/reset_password/`,
            { 'email': email },
            config
        )

        dispatch({
            type: USER_PASSWORD_RESET_SUCCESS,
        })



    } catch (error) {
        dispatch({
            type: USER_PASSWORD_RESET_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const resetUserPasswordConfirm = (uid, token, new_password, re_new_password) => async (dispatch) => {



    const body = JSON.stringify({ uid, token, new_password, re_new_password });
    try {
        dispatch({
            type: USER_PASSWORD_RESET_CONFIRM_REQUEST
        })


        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }

        await axios.post(
            `http://127.0.0.1:8000/auth/users/reset_password_confirm/`, // this is an exception that is to be changed later
            body,
            config
        )

        dispatch({
            type: USER_PASSWORD_RESET_CONFIRM_SUCCESS,
        })



    } catch (error) {
        dispatch({
            type: USER_PASSWORD_RESET_CONFIRM_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,


        })
    }
}