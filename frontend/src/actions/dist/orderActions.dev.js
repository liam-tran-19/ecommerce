"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchOrders = exports.clearOrder = exports.createOrder = void 0;

var _types = require("../types");

var createOrder = function createOrder(order) {
  return function (dispatch) {
    fetch("/ecommerce/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      dispatch({
        type: _types.CREATE_ORDER,
        payload: data
      });
      localStorage.clear("cartItems");
      dispatch({
        type: _types.CLEAR_CART
      });
    });
  };
};

exports.createOrder = createOrder;

var clearOrder = function clearOrder() {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAR_ORDER
    });
  };
};

exports.clearOrder = clearOrder;

var fetchOrders = function fetchOrders() {
  return function (dispatch) {
    fetch("/ecommerce/orders").then(function (res) {
      return res.json();
    }).then(function (data) {
      dispatch({
        type: _types.FETCH_ORDERS,
        payload: data
      });
    });
  };
};

exports.fetchOrders = fetchOrders;