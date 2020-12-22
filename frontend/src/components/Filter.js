import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterProducts,
  sortProducts,
  sortGenders,
} from "../actions/productActions";

export const Filter = () => {
  const productsSel = useSelector((state) => state.products);
  const { size, sort, gender, filteredItems, items } = productsSel;

  const dispatch = useDispatch();

  return !filteredItems ? (
    <div>Loading...</div>
  ) : (
    <div className="filter">
      <div className="filter-result">{filteredItems.length} Products</div>
      <div className="filter-gender">
        Gender{" "}
        <select
          value={gender}
          onChange={(e) => dispatch(sortGenders(items, e.target.value))}
        >
          <option value="">All</option>
          <option value="women">Women</option>
          <option value="men">Men</option>
        </select>
      </div>
      <div className="filter-sort">
        Price{" "}
        <select
          value={sort}
          onChange={(e) =>
            dispatch(sortProducts(filteredItems, e.target.value))
          }
        >
          <option value="all">All</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </div>
      <div className="filter-size">
        Filter{" "}
        <select
          value={size}
          onChange={(e) => dispatch(filterProducts(items, e.target.value))}
        >
          <option value="">ALL</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="X">X</option>
          <option value="XL">XL</option>
        </select>
      </div>
    </div>
  );
};
