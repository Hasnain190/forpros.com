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
    USER_UPDATE_PROFILE_RESET,

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
    USER_UPDATE_RESET,

} from '../constants/userConstants'


export const userLoginReducer = (state = {  }, action) => {

    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true, userInfo: [] }

        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload,
                
            }

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
            
        case USER_LOGOUT:
                return { }

        default:
            return state
    }
}
    

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }

        case USER_REGISTER_SUCCESS:
            return { loading: false, success:true ,userInfo: action.payload }

        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}


export const userActivateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_ACTIVATE_REQUEST:
            return { loading: true }

        case USER_ACTIVATE_SUCCESS:
            return { loading: false, success:true , userInfo: action.payload }

        case USER_ACTIVATE_FAIL:
            return { loading: false, error: action.payload }

     
        default:
            return state
    }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }

        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }

        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        case USER_DETAILS_RESET:
            return { user: {} }


        default:
            return state
    }
}

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true }

        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }

        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }

        case USER_UPDATE_PROFILE_RESET:
            return {}

        default:
            return state
    }
}



export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true }

        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }

        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }

        case USER_LIST_RESET:
            return { users: [] }

        default:
            return state
    }
}



export const userDeleteReducer = (state = {  }, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true }

        case USER_DELETE_SUCCESS:
            return { loading: false,success: true}

        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const userUpdateReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true }

        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true }

        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case USER_UPDATE_RESET:
            return { user: {} }

        default:
            return state
    }
}


export const userPasswordResetReducer = (state = { }, action) => {
    switch (action.type) {
        case USER_PASSWORD_RESET_REQUEST:
            return { loading: true }

        case USER_PASSWORD_RESET_SUCCESS:
            return { loading: false, success: true }

        case USER_PASSWORD_RESET_FAIL:
            return { loading: false, error: action.payload }

  
        default:
            return state
    }
}

export const userPasswordResetConfirmReducer = (state = { }, action) => {
    switch (action.type) {
        case USER_PASSWORD_RESET_CONFIRM_REQUEST:
            return { loading: true }

        case USER_PASSWORD_RESET_CONFIRM_SUCCESS:
            return { loading: false, success: true }

        case USER_PASSWORD_RESET_CONFIRM_FAIL:
            return { loading: false, error: action.payload }

  
        default:
            return state
    }
}