import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import ContactContext from "../../context/contact/ContactContext";

export default function Navbar({ title, icon }) {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logoutUser, user } = authContext;

  const contactContext = useContext(ContactContext);
  const { clearContacts } = contactContext;

  const onLogout = () => {
    logoutUser();
    clearContacts();
  };

  const authLinks = (
    <Fragment>
      <li className="list-inline-item mr-3" style={{ paddingTop: "10px" }}>
        Hello {user && user.name}
      </li>
      <li className="list-inline-item pt-2 mr-3">
        <Link to="/" style={{ fontSize: "18px" }}>
          Home
        </Link>
      </li>
      <li className="list-inline-item pt-2 mr-3">
        <Link to="/about" style={{ fontSize: "18px" }}>
          About
        </Link>
      </li>
      <li className="list-inline-item pt-2 mr-3">
        <Link to="/" style={{ fontSize: "18px" }} onClick={onLogout}>
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className="list-inline-item pt-2 mr-3">
        <Link to="/login" style={{ fontSize: "18px" }}>
          Login
        </Link>
      </li>
      <li className="list-inline-item pt-2 mr-3">
        <Link to="/register" style={{ fontSize: "18px" }}>
          Register
        </Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar bg-info py-0 mb-5">
      <h1>
        <div style={{ fontSize: "25px" }}>
          <i className={icon} style={{ fontSize: "40px" }}></i>
          {title}
        </div>
      </h1>
      <ul className="list-inline customUl mt-2">
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  );
}

Navbar.defaultProps = {
  title: "Contact Keeper",
  icon: "far fa-address-card mr-3 pt-1",
};
