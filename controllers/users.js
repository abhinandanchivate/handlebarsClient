import navbarData from "../data/navbarData.js";
import bcrypt from "bcryptjs";
// validation api : express-validator lib
import { check, validationResult } from "express-validator";
import UserModel from "../models/UsersModel.js";
const getRegisterUser = (req, res) => {
  res.render("auth/register", { navbar: navbarData });
};

const registerUser =
  // this final validated data we will pass it to our model.

  (check("name", "Name is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  async (req, res) => {
    // we need to validate the data,

    // finally we will share the token / error details as per the scenario

    // req.body : new user data / json object.
    console.log(JSON.stringify(req.body));
    const { name, email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
    }

    try {
      let user = null;

      const salt = await bcrypt.getnSalt(10);
      user = new UserModel({ name, email, password });
      user.password = await bcrypt.hash(password, salt);
      console.log("input value" + JSON.stringify(user));
      const result = await user.save();
      console.log("final result ", result);
      // then we will call save method to store the details in our DB.
      res.json(user);
    } catch (err) {}
    console.log("register user post called");
  });
export { getRegisterUser, registerUser };
