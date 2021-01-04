import React from "react";
import ContactContext from "../../context/contact/ContactContext";
import { useContext, useRef, useEffect } from "react";

function ContactFilter() {
  const contactContext = useContext(ContactContext);
  const { filterContacts, clearFilter, filtered } = contactContext;
  const text = useRef("");

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });
  const onChange = (e) => {
    if (text.current.value !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        style={customStyle}
        type="text"
        ref={text}
        placeholder="Filter Contacts..."
        onChange={onChange}
      />
    </form>
  );
}
let customStyle = {
  border: "1px solid #ced4da",
  marginBottom: "10px",
  borderRadius: "5px",
  height: "41px",
  width: "100%",
  color: "#6c757d",
  paddingLeft: "10px",
};

export default ContactFilter;
