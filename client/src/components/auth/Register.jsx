import React, { useState } from "react";
import AlertContext from "../../context/alert/AlertContext";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/AuthContext";

const Register = (props) => {
  ////////////////////
  //USE ALERT CONTEXT
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  //////////////////
  //USE AUTH CONTEXT
  const authContext = useContext(AuthContext);
  const { registerUser, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error === "User already exist!") {
      setAlert(error, "danger");
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  /////////////////
  //USER USE STATE
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });
  //DESTRUKTURING USER
  const { name, email, password, repassword } = user;

  //////////////////
  //ON CHNAGE INPUTS
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  ////////////////////////////////
  //ON CLICK SUBMIT THE INPUT DATA
  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== repassword) {
      setAlert("Password do not match", "danger");
    } else {
      //AXIOS THE DATA TO THE SERVER
      registerUser({ name, email, password });
      //SET INPUT FIELDS TO NULL
      setUser({
        name: "",
        email: "",
        password: "",
        repassword: "",
      });
    }
  };
  return (
    <div className="container">
      <h1>
        Account <span className="text-info">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
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
            minLength="6"
          />
        </div>

        <div className="form-group">
          <label htmlFor="repassword">Repeat password</label>
          <input
            className="form-control"
            type="password"
            name="repassword"
            value={repassword}
            onChange={onChange}
            minLength="6"
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-info btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
