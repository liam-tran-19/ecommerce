import Axios from "axios";
import Cookie from "js-cookie";
import {
  USER_REGISTER_ERROR,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_ERROR,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from "../types";

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post("/ecommerce/users/signin", {
      email,
      password,
    });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_ERROR, payload: error.message });
  }
};
export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await Axios.post("/ecommerce/users/register", {
      name,
      email,
      password,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_ERROR, payload: error.message });
  }
};

export const signout = () => (dispatch) => {
  Cookie.remove("userInfo");
  // Cookie.remove("cartItems");
  // Cookie.remove("shippingAddress");
  dispatch({ type: USER_SIGNOUT });
  document.location.href = "/";
};
