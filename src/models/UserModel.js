const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  viewHistory: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
    required: false,
    unique: false,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  console.log("Pre- save hook running");

  if (!user.isModified("password")) {
    return next();
  }

  console.log("Pre- save hook running and password is modified");

  console.log("raw password is :" + this.password);
  const hash = await bcrypt.hash(this.password, 10);
  console.log("Hashed and encrypted and salted password is :" + hash);
  this.password = hash;

  next();
});

const UserModel = mongoose.model("User", userSchema);

module.exports = {
  UserModel,
};
