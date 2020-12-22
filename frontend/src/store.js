import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productsReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { orderReducer } from "./reducers/orderReducers";
import { userRegisterReducer, userSigninReducer } from "./reducers/userReducers";
import Cookie from "js-cookie";

const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = { userSignin: { userInfo } };
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    products: productsReducer,
    cart: cartReducer,
    order: orderReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
