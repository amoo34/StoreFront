import {createStore, applyMiddleware,combineReducers} from 'redux'
import {productListReducer} from './reducers/productreducer'
import {productDetailReducer} from './reducers/productDetailReducer'
import {cartReducer} from './reducers/cartReducer'
import {userSigninReducer,userSignupReducer} from './reducers/userReducer'
import {orderConfirm} from './reducers/orderReducer'
import thunk from 'redux-thunk'
import Cookie from 'js-cookie'
import { composeWithDevTools } from "redux-devtools-extension";

const cartItems = Cookie.getJSON("cartItems") || []
const userInfo = Cookie.getJSON("userInfo") || null
const total = Cookie.getJSON("total") || null
console.log(cartItems)
const initialState={cartReducer:{cartItems,total},userSignin:{userInfo}}
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailReducer,
    cartReducer,
    userSignin:userSigninReducer,
    userRegister:userSignupReducer,
    orderConfirm:orderConfirm
})
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(thunk)))

export default store