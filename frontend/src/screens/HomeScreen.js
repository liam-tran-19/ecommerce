import React, { Component } from "react";
import { Filter } from "../components/Filter";
import {Products} from "../components/Products";
import { Cart } from "../components/Cart";

export const HomeScreen = () => {
  return (
    <div>
      <div className="content">
        <div className="main">
          <Filter></Filter>
          <Products></Products>
        </div>
        <div className="sidebar">
          <Cart />
        </div>
      </div>
    </div>
  );
};
