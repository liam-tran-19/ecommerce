"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchProduct = exports.sortProducts = exports.sortGenders = exports.filterProducts = exports.fetchProducts = void 0;

var _types = require("../types");

var fetchProducts = function fetchProducts() {
  return function _callee(dispatch) {
    var res, data;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(fetch("/ecommerce/products"));

          case 2:
            res = _context.sent;
            _context.next = 5;
            return regeneratorRuntime.awrap(res.json());

          case 5:
            data = _context.sent;
            console.log(data);
            dispatch({
              type: _types.FETCH_PRODUCTS,
              payload: data
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    });
  };
};

exports.fetchProducts = fetchProducts;

var filterProducts = function filterProducts(products, size) {
  return function (dispatch) {
    dispatch({
      type: _types.FILTER_PRODUCTS_BY_SIZE,
      payload: {
        size: size,
        items: size === "" ? products : products.filter(function (x) {
          return x.availableSizes.indexOf(size) >= 0;
        })
      }
    });
  };
};

exports.filterProducts = filterProducts;

var sortGenders = function sortGenders(products, gender) {
  return function (dispatch) {
    dispatch({
      type: _types.SORT_GENDER,
      payload: {
        gender: gender,
        items: gender === "" ? products : products.filter(function (x) {
          return x.gender.indexOf(gender) >= 0;
        })
      }
    });
  };
};

exports.sortGenders = sortGenders;

var sortProducts = function sortProducts(filteredProducts, sort) {
  return function (dispatch) {
    var sortedProducts = filteredProducts.slice();

    if (sort === "all") {
      sortedProducts.sort(function (a, b) {
        return a._id > b._id ? 1 : -1;
      });
    } else {
      sortedProducts.sort(function (a, b) {
        return sort === "lowest" ? a.price > b.price ? 1 : -1 : a.price > b.price ? -1 : 1;
      });
    }

    console.log(sortedProducts);
    dispatch({
      type: _types.ORDER_PRODUCTS_BY_PRICE,
      payload: {
        sort: sort,
        items: sortedProducts
      }
    });
  };
};

exports.sortProducts = sortProducts;

var searchProduct = function searchProduct(searchName) {
  return function _callee2(dispatch) {
    var res, data, searchData;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(fetch("/ecommerce/products"));

          case 2:
            res = _context2.sent;
            _context2.next = 5;
            return regeneratorRuntime.awrap(res.json());

          case 5:
            data = _context2.sent;
            console.log(data);
            searchData = data.filter(function (product) {
              return product.title.toLowerCase().indexOf(searchName) > -1;
            });
            dispatch({
              type: _types.SEARCH_PRODUCTS_BY_NAME,
              payload: searchData
            });

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
};

exports.searchProduct = searchProduct;