const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  { email: {
    type: String,
    require: true,
    max: 50,
  },
    password: {
      type: String,
      require: true,
      min: 6,
    },

   
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema)