const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { check, validationResult } = require("express-validator/check");
const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");
const config = require("config");
const { json } = require("express");
const auth = require("../middleware/auth");

//////////////////////
//@ROUTE    GET api/auth
//@DESC     GET LOGGED IN USER
//@ACCESS   PRIVATE
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//////////////////////
//@ROUTE    POST api/auth
//@DESC     AUTH USER AND GET TOKEN
//@ACCESS   PUBLIC
router.post(
  "/",
  [
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
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Username / Email" });
      } else {
        if (!passwordHash.verify(password, user.password)) {
          return res.status(400).json({ msg: "Invalid password" });
        } else {
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
      }
    } catch (error) {
      console.log(error.message);
      res.status(500);
    }
  }
);

module.exports = router;
