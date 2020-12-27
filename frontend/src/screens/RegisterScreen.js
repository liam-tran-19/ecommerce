import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";

export const RegisterScreen = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      alert("Password and confirm password are not match");
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <div className="form-signin">
      <form onSubmit={submitHandler}>
        <ul className="form-container-signin">
          <li>
            <h2>Register</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor="name">Name</label>
            <input
              type="name"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
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
            <label htmlFor="rePassword">Re-Enter Password</label>
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              onChange={(e) => setRePassword(e.target.value)}
            />
          </li>
          <li>
            <button type="submit" className="button primary">
              Register
            </button>
          </li>
          <li>
            Already Have An Account? <Link to="/signin">Sign-In</Link>
          </li>
        </ul>
      </form>
    </div>
  );
};
