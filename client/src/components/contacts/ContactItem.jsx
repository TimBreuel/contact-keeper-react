import React, { useContext } from "react";
import ContactContext from "../../context/contact/ContactContext";

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { _id, name, email, phone, type } = contact;
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <div className="card bg-light mb-3">
      <h3 className="text-info text-left m-2">
        {name}{" "}
        <span
          className={`badge ${
            type === "professional" ? "badge-success" : "badge-secondary"
          } float-right m-2`}
          style={{ fontSize: "16px" }}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list-group">
        {email && (
          <li className="list-group-item text-secondary">
            <i className="fas fa-envelope-open text-info mr-2"></i>
            {email}
          </li>
        )}
        {phone && (
          <li className="list-group-item text-secondary">
            <i className="fas fa-phone text-info mr-2"></i>
            {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-secondary btn.sm mt-2 mx-2"
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn.sm mt-2 mr-2" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

export default ContactItem;
