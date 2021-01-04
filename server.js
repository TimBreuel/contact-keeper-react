const express = require("express");
const app = express();
const connectDB = require("./config/db");
const path = require("path");

//////////////////////
//CONNECT TO MONGO DB
connectDB();

//////////////
//BODY PARSER
app.use(express.json({ extended: false }));

////////////////
//ROUTE GET HOME
// app.get("/", (req, res) => {
//   res.json({ msg: "Welcome to the contact keeper api" });
// });

//
app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));

//SERVE static assets in Production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
