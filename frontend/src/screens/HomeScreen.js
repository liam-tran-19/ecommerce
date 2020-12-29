import React, { Component } from "react";
import { Filter } from "../components/Filter";
import { Products } from "../components/Products";
import { Cart } from "../components/Cart";
import SiteBackground from "./SiteBackground";
import { useSelector } from "react-redux";

export const HomeScreen = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <div>
      <SiteBackground userInfo={userInfo} />
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
