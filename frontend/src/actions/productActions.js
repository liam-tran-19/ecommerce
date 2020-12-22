import {
  FETCH_PRODUCTS,
  SEARCH_PRODUCTS_BY_NAME,
  FILTER_PRODUCTS_BY_SIZE,
  ORDER_PRODUCTS_BY_PRICE,
  SORT_GENDER,
} from "../types";

export const fetchProducts = () => async (dispatch) => {
  const res = await fetch("/ecommerce/products");
  const data = await res.json();
  console.log(data);
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};

export const filterProducts = (products, size) => (dispatch) => {
  dispatch({
    type: FILTER_PRODUCTS_BY_SIZE,
    payload: {
      size: size,
      items:
        size === ""
          ? products
          : products.filter((x) => x.availableSizes.indexOf(size) >= 0),
    },
  });
};
export const sortGenders = (products, gender) => (dispatch) => {
  dispatch({
    type: SORT_GENDER,
    payload: {
      gender: gender,
      items:
        gender === ""
          ? products
          : products.filter((x) => x.gender.indexOf(gender) >= 0),
    },
  });
};
export const sortProducts = (filteredProducts, sort) => (dispatch) => {
  const sortedProducts = filteredProducts.slice();
  if (sort === "all") {
    sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else {
    sortedProducts.sort((a, b) =>
      sort === "lowest"
        ? a.price > b.price
          ? 1
          : -1
        : a.price > b.price
        ? -1
        : 1
    );
  }
  console.log(sortedProducts);
  dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedProducts,
    },
  });
};

export const searchProduct = (searchName) => async (dispatch) => {
  const res = await fetch("/ecommerce/products");
  const data = await res.json();
  console.log(data);
  const searchData = data.filter(
    (product) => product.title.toLowerCase().indexOf(searchName) > -1
  );
  dispatch({
    type: SEARCH_PRODUCTS_BY_NAME,
    payload: searchData,
  });
};
