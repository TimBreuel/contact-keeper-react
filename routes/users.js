const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { check, validationResult } = require("express-validator/check");
const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");
const config = require("config");

//////////////////////
//ROUTE POST api/users
router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "enter a password with 6 or more characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exist!" });
      } else {
        user = new User({
          name,
          email,
          password: passwordHash.generate(password),
        });
        await user.save();
        const payload = {
          user: {
            id: user._id,
          },
        };
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          {
            expiresIn: 360000,
          },
          (err, token) => {
            if (err) {
              throw err;
            } else {
              res.json({ token });
            }
          }
        );
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
