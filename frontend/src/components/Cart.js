import React, { useEffect, useState } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { removeFromCart } from "../actions/cartActions";
import { createOrder, clearOrder } from "../actions/orderActions";
import PaypalButtons from "./PaypalButtons";

export const Cart = (props) => {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPaypal, setShowPaypal] = useState(false);

  const orderSel = useSelector((state) => state.order);
  const cartSel = useSelector((state) => state.cart);

  const { order } = orderSel;
  const { cartItems } = cartSel;

  const dispatch = useDispatch();

  const handleInput = (e) => {
    const { value, name } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };
  const makeOrder = (e) => {
    e.preventDefault();
    const order = {
      name: info.name,
      email: info.email,
      address: info.address,
      cartItems: cartItems,
      total: cartItems.reduce((a, c) => a + c.price * c.count, 0),
    };
    dispatch(createOrder(order));
  };
  const closeModal = () => {
    dispatch(clearOrder());
  };
  const showPaypalButtons = () => {
    setShowPaypal(true);
  };
  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="cart cart-header">Cart is empty</div>
      ) : (
        <div className="cart cart-header">
          You have {cartItems.length} in the cart{" "}
        </div>
      )}

      {order && (
        <Modal isOpen={true} onRequestClose={closeModal}>
          <Zoom>
            <button className="close-modal" onClick={closeModal}>
              x
            </button>
            {showPaypal ? (
              <div className="paypal-btn">
                <PaypalButtons amount={formatCurrency(order.total)} />
              </div>
            ) : (
              <div className="order-details">
                <h3 className="success-message">Your order has been placed.</h3>
                <h2>Order {order._id}</h2>
                <ul>
                  <li>
                    <div>Name:</div>
                    <div>{order.name}</div>
                  </li>
                  <li>
                    <div>Email:</div>
                    <div>{order.email}</div>
                  </li>
                  <li>
                    <div>Address:</div>
                    <div>{order.address}</div>
                  </li>
                  <li>
                    <div>Date:</div>
                    <div>{order.createdAt}</div>
                  </li>
                  <li>
                    <div>Total:</div>
                    <div>{"$" + formatCurrency(order.total)}</div>
                  </li>
                  <li>
                    <div>Cart Items:</div>
                    <div>
                      {order.cartItems.map((x) => (
                        <div>
                          {x.count} {" x "} {x.title}
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
                <div>
                  <button
                    className="button primary"
                    onClick={showPaypalButtons}
                  >
                    Pay {"$" + formatCurrency(order.total)}
                  </button>
                </div>
              </div>
            )}
          </Zoom>
        </Modal>
      )}
      <div>
        <div className="cart">
          <Fade left cascade>
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title}></img>
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      {"$" + formatCurrency(item.price)} x {item.count}{" "}
                      <button
                        className="button"
                        onClick={() => dispatch(removeFromCart(item))}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
        {cartItems.length !== 0 && (
          <div>
            <div className="cart">
              <div className="total">
                <div>
                  Total:{" "}
                  {"$" +
                    formatCurrency(
                      cartItems.reduce((a, c) => a + c.price * c.count, 0)
                    )}
                </div>
                <button
                  onClick={() => {
                    setShowCheckout(true);
                  }}
                  className="button primary"
                >
                  Proceed
                </button>
              </div>
            </div>
            {showCheckout && (
              <Fade right cascade>
                <div className="cart">
                  <form onSubmit={makeOrder}>
                    <ul className="form-container">
                      <li>
                        <label>Email</label>
                        <input
                          name="email"
                          type="email"
                          required
                          onChange={handleInput}
                        ></input>
                      </li>
                      <li>
                        <label>Name</label>
                        <input
                          name="name"
                          type="text"
                          required
                          onChange={handleInput}
                        ></input>
                      </li>
                      <li>
                        <label>Address</label>
                        <input
                          name="address"
                          type="text"
                          required
                          onChange={handleInput}
                        ></input>
                      </li>
                      <li>
                        <button className="button primary" type="submit">
                          Checkout
                        </button>
                      </li>
                    </ul>
                  </form>
                </div>
              </Fade>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
