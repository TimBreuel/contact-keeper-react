import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../type";

const AuthState = (props) => {
  ////////
  //STATE
  const initalState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initalState);
  ///////////////////////////////////////////////////////////////
  ///////////////////////////METHODS/////////////////////////////

  ///////////
  //LOAD USER
  const loadUser = async () => {
    // console.log("localState:", localStorage.token);
    // console.log("initalState:", initalState.token);
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth");
      // console.log("res:", res);
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
      // console.log("resError:", error);
      dispatch({ type: AUTH_ERROR });
    }
  };
  ////////////////
  //REGISTER USER
  const registerUser = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("api/users", formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (error) {
      dispatch({
        type: REGISTER_FAILED,
        payload: error.response.data.msg,
      });
    }
  };

  /////////////
  //LOGIN USER
  const loginUser = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("api/auth", formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.msg,
      });
    }
  };
  /////////////
  //LOGOUT USER
  const logoutUser = () => {
    dispatch({ type: LOGOUT });
  };
  //////////////
  //CLEAR ERRORS
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  /////////////////////////////
  //RETURN PROVIDER AND VALUES
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        registerUser,
        loadUser,
        loginUser,
        logoutUser,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
