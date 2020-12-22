import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../actions/userAction";

export const SigninScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignIn = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignIn;
  const dispatch = useDispatch();
  const history = useHistory();
  const redirect = props.location.search;
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  return (
    <div className="form-signin">
      <form onSubmit={submitHandler}>
        <ul className="form-container-signin">
          <li>
            <h2>Sign-In</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{"Invalid Email or Password"}</div>}
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <button type="submit" className="button primary">
              Signin
            </button>
          </li>
          <li>New to Rommache?</li>
          <li>
            <Link
              to={
                redirect === "/" ? "register" : "register?redirect=" + redirect
              }
              className="button secondary text-center"
            >
              Create An Account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};
