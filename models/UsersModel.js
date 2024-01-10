import mongoose from "mongoose";
import encryptPassword, { validatePassword } from "../utils/passwordUtils";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
UserSchema.methods.encryptPassword = encryptPassword(password);
UserSchema.methods.validPassword = validatePassword(password);

const User = mongoose.model("User", UserSchema);

export default User;
