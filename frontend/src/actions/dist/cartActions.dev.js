"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeFromCart = exports.addToCart = void 0;

var _types = require("../types");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var addToCart = function addToCart(product) {
  return function (dispatch, getState) {
    var cartItems = getState().cart.cartItems.slice();
    var alreadyExists = false;
    cartItems.forEach(function (x) {
      if (x._id === product._id) {
        alreadyExists = true;
        x.count++;
      }
    });

    if (!alreadyExists) {
      cartItems.push(_objectSpread({}, product, {
        count: 1
      }));
    }

    dispatch({
      type: _types.ADD_TO_CART,
      payload: {
        cartItems: cartItems
      }
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
};

exports.addToCart = addToCart;

var removeFromCart = function removeFromCart(product) {
  return function (dispatch, getState) {
    var cartItems = getState().cart.cartItems.slice().filter(function (x) {
      return x._id !== product._id;
    });
    dispatch({
      type: _types.REMOVE_FROM_CART,
      payload: {
        cartItems: cartItems
      }
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
};

exports.removeFromCart = removeFromCart;