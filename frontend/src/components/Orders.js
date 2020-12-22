import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../actions/orderActions";
import formatCurrency from "../util";

export const Orders = () => {
  const dispatch = useDispatch();
  const orderProducts = useSelector((state) => state.order);
  const { orders } = orderProducts;

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return !orders ? (
    <div>Orders</div>
  ) : (
    <div className="orders">
      <h2>Orders</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADDRESS</th>
            <th>ITEMS</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr>
              <td>{order._id}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td> {"$" + formatCurrency(order.total)}</td>
              <td>{order.name}</td>
              <td>{order.email}</td>
              <td>{order.address}</td>
              <td>
                {order.cartItems.map((item) => (
                  <div>
                    {item.count} {" x "} {item.title}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
