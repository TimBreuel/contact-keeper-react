import React, { useContext, Fragment, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactContext from "../../context/contact/ContactContext";
import ContactItem from "./ContactItem";

export default function Contacts() {
  //NOW WE HAVE ACESS TO ALL METHODS FROM THE STATE
  const contactContext = useContext(ContactContext);
  //DESTRUCTURING TO PULL OUT THE CONTACTS FROM THE STATE
  const { contacts, filtered, getContacts } = contactContext;

  useEffect(() => {
    getContacts();
    //eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0) {
    return <h4 style={{ color: "#6c757d" }}>Please add a contact...</h4>;
  }
  return (
    <Fragment>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map((contact) => (
              <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem contact={contact}></ContactItem>
              </CSSTransition>
            ))
          : contacts.map((contact) => {
              return (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="item"
                >
                  <ContactItem contact={contact}></ContactItem>
                </CSSTransition>
              );
            })}
      </TransitionGroup>
    </Fragment>
  );
}
