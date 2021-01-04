import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContext";

function ContactForm() {
  const contactContext = useContext(ContactContext);
  const { addContact, current, clearCurrent, updateContact } = contactContext;
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const { name, email, phone, type } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }

    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-info">{current ? "Edit Contact" : "Add Contact"}</h2>
      <input
        className="form-control my-3"
        type="text"
        placeholder="name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        className="form-control my-3"
        type="email"
        placeholder="email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        className="form-control my-3"
        type="number"
        placeholder="phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5 className="text-info">Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        onChange={onChange}
        checked={type === "personal"}
      />{" "}
      <span className="text-secondary">Personal </span>
      <input
        type="radio"
        name="type"
        value="professional"
        onChange={onChange}
        checked={type === "professional"}
      />{" "}
      <span className="text-secondary">Professional </span>
      <div>
        <input
          type="submit"
          value={current ? "Save Contact" : "Add Contact"}
          className="btn btn-info btn-block my-3"
        />
      </div>
      {current && (
        <div>
          <button
            className="btn btn-secondary btn-block mt-2"
            onClick={clearAll}
          >
            Clear
          </button>
        </div>
      )}
    </form>
  );
}

export default ContactForm;
