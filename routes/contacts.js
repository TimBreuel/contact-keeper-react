const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const Contact = require("../models/Contact");
const { check, validationResult } = require("express-validator/check");
const auth = require("../middleware/auth");

//////////////////////
//@ROUTE    GET api/contacts
//@DESC     GET ALL USERS CONTACTS
//@ACCESS   PRIVATE
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//////////////////////
//@ROUTE    POST api/contacts
//@DESC     ADD NEW CONTACT
//@ACCESS   PRIVATE
router.post(
  "/",
  [auth, [check("name", "name is required").not().notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//////////////////////
//@ROUTE    PUT api/contacts/:id
//@DESC     UPDATE CONTACT
//@ACCESS   PRIVATE
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//////////////////////
//@ROUTE    DELETE api/contacts/:id
//@DESC     DELETE CONTACT
//@ACCESS   PRIVATE
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: "Contact removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
