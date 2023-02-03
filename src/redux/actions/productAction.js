import { FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS, FETCH_PRODUCT_ERROR } from '../contants/productContant'
import productAPI from '../../axios/productAPI'

export const loadProducts = () => async dispatch => {
    try {
        dispatch({ type: FETCH_PRODUCT_REQUEST })

        const { products } = await productAPI()

        dispatch({
            type: FETCH_PRODUCT_SUCCESS,
            data: products
        })
    } catch (error) {
        console.log(error);
        dispatch({ type: FETCH_PRODUCT_ERROR, message: error })
    }
}