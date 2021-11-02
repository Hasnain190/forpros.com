import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewCreateReducer,
    productTopRatedReducer,



} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { wishlistReducer } from './reducers/wishlistReducers'
import {
    userLoginReducer,
    userRegisterReducer,
    userActivateReducer,
    googleAuthenticateReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
    userPasswordResetReducer,
    userPasswordResetConfirmReducer,


} from './reducers/userReducers'
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
    orderListReducer,
    orderDeliverReducer,

} from './reducers/orderReducers'
import {
    productCategoryReducer,
    productCategoryListReducer,
    categoryDeleteReducer,
    categoryIncludeReducer,
    categoryCreateReducer,
    categoryEditReducer,

} from './reducers/categoryReducers'
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,
    productCategory: productCategoryReducer,
    productCategoryList: productCategoryListReducer,

    categoryCreate: categoryCreateReducer,
    categoryDelete: categoryDeleteReducer,
    categoryInclude: categoryIncludeReducer,
    categoryEdit: categoryEditReducer,

    wishlist: wishlistReducer,

    cart: cartReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userActivate:userActivateReducer,

    googleAuthenticate:googleAuthenticateReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    userPasswordReset:userPasswordResetReducer,
    userPasswordResetConfirm:userPasswordResetConfirmReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,

})

const cartItemsFromStorage = localStorage.getItem("cartItems") ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const wishlistItemsFromStorage = localStorage.getItem("wishlistItems") ?
    JSON.parse(localStorage.getItem('wishlistItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}


const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage },
    // wishlist: {  wishlistItemsFromStorage },

}


const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))



export default store