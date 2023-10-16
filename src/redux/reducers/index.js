import { combineReducers } from 'redux'
import productReducer from './productReducer'
import categoryReducer from './categoryReducer'
import signinReducer from './signinReducer'

const reducers = combineReducers({
    products: productReducer,
    categorys: categoryReducer,
    signin: signinReducer,
})

export default reducers