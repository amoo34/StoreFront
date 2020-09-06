
import {ADD_TO_CART,REMOVE_FROM_CART} from '../actiontypes'
export const cartReducer=(state={cartItems:[],total:0},action)=>{
    switch(action.type){
        case ADD_TO_CART:
            return {cartItems:action.payload.cartItems,total:action.payload.total}
          
            case REMOVE_FROM_CART:
                return {cartItems:action.payload.cartItems,total:action.payload.total}
            default:
                return state;
        }
}
 