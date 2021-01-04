const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoConnectionString");

const connectDB = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log(err.message));
};

module.exports = connectDB;
