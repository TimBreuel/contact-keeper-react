import React from "react";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilter";
import AuthContext from "../../context/auth/AuthContext";
import { useContext, useEffect } from "react";

export default function Home() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <ContactForm></ContactForm>
        </div>
        <div className="col-6">
          <ContactFilter></ContactFilter>
          <Contacts></Contacts>
        </div>
      </div>
    </div>
  );
}
