import {PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_REQUEST,
        PRODUCT_DETAILS_SUCCESS} from '../actiontypes'

function productDetailReducer(state={productDetail:{}},action){
    switch (action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading:true}
        case PRODUCT_DETAILS_SUCCESS:
            return {loading:false, productDetail:action.payload}
        case PRODUCT_DETAILS_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export {productDetailReducer}