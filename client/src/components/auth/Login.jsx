import React, { useState } from "react";
import AlertContext from "../../context/alert/AlertContext";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/AuthContext";

const Login = (props) => {
  //USE CONTEXT
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  //DESTRUCTURING CONTEXT
  const { setAlert } = alertContext;
  const { loginUser, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error === "Invalid Username / Email") {
      setAlert(error, "danger");
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: [e.target.value] });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please feel out all fields", "danger");
    } else {
      loginUser({
        email: email[0],
        password: password[0],
      });
    }
  };

  return (
    <div className="container">
      <h1>
        Login <span className="text-info">Now</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <input type="submit" value="Login" className="btn btn-info btn-block" />
      </form>
    </div>
  );
};

export default Login;
