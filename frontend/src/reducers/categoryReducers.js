import {

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

    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,
    CATEGORY_CREATE_RESET,

    CATEGORY_EDIT_REQUEST,
    CATEGORY_EDIT_SUCCESS,
    CATEGORY_EDIT_FAIL,
    CATEGORY_EDIT_RESET,

} from '../constants/categoryConstants'


export const productCategoryListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_CATEGORY_LIST_REQUEST:
            return { loading: true, products: [] }

        case PRODUCT_CATEGORY_LIST_SUCCESS:
            return { loading: false, products: action.payload, }

        case PRODUCT_CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const productCategoryReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_CATEGORY_REQUEST:
            return { loading: true, products: [] }

        case PRODUCT_CATEGORY_SUCCESS:
            return { loading: false, products: action.payload, }

        case PRODUCT_CATEGORY_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const categoryCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CATEGORY_CREATE_REQUEST:
            return { loading: true }

        case CATEGORY_CREATE_SUCCESS:
            return { loading: false, success: true, category: action.payload }

        case CATEGORY_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case CATEGORY_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const categoryEditReducer = (state = { category: {} }, action) => {
    switch (action.type) {
        case CATEGORY_EDIT_REQUEST:
            return { loading: true }

        case CATEGORY_EDIT_SUCCESS:
            return { loading: false, success: true , category: action.payload}

        case CATEGORY_EDIT_FAIL:
            return { loading: false, error: action.payload }

        case CATEGORY_EDIT_RESET:
            return { category: {} }

        default:
            return state
    }
}


export const categoryDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case CATEGORY_DELETE_REQUEST:
            return { loading: true }

        case CATEGORY_DELETE_SUCCESS:
            return { loading: false, success: true }

        case CATEGORY_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const categoryIncludeReducer = (state = {}, action) => {
    switch (action.type) {
        case CATEGORY_INCLUDE_REQUEST:
            return { loading: true }

        case CATEGORY_INCLUDE_SUCCESS:
            return { loading: false, success: true }

        case CATEGORY_INCLUDE_FAIL:
            return { loading: false, error: action.payload }

        // case PRODUCT_UPDATE_RESET:
        //     return { product: {} }

        default:
            return state
    }
}
